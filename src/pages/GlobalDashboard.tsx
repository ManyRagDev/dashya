import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import MetaCampaignsList from '@/components/dashboard/MetaCampaignsList';
import { DollarSign, MousePointerClick, TrendingUp, Target, BarChart3, Users, Wallet } from 'lucide-react';
import { AIInsightCard } from '@/components/dashboard/AIInsightCard';
import { supabase } from '@/lib/supabase';

const DashboardGlobal = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    spend: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
    revenue: 0,
    leads: 0,
    cpl: 0,
    date: ''
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Busca o registro mais recente que tenha dados
      const { data: metricsData, error } = await supabase
        .from('daily_account_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (metricsData) {
        setData({
          spend: metricsData.spend || 0,
          ctr: metricsData.ctr || 0,
          cpc: metricsData.cpc || 0,
          roas: metricsData.roas || 0,
          revenue: metricsData.revenue || 0,
          leads: metricsData.leads || 0,
          cpl: metricsData.cpl || 0,
          date: metricsData.date
        });
      }
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA HÍBRIDA (E-COMMERCE vs LEADS) ---
  // Se tivermos leads, mostramos cards de Leads. Se não, cards de Venda.
  const isLeadCampaign = data.leads > 0;

  const metrics = [
    {
      title: `Investimento (${data.date ? new Date(data.date).toLocaleDateString('pt-BR') : 'Hoje'})`,
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.spend),
      icon: DollarSign,
      description: 'Total investido no dia',
      isLoading: loading,
    },
    {
      title: 'CTR Médio',
      value: `${data.ctr}%`,
      icon: MousePointerClick,
      description: 'Taxa de cliques',
      isLoading: loading,
    },
    // CARD 3: Dinâmico (Custo por Lead ou ROAS)
    {
      title: isLeadCampaign ? 'Custo por Lead (CPL)' : 'ROAS',
      value: isLeadCampaign 
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.cpl)
        : `${data.roas}x`,
      icon: isLeadCampaign ? Users : TrendingUp,
      description: isLeadCampaign ? 'Custo para adquirir um contato' : 'Retorno sobre investimento',
      isLoading: loading,
    },
    // CARD 4: Dinâmico (Total Leads ou Receita Total)
    {
      title: isLeadCampaign ? 'Total de Leads' : 'Receita Total',
      value: isLeadCampaign 
        ? data.leads.toString()
        : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.revenue),
      icon: isLeadCampaign ? Target : Wallet,
      description: isLeadCampaign ? 'Cadastros realizados' : 'Valor total vendido',
      isLoading: loading,
    },
  ];

  return (
    <DashboardLayout
      userName="Gestor de Tráfego"
      userEmail="gestor@dashya.com"
    >
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Sala de Comando</h1>
              <p className="text-slate-400 mt-1 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Visão tática das suas campanhas em tempo real
              </p>
            </div>
          </div>
        </div>

        <AIInsightCard />

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              description={metric.description}
              isLoading={metric.isLoading}
            />
          ))}
        </div>

        <MetaCampaignsList />
      </div>
    </DashboardLayout>
  );
};

export default DashboardGlobal;