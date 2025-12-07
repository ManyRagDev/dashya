import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Palette, Users } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Palette,
      title: '100% White Label',
      description: 'Personalize cores, logo e domínio. Sua marca em destaque.',
    },
    {
      icon: Zap,
      title: 'Dados em Tempo Real',
      description: 'Métricas atualizadas automaticamente. Decisões mais rápidas.',
    },
    {
      icon: Users,
      title: 'Multicliente',
      description: 'Gerencie múltiplos clientes em um único painel centralizado.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Transparente */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Dashya</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-primary/50 hover:bg-primary/10"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              A Verdadeira Sala de Comando da{' '}
              <span className="gradient-text">Sua Agência</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Centralize Meta e Google Ads em um dashboard White-Label premium que seus clientes vão amar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl shadow-primary/25 text-lg px-8 h-14"
              >
                <Zap className="w-5 h-5 mr-2" />
                Acessar Plataforma
              </Button>
            </div>

            {/* Dashboard Mockup com Glow */}
            <div className="relative mt-16">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-3xl animate-glow" />
              <div className="relative glass-card p-8 rounded-3xl border-2 border-primary/20">
                <div className="aspect-video bg-gradient-to-br from-background via-card to-background rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-muted-foreground">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para gerenciar campanhas com excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 p-8 bg-card/50 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative space-y-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">
                2025 Dashya
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
