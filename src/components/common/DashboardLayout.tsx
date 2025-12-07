import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomTabBar from './BottomTabBar';

interface DashboardLayoutProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const DashboardLayout = ({ 
  children, 
  userName, 
  userEmail, 
  userAvatar 
}: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 xl:ml-72 pb-16 xl:pb-0">
        <Header userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default DashboardLayout;
