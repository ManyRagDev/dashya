import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector';
import SpendRevenueChart from '@/components/charts/SpendRevenueChart';
import PlatformDistributionChart from '@/components/charts/PlatformDistributionChart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, AlertCircle } from 'lucide-react';
import { Metric, ChartDataPoint, PlatformDistribution } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { getMetricsWithComparison } from '@/services/metricsService';

const GlobalDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [platformDistribution, setPlatformDistribution] = useState<PlatformDistribution[]>([]);
  const [selectedDays, setSelectedDays] = useState(7);

  // Buscar dados reais do Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMetricsWithComparison(selectedDays);

        // Transformar dados em métricas para os KPI Cards
        const kpiMetrics: Metric[] = [
          {
            label: 'Gasto Total',
            value: `R$ ${data.globalMetrics.totalSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            delta: Math.abs(data.deltas.spendDelta),
            deltaType: data.deltas.spendDelta > 0 ? 'increase' : data.deltas.spendDelta < 0 ? 'decrease' : 'neutral',
            icon: 'DollarSign',
          },
          {
            label: 'Receita Total',
            value: `R$ ${data.globalMetrics.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            delta: Math.abs(data.deltas.revenueDelta),
            deltaType: data.deltas.revenueDelta > 0 ? 'increase' : data.deltas.revenueDelta < 0 ? 'decrease' : 'neutral',
            icon: 'TrendingUp',
          },
          {
            label: 'ROAS Médio',
            value: `${data.globalMetrics.averageRoas.toFixed(2)}x`,
            delta: Math.abs(data.deltas.roasDelta),
            deltaType: data.deltas.roasDelta > 0 ? 'increase' : data.deltas.roasDelta < 0 ? 'decrease' : 'neutral',
            icon: 'Target',
          },
          {
            label: 'CPA Médio',
            value: `R$ ${data.globalMetrics.averageCpa.toFixed(2)}`,
            delta: Math.abs(data.deltas.cpaDelta),
            deltaType: data.deltas.cpaDelta < 0 ? 'increase' : data.deltas.cpaDelta > 0 ? 'decrease' : 'neutral', // CPA menor é melhor
            icon: 'MousePointerClick',
          },
        ];

        setMetrics(kpiMetrics);
        setChartData(data.chartData);

        // Calcular distribuição por plataforma (mock por enquanto, já que não temos dados separados)
        const totalSpend = data.globalMetrics.totalSpend;
        setPlatformDistribution([
          { platform: 'Meta Ads', value: totalSpend * 0.6, color: '#9333ea' },
          { platform: 'Google Ads', value: totalSpend * 0.4, color: '#06b6d4' },
        ]);

      } catch (err) {
        console.error('Erro ao carregar métricas:', err);
        setError('Não foi possível carregar os dados. Tente novamente.');
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDays, toast]);

  const handleExportPDF = () => {
    toast({
      title: 'Exportando PDF',
      description: 'Seu relatório está sendo gerado...',
    });
  };

  return (
    <DashboardLayout
      userName="Gestor de Tráfego"
      userEmail="gestor@dashya.com"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard Global</h1>
                <p className="text-muted-foreground mt-1">
                  Visão consolidada de todas as plataformas
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DateRangeSelector />
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25"
              disabled={loading}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div>
              <p className="font-medium text-destructive">Erro ao carregar dados</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-border/50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-xl" />
                  </div>
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </>
          ) : (
            metrics.map((metric, index) => (
              <KPICard key={index} metric={metric} />
            ))
          )}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
          <div className="2xl:col-span-2">
            {loading ? (
              <div className="border border-border/50 rounded-lg p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : (
              <SpendRevenueChart data={chartData} />
            )}
          </div>
          <div className="2xl:col-span-1">
            {loading ? (
              <div className="border border-border/50 rounded-lg p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-[300px] w-full rounded-full" />
              </div>
            ) : (
              <PlatformDistributionChart data={platformDistribution} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GlobalDashboard;
