export type IncidenciaEstado = 'abierta' | 'en_proceso' | 'cerrada';
export type IncidenciaUrgencia = 'baja' | 'media' | 'alta';

export interface Incidencia {
    id: number;
    titulo: string;
    descripcion: string;
    usuarioId: number;
    fecha: string;
    estado: IncidenciaEstado;
    urgencia: IncidenciaUrgencia;
}

export type NuevaIncidencia = {
    titulo: string;
    descripcion: string;
    urgencia: IncidenciaUrgencia;
    estado: IncidenciaEstado;
}