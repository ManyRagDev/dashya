import DashboardLayout from '@/components/common/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import MetaCampaignsList from '@/components/dashboard/MetaCampaignsList';
import { DollarSign, MousePointerClick, TrendingUp, Target } from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Investimento Total',
      value: 'R$ 0,00',
      icon: DollarSign,
      description: 'Aguardando dados da campanha',
      isLoading: true,
    },
    {
      title: 'CTR Médio',
      value: '0,00%',
      icon: MousePointerClick,
      description: 'Taxa de cliques',
      isLoading: true,
    },
    {
      title: 'CPC Médio',
      value: 'R$ 0,00',
      icon: Target,
      description: 'Custo por clique',
      isLoading: true,
    },
    {
      title: 'ROAS',
      value: '0,00x',
      icon: TrendingUp,
      description: 'Retorno sobre investimento',
      isLoading: true,
    },
  ];

  return (
    <DashboardLayout
      userName="Gestor de Tráfego"
      userEmail="gestor@dashya.com"
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Acompanhe o desempenho das suas campanhas em tempo real
              </p>
            </div>
          </div>
        </div>

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

export default Dashboard;
