import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { incidenciaService } from "../services/incidenciaService";
import type { IncidenciaUrgencia, IncidenciaEstado } from "../types/Incidencia";
import { useAuth } from "../auth/authContext";

// Importamos solo lo que SÍ existe
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function NuevaIncidenciaPage() {
    const navigate = useNavigate();
    const { user } = useAuth(); // (Opcional) Por si quieres guardar quién la creó

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>("media");
    const [estado, setEstado] = useState<IncidenciaEstado>("abierta");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Creamos el objeto nuevo (sin ID, el servidor lo pone)
            await incidenciaService.create({
                titulo,
                descripcion,
                urgencia,
                estado
            });
            navigate("/incidencias"); // Volvemos al listado
        } catch (error) {
            console.error(error);
            alert("Error al crear la incidencia");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    Nueva Incidencia
                </h1>

                <form onSubmit={handleSubmit}>
                    
                    {/* TÍTULO */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Título
                        </label>
                        <input 
                            type="text"
                            value={titulo} 
                            onChange={e => setTitulo(e.target.value)} 
                            required 
                            placeholder="Ej: Ordenador no enciende..."
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Descripción
                        </label>
                        <textarea 
                            value={descripcion} 
                            onChange={e => setDescripcion(e.target.value)} 
                            rows={4} 
                            required 
                            placeholder="Detalla qué ha pasado..."
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    {/* SELECTORES (Urgencia y Estado) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Urgencia
                            </label>
                            <select 
                                value={urgencia} 
                                onChange={e => setUrgencia(e.target.value as IncidenciaUrgencia)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            >
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Estado Inicial
                            </label>
                            <select 
                                value={estado} 
                                onChange={e => setEstado(e.target.value as IncidenciaEstado)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            >
                                <option value="abierta">Abierta</option>
                                <option value="en_proceso">En Proceso</option>
                                <option value="cerrada">Cerrada</option>
                            </select>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <Button type="button" variant="secondary" onClick={() => navigate("/incidencias")}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Crear Incidencia
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}