# 📊 Análise Completa - Projeto Dashya

**Data da Análise:** 09/12/2025
**Versão:** 0.0.1
**Tecnologias:** React 18 + TypeScript + Vite + Supabase

---

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [O Que o Projeto TEM](#o-que-o-projeto-tem)
3. [Problemas Encontrados](#problemas-encontrados)
4. [O Que FALTA Para Deploy](#o-que-falta-para-deploy)
5. [Roadmap Sugerido](#roadmap-sugerido)
6. [Checklist de Deploy](#checklist-de-deploy)

---

## 🎯 Visão Geral do Projeto

**Dashya** é uma plataforma multi-tenant de dashboard para gestão de tráfego pago (Meta Ads e Google Ads) com funcionalidades de:
- Visualização consolidada de métricas de diferentes plataformas
- Sistema de autenticação com Supabase
- Integrações OAuth com Meta Ads e Google Ads
- White-label para personalização por cliente
- Exportação de relatórios

---

## ✅ O Que o Projeto TEM

### 1. Estrutura de Arquivos Completa

```
dashya/
├── backend/
│   └── simulador.py              # Gerador de dados mock para Supabase
├── src/
│   ├── components/
│   │   ├── common/               # Layout (Sidebar, Header, Footer)
│   │   ├── dashboard/            # KPICard, CampaignTable, Charts
│   │   ├── integrations/         # Botões de conexão Meta/Google
│   │   └── ui/                   # 74 componentes shadcn/ui
│   ├── pages/                    # 9 páginas (Dashboard, Login, Settings, etc)
│   ├── data/                     # Mock data estruturado
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilitários (supabase.ts, oauth.ts, utils.ts)
│   ├── types/                    # Definições TypeScript
│   └── routes.tsx                # Configuração de rotas
├── .github/workflows/
│   └── update_metrics.yml        # GitHub Actions para rodar simulador
└── [arquivos de config]
```

### 2. Interface Completa e Funcional

#### Páginas Implementadas (100% UI)

| Página | Rota | Status UI | Descrição |
|--------|------|-----------|-----------|
| **Landing Page** | `/` | ✅ Completo | Hero section, features, footer |
| **Login** | `/login` | ✅ Completo | Autenticação Supabase, design moderno |
| **Dashboard Global** | `/dashboard` | ✅ Completo | KPIs, gráficos, métricas consolidadas |
| **Detalhes Plataforma** | `/platform/:name` | ✅ Completo | Funil conversão, tabela campanhas |
| **Configurações** | `/settings` | ✅ Completo | Integrações, white-label |

#### Componentes Principais

- ✅ **DashboardLayout** - Layout responsivo com sidebar e header
- ✅ **Sidebar** - Navegação desktop com animações
- ✅ **BottomTabBar** - Navegação mobile
- ✅ **Header** - Avatar, notificações, seletor de cliente
- ✅ **KPICard** - Cards de métricas com deltas e ícones
- ✅ **CampaignTable** - Tabela com switch ativo/pausado, badges coloridos
- ✅ **FunnelVisualization** - Funil de conversão animado
- ✅ **SpendRevenueChart** - Gráfico de linha (Recharts)
- ✅ **PlatformDistributionChart** - Gráfico de pizza
- ✅ **DateRangeSelector** - Seletor de período (7/30 dias, mês, ano)
- ✅ **ClientSelector** - Dropdown multi-tenant
- ✅ **MetaConnectButton** - Botão integração Meta Ads com loading states

### 3. Sistema de Autenticação (Parcialmente Implementado)

**Arquivos:**
- `src/pages/Login.tsx` - Interface de login funcional
- `src/lib/supabase.ts` - Cliente Supabase configurado
- `.env` - Credenciais Supabase (⚠️ exposto no Git)

**Funcionalidades:**
- ✅ Login com email/senha via Supabase
- ✅ Estados de loading e erro
- ✅ Validação de formulário
- ❌ Proteção de rotas DESABILITADA (código comentado)
- ❌ Logout não implementado

### 4. Integrações OAuth (Estrutura Criada)

#### Meta Ads (50% implementado)
**Arquivos:**
- `src/lib/oauth.ts` - Função `iniciarOAuthMetaAds()`
- `src/pages/MetaCallback.tsx` - Página de callback OAuth
- `src/components/integrations/MetaConnectButton.tsx` - Botão de conexão

**Status:**
- ✅ Fluxo OAuth iniciado (redireciona para Facebook)
- ✅ UI do botão de conexão com states
- ✅ Página de callback com loading
- ❌ Variáveis de ambiente vazias
- ❌ Rota de callback não mapeada
- ❌ Backend não processa o token
- ❌ Sem chamadas à API real do Meta

#### Google Ads (0% implementado)
- ✅ UI do botão
- ❌ Sem OAuth
- ❌ Sem API
- Apenas dados mock

### 5. Mock Data Estruturado

**Arquivo:** `src/data/mockData.ts`

**Dados disponíveis:**
- ✅ 3 clientes (Agência Digital Pro, E-commerce Fashion, Tech Startup)
- ✅ 4 métricas globais com deltas (Gasto, Receita, ROAS, CPA)
- ✅ 7 pontos de dados para gráficos (últimos 7 dias)
- ✅ 2 distribuições de plataforma (Meta/Google)
- ✅ 5 campanhas Meta Ads mockadas
- ✅ 3 campanhas Google Ads mockadas
- ✅ 2 funis de conversão (Meta e Google)
- ✅ 5 integrações (status conectado/em breve)

### 6. Backend Python

**Arquivo:** `backend/simulador.py`

**Funcionalidades:**
- ✅ Gera dados simulados dos últimos 7 dias
- ✅ Envia para Supabase:
  - Tabela `daily_account_metrics`
  - Tabela `campaign_metrics`
- ✅ GitHub Actions configurado (roda diariamente 09:00 UTC)
- ❌ Frontend NÃO consome esses dados (usa mock local)

### 7. Configurações Técnicas

#### Dependências Principais
- ✅ React 18.0.0
- ✅ React Router 7.9.5
- ✅ @supabase/supabase-js 2.76.1
- ✅ miaoda-auth-react 2.0.6
- ✅ Tailwind CSS 3.4.11
- ✅ Recharts 2.15.3
- ✅ React Hook Form 7.66.0 + Zod 3.25.76
- ✅ Lucide React (ícones)
- ✅ 16 pacotes @radix-ui

#### Arquivos de Configuração
- ✅ `package.json` - Todas dependências instaladas
- ✅ `tsconfig.json` - TypeScript configurado (target ES2020)
- ✅ `vite.config.ts` - Vite + plugin SVGR + path alias
- ✅ `tailwind.config.ts` - Tailwind com tema customizado
- ✅ `.env` - Variáveis de ambiente (⚠️ CRÍTICO: exposto no Git)
- ✅ `.env.example` - Template correto

### 8. Design System

- ✅ Tema dark/light configurado
- ✅ Gradientes e animações modernas
- ✅ Componentes acessíveis (Radix UI)
- ✅ Responsivo (desktop + mobile)
- ✅ Tokens de cor configurados
- ✅ Tipografia consistente

---

## 🔴 Problemas Encontrados

### CRÍTICOS (Impedem Deploy)

#### 1. **Credenciais Expostas no Git** 🚨
- **Arquivo:** `.env` (versionado)
- **Risco:** MUITO ALTO
- **Problema:** Chave do Supabase (`VITE_SUPABASE_ANON_KEY`) está no repositório público
- **Consequência:** Qualquer pessoa pode acessar seu banco de dados
- **Solução:**
  ```bash
  # 1. Adicionar ao .gitignore
  echo ".env" >> .gitignore

  # 2. Remover do histórico
  git rm --cached .env
  git commit -m "Remove .env do versionamento"

  # 3. Rotacionar chaves no Supabase Dashboard
  ```

#### 2. **Autenticação NÃO Protege Rotas** 🚨
- **Arquivo:** `src/App.tsx` linhas 6-40
- **Problema:** Código do `AuthProvider` e `RequireAuth` está COMENTADO
- **Consequência:** Qualquer pessoa pode acessar `/dashboard` sem login
- **Código atual:**
  ```typescript
  // import { AuthProvider, RequireAuth } from 'miaoda-auth-react';
  ```
- **Solução:** Descomentar e ativar proteção de rotas

#### 3. **Rota de Callback OAuth Não Existe** 🚨
- **Arquivo:** `src/routes.tsx`
- **Problema:** `/integracao/meta/callback` não está mapeado
- **Consequência:** OAuth do Meta nunca funcionará
- **Arquivo afetado:** `src/pages/MetaCallback.tsx` existe mas não é acessível
- **Solução:** Adicionar rota no arquivo de rotas

#### 4. **Redirecionamento Pós-Login Incorreto**
- **Arquivo:** `src/pages/Login.tsx` linha 39
- **Problema:** Redireciona para `"/"` em vez de `"/dashboard"`
- **Código atual:**
  ```typescript
  navigate('/');  // ❌ Vai para landing page
  ```
- **Solução:**
  ```typescript
  navigate('/dashboard');  // ✅ Vai para dashboard
  ```

### MÉDIOS (Funcionalidades Quebradas)

#### 5. **Logout Não Implementado**
- **Arquivo:** `src/components/common/Sidebar.tsx` linhas 32-34
- **Problema:** Função apenas faz `console.log()`, não desconecta usuário
- **Código atual:**
  ```typescript
  const handleLogout = () => {
    console.log('Logout clicked');
  };
  ```
- **Solução:**
  ```typescript
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  ```

#### 6. **Variáveis Meta Ads Vazias**
- **Arquivo:** `.env`
- **Problema:**
  ```env
  VITE_META_APP_ID=          # ❌ Vazio
  VITE_META_REDIRECT_URI=    # ❌ Vazio
  VITE_META_APP_SECRET=      # ❌ Vazio
  ```
- **Consequência:** Integração Meta não funciona
- **Solução:** Criar app no Facebook Developers e preencher

#### 7. **Frontend Não Consome Backend**
- **Problema:** `backend/simulador.py` envia dados para Supabase, mas frontend usa apenas `mockData.ts`
- **Tabelas no Supabase:**
  - `daily_account_metrics` (populada pelo backend)
  - `campaign_metrics` (populada pelo backend)
- **Frontend:** Ignora essas tabelas completamente
- **Consequência:** Dados reais nunca são exibidos

#### 8. **Página 404 Não Mapeada**
- **Arquivo:** `src/pages/NotFound.tsx` existe
- **Problema:** Não está nas rotas do `src/routes.tsx`
- **Comportamento atual:** Rotas inválidas redirecionam para `"/"`
- **Solução:** Adicionar rota catch-all

#### 9. **Páginas Duplicadas/Não Utilizadas**
Arquivos que existem mas não são usados:
- `src/pages/Dashboard.tsx` (duplicata de GlobalDashboard)
- `src/pages/Configuracoes.tsx` (duplicata de Settings)
- `src/pages/SamplePage.tsx` (apenas exemplo)

**Solução:** Remover para evitar confusão

### MENORES (Polimento)

#### 10. **Console.logs em Produção**
Encontrados em:
- `src/pages/Login.tsx` (linhas 38, 41)
- `src/pages/MetaCallback.tsx` (linhas 15, 23)
- `src/lib/oauth.ts` (linha 6)
- `src/components/common/Sidebar.tsx` (linha 33)
- `src/pages/Configuracoes.tsx` (linha 18)

**Solução:** Remover ou usar biblioteca de logging

#### 11. **Locale em Chinês**
- **Arquivo:** `src/lib/utils.ts` linha 33
- **Problema:**
  ```typescript
  date.toLocaleDateString('zh-CN', options);  // ❌ Chinês
  ```
- **Solução:**
  ```typescript
  date.toLocaleDateString('pt-BR', options);  // ✅ Português
  ```

#### 12. **Links de Footer Vazios**
- **Arquivo:** `src/pages/LandingPage.tsx` linhas 150-155
- **Problema:** "Política de Privacidade" e "Termos de Uso" com `href="#"`
- **Solução:** Criar páginas ou remover links

#### 13. **Nome do Projeto Inconsistente**
- **package.json:** `"name": "miaoda-react-admin"`
- **README:** Dashya
- **Solução:** Padronizar para "dashya"

#### 14. **Placeholders em Footer**
- **Arquivo:** `src/components/common/Footer.tsx` linhas 17, 29, 32
- **Problema:** Textos genéricos/chinês para informações da empresa
- **Solução:** Preencher com dados reais

---

## ❌ O Que FALTA Para Deploy

### 1. Segurança e Autenticação

#### Tarefas Obrigatórias:
- [ ] Remover `.env` do Git e rotacionar chaves Supabase
- [ ] Ativar proteção de rotas (descomentar código em `App.tsx`)
- [ ] Implementar logout funcional
- [ ] Configurar variáveis de ambiente em produção (Vercel/Netlify)
- [ ] Corrigir redirecionamento pós-login

**Tempo estimado:** 1-2 horas

### 2. Integração Meta Ads (OPCIONAL para MVP)

Se quiser deploy COM integração Meta funcional:

#### Backend OAuth (NÃO implementado):
- [ ] Criar endpoint para trocar código OAuth por access_token
- [ ] Salvar tokens no Supabase (criar tabela `oauth_tokens`)
- [ ] Implementar refresh token automático

#### Schema Supabase:
- [ ] Criar tabela `oauth_tokens`
  ```sql
  CREATE TABLE oauth_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    platform VARCHAR(50), -- 'meta_ads', 'google_ads'
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [ ] Criar tabela `meta_ad_accounts`
  ```sql
  CREATE TABLE meta_ad_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    account_id VARCHAR(255),
    account_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

#### Serviços Meta API:
- [ ] Criar serviço para buscar campanhas reais (Meta Marketing API)
- [ ] Sincronizar dados periodicamente
- [ ] Substituir mock data por dados reais no dashboard

#### Infraestrutura:
- [ ] Criar app no Facebook Developers
- [ ] Configurar OAuth redirect URI
- [ ] Adicionar variáveis ao `.env.production`
- [ ] Mapear rota `/integracao/meta/callback`

**Tempo estimado:** 12-20 horas

### 3. Persistência de Dados (Conectar Frontend ao Backend)

Atualmente o frontend usa mock, mas o backend já envia dados para Supabase.

#### Tarefas:
- [ ] Criar serviço `src/services/metricsService.ts` para buscar dados do Supabase
- [ ] Substituir `mockData.ts` por chamadas reais
- [ ] Implementar loading states
- [ ] Tratar erros de API
- [ ] Adicionar cache/react-query para otimização

**Exemplo:**
```typescript
// src/services/metricsService.ts
import { supabase } from '@/lib/supabase';

export const fetchDailyMetrics = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('daily_account_metrics')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
};
```

**Tempo estimado:** 4-6 horas

### 4. White-Label Funcional (OPCIONAL)

Atualmente apenas UI, sem funcionalidade real.

#### Tarefas:
- [ ] Criar tabela `white_label_settings` no Supabase
- [ ] Salvar logo e cor primária
- [ ] Aplicar CSS dinâmico baseado nas configurações
- [ ] Carregar settings na inicialização do app

**Tempo estimado:** 3-4 horas

### 5. Exportação de PDF Real (OPCIONAL)

Atualmente apenas mostra toast.

#### Tarefas:
- [ ] Instalar biblioteca `jspdf` ou `react-pdf`
- [ ] Gerar PDF com dados do dashboard
- [ ] Adicionar gráficos ao PDF
- [ ] Implementar download

**Tempo estimado:** 4-6 horas

### 6. Seletor de Cliente Funcional (Multi-tenant)

UI existe mas não filtra dados.

#### Tarefas:
- [ ] Criar Context para cliente selecionado
- [ ] Filtrar dados por cliente em todas as queries
- [ ] Persistir seleção no localStorage
- [ ] Sincronizar seleção entre abas

**Tempo estimado:** 2-3 horas

### 7. Polimento para Produção

#### Tarefas:
- [ ] Remover todos os console.logs
- [ ] Corrigir locale para pt-BR
- [ ] Adicionar página 404 nas rotas
- [ ] Remover arquivos duplicados
- [ ] Criar páginas de Política de Privacidade e Termos
- [ ] Preencher informações do Footer
- [ ] Adicionar favicon personalizado
- [ ] Configurar meta tags para SEO
- [ ] Testar responsividade em todos os dispositivos
- [ ] Testar fluxo completo de autenticação

**Tempo estimado:** 4-6 horas

### 8. Configuração de Deploy

#### Vercel/Netlify:
- [ ] Criar conta na plataforma
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente:
  ```
  VITE_SUPABASE_URL=xxx
  VITE_SUPABASE_ANON_KEY=xxx (NOVA chave após rotação)
  VITE_APP_ID=xxx
  VITE_META_APP_ID=xxx (se for usar Meta)
  VITE_META_REDIRECT_URI=https://seudominio.com/integracao/meta/callback
  VITE_META_APP_SECRET=xxx
  ```
- [ ] Configurar build command: `npm run build`
- [ ] Configurar output directory: `dist`
- [ ] Testar preview deploy
- [ ] Configurar domínio customizado (opcional)

**Tempo estimado:** 1-2 horas

### 9. Testes Antes do Deploy

#### Checklist de Testes:
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Rotas protegidas funcionam (não autorizado redireciona para login)
- [ ] Dashboard carrega métricas
- [ ] Gráficos renderizam corretamente
- [ ] Navegação mobile funciona
- [ ] Seletor de período funciona
- [ ] Tabela de campanhas funciona
- [ ] Páginas de detalhes (Meta/Google) funcionam
- [ ] Página de settings carrega
- [ ] Tema dark/light funciona (se implementado)
- [ ] Performance (Lighthouse score > 80)
- [ ] Acessibilidade (sem erros críticos)

**Tempo estimado:** 2-3 horas

---

## 🗺️ Roadmap Sugerido

### OPÇÃO A: MVP Rápido (Deploy em 1-2 dias)

**Objetivo:** Lançar versão funcional com autenticação + dados mock

#### FASE 1: Segurança e Correções Críticas (1-2h)
- [x] Remover `.env` do Git
- [x] Rotacionar chaves Supabase
- [x] Ativar proteção de rotas
- [x] Corrigir redirecionamento pós-login
- [x] Implementar logout funcional
- [x] Remover arquivos duplicados

#### FASE 2: Polimento (2-3h)
- [x] Remover console.logs
- [x] Corrigir locale pt-BR
- [x] Adicionar página 404
- [x] Preencher informações do Footer
- [x] Testar fluxo completo

#### FASE 3: Deploy (1-2h)
- [x] Configurar Vercel/Netlify
- [x] Configurar variáveis de ambiente
- [x] Deploy
- [x] Testes em produção

**TOTAL: 4-7 horas**

**Resultado:** App funcional com autenticação + dados mock + UI completa

---

### OPÇÃO B: Versão Completa (Deploy em 1-2 semanas)

**Objetivo:** App production-ready com integrações reais

#### FASE 1: Segurança (1-2h)
- Mesma da Opção A

#### FASE 2: Conectar Frontend ao Backend (4-6h)
- [x] Criar serviços para buscar dados do Supabase
- [x] Substituir mock por dados reais
- [x] Implementar loading states
- [x] Tratar erros

#### FASE 3: Integração Meta Ads (12-20h)
- [x] Criar app Facebook Developers
- [x] Implementar backend OAuth
- [x] Criar schema Supabase (oauth_tokens, meta_ad_accounts)
- [x] Mapear rota callback
- [x] Criar serviços Meta API
- [x] Sincronizar campanhas reais
- [x] Substituir mock do Meta por dados reais

#### FASE 4: Funcionalidades Adicionais (6-10h)
- [x] White-label funcional
- [x] Exportação PDF real
- [x] Seletor de cliente funcional
- [x] Notificações (opcional)

#### FASE 5: Polimento e Deploy (6-9h)
- [x] Remover console.logs
- [x] Testes completos
- [x] Performance optimization
- [x] SEO
- [x] Deploy

**TOTAL: 29-47 horas (~1-2 semanas)**

**Resultado:** App completo com Meta Ads funcional

---

### OPÇÃO C: MVP + Meta Básico (Deploy em 3-4 dias)

**Objetivo:** Autenticação + Meta OAuth (sem dados reais ainda)

#### FASE 1: Segurança (1-2h)
- Mesma da Opção A

#### FASE 2: Meta OAuth Básico (6-8h)
- [x] Criar app Facebook
- [x] Configurar variáveis
- [x] Implementar backend OAuth
- [x] Criar schema tokens
- [x] Mapear rota callback
- [x] Testar fluxo completo OAuth

#### FASE 3: Polimento e Deploy (3-4h)
- [x] Testes
- [x] Deploy

**TOTAL: 10-14 horas (~3-4 dias)**

**Resultado:** App com autenticação + conexão Meta (ainda exibe mock, mas usuário pode conectar conta)

---

## ✅ Checklist de Deploy

### Pré-Deploy

#### Segurança:
- [ ] `.env` removido do Git
- [ ] Chaves do Supabase rotacionadas
- [ ] Variáveis de ambiente configuradas no servidor
- [ ] Rotas protegidas por autenticação
- [ ] CORS configurado no Supabase

#### Funcionalidades Core:
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Dashboard carrega
- [ ] Navegação funciona
- [ ] Gráficos renderizam

#### Código Limpo:
- [ ] Sem console.logs
- [ ] Sem arquivos duplicados
- [ ] Sem TODOs críticos
- [ ] Locale correto (pt-BR)

#### Performance:
- [ ] Build roda sem erros
- [ ] Bundle size < 500kb (gzipped)
- [ ] Lighthouse score > 80

### Durante Deploy

- [ ] Build configurado corretamente
- [ ] Variáveis de ambiente adicionadas
- [ ] Preview deploy testado
- [ ] Domínio configurado (se aplicável)

### Pós-Deploy

- [ ] Todas as páginas acessíveis
- [ ] Autenticação funciona em produção
- [ ] Dados carregam corretamente
- [ ] Mobile funciona
- [ ] Sem erros no console do navegador
- [ ] Analytics configurado (Google Analytics/Mixpanel)
- [ ] Monitoramento de erros (Sentry)

---

## 📊 Resumo Executivo

### Status Atual do Projeto

| Categoria | Completude | Status |
|-----------|------------|--------|
| **UI/Design** | 95% | ✅ Excelente |
| **Autenticação** | 40% | ⚠️ Crítico - Não protege rotas |
| **Integração Meta** | 25% | ⚠️ Estrutura criada, backend faltando |
| **Integração Google** | 5% | ❌ Apenas UI |
| **Backend** | 60% | ⚠️ Simulador pronto, frontend não usa |
| **Segurança** | 30% | 🔴 Credenciais expostas |
| **Overall** | **50-55%** | ⚠️ Não pronto para deploy |

### Tempo Estimado Para Deploy

- **MVP Básico (Opção A):** 4-7 horas
- **MVP + Meta OAuth (Opção C):** 10-14 horas
- **Versão Completa (Opção B):** 29-47 horas

### Recomendação Final

**Para deploy rápido:** Seguir **Opção A** (MVP com dados mock)
- Corrige problemas de segurança
- App funcional em 1-2 dias
- Pode implementar Meta depois sem pressão

**Para app profissional:** Seguir **Opção B** (Versão completa)
- Todas integrações funcionais
- Pronto para clientes reais
- 1-2 semanas de desenvolvimento

---

## 📞 Próximos Passos

1. **Decidir qual opção de roadmap seguir**
2. **Começar pela FASE 1 (Segurança)** - OBRIGATÓRIO em qualquer opção
3. **Testar localmente antes do deploy**
4. **Configurar ambiente de produção**
5. **Deploy e monitoramento**

---

**Documento gerado em:** 09/12/2025
**Última atualização:** 09/12/2025
