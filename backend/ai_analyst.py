import os
import json
import time
from datetime import date, timedelta
from supabase import create_client, Client
from groq import Groq
from dotenv import load_dotenv  # <--- NOVA IMPORTAÇÃO

# --- CONFIGURAÇÃO ---
load_dotenv()  # <--- CARREGA O ARQUIVO .ENV

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

# Inicialização dos Clientes
try:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("SUPABASE_URL ou SUPABASE_KEY não encontrados no .env")
        
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    groq_client = Groq(api_key=GROQ_API_KEY)
except Exception as e:
    print(f"❌ Erro de Configuração: {e}")
    exit(1)

def get_knowledge_base():
    """Lê o arquivo Markdown que contém a inteligência do sistema."""
    brain_path = "backend/brain/knowledge_base.md"
    try:
        with open(brain_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"⚠️ Alerta: Arquivo '{brain_path}' não encontrado. Usando base fallback.")
        return "Regra básica: Se ROAS > 2.5, campanha está boa."

def fetch_metrics():
    """Busca as métricas mais recentes no banco de dados."""
    try:
        response = supabase.table('daily_account_metrics') \
            .select("*") \
            .order('date', desc=True) \
            .limit(1) \
            .execute()
        
        if response.data:
            return response.data[0]
        return None
    except Exception as e:
        print(f"❌ Erro ao buscar métricas: {e}")
        return None

def generate_insight():
    print("🧠 Iniciando Dashya AI Analyst (Modo Expert)...")
    
    # 1. Coleta de Dados
    metrics = fetch_metrics()
    if not metrics:
        print("❌ Abortando: Sem dados de métricas para analisar hoje.")
        return

    print(f"📊 Dados encontrados para data: {metrics.get('date')}")

    # 2. Carregamento do Cérebro
    knowledge = get_knowledge_base()
    
    # 3. Engenharia de Prompt (Context Injection)
    system_prompt = f"""
    ATUE COMO: Um Estrategista Sênior de Tráfego Pago (Media Buyer) especialista em Meta Ads.
    
    SUA INTELEIGÊNCIA VEM DESTE MANUAL TÉCNICO (NÃO INVENTE REGRAS):
    === INÍCIO DO MANUAL ===
    {knowledge}
    === FIM DO MANUAL ===
    
    SUA MISSÃO:
    Analise as métricas diárias fornecidas abaixo.
    Cruze os números com as regras do manual (Ex: Regra 1 de Learning, Regra 21 de Fadiga, Benchmarks 2025).
    Gere um diagnóstico curto e uma ação recomendada.
    
    DIRETRIZES DE RESPOSTA:
    1. **Cite a Regra:** Se identificar um padrão, diga explicitamente (ex: "Detectado LP Mismatch conforme Regra 8").
    2. **Benchmark:** Compare o CTR/CPC do usuário com os benchmarks do manual.
    3. **Ação:** Dê uma ordem clara (Pausar, Escalar, Refazer Criativo).
    4. **Tom de Voz:** Profissional, direto, analítico. Sem "eu acho".

    FORMATO DE SAÍDA OBRIGATÓRIO (JSON):
    {{
        "insight": "Frase de impacto para o card (max 10 palavras). Ex: 'Fadiga Criativa Detectada: Pause Agora'",
        "detailed_reason": "Explicação técnica de 2 frases citando a regra e os dados.",
        "sentiment": "positive" | "warning" | "critical",
        "confidence_score": 0-100 (Inteiro)
    }}
    """

    user_message = f"""
    DADOS DO CLIENTE (DATA: {metrics.get('date')}):
    - Gasto: R$ {metrics.get('spend', 0)}
    - Receita: R$ {metrics.get('revenue', 0)} (Se 0, calcule ROAS baseado no Spend)
    - ROAS: {metrics.get('roas', 0)}
    - CTR: {metrics.get('ctr', 0)}%
    - CPC: R$ {metrics.get('cpc', 0)}
    - Impressões: {metrics.get('impressions', 0)}
    """

    print("🤔 Consultando Llama 3.3 (Groq)...")
    
    try:
        start_time = time.time()
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.1, 
            response_format={"type": "json_object"}
        )
        end_time = time.time()
        print(f"⚡ Resposta gerada em {end_time - start_time:.2f}s")

        result_content = chat_completion.choices[0].message.content
        result = json.loads(result_content)
        
        # 4. Salvar Insight no Supabase
        payload = {
            "date": metrics['date'],
            "insight_text": result['insight'],
            "detailed_reason": result.get('detailed_reason', ''),
            "sentiment": result['sentiment'],
            "confidence_score": result['confidence_score']
        }
        
        supabase.table('daily_insights').upsert(payload, on_conflict='date').execute()
        
        print("\n✅ INSIGHT SALVO COM SUCESSO:")
        print(json.dumps(result, indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"❌ Erro na geração/salvamento do insight: {e}")

if __name__ == "__main__":
    generate_insight()