import os
import sys
from datetime import date, timedelta
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from supabase import create_client, Client
from dotenv import load_dotenv

# --- CONFIGURAÇÃO ---
load_dotenv()

my_app_id = os.environ.get('META_APP_ID')
my_app_secret = os.environ.get('META_APP_SECRET')
my_access_token = os.environ.get('META_ACCESS_TOKEN')
ad_account_id = os.environ.get('META_AD_ACCOUNT_ID')

supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_KEY')

DAYS_TO_FETCH = 30 # Buscando 30 dias para ter histórico

# Validação técnica
if not all([my_app_id, my_app_secret, my_access_token, ad_account_id, supabase_url, supabase_key]):
    print("❌ Erro: Faltam variáveis de ambiente no arquivo .env")
    sys.exit(1)

try:
    FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)
    supabase: Client = create_client(supabase_url, supabase_key)
except Exception as e:
    print(f"❌ Erro na inicialização: {e}")
    sys.exit(1)

def process_day(target_date, account):
    print(f"📅 Processando: {target_date}")
    
    try:
        params = {
            'time_range': {'since': target_date, 'until': target_date},
            'level': 'account',
            'time_increment': 1
        }
        
        fields = [
            'spend',
            'impressions',
            'clicks',
            'actions',        # Aqui vêm os Leads e Compras
            'action_values',  # Aqui vêm os Valores (R$)
        ]

        insights = account.get_insights(fields=fields, params=params)
        
        if not insights:
            print(f"⚠️  Sem dados para {target_date}")
            return False

        data = insights[0]
        
        # --- CÁLCULOS BÁSICOS ---
        spend = float(data.get('spend', 0))
        impressions = int(data.get('impressions', 0))
        clicks = int(data.get('clicks', 0))
        
        # --- CÁLCULOS DE CONVERSÃO (O Pulo do Gato) ---
        revenue = 0.0
        leads = 0

        # 1. Calcular Receita (Compras)
        if 'action_values' in data:
            for action in data['action_values']:
                if action['action_type'] in ['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']:
                    revenue += float(action['value'])

        # 2. Calcular Leads (Quantidade)
        if 'actions' in data:
            for action in data['actions']:
                # Lista de eventos que consideramos como "Lead"
                if action['action_type'] in ['lead', 'on_facebook_lead', 'offsite_conversion.fb_pixel_lead', 'contact']:
                    leads += int(action['value'])

        # --- CÁLCULOS DE PERFORMANCE ---
        roas = round(revenue / spend, 2) if spend > 0 else 0
        cpc = round(spend / clicks, 2) if clicks > 0 else 0
        ctr = round((clicks / impressions) * 100, 2) if impressions > 0 else 0
        cpl = round(spend / leads, 2) if leads > 0 else 0  # Custo por Lead

        # --- SALVAR NO SUPABASE ---
        payload = {
            "date": target_date,
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "cpc": cpc,
            "ctr": ctr,
            "roas": roas,
            "revenue": revenue,
            "leads": leads,
            "cpl": cpl
        }
        
        supabase.table('daily_account_metrics').upsert(payload, on_conflict='date').execute()
        
        # Log inteligente: Mostra o que é relevante
        if leads > 0:
            print(f"✅ Salvo: Gasto R$ {spend} | {leads} LEADS (CPL R$ {cpl})")
        else:
            print(f"✅ Salvo: Gasto R$ {spend} | ROAS {roas}x")
            
        return True

    except Exception as e:
        print(f"❌ Erro ao processar dia {target_date}: {e}")
        return False

def run_ingestion():
    print(f"🚀 Iniciando ingestão Meta Ads ({DAYS_TO_FETCH} dias)")
    print("=" * 50)

    try:
        id_formatado = f"act_{ad_account_id.replace('act_', '')}"
        account = AdAccount(id_formatado)

        # Identificação da Conta
        print(f"🔎 Buscando informações da conta: {id_formatado}")
        account_info = account.api_get(fields=['name', 'currency'])
        account_name = account_info.get('name', 'Conta Meta Ads')
        account_currency = account_info.get('currency', 'BRL')
        
        supabase.table('ad_accounts').upsert({
            "account_id": id_formatado,
            "name": account_name,
            "currency": account_currency,
            "platform": "META",
            "updated_at": "now()"
        }).execute()
        
        print(f"✅ Conta Identificada: {account_name}")
        print("=" * 50)

        # Loop dos Dias
        success_count = 0
        for days_ago in range(DAYS_TO_FETCH):
            target_date = (date.today() - timedelta(days=days_ago + 1)).strftime('%Y-%m-%d')
            if process_day(target_date, account):
                success_count += 1

        print("=" * 50)
        print(f"🏆 Concluído! {success_count}/{DAYS_TO_FETCH} dias processados")

    except Exception as e:
        print(f"❌ Erro fatal: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    run_ingestion()