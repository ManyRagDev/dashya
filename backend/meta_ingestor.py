import os
import sys
from datetime import date, timedelta
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from supabase import create_client, Client

# --- CONFIGURAÇÃO ---
# Pega as chaves dos Segredos do GitHub (ou .env local)
my_app_id = os.environ.get('META_APP_ID')
my_app_secret = os.environ.get('META_APP_SECRET')
my_access_token = os.environ.get('META_ACCESS_TOKEN')
ad_account_id = os.environ.get('META_AD_ACCOUNT_ID') # Ex: act_12345678

supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_KEY')

# Novo: Quantos dias buscar (padrão: 7 para popular histórico)
DAYS_TO_FETCH = int(os.environ.get('DAYS_TO_FETCH', '7'))

# Validação básica
if not all([my_app_id, my_app_secret, my_access_token, ad_account_id, supabase_url, supabase_key]):
    print("❌ Erro: Faltam variáveis de ambiente.")
    print(f"META_APP_ID: {'✓' if my_app_id else '✗'}")
    print(f"META_APP_SECRET: {'✓' if my_app_secret else '✗'}")
    print(f"META_ACCESS_TOKEN: {'✓' if my_access_token else '✗'}")
    print(f"META_AD_ACCOUNT_ID: {'✓' if ad_account_id else '✗'}")
    print(f"SUPABASE_URL: {'✓' if supabase_url else '✗'}")
    print(f"SUPABASE_KEY: {'✓' if supabase_key else '✗'}")
    sys.exit(1)

# Inicializa conexões
FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)
supabase: Client = create_client(supabase_url, supabase_key)

def process_day(target_date: str, account: AdAccount):
    """Processa dados de um dia específico"""
    print(f"📅 Processando: {target_date}")

    try:
        # Campos que queremos buscar
        fields = [
            'spend',
            'impressions',
            'clicks',
            'actions',        # Para contar conversões
            'action_values',  # Para somar valor das vendas (Purchase Value)
        ]

        params = {
            'time_range': {'since': target_date, 'until': target_date},
            'level': 'account',
            'time_increment': 1
        }

        # --- 1. BUSCAR TOTAIS DA CONTA ---
        insights = account.get_insights(fields=fields, params=params)

        if not insights or len(insights) == 0:
            print(f"⚠️  Sem dados para {target_date}")
            return False

        data = insights[0]

        # Cálculos Matemáticos (ROAS, Valor de Conversão)
        spend = float(data.get('spend', 0))
        impressions = int(data.get('impressions', 0))
        clicks = int(data.get('clicks', 0))

        # Se não gastou nada, pula
        if spend == 0:
            print(f"⚠️  Gasto zero em {target_date}")
            return False

        # Calcular Receita (Soma o valor de todas as ações de compra)
        revenue = 0.0
        if 'action_values' in data:
            for action in data['action_values']:
                # Soma 'purchase' e 'omni_purchase' (padrão pixel)
                if action['action_type'] in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
                    revenue += float(action['value'])

        # Calcular ROAS
        roas = round(revenue / spend, 2) if spend > 0 else 0
        cpc = round(spend / clicks, 2) if clicks > 0 else 0
        ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0

        # Salvar no Supabase (Tabela Geral)
        payload_account = {
            "date": target_date,
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "cpc": cpc,
            "ctr": ctr,
            "roas": roas
        }
        supabase.table('daily_account_metrics').upsert(payload_account, on_conflict='date').execute()
        print(f"✅ Geral: R$ {spend:.2f} | ROAS {roas}x")

        # --- 2. BUSCAR POR CAMPANHA ---
        params['level'] = 'campaign'
        campaign_fields = fields + ['campaign_name', 'campaign_id']

        campaign_insights = account.get_insights(fields=campaign_fields, params=params)

        if campaign_insights and len(campaign_insights) > 0:
            print(f"   📦 {len(campaign_insights)} campanhas")

            for camp in campaign_insights:
                c_spend = float(camp.get('spend', 0))

                # Pula campanhas que não gastaram nada
                if c_spend == 0:
                    continue

                c_clicks = int(camp.get('clicks', 0))
                c_impressions = int(camp.get('impressions', 1))
                c_revenue = 0.0

                if 'action_values' in camp:
                    for action in camp['action_values']:
                        if action['action_type'] in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
                            c_revenue += float(action['value'])

                payload_camp = {
                    "campaign_id": camp['campaign_id'],
                    "campaign_name": camp['campaign_name'],
                    "date": target_date,
                    "status": "ACTIVE",
                    "spend": c_spend,
                    "roas": round(c_revenue / c_spend, 2) if c_spend > 0 else 0,
                    "ctr": round((c_clicks / c_impressions) * 100, 2),
                    "cpc": round(c_spend / c_clicks, 2) if c_clicks > 0 else 0
                }
                supabase.table('campaign_metrics').upsert(payload_camp, on_conflict='campaign_id, date').execute()

        return True

    except Exception as e:
        print(f"❌ Erro em {target_date}: {str(e)}")
        return False

def run_ingestion():
    print(f"🚀 Iniciando ingestão Meta Ads ({DAYS_TO_FETCH} dias)")
    print("=" * 50)

    try:
        # Formata o ID da conta (o Facebook exige 'act_' na frente se não tiver)
        id_formatado = f"act_{ad_account_id.replace('act_', '')}"
        account = AdAccount(id_formatado)

        print(f"📊 Conta: {id_formatado}")
        print("=" * 50)

        # Processar últimos N dias
        success_count = 0
        for days_ago in range(DAYS_TO_FETCH):
            target_date = (date.today() - timedelta(days=days_ago + 1)).strftime('%Y-%m-%d')

            if process_day(target_date, account):
                success_count += 1

        print("=" * 50)
        print(f"🏆 Concluído! {success_count}/{DAYS_TO_FETCH} dias processados")

    except Exception as e:
        print(f"❌ Erro fatal: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    run_ingestion()
