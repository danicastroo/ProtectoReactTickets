import type { AuthSession } from "../types/Auth";

const KEY = "auth_session"; // La clave con la que se guardará en el navegador

export const authStorage = {
    // 1. Obtener datos (Leer del disco duro del navegador)
    get: (): AuthSession | null => {
        const data = localStorage.getItem(KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    },

    // 2. Guardar datos (Escribir en el disco duro del navegador)
    set: (session: AuthSession) => {
        localStorage.setItem(KEY, JSON.stringify(session));
    },

    // 3. Borrar datos (Logout)
    clear: () => {
        localStorage.removeItem(KEY);
    }
};