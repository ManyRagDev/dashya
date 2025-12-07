# Dashya - Documentação do Design UX

## Visão Geral
O Dashya foi redesenhado com foco em uma experiência moderna, tech, dinâmica e confortável para gestores de tráfego pago.

## Paleta de Cores

### Cores Principais
- **Primary (Roxo Vibrante)**: `hsl(270 80% 65%)` - Cor principal para elementos interativos
- **Secondary (Ciano/Teal)**: `hsl(180 70% 55%)` - Cor de destaque e acentos
- **Background**: `hsl(240 10% 6%)` - Fundo escuro profundo
- **Foreground**: `hsl(240 5% 96%)` - Texto principal

### Gradientes
- **Gradient Primary**: Roxo → Rosa (135deg)
- **Gradient Secondary**: Ciano → Azul (135deg)
- **Gradient Background**: Sutil transição de fundo

## Elementos de Design

### 1. Glassmorphism
- Cards com efeito de vidro fosco
- Backdrop blur para profundidade
- Bordas sutis com transparência

### 2. Animações
- **Float**: Animação suave de flutuação (3s)
- **Glow**: Efeito de brilho pulsante (2s)
- **Pulse**: Indicadores de status animados
- **Hover States**: Transições suaves em todos os elementos interativos

### 3. Micro-interações
- Escala em hover nos ícones
- Transições de cor suaves
- Feedback visual imediato
- Indicadores de progresso animados

## Componentes Principais

### Sidebar
- Largura: 288px (72 tailwind units)
- Logo animado com gradiente
- Ícones em containers com gradiente
- Estados ativos com glow effect
- Transições suaves entre páginas

### Header
- Altura: 80px (20 tailwind units)
- Efeito glassmorphism
- Notificações com badge animado
- Avatar com anel colorido
- Mensagem de boas-vindas personalizada

### MetricCard
- Hover effects com gradiente
- Ícones em containers coloridos
- Barra de progresso animada na base
- Indicadores de tendência (up/down)
- Sombras dinâmicas

### MetaCampaignsList
- Empty state atraente
- Ícone flutuante com animação
- Call-to-action destacado
- Métricas em zero estilizadas
- Gradiente no header

### MetaConnectButton
- Status visual claro
- Animação de loading
- Gradiente em estado ativo
- Hover effects suaves
- Badge de conexão

## Tipografia

### Hierarquia
- **H1**: 36px (text-4xl) - Títulos principais
- **H2**: 30px (text-3xl) - Subtítulos
- **H3**: 24px (text-2xl) - Seções
- **Body**: 14px (text-sm) - Texto padrão
- **Small**: 12px (text-xs) - Legendas

### Pesos
- **Bold**: 700 - Títulos e destaques
- **Semibold**: 600 - Subtítulos
- **Medium**: 500 - Labels
- **Regular**: 400 - Corpo de texto

## Espaçamento

### Sistema de Grid
- Gap padrão: 24px (gap-6)
- Padding de cards: 24px (p-6)
- Margin entre seções: 32px (space-y-8)

### Bordas
- Radius padrão: 16px (rounded-xl)
- Radius de cards: 16px (rounded-2xl)
- Radius de botões: 12px (rounded-xl)

## Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1280px
- Desktop: > 1280px
- Large Desktop: > 1536px (2xl)

### Adaptações
- Grid de métricas: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- Sidebar: Fixa em desktop
- Header: Responsivo com priorização de conteúdo

## Acessibilidade

### Contraste
- Todos os textos atendem WCAG AA
- Cores de fundo com contraste adequado
- Estados de foco visíveis

### Interatividade
- Áreas de clique adequadas (min 44x44px)
- Feedback visual em todas as ações
- Estados de loading claros
- Mensagens de erro descritivas

## Princípios de UX

### 1. Fluidez
- Transições suaves entre estados
- Animações naturais e orgânicas
- Scroll suave e responsivo

### 2. Conforto Visual
- Espaçamento generoso
- Hierarquia clara
- Cores não agressivas
- Contraste equilibrado

### 3. Feedback Imediato
- Hover states em todos os elementos
- Loading states claros
- Confirmações visuais
- Indicadores de progresso

### 4. Modernidade Tech
- Gradientes vibrantes
- Glassmorphism
- Animações suaves
- Ícones modernos

### 5. Organicidade
- Bordas arredondadas
- Animações de flutuação
- Transições naturais
- Elementos respiram

## Performance

### Otimizações
- Animações com GPU acceleration
- Transições CSS nativas
- Lazy loading de componentes
- Debounce em inputs

### Carregamento
- Skeleton screens
- Loading states
- Progressive enhancement
- Graceful degradation
