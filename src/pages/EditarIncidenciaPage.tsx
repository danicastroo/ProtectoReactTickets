import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { incidenciaService } from "../services/incidenciaService";
import type { IncidenciaUrgencia, IncidenciaEstado } from "../types/Incidencia";

export default function EditarIncidenciaPage() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>("media");
    const [estado, setEstado] = useState<IncidenciaEstado>("abierta");

    useEffect(() => {
        const cargar = async () => {
            if (!id) return;
            try {
                const data = await incidenciaService.get(Number(id));
                setTitulo(data.titulo);
                setDescripcion(data.descripcion);
                setUrgencia(data.urgencia);
                setEstado(data.estado);
            } catch {
                alert("Error al cargar incidencia");
                navigate("/incidencias");
            }
        };
        cargar();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await incidenciaService.update(Number(id), {
                titulo, descripcion, urgencia, estado
            });
            navigate("/incidencias");
        } catch {
            alert("Error al actualizar");
        }
    };

    return (
        <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
            <h1>Editar Incidencia</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label>Título: <input value={titulo} onChange={e => setTitulo(e.target.value)} required /></label>
                <label>Descripción: <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} rows={4} required /></label>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ flex: 1 }}>Urgencia:
                        <select value={urgencia} onChange={e => setUrgencia(e.target.value as IncidenciaUrgencia)}>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </label>
                    <label style={{ flex: 1 }}>Estado:
                        <select value={estado} onChange={e => setEstado(e.target.value as IncidenciaEstado)}>
                            <option value="abierta">Abierta</option>
                            <option value="en_proceso">En Proceso</option>
                            <option value="cerrada">Cerrada</option>
                        </select>
                    </label>
                </div>

                <button type="submit">Guardar Cambios</button>
                <button type="button" className="secondary" onClick={() => navigate("/incidencias")}>Cancelar</button>
            </form>
        </div>
    );
}