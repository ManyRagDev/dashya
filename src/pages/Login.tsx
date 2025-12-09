import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Zap, Mail, Lock, AlertCircle } from 'lucide-react'; // Adicionei AlertCircle para erro
import { supabase } from '../lib/supabase'; // <--- Importante: Ajuste o caminho se necessário

const Login = () => {
  const navigate = useNavigate();
  
  // Estados para gerenciar a lógica real
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Limpa erros anteriores

    try {
      // --- A MÁGICA DO SUPABASE AQUI ---
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) {
        throw authError;
      }

      // Redireciona para o Dashboard após login bem-sucedido
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Erro de login:', err.message);
      // Mensagem amigável para o usuário
      setError('Falha ao entrar. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects mantidos */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <Card className="w-full max-w-md relative border-border/50 shadow-2xl backdrop-blur-sm bg-background/80">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow shadow-lg shadow-primary/20">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Dashya</h1>
            <p className="text-sm text-muted-foreground">Traffic Analytics Platform</p>
          </div>
          <CardTitle className="text-2xl text-center text-foreground">
            Bem-vindo de volta
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Entre com suas credenciais para acessar o dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Exibição de Erro (Só aparece se houver erro) */}
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  disabled={loading} // Desabilita durante carregamento
                  placeholder="seu@email.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="pl-11 h-12 transition-all border-border/50 focus:border-primary/50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  disabled={loading} // Desabilita durante carregamento
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-11 h-12 transition-all border-border/50 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} // Desabilita para evitar clique duplo
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Validando...
                </span>
              ) : (
                'Entrar no Dashboard'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;