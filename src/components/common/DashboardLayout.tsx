import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

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
      <div className="flex-1 ml-72">
        <Header userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
