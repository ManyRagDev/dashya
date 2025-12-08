# Dashya - Documento de Requisitos (Versão Atualizada)

## 1. Nome e Descrição da Aplicação

**Nome:** Dashya
\n**Descrição:** Dashya é um dashboard profissional White-Label desenvolvido para agências de tráfego pago gerenciarem múltiplos clientes e visualizarem métricas consolidadas de campanhas publicitárias. O foco inicial é Meta Ads e Google Ads, com arquitetura preparada para expansão futura para LinkedIn Ads, TikTok Ads e outras plataformas.

---

## 2. Funcionalidades Principais

### 2.1 Landing Page Institucional (/)\n- **Navbar Transparente:**
  - Logo Dashya à esquerda
  - Botão 'Login' (outline) à direita
- **Hero Section:**
  - Título (H1):'A Verdadeira Sala de Comando da Sua Agência'
  - Subtítulo: 'Centralize Meta e Google Ads em um dashboard White-Label premium que seus clientes vão amar.'
  - CTA Principal: Botão grande 'Acessar Plataforma' (redireciona para /login)
- Visual: Container com efeito Glow (brilho difuso azul/roxo) atrás de mockup abstrato do dashboard
- **Seção de Recursos (Grid 3 Colunas):**
  - Card 1: '100% White Label' (Ícone: Palette)\n  - Card 2: 'Dados em Tempo Real' (Ícone: Zap)
  - Card 3: 'Multicliente' (Ícone: Users)
- **Rodapé Simples:** Copyright e links de Política\n
### 2.2Tela de Login (/login)\n- Card centralizado com espaço reservado para logotipo profissional
- Entradas de Email/Senha com floating labels (rótulos flutuantes)
- Botão 'Entrar' com animação de estado de carregamento
- Utilizar padrão de autenticação da plataforma

### 2.3 Dashboard Global (/dashboard)
- **Cabeçalho:**
  - Seletor de Intervalo de Datas (Últimos 7 dias, Este Mês, Personalizado, etc.)
- **Cards de KPI (4 Cards):**
  - Gasto Total
  - Receita Total
  - ROAS Combinado
  - CPA\n  - Cada card inclui indicador Delta (ex: '▲ 12% vs período anterior') em verde para positivo e vermelho para negativo
- **Gráfico Principal:**\n  - Gráfico de Linha mostrando Gasto vs. Receita ao longo do tempo (usar Recharts ou mockup SVG)
- **Distribuição:**
  - Gráfico de Pizza mostrando fatia de Gasto (Meta vs. Google)
- **Botão Exportar:**
  - Botão no cabeçalho para 'Baixar PDF' (simular ação com notificação toast)

### 2.4 Detalhes da Plataforma (/platform/:name)\n- **Visão de Funil:**
  - Funil visual horizontal: Impressões → Cliques (CTR) → Conversões → Vendas
- **Tabela de Campanhas:**
  - Colunas: Status (toggle), Nome da Campanha, Gasto, ROAS, Receita\n  - Data Bars: Barras de progresso visuais dentro das células de Gasto e ROAS representando magnitude
  - Skeleton Loading: Estado de carregamento esqueleto antes dos dados aparecerem
- **Estados Vazios:**
  - Placeholders elegantes para quando não houver dados disponíveis
\n### 2.5 Configurações (/settings)
- **Perfil do Usuário:**
  - Nome\n  - URL da foto\n  - Email
- **Integrações:**
  - **Plataformas Ativas (Conectáveis):**
    - Cards para Meta Ads e Google Ads
    - SwitchAtivo/Inativo para cada plataforma
    - Campo de entrada para 'ID da Conta'\n    - Botão 'Conectar' para cada plataforma\n  - **Plataformas Em Breve (Coming Soon):**
    - Cards para TikTok Ads, LinkedIn Ads e Pinterest Ads
    - Logo da plataforma em escala de cinza (grayscale)
    - Badge pequeno com texto 'Em Breve' ou 'Coming Soon' substituindo o botão 'Conectar'
    - Estado visual desabilitado (grayed out) para indicar indisponibilidade temporária
    - Objetivo: Mostrar o roadmap do produto aos usuários\n- **White Label:**
  - Entrada para upload do 'Logo da Agência'
  - Seletor de Cores para alterar Cor Primária do tema
