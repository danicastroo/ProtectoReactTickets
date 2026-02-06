import { useEffect, useState } from "react";
import { incidenciaService } from "../services/incidenciaService";
import type { Incidencia } from "../types/Incidencia";
import { useAuth } from "../auth/authContext";
// 1. Importamos el hook de navegación
import { useNavigate } from "react-router-dom";

export default function IncidenciasPage() {
    const { user } = useAuth();
    // 2. Inicializamos el hook
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
        await incidenciaService.delete(id);
        setIncidencias(incidencias.filter(i => i.id !== id));
    };

    if (loading) return <div className="card">Cargando...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1>Incidencias de {user?.name}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {/* 3. AQUÍ ESTÁ EL BOTÓN QUE TE LLEVA AL FORMULARIO */}
                    <button onClick={() => navigate("/incidencias/nueva")}>+ Nueva</button>
                    <button className="secondary" onClick={cargarDatos}>Recargar</button>
                </div>
            </div>

            {incidencias.length === 0 ? (
                <div className="card">No hay incidencias.</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {incidencias.map((inc) => (
                        <article key={inc.id} className="card" style={{ borderLeft: '5px solid var(--accent)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>{inc.titulo}</h3>
                                <span className="badge">{inc.urgencia}</span>
                            </div>
                            <p>{inc.descripcion}</p>
                            <button className="danger" onClick={() => handleBorrar(inc.id)}>Borrar</button>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}