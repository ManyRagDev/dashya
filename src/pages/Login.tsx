import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Zap, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', credentials);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <Card className="w-full max-w-md relative border-border/50 shadow-2xl">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Dashya</h1>
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="pl-11 h-12"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-11 h-12"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25 text-base font-semibold"
            >
              Entrar no Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
