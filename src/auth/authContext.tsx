/* eslint-disable react-refresh/only-export-components */
// 1. Importamos las funciones normales
import { createContext, useContext, useState } from "react";

// 2. CORRECCIÓN: Importamos ReactNode explícitamente como "type"
import type { ReactNode } from "react";

import type { User, AuthSession } from "../types/Auth";
import { authStorage } from "./authStorage";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (session: AuthSession) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Inicialización perezosa (Lazy State) para evitar el error de setState síncrono
    const [user, setUser] = useState<User | null>(() => {
        const session = authStorage.get();
        return session ? session.user : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        const session = authStorage.get();
        return session ? session.token : null;
    });

    const login = (session: AuthSession) => {
        authStorage.set(session);
        setUser(session.user);
        setToken(session.token);
    };

    const logout = () => {
        authStorage.clear();
        setUser(null);
        setToken(null);
        window.location.href = "/login";
    };

    const value = {
        user,
        isAuthenticated: !!user && !!token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}