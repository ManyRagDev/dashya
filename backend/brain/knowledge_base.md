Meta Ads – Guia Definitivo de Diagnóstico e Otimização
======================================================

Base documental para IA de suporte à decisão em gestão de tráfegoÚltima atualização: Dezembro 2025Versão: Consolidada – Practitioner's Edition

Sumário
-------

*   Ciclo de Vida da Campanha
    
*   Regras de Diagnóstico (SE/ENTÃO)
    
*   Métricas e Benchmarks
    
*   Casos Reais e Exemplos Práticos
    
*   Checklists e Árvores de Decisão Rápida
    
*   Automação e Monitoramento
    
*   Referências e Fundamentação
    

1\. Ciclo de Vida da Campanha
=============================

1.1 Fase de Lançamento (Dias 1–7)
---------------------------------

**Objetivo:** Coletar dados, evitar resets.

**Ações recomendadas:**

*   Budget fixo, sem alterações.
    
*   1–2 criativos no máximo.
    
*   Zero edições em ad sets ou audiences.
    
*   Monitorar 1× ao dia, evitar decisões por flutuação diária.
    

1.2 Fase de Aprendizado (Dias 8–21)
-----------------------------------

**Objetivo:** Sair de Learning Limited com 50+ eventos em 7 dias.

**Ações recomendadas:**

*   Batch changes a cada 5–7 dias.
    
*   Aumentar budget em 20% se performance estável.
    
*   Testar novo criativo se o CTR cair.
    
*   Auditoria de tracking se ainda em Learning após 10 dias.
    

1.3 Fase de Escala (Dias 22+)
-----------------------------

**Objetivo:** Crescer volume mantendo ROI.

**Ações recomendadas:**

*   Aumentar budget 15–20% a cada 3–4 dias.
    
*   Manter criativo vencedor até fadiga (frequência > 3, CTR –20%).
    
*   Horizontal scaling com novas audiências.
    
*   Automação de regras (scale winner, pause loser).
    

2\. Regras de Diagnóstico (SE/ENTÃO)
====================================

2.1 Problema: Campanha Presa em Learning Limited
------------------------------------------------

### Regra 1 – Diagnóstico Completo

**SE** Status = Learning Limited**E** Conversões últimos 7 dias < 50**ENTÃO:**

1.  **Verificar orçamento:**
    
    *   SE Orçamento < CPA alvo × 5 → Aumentar para 7–10× CPA
        
    *   SE Orçamento ≥ CPA × 5 → próximo passo
        
2.  **Verificar tracking:**
    
    *   Pixel Helper + CAPI ativos?
        
    *   SE não → auditoria imediata
        
3.  **Verificar edições:**
    
    *   SE >2 edições em 7 dias → Pausar edições por 7 dias
        
    *   SE ≤2 → próximo passo
        
4.  **Verificar estrutura:**
    
    *   SE Ad Sets > 3 → Consolidar para 1–2
        
    *   SE ≤3 → Expandir audiência para >500K (Advantage+)
        

### Regra 2 – Orçamento Insuficiente

**SE** Orçamento diário < CPA alvo × 5**ENTÃO:**

*   Aumentar para mínimo CPA × 7
    
*   Exemplo: CPA 50 → Orçamento mínimo 350/dia
    
*   Se ainda em Learning após 10 dias → +50% e Automatic Placements
    

### Regra 3 – Tracking Fraco

**SE** Status = Learning Limited**E** Orçamento ≥ CPA × 5**ENTÃO:**

*   Verificar Event Manager e Pixel Helper
    
*   Validar Aggregated Event Measurement
    
*   Confirmar CAPI enviando eventos
    
*   Habilitar Auto Advanced Matching
    
*   SE eventos zerados → campanha não sairá de Learning
    

2.2 Problema: Alto CTR + Baixa Conversão
----------------------------------------

### Regra 8 – Landing Page Mismatch

**SE** CTR > 2.5%**E** Conversion Rate < 1%**ENTÃO:** Diagnóstico = LANDING PAGE MISMATCH

**Checklist de causas:**

