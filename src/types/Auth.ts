export interface User {
    // Quitamos ID por ahora para evitar conflictos si el servidor no lo manda
    email: string;
    name: string;
}

export interface AuthSession {
    token: string;
    user: User;
}

export type AuthResponse = AuthSession;