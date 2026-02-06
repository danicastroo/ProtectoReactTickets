import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { incidenciaService } from "../services/incidenciaService";
// 1. Importamos también el tipo 'IncidenciaUrgencia'
import type { NuevaIncidencia, IncidenciaUrgencia } from "../types/Incidencia";

export default function NuevaIncidenciaPage() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    // Definimos el estado inicial explícitamente como IncidenciaUrgencia
    const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>("media");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const nueva: NuevaIncidencia = {
            titulo,
            descripcion,
            urgencia,
            estado: "abierta"
        };

        try {
            await incidenciaService.create(nueva);
            navigate("/incidencias");
        } catch {
            // 2. CORREGIDO: Hemos quitado "(error)" porque no lo usábamos
            alert("Error al crear la incidencia");
        }
    };

    return (
        <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
            <h1>Nueva Incidencia</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                
                <input 
                    placeholder="Título" 
                    value={titulo} 
                    onChange={e => setTitulo(e.target.value)} 
                    required 
                />

                <textarea 
                    placeholder="Descripción" 
                    value={descripcion} 
                    onChange={e => setDescripcion(e.target.value)} 
                    rows={4} 
                    required 
                />

                <select 
                    value={urgencia} 
                    // 3. CORREGIDO: Usamos "as IncidenciaUrgencia" en vez de "any"
                    onChange={e => setUrgencia(e.target.value as IncidenciaUrgencia)}
                >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>

                <button type="submit">Guardar</button>
                <button type="button" className="secondary" onClick={() => navigate("/incidencias")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}