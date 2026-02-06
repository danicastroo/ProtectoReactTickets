import axios from "axios";
import { authStorage } from "../auth/authStorage";
import type { AuthSession } from "../types/Auth";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor: Antes de cada petición, inyectamos el TOKEN
http.interceptors.request.use((config) => {
    const session: AuthSession | null = authStorage.get();
    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
});

// Interceptor: Si el servidor dice "401 No autorizado", cerramos sesión
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);