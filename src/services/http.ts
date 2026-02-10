import axios from "axios";
import { authStorage } from "../auth/authStorage";

// Instancia centralizada de Axios para toda la aplicación
export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor de SOLICITUD (Request)
// Inyecta automáticamente el token en los encabezados si existe una sesión activa.
api.interceptors.request.use((config) => {
    const session = authStorage.get();
    if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
});

// Interceptor de RESPUESTA (Response)
// Gestiona errores globales de autenticación (Token caducado o inválido).
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Detectamos si el servidor rechaza la petición por falta de permisos (401/403)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            
            // LÓGICA DE PROTECCIÓN:
            // Si estamos en la página de login, NO forzamos la redirección.
            // Esto permite que el formulario de login muestre "Usuario incorrecto" en lugar de recargar la página.
            if (!window.location.pathname.includes("/login")) {
                authStorage.clear(); // Limpiamos sesión corrupta
                window.location.href = "/login"; // Redirigimos al usuario para que se identifique
            }
        }
        
        // Devolvemos el error para que el componente que hizo la llamada pueda manejarlo (mostrar alertas, bordes rojos, etc.)
        return Promise.reject(error);
    }
);