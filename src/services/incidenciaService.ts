import { api } from "./http"; // <-- Esto busca http.ts en la misma carpeta
import type { Incidencia, NuevaIncidencia } from "../types/Incidencia";

export const incidenciaService = {
    getAll: async (): Promise<Incidencia[]> => {
        const response = await api.get("/incidencias");
        return response.data;
    },

    get: async (id: number): Promise<Incidencia> => {
        const response = await api.get(`/incidencias/${id}`);
        return response.data;
    },

    create: async (data: NuevaIncidencia): Promise<Incidencia> => {
        const response = await api.post("/incidencias", data);
        return response.data;
    },

    update: async (id: number, data: Partial<Incidencia>): Promise<Incidencia> => {
        const response = await api.put(`/incidencias/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/incidencias/${id}`);
    }
};