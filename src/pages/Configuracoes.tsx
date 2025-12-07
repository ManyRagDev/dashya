import DashboardLayout from '@/components/common/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import MetaConnectButton from '@/components/integrations/MetaConnectButton';
import { useState } from 'react';

const Configuracoes = () => {
  const [profile, setProfile] = useState({
    name: 'Gestor de Tráfego',
    email: 'gestor@dashya.com',
    photoUrl: '',
  });

  const handleSaveProfile = () => {
    console.log('Perfil salvo:', profile);
  };

  return (
    <DashboardLayout
      userName={profile.name}
      userEmail={profile.email}
      userAvatar={profile.photoUrl}
    >
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie seu perfil e integrações
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl">URL da Foto</Label>
              <Input
                id="photoUrl"
                value={profile.photoUrl}
                onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>
            <Button onClick={handleSaveProfile}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>
              Conecte suas contas de anúncios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetaConnectButton isConnected={false} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Configuracoes;
