import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { incidenciaService } from "../services/incidenciaService";
import type { IncidenciaUrgencia, IncidenciaEstado } from "../types/Incidencia";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function EditarIncidenciaPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // 'id' es un string que viene de la URL

    // Estados
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>("media");
    const [estado, setEstado] = useState<IncidenciaEstado>("abierta");

    // 1. Carga de datos al entrar
    useEffect(() => {
        const cargar = async () => {
            if (!id) return; // Si no hay ID, no hacemos nada

            try {
                // Convertimos id (string) a numero
                const data = await incidenciaService.get(Number(id));

                setTitulo(data.titulo);
                setDescripcion(data.descripcion);
                // Forzamos el tipo con 'as' para que TS confíe en nosotros
                setUrgencia(data.urgencia as IncidenciaUrgencia);
                setEstado(data.estado as IncidenciaEstado);
            } catch (error) {
                console.error(error);
                alert("Error al cargar la incidencia");
                navigate("/incidencias");
            }
        };
        cargar();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            alert("Error: No se encuentra el ID de la incidencia");
            return;
        }

        try {
            await incidenciaService.update(Number(id), {
                titulo,
                descripcion,
                urgencia,
                estado
            });
            navigate("/incidencias");
        } catch (error) {
            console.error(error); // Para ver el error en consola si pasa algo
            alert("Error al guardar los cambios");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    Editar Incidencia
                </h1>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Título
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Descripción
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            rows={4}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    {/* Grid para los selectores */}
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
                                Estado
                            </label>
                            <select
                                value={estado}
                                onChange={e => setEstado(e.target.value as IncidenciaEstado)}style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option value="abierta">Abierta</option>
                                <option value="en_proceso">En Proceso</option>
                                <option value="cerrada">Cerrada</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <Button type="button" variant="secondary" onClick={() => navigate("/incidencias")}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}