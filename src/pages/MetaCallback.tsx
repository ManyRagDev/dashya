import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Processando conexão...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-center">
            Aguarde enquanto processamos sua conexão com o Meta Ads
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaCallback;
