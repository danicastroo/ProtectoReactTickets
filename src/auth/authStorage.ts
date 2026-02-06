import type { AuthSession } from "../types/Auth";

const CLAVE = "auth_session";

export const authStorage = {
    get(): AuthSession | null {
        const datos = localStorage.getItem(CLAVE);
        if (!datos) return null;
        try {
            return JSON.parse(datos) as AuthSession;
        } catch {
            return null;
        }
    },
    set(session: AuthSession): void {
        localStorage.setItem(CLAVE, JSON.stringify(session));
    },
    clear() {
        localStorage.removeItem(CLAVE);
    }
};