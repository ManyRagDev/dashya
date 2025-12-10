-- Script para limpar dados fictícios do Supabase
-- Execute no SQL Editor do Supabase ANTES de rodar o workflow

-- 1. Deletar todas as métricas diárias (serão repopuladas pelo meta_ingestor.py)
DELETE FROM daily_account_metrics;

-- 2. Deletar todas as campanhas fictícias
DELETE FROM campaign_metrics;

-- Verificar se as tabelas estão vazias
SELECT COUNT(*) as total_daily FROM daily_account_metrics;
SELECT COUNT(*) as total_campaigns FROM campaign_metrics;

-- Resultado esperado: total_daily = 0, total_campaigns = 0
