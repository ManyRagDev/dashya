import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Zap } from 'lucide-react';

const MetaCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Erro no OAuth:', error);
      setTimeout(() => {
        navigate('/configuracoes');
      }, 2000);
      return;
    }

    if (code) {
      console.log('Código OAuth recebido:', code);
      
      setTimeout(() => {
        navigate('/configuracoes');
      }, 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <Card className="w-full max-w-md relative border-border/50 shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-foreground">
            Processando conexão
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/20 blur-xl animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Aguarde enquanto processamos sua conexão com o Meta Ads
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaCallback;
