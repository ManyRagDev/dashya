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

# Validação básica
if not all([my_app_id, my_app_secret, my_access_token, ad_account_id, supabase_url, supabase_key]):
    print("❌ Erro: Faltam variáveis de ambiente.")
    sys.exit(1)

# Inicializa conexões
FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)
supabase: Client = create_client(supabase_url, supabase_key)

def run_ingestion():
    # Define "Ontem" (O Facebook fecha o dia anterior para ter dados precisos)
    yesterday = (date.today() - timedelta(days=1)).strftime('%Y-%m-%d')
    print(f"🚀 Iniciando ingestão para: {yesterday}")

    try:
        # Formata o ID da conta (o Facebook exige 'act_' na frente se não tiver)
        id_formatado = f"act_{ad_account_id.replace('act_', '')}"
        account = AdAccount(id_formatado)

        # Campos que queremos buscar
        fields = [
            'spend',
            'impressions',
            'clicks',
            'actions',        # Para contar conversões
            'action_values',  # Para somar valor das vendas (Purchase Value)
        ]
        
        params = {
            'time_range': {'since': yesterday, 'until': yesterday},
            'level': 'account',
            'time_increment': 1
        }

        # --- 1. BUSCAR TOTAIS DA CONTA ---
        insights = account.get_insights(fields=fields, params=params)
        
        if not insights:
            print(f"⚠️ Sem dados para a conta na data {yesterday}.")
            return

        data = insights[0]
        
        # Cálculos Matemáticos (ROAS, Valor de Conversão)
        spend = float(data.get('spend', 0))
        impressions = int(data.get('impressions', 0))
        clicks = int(data.get('clicks', 0))
        
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
            "date": yesterday,
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "cpc": cpc,
            "ctr": ctr,
            "roas": roas
        }
        supabase.table('daily_account_metrics').upsert(payload_account, on_conflict='date').execute()
        print(f"✅ Métricas Gerais salvas: Gasto R$ {spend} | ROAS {roas}x")

        # --- 2. BUSCAR POR CAMPANHA ---
        params['level'] = 'campaign'
        params['fields'].append('campaign_name')
        params['fields'].append('campaign_id')
        
        campaign_insights = account.get_insights(fields=params['fields'], params=params)

        print(f"📦 Processando {len(campaign_insights)} campanhas...")

        for camp in campaign_insights:
            c_spend = float(camp.get('spend', 0))
            
            # Pula campanhas que não gastaram nada (opcional, mas limpa o banco)
            if c_spend == 0:
                continue

            c_clicks = int(camp.get('clicks', 0))
            c_revenue = 0.0
            
            if 'action_values' in camp:
                for action in camp['action_values']:
                    if action['action_type'] in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
                        c_revenue += float(action['value'])

            payload_camp = {
                "campaign_id": camp['campaign_id'],
                "campaign_name": camp['campaign_name'],
                "date": yesterday,
                "status": "ACTIVE", # A API de insights não traz status, assumimos ativo se gastou.
                "spend": c_spend,
                "roas": round(c_revenue / c_spend, 2) if c_spend > 0 else 0,
                "ctr": round((c_clicks / int(camp.get('impressions', 1))) * 100, 2),
                "cpc": round(c_spend / c_clicks, 2) if c_clicks > 0 else 0
            }
            supabase.table('campaign_metrics').upsert(payload_camp, on_conflict='campaign_id, date').execute()

        print("🏆 Sucesso Total! Dados sincronizados.")

    except Exception as e:
        print(f"❌ Erro fatal: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    run_ingestion()