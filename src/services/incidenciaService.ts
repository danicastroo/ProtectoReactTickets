import { http } from './http';
import type { Incidencia, NuevaIncidencia } from '../types/Incidencia';

export const incidenciaService = {
    // Listar todas
    getAll: async (): Promise<Incidencia[]> => {
        const response = await http.get<Incidencia[]>('/incidencias');
        return response.data;
    },

    // Obtener una por ID
    get: async (id: number): Promise<Incidencia> => {
        const response = await http.get<Incidencia>(`/incidencias/${id}`);
        return response.data;
    },

    // Crear nueva
    create: async (datos: NuevaIncidencia): Promise<Incidencia> => {
        const datosConFecha = { ...datos, fecha: new Date().toISOString() };
        const response = await http.post<Incidencia>('/incidencias', datosConFecha);
        return response.data;
    },

    // Actualizar
    update: async (id: number, datos: Partial<Incidencia>): Promise<Incidencia> => {
        const response = await http.patch<Incidencia>(`/incidencias/${id}`, datos);
        return response.data;
    },

    // Borrar
    delete: async (id: number): Promise<void> => {
        await http.delete(`/incidencias/${id}`);
    }
};