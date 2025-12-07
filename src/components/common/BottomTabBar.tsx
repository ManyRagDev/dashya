import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Facebook, Chrome } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Meta',
      path: '/platform/meta',
      icon: Facebook,
    },
    {
      name: 'Google',
      path: '/platform/google',
      icon: Chrome,
    },
    {
      name: 'Config',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar-background/95 backdrop-blur-lg border-t border-sidebar-border">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 min-w-[70px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                isActive 
                  ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' 
                  : 'bg-transparent'
              )}>
                <Icon className={cn(
                  'w-5 h-5 transition-all duration-300',
                  isActive ? 'text-white' : 'text-muted-foreground'
                )} />
              </div>
              <span className="text-xs font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
