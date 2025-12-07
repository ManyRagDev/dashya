import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MetaCampaignsList = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Facebook className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Campanhas Meta Ads</h3>
            <p className="text-sm text-muted-foreground font-normal">Gerencie suas campanhas publicitárias</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-float">
              <Facebook className="h-12 w-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center animate-pulse">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold text-foreground">
              Conecte sua conta Meta Ads
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visualize métricas em tempo real, acompanhe o desempenho das suas campanhas e tome decisões baseadas em dados.
            </p>
          </div>

          <Button 
            onClick={() => navigate('/configuracoes')}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Facebook className="w-4 h-4 mr-2" />
            Conectar agora
          </Button>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Campanhas</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">0</p>
              <p className="text-xs text-muted-foreground">Anúncios</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">0</p>
              <p className="text-xs text-muted-foreground">Conversões</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaCampaignsList;
