-- ========================================
-- QUERIES PARA VERIFICAR DADOS REAIS DO META
-- Execute no Supabase SQL Editor
-- ========================================

-- 1️⃣ CONTAGEM GERAL (quantos dias foram inseridos?)
SELECT
  COUNT(*) as total_dias,
  MIN(date) as data_mais_antiga,
  MAX(date) as data_mais_recente
FROM daily_account_metrics;

-- Resultado esperado: total_dias = 7, data_mais_recente = ontem


-- 2️⃣ VER ÚLTIMOS 7 DIAS (métricas gerais da conta)
SELECT
  date,
  spend as gasto,
  impressions as impressoes,
  clicks as cliques,
  cpc,
  ctr,
  roas
FROM daily_account_metrics
ORDER BY date DESC
LIMIT 7;

-- Resultado esperado: 7 linhas com dados reais dos últimos 7 dias


-- 3️⃣ VER CAMPANHAS COM DADOS REAIS (verificar se campaign_id é real)
SELECT
  campaign_id,
  campaign_name,
  date,
  spend,
  roas,
  ctr,
  status
FROM campaign_metrics
ORDER BY date DESC, spend DESC
LIMIT 15;

-- ✅ DADOS REAIS: campaign_id deve ser número longo (ex: 120210683968770232)
-- ❌ DADOS FICTÍCIOS: campaign_id seria "camp_0", "camp_1", "camp_2"


-- 4️⃣ VERIFICAR INTEGRIDADE DOS DADOS
SELECT
  date,
  CASE
    WHEN spend IS NULL THEN '❌ Gasto nulo'
    WHEN spend = 0 THEN '⚠️ Gasto zero'
    ELSE '✅ OK'
  END as status_gasto,
  spend,
  roas
FROM daily_account_metrics
ORDER BY date DESC;

-- Todos devem estar "✅ OK" ou "⚠️ Gasto zero" (dias sem gasto)


-- 5️⃣ MÉTRICAS AGREGADAS (resumo de desempenho)
SELECT
  SUM(spend) as gasto_total_7dias,
  AVG(roas) as roas_medio,
  SUM(clicks) as cliques_totais,
  SUM(impressions) as impressoes_totais,
  AVG(ctr) as ctr_medio
FROM daily_account_metrics
WHERE date >= CURRENT_DATE - INTERVAL '7 days';

-- Mostra resumo geral dos últimos 7 dias


-- 6️⃣ CAMPANHAS MAIS RENTÁVEIS (Top 5 por ROAS)
SELECT
  campaign_name,
  date,
  spend,
  roas,
  status
FROM campaign_metrics
WHERE date = (SELECT MAX(date) FROM campaign_metrics)
ORDER BY roas DESC
LIMIT 5;

-- Mostra as 5 campanhas com melhor ROAS do dia mais recente


-- 7️⃣ VERIFICAR SE HÁ DADOS DUPLICADOS
SELECT
  date,
  COUNT(*) as quantidade
FROM daily_account_metrics
GROUP BY date
HAVING COUNT(*) > 1;

-- Resultado esperado: 0 linhas (nenhuma data duplicada)


-- 8️⃣ VERIFICAR DATAS FALTANDO (deve ter todos os últimos 7 dias)
WITH ultimos_7_dias AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '7 days',
    CURRENT_DATE - INTERVAL '1 day',
    '1 day'::interval
  )::date AS data_esperada
)
SELECT
  u.data_esperada,
  CASE
    WHEN d.date IS NULL THEN '❌ FALTANDO'
    ELSE '✅ OK'
  END as status
FROM ultimos_7_dias u
LEFT JOIN daily_account_metrics d ON u.data_esperada = d.date
ORDER BY u.data_esperada DESC;

-- Todos devem estar "✅ OK"
