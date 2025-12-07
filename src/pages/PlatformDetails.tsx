import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/common/DashboardLayout';
import FunnelVisualization from '@/components/charts/FunnelVisualization';
import CampaignTable from '@/components/dashboard/CampaignTable';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector';
import { Button } from '@/components/ui/button';
import { Download, Facebook, Chrome } from 'lucide-react';
import { 
  getCampaignsByPlatform, 
  getFunnelByPlatform 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const PlatformDetails = () => {
  const { name } = useParams<{ name: 'meta' | 'google' }>();
  const { toast } = useToast();

  const platform = name as 'meta' | 'google';
  const campaigns = getCampaignsByPlatform(platform);
  const funnelData = getFunnelByPlatform(platform);

  const platformConfig = {
    meta: {
      name: 'Meta Ads',
      icon: Facebook,
      color: 'from-primary to-secondary',
    },
    google: {
      name: 'Google Ads',
      icon: Chrome,
      color: 'from-secondary to-primary',
    },
  };

  const config = platformConfig[platform];
  const Icon = config.icon;

  const handleExportPDF = () => {
    toast({
      title: 'Exportando PDF',
      description: `Relatório de ${config.name} está sendo gerado...`,
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{config.name}</h1>
                <p className="text-muted-foreground mt-1">
                  Análise detalhada de campanhas
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

        {/* Funnel */}
        <FunnelVisualization 
          data={funnelData} 
          title={`Funil de Conversão - ${config.name}`}
        />

        {/* Campaign Table */}
        <CampaignTable 
          campaigns={campaigns}
          title={`Campanhas ${config.name}`}
        />
      </div>
    </DashboardLayout>
  );
};

export default PlatformDetails;
