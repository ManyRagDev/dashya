import os
import random
from datetime import date, timedelta
from supabase import create_client, Client

# --- MUDANÇA AQUI: Ler do ambiente em vez de fixo ---
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
# ----------------------------------------------------

if not url or not key:
    raise ValueError("❌ Erro: Variáveis de ambiente SUPABASE_URL ou SUPABASE_KEY não encontradas.")

supabase: Client = create_client(url, key)

# ... (o resto da função gerar_dados continua igual) ...

def gerar_dados():
    print("🚀 Iniciando geração de dados simulados...")
    
    # Gerar dados dos últimos 7 dias para ter gráfico histórico
    for dias_atras in range(7):
        data_processada = (date.today() - timedelta(days=dias_atras)).strftime('%Y-%m-%d')
        
        # Dados aleatórios mas realistas
        investimento = round(random.uniform(500.0, 2000.0), 2)
        impressoes = int(investimento * random.uniform(80, 150))
        cliques = int(impressoes * random.uniform(0.01, 0.04))
        vendas = round(investimento * random.uniform(2.0, 5.0), 2)
        
        # 1. Enviar Totais
        dados_conta = {
            "date": data_processada,
            "spend": investimento,
            "impressions": impressoes,
            "clicks": cliques,
            "cpc": round(investimento/cliques, 2) if cliques > 0 else 0,
            "ctr": round((cliques/impressoes)*100, 2) if impressoes > 0 else 0,
            "roas": round(vendas/investimento, 2) if investimento > 0 else 0
        }
        supabase.table('daily_account_metrics').upsert(dados_conta, on_conflict='date').execute()
        
        # 2. Enviar Campanhas (Para o dia de ontem apenas, ou todos se quiser)
        if dias_atras <= 1: 
            nomes = ["Campanha [Conv] - Black Friday", "Campanha [Leads] - Ebook", "Campanha [Reach] - Branding"]
            for i, nome in enumerate(nomes):
                budget = investimento * (0.5 if i==0 else 0.25)
                supabase.table('campaign_metrics').upsert({
                    "campaign_id": f"camp_{i}", # ID fixo para simular a mesma campanha
                    "campaign_name": nome,
                    "date": data_processada,
                    "spend": round(budget, 2),
                    "roas": round(random.uniform(1.5, 8.0), 2),
                    "ctr": round(random.uniform(1.0, 3.0), 2),
                    "status": "ACTIVE"
                }, on_conflict='campaign_id, date').execute()

    print("✅ Sucesso! Dados de 7 dias inseridos.")

if __name__ == "__main__":
    gerar_dados()