import Dashboard from './pages/Dashboard';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import MetaCallback from './pages/MetaCallback';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    visible: false
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: false
  },
  {
    name: 'Configurações',
    path: '/configuracoes',
    element: <Configuracoes />,
    visible: false
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Meta Callback',
    path: '/integracao/meta/callback',
    element: <MetaCallback />,
    visible: false
  }
];

export default routes;
