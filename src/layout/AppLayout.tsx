import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AppLayout() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div>
            <header className="navbar">
                <div className="navbar-inner">
                    <span className="brand">Ticketing</span>                    
                    <nav className="navlinks">
                        {/* Enlaces Públicos */}
                        <NavLink to="/about">Info</NavLink>

                        {/* Enlaces Privados */}
                        {isAuthenticated && (
                            <>
                                <NavLink to="/incidencias">Mis Incidencias</NavLink>
                                <NavLink to="/perfil">Mi Perfil</NavLink>
                            </>
                        )}

                        {/* Zona Usuario / Login */}
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Registro</NavLink>
                            </>
                        ) : (
                            <>
                                <div className="nav-username">
                                    <span className="username-message">Hola,</span>
                                    <span className="username-name">{user?.name}</span>
                                </div>
                                <button className="nav-btn logout" onClick={logout}>Salir</button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="page">
                {/* Aquí se cargarán las páginas hijas (Login, Lista, etc.) */}
                <Outlet />
            </main>
        </div>
    );
}