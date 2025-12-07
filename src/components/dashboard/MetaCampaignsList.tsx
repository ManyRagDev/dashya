import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook } from 'lucide-react';

const MetaCampaignsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Facebook className="h-5 w-5 text-primary" />
          Campanhas Meta Ads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Facebook className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma campanha encontrada
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Conecte sua conta para visualizar campanhas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaCampaignsList;
