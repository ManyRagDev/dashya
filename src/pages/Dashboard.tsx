import DashboardLayout from '@/components/common/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import MetaCampaignsList from '@/components/dashboard/MetaCampaignsList';
import { DollarSign, MousePointerClick, TrendingUp, Target } from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Investimento Total',
      value: 'Aguardando conexão',
      icon: DollarSign,
      description: 'Conecte sua conta para visualizar',
    },
    {
      title: 'CTR Médio',
      value: 'Aguardando conexão',
      icon: MousePointerClick,
      description: 'Conecte sua conta para visualizar',
    },
    {
      title: 'CPC Médio',
      value: 'Aguardando conexão',
      icon: Target,
      description: 'Conecte sua conta para visualizar',
    },
    {
      title: 'ROAS',
      value: 'Aguardando conexão',
      icon: TrendingUp,
      description: 'Conecte sua conta para visualizar',
    },
  ];

  return (
    <DashboardLayout
      userName="Gestor de Tráfego"
      userEmail="gestor@dashya.com"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie suas campanhas de tráfego pago
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              description={metric.description}
            />
          ))}
        </div>

        <MetaCampaignsList />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
