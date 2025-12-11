import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import MetaCampaignsList from '@/components/dashboard/MetaCampaignsList';
import { DollarSign, MousePointerClick, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { AIInsightCard } from '@/components/dashboard/AIInsightCard';
import { supabase } from '@/lib/supabase';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    spend: 0,
    ctr: 0,
    cpc: 0,
    roas: 0
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Busca o registro mais recente (hoje ou ontem)
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
          roas: metricsData.roas || 0
        });
      }
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configuração dos Cards com dados REAIS
  const metrics = [
    {
      title: 'Investimento (Ontem)',
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
    {
      title: 'CPC Médio',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.cpc),
      icon: Target,
      description: 'Custo por clique',
      isLoading: loading,
    },
    {
      title: 'ROAS',
      value: `${data.roas}x`,
      icon: TrendingUp,
      description: 'Retorno sobre investimento',
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

        {/* O Cérebro da IA (Que já está funcionando) */}
        <AIInsightCard />

        {/* Os Cards de Métricas (Agora Conectados) */}
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

        {/* Lista de Campanhas */}
        <MetaCampaignsList />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;