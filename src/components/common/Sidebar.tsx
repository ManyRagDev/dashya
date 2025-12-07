import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Configurações',
      path: '/configuracoes',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-sidebar-background border-r border-sidebar-border flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="relative p-8 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Dashya</h1>
            <p className="text-xs text-muted-foreground">Traffic Analytics</p>
          </div>
        </div>
      </div>

      <nav className="relative flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
              )}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl" />
              )}
              <div className={cn(
                'relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                isActive 
                  ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' 
                  : 'bg-sidebar-accent group-hover:bg-muted'
              )}>
                <Icon className={cn(
                  'w-5 h-5 transition-all duration-300',
                  isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                )} />
              </div>
              <span className="relative font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="relative p-6 border-t border-sidebar-border/50">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent group-hover:bg-muted flex items-center justify-center transition-all duration-300">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