*   Título do anúncio = título da LP?
    
*   Imagem do anúncio = primeira imagem da LP?
    
*   Oferta mencionada no anúncio aparece na LP?
    
*   Tempo de carregamento < 2s?
    
*   LP mobile responsive?
    
*   Formulário/checkout simplificado (≤3 campos)?
    

**Ações:**

*   Reescrever LP com headline idêntico ao anúncio
    
*   Garantir continuidade visual (ad → LP)
    
*   Destacar oferta acima do formulário
    
*   Otimizar PageSpeed
    
*   Testar versão mobile-first
    
*   A/B test em 48h
    

2.3 Problema: Fadiga de Criativo
--------------------------------

### Regra 21 – Detecção de Fadiga

**SE** Frequência > 3**E** CTR cai > 20% vs baseline**E** CPC sobe > 15%**ENTÃO:** Criativo fatigado (90%+ confiança)

**Ações:**

*   Pausar criativo imediatamente
    
*   Lançar 2–3 novos ângulos
    
*   Manter mesma audiência
    
*   Monitorar novo criativo por 24–48h
    

### Regra 24 – Alerta Automatizado (Sheets/Data Studio)

Fórmula:

IF(AND(Frequência > 3,CTR\_Hoje / CTR\_Baseline < 0.80,CPC\_Hoje / CPC\_Baseline > 1.15),FADIGA – Pausar,OK)

2.4 Problema: Escala vs ROI
---------------------------

### Regra 14 – Scaling Vertical (Regra dos 20%)

Pré-requisitos:

*   Status = Active (exited Learning)
    
*   50+ conversões nos últimos 7 dias
    
*   CPA ≤ Target
    
*   ROAS estável por 3 dias (variação <20%)
    
*   Frequência < 2.5
    

**SE todos ok:**

*   Aumentar budget 15–20% a cada 3–4 dias
    
*   Monitorar CPA diariamente
    
*   SE CPA sobe >10% em 1 dia → pausar scaling
    

**Exemplo de evolução:**

*   Dia 1: 100/dia
    
*   Dia 4: 120/dia
    
*   Dia 7: 144/dia
    
*   Dia 10: 173/dia
    

### Regra 15 – Plateau de Escala

**SE** Aumentar budget 20%**E** Conversões sobem <10%**ENTÃO:** Budget Elasticity quebrada (plateau)

**Ações:**

*   Pausar scaling vertical
    
*   Mudar para horizontal scaling
    
*   Duplicar ad set vencedor com nova audiência
    
*   Testar Lookalike 1%, 2–3%, Broad + interesse
    

3\. Métricas e Benchmarks
=========================

3.1 Benchmarks por Indústria (2025)
-----------------------------------

MétricaE-commerce (Avançado)SaaS/Lead Gen (Avançado)CTR2.5%+2.0%+CPC<0.50<0.40CPM3–52–4Conv Rate3–5%20–30%CPATarget × 0.85–0.95Target × 0.85ROAS3.5–5.0x–Frequência1.5–2.51.5–2.5

3.2 Correlação Ideal de Funil
-----------------------------

CTR > 2% → CPC < 0.70 → CPM competitivo → Conversion Rate 2–3% → ROAS > 2.5x

3.3 Sinais de Alerta
--------------------

*   CPA > Target × 1.25 por 3+ dias → intervir
    
*   Frequência > 3 + CTR caindo → fadiga
    
*   CTR < 0.8% → problema de audiência/criativo
    
*   Landing Page Views < 60% de Link Clicks → link quebrado ou timeout
    

4\. Casos Reais e Exemplos Práticos
===================================

4.1 Exemplo 1: Learning Limited
-------------------------------

**Situação:**

*   Dropshipping
    
*   Learning Limited (dia 12)
    
*   Orçamento: 50/dia
    
*   CPA alvo: 35
    
*   Conversões últimos 7 dias: 28
    

**Diagnóstico:**

*   Orçamento insuficiente (50 < 175)
    
*   3 edições em 7 dias
    

**Plano de Ação:**

*   Aumentar budget para 200/dia
    
