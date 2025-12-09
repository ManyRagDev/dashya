import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import GlobalDashboard from './pages/GlobalDashboard';
import PlatformDetails from './pages/PlatformDetails';
import Settings from './pages/Settings';
import MetaCallback from './pages/MetaCallback';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />,
    visible: false
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <GlobalDashboard />,
    visible: false
  },
  {
    name: 'Platform Details',
    path: '/platform/:name',
    element: <PlatformDetails />,
    visible: false
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <Settings />,
    visible: false
  },
  {
    name: 'Meta OAuth Callback',
    path: '/integracao/meta/callback',
    element: <MetaCallback />,
    visible: false
  },
  {
    name: '404',
    path: '*',
    element: <NotFound />,
    visible: false
  }
];

export default routes;
