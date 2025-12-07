import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <header className="h-16 bg-card border-b border-border flex items-center justify-end px-8">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <Avatar>
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
