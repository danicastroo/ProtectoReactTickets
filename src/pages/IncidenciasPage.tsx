import { useEffect, useState } from "react";
import { incidenciaService } from "../services/incidenciaService"; 
import type { Incidencia } from "../types/Incidencia";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";

// 1. IMPORTAMOS LOS NUEVOS COMPONENTES
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function IncidenciasPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const datos = await incidenciaService.getAll();
            setIncidencias(datos);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleBorrar = async (id: number) => {
        if (!confirm("¿Borrar?")) return;
        try {
            await incidenciaService.delete(id);
            setIncidencias(incidencias.filter(i => i.id !== id));
        } catch {
            alert("Error al borrar");
        }
    };

    // 2. USAMOS <Card> EN LUGAR DE <div className="card">
    if (loading) return <Card>Cargando...</Card>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1>Incidencias de {user?.name}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {/* 3. USAMOS <Button> EN LUGAR DE <button> */}
                    <Button onClick={() => navigate("/incidencias/nueva")}>+ Nueva</Button>
                    <Button variant="secondary" onClick={cargarDatos}>Recargar</Button>
                </div>
            </div>

            {incidencias.length === 0 ? (
                <Card>No hay incidencias.</Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {incidencias.map((inc) => (
                        // 4. USAMOS <Card> AQUÍ TAMBIÉN CON TU ESTILO DE BORDE
                        <Card key={inc.id} style={{ borderLeft: '5px solid var(--accent)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>{inc.titulo}</h3>
                                <span className="badge">{inc.urgencia}</span>
                            </div>
                            <p>{inc.descripcion}</p>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <small style={{ color: '#888' }}>Estado: {inc.estado}</small>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    
                                    {/* 5. BOTÓN EDITAR: Pasamos el style inline tal cual lo tenías */}
                                    <Button 
                                        onClick={() => navigate(`/incidencias/editar/${inc.id}`)} 
                                        style={{ backgroundColor: '#f59e0b', padding: '5px 10px', fontSize: '0.9rem' }}
                                    >
                                        Editar
                                    </Button>
                                    
                                    {/* 6. BOTÓN BORRAR: Usamos variant="danger" */}
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleBorrar(inc.id)}
                                        style={{ padding: '5px 10px', fontSize: '0.9rem' }}
                                    >
                                        Borrar
                                    </Button>

                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}