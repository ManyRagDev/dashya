import { supabase } from '@/lib/supabase';

// Interfaces para dados do Supabase
export interface DailyAccountMetric {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  ctr: number;
  roas: number;
}

export interface CampaignMetric {
  campaign_id: string;
  campaign_name: string;
  date: string;
  spend: number;
  roas: number;
  ctr: number;
  status: string;
}

// Interfaces para dados transformados (compatível com mock)
export interface ChartDataPoint {
  date: string;
  spend: number;
  revenue: number;
}

export interface GlobalMetrics {
  totalSpend: number;
  totalRevenue: number;
  averageRoas: number;
  averageCpa: number;
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

/**
 * Busca métricas diárias do Supabase
 * @param startDate Data inicial no formato 'YYYY-MM-DD'
 * @param endDate Data final no formato 'YYYY-MM-DD'
 */
export const getDailyMetrics = async (
  startDate: string,
  endDate: string
): Promise<DailyAccountMetric[]> => {
  const { data, error } = await supabase
    .from('daily_account_metrics')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) {
    console.error('Erro ao buscar métricas diárias:', error);
    throw new Error('Falha ao carregar métricas diárias');
  }

  return data || [];
};

/**
 * Busca campanhas do Supabase
 * @param date Data específica no formato 'YYYY-MM-DD' (opcional)
 */
export const getCampaigns = async (date?: string): Promise<CampaignMetric[]> => {
  let query = supabase
    .from('campaign_metrics')
    .select('*')
    .order('spend', { ascending: false });

  if (date) {
    query = query.eq('date', date);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar campanhas:', error);
    throw new Error('Falha ao carregar campanhas');
  }

  return data || [];
};

/**
 * Transforma métricas diárias em dados para gráfico
 */
export const transformToChartData = (metrics: DailyAccountMetric[]): ChartDataPoint[] => {
  return metrics.map((metric) => ({
    date: formatDateToBR(metric.date),
    spend: metric.spend,
    revenue: metric.spend * metric.roas, // Calcula receita a partir do ROAS
  }));
};

/**
 * Calcula métricas globais a partir dos dados diários
 */
export const calculateGlobalMetrics = (metrics: DailyAccountMetric[]): GlobalMetrics => {
  if (metrics.length === 0) {
    return {
      totalSpend: 0,
      totalRevenue: 0,
      averageRoas: 0,
      averageCpa: 0,
    };
  }

  const totalSpend = metrics.reduce((sum, m) => sum + m.spend, 0);
  const totalRevenue = metrics.reduce((sum, m) => sum + (m.spend * m.roas), 0);
  const averageRoas = totalRevenue / totalSpend;

  // CPA = Total Spend / Total Conversions
  // Como não temos conversões diretas, vamos estimar baseado no CTR e ROAS
  const totalClicks = metrics.reduce((sum, m) => sum + m.clicks, 0);
  const estimatedConversions = totalClicks * 0.05; // Estimativa: 5% de conversão
  const averageCpa = estimatedConversions > 0 ? totalSpend / estimatedConversions : 0;

  return {
    totalSpend,
    totalRevenue,
    averageRoas,
    averageCpa,
  };
};

/**
 * Calcula delta percentual comparando período atual com período anterior
 */
export const calculateDelta = (
  currentMetrics: DailyAccountMetric[],
  previousMetrics: DailyAccountMetric[]
): {
  spendDelta: number;
  revenueDelta: number;
  roasDelta: number;
  cpaDelta: number;
} => {
  const current = calculateGlobalMetrics(currentMetrics);
  const previous = calculateGlobalMetrics(previousMetrics);

  const calculatePercentChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return {
    spendDelta: calculatePercentChange(current.totalSpend, previous.totalSpend),
    revenueDelta: calculatePercentChange(current.totalRevenue, previous.totalRevenue),
    roasDelta: calculatePercentChange(current.averageRoas, previous.averageRoas),
    cpaDelta: calculatePercentChange(current.averageCpa, previous.averageCpa),
  };
};

/**
 * Transforma campanhas do Supabase em formato do frontend
 */
export const transformCampaigns = (campaigns: CampaignMetric[]): Campaign[] => {
  return campaigns.map((campaign) => {
    const revenue = campaign.spend * campaign.roas;
    const clicks = Math.round(campaign.spend * 10); // Estimativa
    const impressions = Math.round(clicks / (campaign.ctr / 100));
    const conversions = Math.round(revenue / 50); // Estimativa: ticket médio R$50

    return {
      id: campaign.campaign_id,
      name: campaign.campaign_name,
      platform: campaign.campaign_name.toLowerCase().includes('google') ? 'google' : 'meta',
      status: campaign.status.toLowerCase() as 'active' | 'paused' | 'draft',
      spend: campaign.spend,
      revenue,
      roas: campaign.roas,
      impressions,
      clicks,
      conversions,
      ctr: campaign.ctr,
      cpc: clicks > 0 ? campaign.spend / clicks : 0,
      cpa: conversions > 0 ? campaign.spend / conversions : 0,
    };
  });
};

/**
 * Formata data de YYYY-MM-DD para DD/MM
 */
const formatDateToBR = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}`;
};

/**
 * Gera string de data no formato YYYY-MM-DD
 */
export const getDateString = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

/**
 * Busca métricas completas para um período
 * Retorna dados atuais e anteriores para cálculo de delta
 */
export const getMetricsWithComparison = async (days: number = 7) => {
  const endDate = getDateString(0);
  const startDate = getDateString(days - 1);

  // Período anterior (mesmo número de dias)
  const previousEndDate = getDateString(days);
  const previousStartDate = getDateString((days * 2) - 1);

  const [currentMetrics, previousMetrics] = await Promise.all([
    getDailyMetrics(startDate, endDate),
    getDailyMetrics(previousStartDate, previousEndDate),
  ]);

  return {
    current: currentMetrics,
    previous: previousMetrics,
    chartData: transformToChartData(currentMetrics),
    globalMetrics: calculateGlobalMetrics(currentMetrics),
    deltas: calculateDelta(currentMetrics, previousMetrics),
  };
};

export interface Insight {
  date: string;
  insight_text: string;
  detailed_reason: string;
  sentiment: 'positive' | 'warning' | 'critical';
  confidence_score: number;
}

export const getLatestInsight = async (): Promise<Insight | null> => {
  // Busca o insight mais recente (hoje ou ontem)
  const { data, error } = await supabase
    .from('daily_insights')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Erro ao buscar insight:', error);
    return null;
  }
  return data;
};