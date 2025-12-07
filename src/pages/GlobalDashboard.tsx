import DashboardLayout from '@/components/common/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector';
import SpendRevenueChart from '@/components/charts/SpendRevenueChart';
import PlatformDistributionChart from '@/components/charts/PlatformDistributionChart';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { 
  mockGlobalMetrics, 
  mockChartData, 
  mockPlatformDistribution 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const GlobalDashboard = () => {
  const { toast } = useToast();

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
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {mockGlobalMetrics.map((metric, index) => (
            <KPICard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
          <div className="2xl:col-span-2">
            <SpendRevenueChart data={mockChartData} />
          </div>
          <div className="2xl:col-span-1">
            <PlatformDistributionChart data={mockPlatformDistribution} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GlobalDashboard;
