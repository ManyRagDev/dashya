import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow shadow-lg shadow-primary/20">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* 404 */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida. Verifique a URL ou volte para a página inicial.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25 gap-2">
              <Home className="w-4 h-4" />
              Ir para Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-muted-foreground pt-8">
          &copy; {new Date().getFullYear()} Dashya. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
