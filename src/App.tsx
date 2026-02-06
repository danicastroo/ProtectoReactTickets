import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import LoginPage from './pages/LoginPage';
import IncidenciasPage from './pages/IncidenciasPage';
// 1. IMPORTANTE: Importamos la página nueva
import NuevaIncidenciaPage from './pages/NuevaIncidenciaPage';
import { useAuth } from './auth/authContext';
// Importamos solo el tipo para que TypeScript no se queje
import type { ReactNode } from 'react';

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/incidencias" replace />} />
        
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas (solo si estás logueado) */}
        <Route path="/incidencias" element={
            <ProtectedRoute>
              <IncidenciasPage />
            </ProtectedRoute>
        } />

        {/* 2. IMPORTANTE: Aquí añadimos la nueva ruta */}
        <Route path="/incidencias/nueva" element={
            <ProtectedRoute>
              <NuevaIncidenciaPage />
            </ProtectedRoute>
        } />
        
        {/* Ruta para error 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Route>
    </Routes>
  );
}