*   Zero edições por 7 dias
    
*   Monitorar saída do Learning em ~3 dias
    

**Resultado Esperado:**

*   Sai de Learning
    
*   75+ conversões/semana
    
*   CPA ~30
    

4.2 Exemplo 2: Alto CTR (3.2%) + Baixa Conversão (0.5%)
-------------------------------------------------------

**Diagnóstico:** Regra 8 – LP Mismatch

Causas:

*   Headline diferente
    
*   Imagem diferente
    
*   PageSpeed 4.2s
    
*   LP sem mobile-first
    

**Plano:**

*   Headline igual ao anúncio
    
*   Otimizar velocidade
    
*   Formulário mobile simplificado
    

**Resultado Esperado:**

*   Conversão: 1.5–2%
    
*   CPA cai de 140 → 35–47
    

4.3 Exemplo 3: Escala Conservadora vs Agressiva
-----------------------------------------------

**Cenário A – Conservadora:**

*   +20% a cada 3–4 dias
    
*   Em 20 dias: 299/dia
    
*   Conversões: 120–135
    

**Cenário B – Agressiva (erro):**

*   +100% em 1 dia
    
*   Reset do algoritmo
    
*   CPA sobe
    

**Conclusão:** Escala gradual gera 40%+ mais conversões.

5\. Checklists e Árvores de Decisão
===================================

5.1 Checklist Semanal
---------------------

DiaFocoAçõesSegundaAnáliseRevisar status, CPA vs target, fadiga, trackingQuartaOtimizaçãoPausar losers, A/B LP, preparar criativosSextaEscala+15–20% vencedores, novos criativosDomingoReviewResumo semanal e planejamento

5.2 Árvore de Decisão: Pronto Para Escalar?
-------------------------------------------

START →Status = Active? →50+ conversões/7d? →CPA ≤ Target? →ROAS estável 3d? →Frequência < 2.5? →**Pronto para escalar +15–20% a cada 3–4 dias**

5.3 Árvore de Decisão: Criativo Fatigado?
-----------------------------------------

START →Frequência > 3? →CTR caiu 20%+? →CPC subiu 15%+? →**Criativo fatigado → Pausar imediatamente**

6\. Automação e Monitoramento
=============================

6.1 Regras Automáticas Essenciais
---------------------------------

NomeCondiçãoAçãoFrequênciaScale WinnerPurchases ≥ 10 AND CPA ≤ target (3d)Budget +20%AutoPause LoserSpent ≥ 200 AND Conversions = 0PauseAutoStop BurnCPA > Target × 1.25 AND Spent ≥ 500Budget –30%AutoFatigue AlertFrequency > 3 AND CTR –20%NotifyDailyLearning AlertStatus = Learning Limited >10 diasNotifyDaily

6.2 Dashboard Recomendado
-------------------------

*   Métricas: CTR, CPC, CPA, ROAS, Frequência
    
*   Alertas (Regra 24)
    
*   Status por campanha
    
*   Comparativo baseline vs atual
    

7\. Referências e Fundamentação
===============================

7.1 Fontes Oficiais
-------------------

*   Meta Blueprint – Learning Phase
    
*   Power5 Framework
    
*   Ad Relevance Diagnostics
    

7.2 Benchmarks 2025
-------------------

*   CTR médio: 1.57%
    
*   CPC médio: 0.77
    
*   ROAS alvo: 2.5x+
    

7.3 Processo Mensal Recomendado
-------------------------------

Semana 1: Análise (status, tracking, funil)Semana 2: Otimização (LP, criativos, pausar losers)Semana 3: Escala (+20% vencedores, horizontal scaling)Semana 4: Refresh & Testes (novos criativos, documentação)

Notas Finais
============

*   Não edite campanhas em learning. Esperar 7 dias entre mudanças.
    
*   Budget mínimo = CPA alvo × 7. Abaixo disso, campanha trava.
    
*   Fadiga é percebida pelo CTR, não pela conversão.
    
*   Escala gradual evita reset e plateau.
    
*   Tracking é fundamental: auditoria semanal com Pixel Helper + CAPI.