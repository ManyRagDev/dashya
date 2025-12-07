import { useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Link2, Palette, Save, Facebook, Chrome } from 'lucide-react';
import { mockIntegrations } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [whiteLabelConfig, setWhiteLabelConfig] = useState({
    agencyLogo: '',
    primaryColor: '#9333ea',
  });

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, isActive: !integration.isActive }
          : integration
      )
    );
  };

  const handleUpdateAccountId = (id: string, accountId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, accountId }
          : integration
      )
    );
  };

  const handleSaveWhiteLabel = () => {
    toast({
      title: 'Configurações salvas',
      description: 'Suas configurações de white-label foram atualizadas.',
    });
  };

  const getIntegrationIcon = (icon: string) => {
    const icons = {
      Facebook,
      Chrome,
    };
    return icons[icon as keyof typeof icons] || Facebook;
  };

  return (
    <DashboardLayout
      userName="Gestor de Tráfego"
      userEmail="gestor@dashya.com"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie integrações e personalização
              </p>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Integrações</h3>
                <p className="text-sm text-muted-foreground font-normal">Conecte suas contas de anúncios</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {integrations.map((integration) => {
              const Icon = getIntegrationIcon(integration.icon);
              
              return (
                <div 
                  key={integration.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-foreground">{integration.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${integration.isActive ? 'bg-secondary animate-pulse' : 'bg-muted-foreground'}`} />
                          <p className="text-sm text-muted-foreground">
                            {integration.isActive ? 'Conectado' : 'Desconectado'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="space-y-2 flex-1 md:w-64">
                        <Label htmlFor={`account-${integration.id}`} className="text-xs">
                          ID da Conta
                        </Label>
                        <Input
                          id={`account-${integration.id}`}
                          value={integration.accountId || ''}
                          onChange={(e) => handleUpdateAccountId(integration.id, e.target.value)}
                          placeholder="Digite o ID da conta"
                          className="h-10"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 pt-6">
                        <Switch 
                          checked={integration.isActive}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* White Label */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">White Label</h3>
                <p className="text-sm text-muted-foreground font-normal">Personalize a aparência da plataforma</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="agencyLogo" className="text-sm font-medium">
                Logo da Agência (URL)
              </Label>
              <Input
                id="agencyLogo"
                value={whiteLabelConfig.agencyLogo}
                onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, agencyLogo: e.target.value })}
                placeholder="https://exemplo.com/logo.png"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor" className="text-sm font-medium">
                Cor Primária
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="primaryColor"
                  type="color"
                  value={whiteLabelConfig.primaryColor}
                  onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, primaryColor: e.target.value })}
                  className="h-11 w-20 cursor-pointer"
                />
                <Input
                  value={whiteLabelConfig.primaryColor}
                  onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, primaryColor: e.target.value })}
                  placeholder="#9333ea"
                  className="h-11 flex-1"
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveWhiteLabel}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