\n### 2.6 Página de Callback OAuth (/integracao/meta/callback)
- Página de processamento de conexão\n- Exibição de mensagem: 'Processando conexão…'
- Rota de callback preparada para implementação futura
\n### 2.7 Fluxo OAuth (Preparação)\n- Função iniciarOAuthMetaAds() e iniciarOAuthGoogleAds() criadas
- Rotas de callback estruturadas
- URL base do OAuth usando variáveis de ambiente
- Estrutura preparada para troca futura de code → access_token
- Variáveis de ambiente (a serem configuradas):\n  - META_APP_ID
  - META_REDIRECT_URI
  - META_APP_SECRET
  - GOOGLE_CLIENT_ID
  - GOOGLE_REDIRECT_URI
  - GOOGLE_CLIENT_SECRET
\n---

## 3. Layout e Navegação

### 3.1 Desktop\n- **Sidebar Fixa à Esquerda:**
  - **Topo da Sidebar:** Dropdown'Seletor de Cliente' (ex: 'Cliente Agência A', 'Cliente Agência B') para visão multi-inquilino
  - **Menu:**
    - Dashboard (Home)
    - Meta Ads
    - Google Ads
    - Configurações
    - Sair
- **Header:**
  - Avatar do usuário
  - Emaildo usuário exibido
\n### 3.2 Mobile
- **Sidebar:** Oculta\n- **Bottom Tab Bar (Barra de Navegação Inferior Fixa):**
  - Ícones para: Dashboard, Meta Ads, Google Ads, Configurações\n  - Estilo similar a aplicativos nativos
\n---

## 4. Estrutura de Arquivos e Dados

### 4.1 Estrutura de Pastas
- `/pages`: Páginas principais (landing, login, dashboard, platform/:name, settings, callback)
- `/components`: Componentes reutilizáveis (Sidebar, Header, MetricCard, KPICard, CampaignTable, FunnelChart, etc.)
- `/lib`: Funções auxiliares e configurações
- `/utils`: Utilitários gerais\n- `/data`: Dados fictícios (mockData.ts)\n
### 4.2 Tratamento de Dados (CRÍTICO)
- **Arquivo Específico:** `src/data/mockData.ts` contendo todos os dados fictícios
- **Interfaces TypeScript:** Exportar interfaces para todos os tipos de dados:\n  - `Metric`: Estrutura de métricas (nome, valor, delta, etc.)
  - `Campaign`: Estrutura de campanha (status, nome, gasto, ROAS, receita, etc.)
  - `ClientProfile`: Perfil de cliente (nome, id, etc.)
  - `ChartData`: Dados de gráficos
  - `IntegrationStatus`: Status de integração\n- **Proibição de Hardcoding:** NÃO colocar dados 'chumbados' dentro dos componentes
- **Importação:** Usar importações de mockData.ts nas páginas para facilitar substituição futura por chamadas de API do Supabase

---

## 5. Componentes Essenciais

### 5.1 Componentes de Navegação
- **Sidebar:** Navegação lateral fixa (desktop)
- **BottomTabBar:** Barra de navegação inferior (mobile)
- **Header:** Cabeçalho com avatar e email
- **ClientSelector:** Dropdown de seleção de cliente
\n### 5.2 Componentes de Visualização
- **KPICard:** Card de KPI com indicador Delta
- **MetricCard:** Card de métrica reutilizável
- **LineChart:** Gráfico de linha (Gasto vs. Receita)
- **PieChart:** Gráfico de pizza (Distribuição de Gasto)
- **FunnelChart:** Funil visual horizontal
- **CampaignTable:** Tabela de campanhas com Data Bars e Skeleton Loading
- **DataBar:** Barra de progresso visual para células de tabela

### 5.3 Componentes de Interação
- **DateRangePicker:** Seletor de intervalo de datas
- **ExportButton:** Botão de exportação com toast de simulação
- **ConnectButton:** Botão de conexão para plataformas\n- **StatusToggle:** Toggle de status de campanha
- **EmptyState:** Placeholder elegante para dados vazios
- **SkeletonLoader:** Estado de carregamento esqueleto\n- **ComingSoonBadge:** Badge indicando funcionalidade futura

### 5.4 Componentes de Configuração
- **IntegrationCard:** Card de integração com switch e campo de ID (para plataformas ativas)
- **ComingSoonIntegrationCard:** Card de integração em estado desabilitado com badge'Em Breve' (para plataformas futuras)
- **WhiteLabelSettings:** Configurações de White Label (logo e cor)\n- **ColorPicker:** Seletor de cores\n- **LogoUploader:** Upload de logo\n
---

## 6. Padrões de Código

- Código limpo, organizado e modular
- Componentes pequenos e reutilizáveis
- Tipagem estrita com TypeScript
- Nomeação clara e descritiva
- Comentários explicativos em pontos principais
- Evitar complexidade desnecessária
- Abordagem Mobile-First para responsividade

