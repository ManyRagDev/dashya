import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Table } from 'lucide-react';

interface CampaignTableProps {
  campaigns: Campaign[];
  title?: string;
}

const CampaignTable = ({ campaigns, title = 'Campanhas' }: CampaignTableProps) => {
  const [campaignStates, setCampaignStates] = useState<Record<string, boolean>>(
    campaigns.reduce((acc, campaign) => ({
      ...acc,
      [campaign.id]: campaign.status === 'active'
    }), {})
  );

  const maxSpend = Math.max(...campaigns.map(c => c.spend));
  const maxROAS = Math.max(...campaigns.map(c => c.roas));

  const handleToggle = (campaignId: string) => {
    setCampaignStates(prev => ({
      ...prev,
      [campaignId]: !prev[campaignId]
    }));
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      active: 'bg-secondary/20 text-secondary',
      paused: 'bg-muted text-muted-foreground',
      draft: 'bg-primary/20 text-primary',
    };

    const labels = {
      active: 'Ativa',
      paused: 'Pausada',
      draft: 'Rascunho',
    };

    return (
      <Badge className={cn('font-medium', variants[status])}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Table className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground font-normal">Desempenho detalhado</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Campanha</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Gasto</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ROAS</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Receita</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr 
                  key={campaign.id}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="p-4">
                    <Switch 
                      checked={campaignStates[campaign.id]}
                      onCheckedChange={() => handleToggle(campaign.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{campaign.name}</p>
                      {getStatusBadge(campaign.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">
                        R$ {campaign.spend.toLocaleString('pt-BR')}
                      </p>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                          style={{ width: `${(campaign.spend / maxSpend) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">
                        {campaign.roas.toFixed(2)}x
                      </p>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full transition-all duration-500"
                          style={{ width: `${(campaign.roas / maxROAS) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-secondary">
                      R$ {campaign.revenue.toLocaleString('pt-BR')}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignTable;
