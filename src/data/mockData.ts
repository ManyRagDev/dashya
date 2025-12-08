// Interfaces TypeScript para todos os tipos de dados

export interface Client {
  id: string;
  name: string;
  logo?: string;
  primaryColor?: string;
}

export interface Metric {
  label: string;
  value: string;
  delta: number;
  deltaType: 'increase' | 'decrease' | 'neutral';
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  spend: number;
  revenue: number;
}

export interface PlatformDistribution {
  platform: string;
  value: number;
  color: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'meta' | 'google';
  status: 'active' | 'paused' | 'draft';
  spend: number;
  revenue: number;
  roas: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
}

export interface FunnelStage {
  label: string;
  value: number;
  percentage: number;
}

export interface Integration {
  id: string;
  name: string;
  platform: 'meta' | 'google' | 'tiktok' | 'linkedin' | 'pinterest';
  isActive: boolean;
  accountId?: string;
  icon: string;
  comingSoon?: boolean;
}

// Mock Data - Clientes
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Agência Digital Pro',
    logo: undefined,
    primaryColor: '#9333ea',
  },
  {
    id: '2',
    name: 'E-commerce Fashion',
    logo: undefined,
    primaryColor: '#06b6d4',
  },
  {
    id: '3',
    name: 'Tech Startup Inc',
    logo: undefined,
    primaryColor: '#f59e0b',
  },
];

// Mock Data - Métricas Globais
export const mockGlobalMetrics: Metric[] = [
  {
    label: 'Gasto Total',
    value: 'R$ 45.280,00',
    delta: 12.5,
    deltaType: 'increase',
    icon: 'DollarSign',
  },
  {
    label: 'Receita Total',
    value: 'R$ 182.450,00',
    delta: 18.2,
    deltaType: 'increase',
    icon: 'TrendingUp',
  },
  {
    label: 'ROAS Combinado',
    value: '4.03x',
    delta: 5.8,
    deltaType: 'increase',
    icon: 'Target',
  },
  {
    label: 'CPA Médio',
    value: 'R$ 28,50',
    delta: -8.3,
    deltaType: 'decrease',
    icon: 'MousePointerClick',
  },
];

// Mock Data - Dados do Gráfico de Linha (últimos 7 dias)
export const mockChartData: ChartDataPoint[] = [
  { date: '01/12', spend: 5200, revenue: 21000 },
  { date: '02/12', spend: 6100, revenue: 24500 },
  { date: '03/12', spend: 5800, revenue: 23200 },
  { date: '04/12', spend: 6500, revenue: 26800 },
  { date: '05/12', spend: 7200, revenue: 29100 },
  { date: '06/12', spend: 6900, revenue: 27800 },
  { date: '07/12', spend: 7580, revenue: 30050 },
];

// Mock Data - Distribuição de Plataforma
export const mockPlatformDistribution: PlatformDistribution[] = [
  { platform: 'Meta Ads', value: 28500, color: '#9333ea' },
  { platform: 'Google Ads', value: 16780, color: '#06b6d4' },
];

// Mock Data - Campanhas Meta Ads
export const mockMetaCampaigns: Campaign[] = [
  {
    id: 'meta-1',
    name: 'Black Friday - Conversão',
    platform: 'meta',
    status: 'active',
    spend: 8500,
    revenue: 34200,
    roas: 4.02,
    impressions: 245000,
    clicks: 12250,
    conversions: 856,
    ctr: 5.0,
    cpc: 0.69,
    cpa: 9.93,
  },
  {
    id: 'meta-2',
    name: 'Remarketing - Carrinho Abandonado',
    platform: 'meta',
    status: 'active',
    spend: 5200,
    revenue: 22100,
    roas: 4.25,
    impressions: 180000,
    clicks: 9000,
    conversions: 620,
    ctr: 5.0,
    cpc: 0.58,
    cpa: 8.39,
  },
  {
    id: 'meta-3',
    name: 'Prospecção - Lookalike',
    platform: 'meta',
    status: 'active',
    spend: 6800,
    revenue: 25500,
    roas: 3.75,
    impressions: 320000,
    clicks: 11200,
    conversions: 680,
    ctr: 3.5,
    cpc: 0.61,
    cpa: 10.0,
  },
  {
    id: 'meta-4',
    name: 'Awareness - Marca',
    platform: 'meta',
    status: 'paused',
    spend: 4200,
    revenue: 12600,
    roas: 3.0,
    impressions: 450000,
    clicks: 13500,
    conversions: 420,
    ctr: 3.0,
    cpc: 0.31,
    cpa: 10.0,
  },
  {
    id: 'meta-5',
    name: 'Teste - Criativos Novos',
    platform: 'meta',
    status: 'draft',
    spend: 800,
    revenue: 2400,
    roas: 3.0,
    impressions: 25000,
    clicks: 750,
    conversions: 80,
    ctr: 3.0,
    cpc: 1.07,
    cpa: 10.0,
  },
];

