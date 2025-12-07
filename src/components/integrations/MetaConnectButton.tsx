import { Button } from '@/components/ui/button';
import { Facebook } from 'lucide-react';
import { iniciarOAuthMetaAds } from '@/lib/oauth';

interface MetaConnectButtonProps {
  isConnected?: boolean;
}

const MetaConnectButton = ({ isConnected = false }: MetaConnectButtonProps) => {
  const handleConnect = () => {
    iniciarOAuthMetaAds();
  };

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Facebook className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Meta Ads</h3>
          <p className="text-sm text-muted-foreground">
            {isConnected ? 'Conectado' : 'Não conectado'}
          </p>
        </div>
      </div>
      <Button 
        onClick={handleConnect}
        variant={isConnected ? 'outline' : 'default'}
        disabled={isConnected}
      >
        {isConnected ? 'Conectado' : 'Conectar Meta Ads'}
      </Button>
    </div>
  );
};

export default MetaConnectButton;
