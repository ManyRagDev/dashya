import os
import json
import time
from pathlib import Path
from supabase import create_client, Client
from groq import Groq
from dotenv import load_dotenv

# --- CONFIGURAÇÃO ROBUSTA DE ENV ---
# Descobre onde este arquivo está e procura o .env na raiz
current_dir = Path(__file__).resolve().parent
env_path = current_dir.parent / '.env'
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

# Validação Visual
print("-" * 30)
print(f"GROQ_API_KEY: {'✅' if GROQ_API_KEY else '❌ (Verifique o .env)'}")
print("-" * 30)

# Inicialização dos Clientes
try:
    if not SUPABASE_URL or not SUPABASE_KEY or not GROQ_API_KEY:
        raise ValueError("Faltam chaves no arquivo .env")
        
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    groq_client = Groq(api_key=GROQ_API_KEY)
except Exception as e:
    print(f"❌ Erro de Configuração: {e}")
    exit(1)

def get_knowledge_base():
    """Lê o manual de inteligência."""
    brain_path = current_dir / "brain" / "knowledge_base.md"
    try:
        with open(brain_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"⚠️ Alerta: Brain não encontrado em '{brain_path}'.")
        return "Regra: Se CPL baixo, bom. Se ROAS alto, bom."

def fetch_metrics():
    """Busca métricas do dia mais recente com dados."""
    try:
        # Busca o último registro (independente se for hoje ou dia 05)
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
    print("🧠 Iniciando Dashya AI Analyst (Modo Híbrido)...")
    
    # 1. Coleta de Dados
    metrics = fetch_metrics()
    if not metrics:
        print("❌ Abortando: Sem dados de métricas no banco.")
        return

    print(f"📊 Analisando dados de: {metrics.get('date')}")

    # 2. Carregamento do Cérebro
    knowledge = get_knowledge_base()
    
    # 3. Engenharia de Prompt (Context Injection)
    system_prompt = f"""
    ATUE COMO: Um Estrategista Sênior de Tráfego Pago (Media Buyer).
    
    SUA BASE DE CONHECIMENTO (MANUAL TÉCNICO):
    === INÍCIO ===
    {knowledge}
    === FIM ===
    
    SUA MISSÃO:
    Analise os métricas abaixo.
    Identifique se é um cenário de E-COMMERCE (Venda) ou LEAD GEN (Cadastro).
    Cruze com as regras do manual e gere um diagnóstico.
    
    DIRETRIZES:
    1. **Contexto:** Se houver LEADS > 0, ignore ROAS baixo. O foco é CPL.
    2. **Cite a Regra:** Justifique seu diagnóstico citando o manual (ex: "Conforme Regra de Orçamento").
    3. **Ação:** Dê uma ordem clara.
    4. **Sentimento:**
       - 'positive': Se CPL ou ROAS estiverem bons.
       - 'warning': Se houver fadiga ou custo subindo.
       - 'critical': Se houver erro de tracking ou gasto desenfreado.

    SAÍDA JSON OBRIGATÓRIA:
    {{
        "insight": "Manchete curta (max 8 palavras). Ex: 'CPL Excelente: Escale Agora'",
        "detailed_reason": "Explicação técnica citando os dados , mas sem citar explicitamente a regra. Você pode explicar a regra, mas o usuário não entende as referências às regras.",
        "sentiment": "positive" | "warning" | "critical",
        "confidence_score": 0-100
    }}
    """

    user_message = f"""
    DADOS DO CLIENTE (DATA: {metrics.get('date')}):
    - Gasto: R$ {metrics.get('spend', 0)}
    - Leads: {metrics.get('leads', 0)}
    - CPL (Custo/Lead): R$ {metrics.get('cpl', 0)}
    - Receita: R$ {metrics.get('revenue', 0)}
    - ROAS: {metrics.get('roas', 0)}
    - CTR: {metrics.get('ctr', 0)}%
    - CPC: R$ {metrics.get('cpc', 0)}
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
        print(f"⚡ Resposta em {end_time - start_time:.2f}s")

        result = json.loads(chat_completion.choices[0].message.content)
        
        # 4. Salvar
        payload = {
            "date": metrics['date'],
            "insight_text": result['insight'],
            "detailed_reason": result.get('detailed_reason', ''),
            "sentiment": result['sentiment'],
            "confidence_score": result['confidence_score']
        }
        
        supabase.table('daily_insights').upsert(payload, on_conflict='date').execute()
        
        print("\n✅ INSIGHT SALVO:")
        print(json.dumps(result, indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"❌ Erro na IA: {e}")

if __name__ == "__main__":
    generate_insight()