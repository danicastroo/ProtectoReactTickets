// Definimos los valores fijos para que no haya errores de texto
export type IncidenciaUrgencia = "alta" | "media" | "baja";
export type IncidenciaEstado = "abierta" | "en_proceso" | "cerrada";

// Definimos la estructura de una incidencia completa (cuando viene del servidor)
export interface Incidencia {
    id: number;
    titulo: string;
    descripcion: string;
    urgencia: IncidenciaUrgencia;
    estado: IncidenciaEstado;
}

// Definimos la estructura para crear una nueva (sin ID, porque el ID lo pone el servidor)
export type NuevaIncidencia = Omit<Incidencia, "id">;