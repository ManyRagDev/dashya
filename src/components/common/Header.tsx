import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Header = ({ 
  userName = 'Usuário', 
  userEmail = 'usuario@exemplo.com',
  userAvatar 
}: HeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-20 glass-card flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
        <div>
          <p className="text-sm text-muted-foreground">Bem-vindo de volta,</p>
          <p className="text-lg font-semibold text-foreground">{userName}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-11 h-11 rounded-xl bg-card hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-105">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </button>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-card transition-all duration-300 cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
          <Avatar className="w-11 h-11 ring-2 ring-primary/20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
