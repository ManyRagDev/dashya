# Dashya - Documento de Requisitos

## 1. Nome e Descrição da Aplicação

**Nome:** Dashya
\n**Descrição:** Dashya é um dashboard profissional desenvolvido para gestores de tráfego pago visualizarem métricas de campanhas publicitárias. O foco inicial é Meta Ads, com arquitetura preparada para expansão futura para Google Ads, LinkedIn Ads, TikTok Ads e outras plataformas.
\n## 2. Funcionalidades Principais

### 2.1 Dashboard Principal (/dashboard)
- Exibição de cards de métricas principais:
  - Investimento Total
  - CTR Médio
  - CPC Médio
  - ROAS
- Seção 'Campanhas Meta Ads' com estado vazio inicial
- Mensagem de placeholder: 'Conecte sua conta para visualizar campanhas'
- Cards preparados para receber dados reais posteriormente

### 2.2 Página de Configurações (/configuracoes)
- Perfil do usuário:\n  - Nome
  - URL da foto
  - Email
- Seção 'Integrações':
  - Integração Meta Ads (foco inicial)
  - Botão 'Conectar Meta Ads'
  - Estado 'Não conectado' como padrão

### 2.3 Página de Callback OAuth (/integracao/meta/callback)
- Página de processamento de conexão
- Exibição de mensagem: 'Processando conexão…'
- Rota de callback preparada para implementação futura

### 2.4 Página de Login (/login)
- Página de autenticação simples
- Utilizar padrão de login da plataforma

### 2.5 Fluxo OAuth Meta Ads (Preparação)
- Função iniciarOAuthMetaAds() criada
- Rota de callback estruturada
- URL base do OAuth usando variáveis de ambiente
- Estrutura preparada para troca futura de code → access_token
- Variáveis de ambiente (a serem configuradas):
  - META_APP_ID
  - META_REDIRECT_URI\n  - META_APP_SECRET (será adicionado futuramente)

## 3. Componentes Essenciais\n
### 3.1 Sidebar (Navegação Lateral Fixa)
- Menu com opções:
  - Dashboard
  - Configurações\n  - Sair

### 3.2 Header
- Avatar do usuário
- Email do usuário exibido
\n### 3.3 Componentes Reutilizáveis
- MetricCard: Card de métrica reutilizável
- MetaCampaignsList: Card de campanhas Meta Ads
- MetaConnectButton: Botão de conexão Meta Ads
- Estado vazio elegante para seções sem dados

## 4. Estrutura de Arquivos

- /pages: Páginas principais (dashboard, configuracoes, login, callback)
- /components: Componentes reutilizáveis (Sidebar, Header, MetricCard, etc.)
- /lib: Funções auxiliares e configurações\n- /utils: Utilitários gerais

## 5. Padrões de Código

- Código limpo, organizado e modular
- Componentes reutilizáveis
- Nomeação clara e descritiva (MetaConnectButton, MetricCard, MetaCampaignsList)
- Comentários explicativos em pontos principais\n- Evitar complexidade desnecessária

## 6. Design e Experiência do Usuário

### 6.1 Conceito Visual
- Interface moderna com forte apelo tecnológico e dinâmico
- Equilíbrio entre precisão digital e fluidez orgânica
- Atmosfera confortável que facilita longas sessões de análise de dados

### 6.2 Paleta de Cores
- Fundo em gradiente sutil de azul escuro para roxo profundo, criando profundidade e movimento
- Verde neon (#00FF88) para métricas positivas e destaques de crescimento
- Azul ciano vibrante (#00D9FF) para elementos interativos e CTAs
- Cinza claro translúcido para cards e superfícies, com efeito glassmorphism
- Branco puro para textos principais, garantindo legibilidade

### 6.3 Tipografia e Hierarquia
- Fonte sans-serif geométrica moderna (Inter, Outfit ou similar)
- Números de métricas em tamanho grande e peso bold para destaque imediato
- Títulos com tracking amplo para sensação de espaço e respiração
- Textos secundários em peso light para contraste hierárquico

### 6.4 Elementos Visuais e Interação
- Cards com backdrop blur e bordas luminosas sutis que reagem ao hover
- Transições suaves e micro-animações em todos os elementos interativos (300-400ms)
- Gráficos e visualizações de dados com linhas curvas e gradientes fluidos
- Ícones com estilo line art minimalista, animados ao interagir
- Botões com efeito glow sutil e expansão suave ao hover
- Estados de loading com animações orgânicas (pulse, wave)\n
### 6.5 Layout e Navegação
- Sidebar com largura adaptável, colapsável para maximizar área de visualização
- Dashboard em grid fluido que se reorganiza responsivamente
- Espaçamento generoso (24-32px) entre cards para respiração visual
- Scroll suave com parallax sutil em elementos de fundo
- Header minimalista que se oculta parcialmente no scroll para ganhar espaço

### 6.6 Experiência de Fluidez
- Transições de página com fade e slide suave
- Carregamento progressivo de dados com skeleton screens estilizados
- Feedback visual imediato para todas as ações do usuário
- Animações de entrada escalonadas para cards (stagger effect)
- Cursor customizado em áreas interativas para reforçar affordance

### 6.7 Elementos Orgânicos
- Formas com bordas arredondadas generosas (16-24px de border-radius)
- Padrões de fundo com noise texture sutil para textura visual
- Elementos decorativos com formas blob abstratas em baixa opacidade
- Gradientes multidirecionais que criam sensação de profundidade
\n## 7. Requisitos Funcionais Iniciais

- App abre diretamente no dashboard
- Sidebar totalmente funcional
- Página de configurações operacional
- Botão 'Conectar Meta Ads' funcional (inicia fluxo OAuth)
- Página de callback existente e acessível
- Métricas exibem placeholders com texto 'Aguardando conexão'
- Campanhas exibem placeholder com mensagem amigável
- Layout responsivo em todas as páginas

## 8. Observações Técnicas

- Arquitetura preparada para expansão futura (Google Ads, LinkedIn Ads, TikTok Ads)
- OAuth Meta Ads estruturado, mas sem implementação completa de tokens
- Variáveis de ambiente criadas, mas deixadas em branco para configuração posterior
- Toda a interface funcional visualmente, mesmo sem integração real de dados