// Mock Data - Campanhas Google Ads
export const mockGoogleCampaigns: Campaign[] = [
  {
    id: 'google-1',
    name: 'Search - Marca',
    platform: 'google',
    status: 'active',
    spend: 5600,
    revenue: 28000,
    roas: 5.0,
    impressions: 125000,
    clicks: 6250,
    conversions: 560,
    ctr: 5.0,
    cpc: 0.90,
    cpa: 10.0,
  },
  {
    id: 'google-2',
    name: 'Shopping - Produtos',
    platform: 'google',
    status: 'active',
    spend: 7200,
    revenue: 25200,
    roas: 3.5,
    impressions: 280000,
    clicks: 8400,
    conversions: 720,
    ctr: 3.0,
    cpc: 0.86,
    cpa: 10.0,
  },
  {
    id: 'google-3',
    name: 'Display - Remarketing',
    platform: 'google',
    status: 'active',
    spend: 3980,
    revenue: 15920,
    roas: 4.0,
    impressions: 520000,
    clicks: 10400,
    conversions: 398,
    ctr: 2.0,
    cpc: 0.38,
    cpa: 10.0,
  },
];

// Mock Data - Funil Meta Ads
export const mockMetaFunnel: FunnelStage[] = [
  { label: 'Impressões', value: 1220000, percentage: 100 },
  { label: 'Cliques', value: 46700, percentage: 3.83 },
  { label: 'Conversões', value: 2656, percentage: 5.69 },
  { label: 'Vendas', value: 2656, percentage: 100 },
];

// Mock Data - Funil Google Ads
export const mockGoogleFunnel: FunnelStage[] = [
  { label: 'Impressões', value: 925000, percentage: 100 },
  { label: 'Cliques', value: 25050, percentage: 2.71 },
  { label: 'Conversões', value: 1678, percentage: 6.70 },
  { label: 'Vendas', value: 1678, percentage: 100 },
];

// Mock Data - Integrações
export const mockIntegrations: Integration[] = [
  {
    id: 'meta',
    name: 'Meta Ads',
    platform: 'meta',
    isActive: true,
    accountId: 'act_123456789',
    icon: 'Facebook',
    comingSoon: false,
  },
  {
    id: 'google',
    name: 'Google Ads',
    platform: 'google',
    isActive: true,
    accountId: '123-456-7890',
    icon: 'Chrome',
    comingSoon: false,
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    platform: 'tiktok',
    isActive: false,
    accountId: '',
    icon: 'Music',
    comingSoon: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    platform: 'linkedin',
    isActive: false,
    accountId: '',
    icon: 'Linkedin',
    comingSoon: true,
  },
  {
    id: 'pinterest',
    name: 'Pinterest Ads',
    platform: 'pinterest',
    isActive: false,
    accountId: '',
    icon: 'Pin',
    comingSoon: true,
  },
];

// Funções auxiliares para obter dados
export const getCampaignsByPlatform = (platform: 'meta' | 'google'): Campaign[] => {
  return platform === 'meta' ? mockMetaCampaigns : mockGoogleCampaigns;
};

export const getFunnelByPlatform = (platform: 'meta' | 'google'): FunnelStage[] => {
  return platform === 'meta' ? mockMetaFunnel : mockGoogleFunnel;
};

export const getAllCampaigns = (): Campaign[] => {
  return [...mockMetaCampaigns, ...mockGoogleCampaigns];
};
