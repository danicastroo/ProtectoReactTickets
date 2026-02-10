import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import IncidenciasPage from './pages/IncidenciasPage';
import EditarIncidenciaPage from './pages/EditarIncidenciaPage';
import NuevaIncidenciaPage from './pages/NuevaIncidenciaPage';
import PerfilPage from './pages/PerfilPage';
import { ProtectedRoute } from './routing/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        
        {/* --- RUTAS PÚBLICAS (Cualquiera entra) --- */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- RUTAS PRIVADAS (Solo con llave) --- */}
        {/* Envolvemos cada una con <ProtectedRoute> */}
        
        <Route path="/incidencias" element={
          <ProtectedRoute>
            <IncidenciasPage />
          </ProtectedRoute>
        } />

        <Route path="/incidencias/nueva" element={
          <ProtectedRoute>
            <NuevaIncidenciaPage />
          </ProtectedRoute>
        } />

        <Route path="/incidencias/editar/:id" element={
          <ProtectedRoute>
            <EditarIncidenciaPage />
          </ProtectedRoute>
        } />

        <Route path="/perfil" element={
          <ProtectedRoute>
             <PerfilPage />
          </ProtectedRoute>
        } />

        {/* --- RUTA 404 --- */}
        <Route path="*" element={
            <div style={{ textAlign: "center", marginTop: "5rem" }}>
                <h1 style={{ fontSize: "4rem", color: "var(--accent)" }}>404</h1>
                <p>Página no encontrada</p>
                <a href="/" style={{ color: "white" }}>Volver al inicio</a>
            </div>
        } />
      
      </Route>
    </Routes>
  );
}

export default App;