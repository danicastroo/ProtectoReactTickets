import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAuth();

    // Si NO estás autenticado, te manda al Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si SÍ estás autenticado, te deja ver la página (el hijo)
    return children;
};