---\n
## 7. Design e Experiência do Usuário
\n### 7.1 Conceito Visual
- Interface moderna com forte apelo tecnológico e dinâmico
- Equilíbrio entre precisão digital e fluidez orgânica
- Atmosfera confortável que facilita longas sessões de análise de dados
- Dark Mode como padrão\n
### 7.2 Paleta de Cores
- Fundo em gradiente sutil de azul escuro para roxo profundo
- Verde neon (#00FF88) para métricas positivas e indicadores de crescimento
- Vermelho vibrante para métricas negativas\n- Azul ciano vibrante (#00D9FF) para elementos interativos e CTAs
- Cinza claro translúcido para cards e superfícies, com efeito glassmorphism
- Branco puro para textos principais\n- Cinza escuro dessaturado para elementos em estado 'Coming Soon'

### 7.3 Tipografia e Hierarquia
- Fonte: Inter ou system-ui\n- Números de métricas em tamanho grande e peso bold
- Títulos com tracking amplo\n- Textos secundários em peso light
- Tipografia grande para Landing Page (Marketing de Alta Conversão)

### 7.4 Elementos Visuais e Interação
- Cards com backdrop blur e bordas luminosas sutis que reagem ao hover
- Transições suaves (300-400ms) em todos os elementos interativos
- Gráficos com linhas curvas e gradientes fluidos
- Ícones com estilo line art minimalista, animados ao interagir
- Botões com efeito glow sutil e expansão suave ao hover
- Estados de loading com animações orgânicas (pulse, wave)\n- Data Bars com gradientes e animação de preenchimento
- Floating labels com transição suave
- Cards'Coming Soon' com opacidade reduzida e logos em grayscale

### 7.5 Layout e Navegação
- Sidebar com largura adaptável, colapsável para maximizar área de visualização
- Dashboard em grid fluido que se reorganiza responsivamente
- Espaçamento generoso (24-32px) entre cards\n- Scroll suave com parallax sutil em elementos de fundo
- Header minimalista que se oculta parcialmente no scroll
- Bottom Tab Bar fixa em mobile comícones claros
\n### 7.6 Experiência de Fluidez
- Transições de página com fade e slide suave
- Carregamento progressivo de dados com skeleton screens estilizados
- Feedback visual imediato para todas as ações (toast notifications)\n- Animações de entrada escalonadas para cards (stagger effect)
- Cursor customizado em áreas interativas

### 7.7 Elementos Orgânicos
- Formas com bordas arredondadas generosas (16-24px de border-radius)
- Padrões de fundo com noise texture sutil
- Elementos decorativos com formas blob abstratas em baixa opacidade
- Gradientes multidirecionais criando sensação de profundidade
- Efeito Glow (brilho difuso) em elementos de destaque da Landing Page
\n---

## 8. Requisitos Funcionais

- Landing Page acessível na rota raiz (/) antes do login
- Botão 'Acessar Plataforma' redireciona para /login
- App autenticado abre diretamente no dashboard
- Sidebar totalmente funcional com seletor de cliente no topo
- Bottom Tab Bar funcional em mobile
- Seletor de intervalo de datas operacional
- Cards de KPI exibem dados fictícios de mockData.ts com indicadores Delta
- Gráficos renderizam dados fictícios de mockData.ts
- Tabela de campanhas com Data Bars e Skeleton Loading\n- Botão Exportar simula ação com toast notification
- Página de configurações operacional com integrações e White Label
- Botões'Conectar' iniciam fluxo OAuth para Meta Ads e Google Ads
- Cards de TikTok Ads, LinkedIn Ads e Pinterest Ads exibem estado 'Em Breve' com visual desabilitado
- Estados vazios elegantes para seções sem dados
- Layout responsivo em todas as páginas (Mobile-First)
- Todos os dados importados de mockData.ts (sem hardcoding)
\n---

## 9. Observações Técnicas

- Arquitetura preparada para expansão futura (LinkedIn Ads, TikTok Ads, Pinterest Ads)
- OAuth estruturado para Meta Ads e Google Ads, mas sem implementação completa de tokens
- Variáveis de ambiente criadas, mas deixadas em branco para configuração posterior
- Toda a interface funcional visualmente, mesmo sem integração real de dados
- Estrutura de dados em mockData.ts facilita substituição futura por API do Supabase
- Componentes estritamente tipados com TypeScript
- Abordagem Mobile-First garante experiência otimizada em todos os dispositivos
- Cards'Coming Soon' servem para comunicar roadmap do produto aos usuários