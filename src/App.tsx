import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import routes from './routes';

// Rotas públicas que não precisam de autenticação
const publicRoutes = ['/', '/login', '/integracao/meta/callback', '*'];

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              {routes.map((route, index) => {
                // Verifica se a rota é pública
                const isPublic = publicRoutes.includes(route.path);

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      isPublic ? (
                        route.element
                      ) : (
                        <ProtectedRoute>{route.element}</ProtectedRoute>
                      )
                    }
                  />
                );
              })}
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
