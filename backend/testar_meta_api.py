"""
Script para testar se as credenciais do Meta Ads estão funcionando
Execute localmente: python backend/testar_meta_api.py
"""
import os
from datetime import date, timedelta
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

# --- CONFIGURAÇÃO (substitua com suas credenciais REAIS) ---
my_app_id = os.environ.get('META_APP_ID', 'COLE_AQUI_SEU_APP_ID')
my_app_secret = os.environ.get('META_APP_SECRET', 'COLE_AQUI_SEU_APP_SECRET')
my_access_token = os.environ.get('META_ACCESS_TOKEN', 'COLE_AQUI_SEU_ACCESS_TOKEN')
ad_account_id = os.environ.get('META_AD_ACCOUNT_ID', 'COLE_AQUI_SEU_AD_ACCOUNT_ID')

print("=" * 60)
print("🧪 TESTE DE CONEXÃO META ADS API")
print("=" * 60)

# Validar variáveis
print("\n1️⃣ Verificando credenciais...")
print(f"META_APP_ID: {'✓ OK' if my_app_id and my_app_id != 'COLE_AQUI_SEU_APP_ID' else '✗ FALTANDO'}")
print(f"META_APP_SECRET: {'✓ OK' if my_app_secret and my_app_secret != 'COLE_AQUI_SEU_APP_SECRET' else '✗ FALTANDO'}")
print(f"META_ACCESS_TOKEN: {'✓ OK' if my_access_token and my_access_token != 'COLE_AQUI_SEU_ACCESS_TOKEN' else '✗ FALTANDO'}")
print(f"META_AD_ACCOUNT_ID: {'✓ OK' if ad_account_id and ad_account_id != 'COLE_AQUI_SEU_AD_ACCOUNT_ID' else '✗ FALTANDO'}")

if not all([my_app_id, my_app_secret, my_access_token, ad_account_id]):
    print("\n❌ Faltam credenciais! Edite o arquivo e cole suas credenciais.")
    exit(1)

# Inicializar API
print("\n2️⃣ Inicializando API do Meta...")
try:
    FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)
    print("✓ API inicializada")
except Exception as e:
    print(f"✗ Erro ao inicializar API: {e}")
    exit(1)

# Formatar ID da conta
id_formatado = f"act_{ad_account_id.replace('act_', '')}"
print(f"\n3️⃣ ID da conta formatado: {id_formatado}")

# Tentar acessar a conta
print("\n4️⃣ Tentando acessar conta do Meta...")
try:
    account = AdAccount(id_formatado)
    print(f"✓ Conta criada: {account}")
except Exception as e:
    print(f"✗ Erro ao criar conta: {e}")
    exit(1)

# Buscar dados de ontem
print("\n5️⃣ Buscando dados de ontem...")
ontem = (date.today() - timedelta(days=1)).strftime('%Y-%m-%d')
print(f"Data: {ontem}")

try:
    fields = ['spend', 'impressions', 'clicks']
    params = {
        'time_range': {'since': ontem, 'until': ontem},
        'level': 'account',
        'time_increment': 1
    }

    insights = account.get_insights(fields=fields, params=params)

    if not insights or len(insights) == 0:
        print(f"⚠️  SEM DADOS para {ontem}")
        print("   Possíveis causas:")
        print("   - Conta não gastou nada nesse dia")
        print("   - Token sem permissão ads_read")
        print("   - Conta ID incorreto")
    else:
        data = insights[0]
        print(f"✅ DADOS ENCONTRADOS!")
        print(f"   Gasto: R$ {float(data.get('spend', 0)):.2f}")
        print(f"   Impressões: {int(data.get('impressions', 0)):,}")
        print(f"   Cliques: {int(data.get('clicks', 0)):,}")

        print("\n6️⃣ Testando busca de campanhas...")
        params['level'] = 'campaign'
        campaign_fields = fields + ['campaign_name', 'campaign_id']
        campaign_insights = account.get_insights(fields=campaign_fields, params=params)

        if campaign_insights and len(campaign_insights) > 0:
            print(f"✅ {len(campaign_insights)} campanhas encontradas:")
            for i, camp in enumerate(campaign_insights[:3], 1):
                print(f"   {i}. {camp.get('campaign_name')} (ID: {camp.get('campaign_id')})")
        else:
            print("⚠️  Sem campanhas ativas")

except Exception as e:
    print(f"✗ ERRO ao buscar dados: {e}")
    print(f"   Tipo do erro: {type(e).__name__}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\n" + "=" * 60)
print("🎉 TESTE CONCLUÍDO COM SUCESSO!")
print("=" * 60)
print("\nSe chegou até aqui, suas credenciais estão corretas!")
print("O problema pode estar no script de ingestão ou no Supabase.")
