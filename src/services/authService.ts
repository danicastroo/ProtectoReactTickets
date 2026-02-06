import axios from "axios";
import type { AuthResponse } from "../types/Auth";

// Forzamos a que sea string para evitar error de "posiblemente undefined"
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";

export const AuthService = {
    async login(email: string, password: string) {
        const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { 
            email, 
            password 
        });
        return response.data;
    },
    
    async register(email: string, password: string, name: string) {
        const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, { 
            email, 
            password, 
            name 
        });
        return response.data;
    }
};