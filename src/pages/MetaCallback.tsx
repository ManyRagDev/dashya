import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Code2, Zap, ArrowRight } from 'lucide-react';

const MetaCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      console.error('Erro no OAuth:', error, errorDescription);
      setStatus('error');
      setMessage(errorDescription || 'Erro ao conectar com o Meta Ads. Por favor, tente novamente.');
      return;
    }

    if (code) {
      // TODO: Aqui você implementará o backend
      // 1. Enviar código para seu servidor
      // 2. Servidor troca código por access_token (Meta API)
      // 3. Salvar token no Supabase
      // 4. Buscar informações da conta

      setStatus('success');
      setMessage(`Código OAuth recebido! Backend ainda não implementado.`);
    }
  }, [searchParams]);

  // Auto-redirect após 5 segundos em caso de sucesso
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        navigate('/settings');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <Card className="w-full max-w-lg relative border-border/50 shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center animate-glow shadow-lg ${
              status === 'error'
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : status === 'success'
                ? 'bg-gradient-to-br from-green-500 to-green-600'
                : 'bg-gradient-to-br from-primary to-secondary'
            }`}>
              {status === 'error' ? (
                <AlertCircle className="w-8 h-8 text-white" />
              ) : status === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-white" />
              ) : (
                <Zap className="w-8 h-8 text-white" />
              )}
            </div>
          </div>

          <CardTitle className="text-2xl text-center text-foreground">
            {status === 'error' && 'Erro na Conexão'}
            {status === 'success' && 'OAuth Recebido!'}
            {status === 'loading' && 'Processando...'}
          </CardTitle>

          {status === 'success' && (
            <CardDescription className="text-center">
              Integração em desenvolvimento
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Message */}
          <div className={`p-4 rounded-lg border ${
            status === 'error'
              ? 'bg-red-500/10 border-red-500/20'
              : status === 'success'
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-primary/10 border-primary/20'
          }`}>
            <p className="text-sm text-center text-foreground">
              {message || 'Aguarde enquanto processamos sua conexão...'}
            </p>
          </div>

          {/* Development Info */}
          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                <Code2 className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Próximos passos de implementação:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Criar endpoint backend para processar OAuth</li>
                    <li>Trocar código por access_token (Meta API)</li>
                    <li>Salvar token no Supabase (tabela oauth_tokens)</li>
                    <li>Buscar dados das contas e campanhas</li>
                    <li>Atualizar dashboard com dados reais</li>
                  </ul>
                </div>
              </div>

              {/* Code Display */}
              {searchParams.get('code') && (
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Código OAuth recebido:</p>
                  <code className="text-xs font-mono text-foreground break-all">
                    {searchParams.get('code')?.substring(0, 80)}...
                  </code>
                </div>
              )}

              {/* Auto-redirect info */}
              <p className="text-xs text-center text-muted-foreground">
                Você será redirecionado para as configurações em 5 segundos...
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link to="/settings" className="w-full">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25">
                Voltar para Configurações
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            {status === 'error' && (
              <Button
                variant="outline"
                onClick={() => window.location.href = '/settings'}
                className="w-full"
              >
                Tentar Novamente
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaCallback;
