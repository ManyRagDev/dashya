import DashboardLayout from '@/components/common/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import MetaConnectButton from '@/components/integrations/MetaConnectButton';
import { useState } from 'react';
import { User, Link2, Save } from 'lucide-react';

const Configuracoes = () => {
  const [profile, setProfile] = useState({
    name: 'Gestor de Tráfego',
    email: 'gestor@dashya.com',
    photoUrl: '',
  });

  const handleSaveProfile = () => {
    // TODO: Implementar salvamento real do perfil
  };

  return (
    <DashboardLayout
      userName={profile.name}
      userEmail={profile.email}
      userAvatar={profile.photoUrl}
    >
      <div className="space-y-8 max-w-5xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seu perfil e integrações de plataformas
              </p>
            </div>
          </div>
        </div>

        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Perfil do Usuário</h3>
                <p className="text-sm text-muted-foreground font-normal">Atualize suas informações pessoais</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Seu nome"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl" className="text-sm font-medium">URL da Foto de Perfil</Label>
              <Input
                id="photoUrl"
                value={profile.photoUrl}
                onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                placeholder="https://exemplo.com/foto.jpg"
                className="h-11"
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

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
          <CardContent className="p-6">
            <MetaConnectButton isConnected={false} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Configuracoes;
