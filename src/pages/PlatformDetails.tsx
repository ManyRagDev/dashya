import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/common/DashboardLayout';
import FunnelVisualization from '@/components/charts/FunnelVisualization';
import CampaignTable from '@/components/dashboard/CampaignTable';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Facebook, Chrome, AlertCircle } from 'lucide-react';
import { FunnelStage } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { getCampaigns, transformCampaigns, getDateString, Campaign } from '@/services/metricsService';

const PlatformDetails = () => {
  const { name } = useParams<{ name: 'meta' | 'google' }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([]);

  const platform = name as 'meta' | 'google';

  // Buscar campanhas reais do Supabase
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = getDateString(0);
        const campaignMetrics = await getCampaigns(today);
        const transformedCampaigns = transformCampaigns(campaignMetrics);

        // Filtrar por plataforma
        const filteredCampaigns = transformedCampaigns.filter((c) => c.platform === platform);
        setCampaigns(filteredCampaigns);

        // Calcular funil baseado nos dados reais
        const totalImpressions = filteredCampaigns.reduce((sum, c) => sum + c.impressions, 0);
        const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.clicks, 0);
        const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);

        const funnel: FunnelStage[] = [
          { label: 'Impressões', value: totalImpressions, percentage: 100 },
          {
            label: 'Cliques',
            value: totalClicks,
            percentage: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
          },
          {
            label: 'Conversões',
            value: totalConversions,
            percentage: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
          },
          { label: 'Vendas', value: totalConversions, percentage: 100 },
        ];

        setFunnelData(funnel);
      } catch (err) {
        console.error('Erro ao buscar campanhas:', err);
        setError('Não foi possível carregar as campanhas.');
        toast({
          title: 'Erro ao carregar campanhas',
          description: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [platform, toast]);

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

        {/* Funnel */}
        {loading ? (
          <div className="border border-border/50 rounded-lg p-6">
            <Skeleton className="h-6 w-64 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <FunnelVisualization
            data={funnelData}
            title={`Funil de Conversão - ${config.name}`}
          />
        )}

        {/* Campaign Table */}
        {loading ? (
          <div className="border border-border/50 rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <CampaignTable
            campaigns={campaigns}
            title={`Campanhas ${config.name}`}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default PlatformDetails;
