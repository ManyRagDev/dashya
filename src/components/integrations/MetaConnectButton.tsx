import { Button } from '@/components/ui/button';
import { Facebook, CheckCircle2, Loader2 } from 'lucide-react';
import { iniciarOAuthMetaAds } from '@/lib/oauth';
import { useState } from 'react';

interface MetaConnectButtonProps {
  isConnected?: boolean;
}

const MetaConnectButton = ({ isConnected = false }: MetaConnectButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    iniciarOAuthMetaAds();
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Facebook className="h-7 w-7 text-primary" />
            </div>
            {isConnected && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center ring-2 ring-background">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Meta Ads</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-secondary animate-pulse' : 'bg-muted-foreground'}`} />
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'Conta conectada' : 'Aguardando conexão'}
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleConnect}
          disabled={isConnected || isConnecting}
          className={
            isConnected 
              ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' 
              : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25'
          }
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Conectando...
            </>
          ) : isConnected ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Conectado
            </>
          ) : (
            <>
              <Facebook className="w-4 h-4 mr-2" />
              Conectar Meta Ads
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MetaConnectButton;
