# Dashya - Documento de Requisitos\n
## 1. Nome e Descrição da Aplicação

**Nome:** Dashya

**Descrição:** Dashya é um dashboard profissional desenvolvido para gestores de tráfego pago visualizarem métricas de campanhas publicitárias. O foco inicial é Meta Ads, com arquitetura preparada para expansão futura para Google Ads, LinkedIn Ads, TikTok Ads e outras plataformas.
\n## 2. Funcionalidades Principais

### 2.1 Dashboard Principal(/dashboard)
- Exibição de cards de métricas principais:\n  - Investimento Total\n  - CTR Médio
  - CPC Médio
  - ROAS
- Seção 'Campanhas Meta Ads' com estado vazio inicial
- Mensagem de placeholder:'Conecte sua conta para visualizar campanhas'
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
- Página de processamento de conexão\n- Exibição de mensagem: 'Processando conexão…'
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
  - META_REDIRECT_URI
  - META_APP_SECRET (será adicionado futuramente)

## 3. Componentes Essenciais

### 3.1 Sidebar (Navegação Lateral Fixa)
- Menu com opções:
  - Dashboard
  - Configurações
  - Sair
\n### 3.2 Header
- Avatardo usuário
- Email do usuário exibido
\n### 3.3 Componentes Reutilizáveis
- MetricCard: Card de métrica reutilizável
- MetaCampaignsList: Card de campanhas Meta Ads
- MetaConnectButton: Botão de conexão Meta Ads
- Estado vazio elegante para seções sem dados

## 4. Estrutura de Arquivos

- /pages: Páginas principais (dashboard, configuracoes, login, callback)
- /components: Componentes reutilizáveis (Sidebar, Header, MetricCard, etc.)
- /lib: Funções auxiliares e configurações
- /utils: Utilitários gerais
\n## 5. Padrões de Código
\n- Código limpo, organizado e modular
- Componentes reutilizáveis
- Nomeação clara e descritiva (MetaConnectButton, MetricCard, MetaCampaignsList)
- Comentários explicativos em pontos principais
- Evitar complexidade desnecessária\n
## 6. Design e Estilo Visual

### 6.1 Tema e Cores
- Tema escuro como padrão
- Paleta de cores:\n  - Preto e cinza grafite como tons base
  - Azul elétrico para elementos interativos e destaques
  - Roxo suave para acentos secundários

### 6.2 Estilo de Interface
- Interface minimalista, clean e profissional
- Layout baseado em cards com bordas suaves e sombras leves
- Ícones modernos (lucide-react ou equivalente)
- Hierarquia visual clara

### 6.3 Elementos Visuais
- Cards com bordas arredondadas e sombras sutis
- Botões com cores vibrantes (azul elétrico ou roxo brilhante)
- Espaçamento generoso entre elementos
- Estados vazios estilizados com mensagens amigáveis

### 6.4 Layout\n- Navegação lateral fixa (sidebar)
- Header simples e discreto
- Layout responsivo para diferentes tamanhos de tela\n- Organização em grid para cards de métricas

## 7. Requisitos Funcionais Iniciais

- App abre diretamente no dashboard
- Sidebar totalmente funcional
- Página de configurações operacional
- Botão 'Conectar Meta Ads' funcional (inicia fluxo OAuth)
- Página de callback existente e acessível
- Métricas exibem placeholders com texto 'Aguardando conexão'\n- Campanhas exibem placeholder com mensagem amigável
- Layout responsivo em todas as páginas

## 8. Observações Técnicas

- Arquitetura preparada para expansão futura (Google Ads, LinkedIn Ads, TikTok Ads)
- OAuth Meta Ads estruturado, mas sem implementação completa de tokens
- Variáveis de ambiente criadas, mas deixadas em branco para configuração posterior
- Toda a interface funcional visualmente, mesmo sem integração real de dados