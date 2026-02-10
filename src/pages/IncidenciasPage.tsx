import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { incidenciaService } from "../services/incidenciaService"; 
import type { Incidencia } from "../types/Incidencia";

// Importamos nuestros componentes reutilizables
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function IncidenciasPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Estados de la página
    const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // Nuevo estado para controlar fallos

    // Función para pedir los datos al servidor
    const cargarDatos = async () => {
        setLoading(true);
        setError(""); // Limpiamos errores anteriores antes de cargar
        try {
            const datos = await incidenciaService.getAll();
            setIncidencias(datos);
        } catch (err) {
            console.error(err);
            setError("Error al cargar las incidencias. ¿El servidor está encendido?");
        } finally {
            // El finally se ejecuta SIEMPRE, haya error o no.
            // Lo usamos para quitar el "cargando".
            setLoading(false);
        }
    };

    // useEffect: Se ejecuta una sola vez al entrar en la página ([])
    useEffect(() => { 
        cargarDatos(); 
    }, []);

    const handleBorrar = async (id: number) => {
        // Confirmación nativa del navegador (sencilla y funcional)
        if (!confirm("¿Seguro que quieres borrar esta incidencia?")) return;

        try {
            await incidenciaService.delete(id);
            // Truco: En vez de recargar toda la página llamando a cargarDatos(),
            // filtramos la lista localmente para que desaparezca al instante.
            setIncidencias(incidencias.filter(i => i.id !== id));
        } catch {
            alert("Hubo un error al intentar borrar.");
        }
    };

    // Función auxiliar para decidir el color de la etiqueta según la urgencia
    // Esto aprovecha las clases .badge-Alta, .badge-Media, etc. del CSS
    const getBadgeClass = (urgencia: string) => {
        // Ponemos la primera letra en mayúscula (alta -> Alta) para que coincida con el CSS
        const clase = urgencia.charAt(0).toUpperCase() + urgencia.slice(1);
        return `badge badge-${clase}`;
    };

    // --- RENDERIZADO (Lo que se ve) ---

    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>Cargando datos...</p>
        </div>
    );

    if (error) return (
        <div style={{ marginTop: '2rem' }}>
            <Card style={{ border: '1px solid var(--danger)', color: 'var(--danger)', textAlign: 'center' }}>
                <h3>⚠️ Ocurrió un error</h3>
                <p>{error}</p>
                <Button onClick={cargarDatos} variant="secondary">Intentar de nuevo</Button>
            </Card>
        </div>
    );

    return (
        <div>
            {/* Cabecera con título y botones */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Incidencias de {user?.name}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={() => navigate("/incidencias/nueva")}>
                        + Nueva
                    </Button>
                    <Button variant="secondary" onClick={cargarDatos}>
                        Recargar
                    </Button>
                </div>
            </div>

            {/* Listado */}
            {incidencias.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    <h3>Todo limpio 🧹</h3>
                    <p>No tienes incidencias pendientes.</p>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {incidencias.map((inc) => (
                        <Card key={inc.id} style={{ borderLeft: '4px solid var(--primary)' }}>
                            
                            {/* Cabecera de la tarjeta: Título + Badge */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0 }}>{inc.titulo}</h3>
                                <span className={getBadgeClass(inc.urgencia)}>
                                    {inc.urgencia}
                                </span>
                            </div>

                            <p style={{ marginBottom: '1.5rem' }}>{inc.descripcion}</p>
                            
                            {/* Pie de la tarjeta: Estado + Botones */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                borderTop: '1px solid #eee', 
                                paddingTop: '1rem' 
                            }}>
                                <small style={{ color: '#666', fontWeight: 500 }}>
                                    Estado: <span style={{ color: 'var(--text-main)' }}>{inc.estado}</span>
                                </small>
                                
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {/* Botón Editar (Naranja manual para diferenciarlo) */}
                                    <Button 
                                        onClick={() => navigate(`/incidencias/editar/${inc.id}`)} 
                                        style={{ backgroundColor: '#f59e0b' }} // Naranja
                                    >
                                        Editar
                                    </Button>
                                    
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleBorrar(inc.id)}
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