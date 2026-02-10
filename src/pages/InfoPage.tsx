import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function InfoPage() {
    // Datos constantes 
    const APP_VERSION = "1.0";
    const AUTHOR = "Dani Castro";
    const YEAR = new Date().getFullYear(); // Año actual automático

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                Sobre la Aplicación
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                
                {/* TARJETA 1: Información del Proyecto */}
                <Card>
                    <h3 style={{ marginTop: 0 }}>📋 Ficha Técnica</h3>
                    <p>
                        Sistema corporativo para la gestión centralizada de incidencias y soporte técnico.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, color: '#555', lineHeight: '2' }}>
                        <li><strong>Versión:</strong> {APP_VERSION}</li>
                        <li><strong>Desarrollador:</strong> {AUTHOR}</li>
                        <li><strong>Licencia:</strong> Privada / Educativa</li>
                        <li><strong>Año:</strong> {YEAR}</li>
                    </ul>
                    
                    <div style={{ marginTop: '1.5rem' }}>
                        {/* Botón que abre el gestor de correo del ordenador */}
                        <a href="mailto:danicvillalba@gmail.com" style={{ textDecoration: 'none' }}>
                            <Button>Contactar Soporte</Button>
                        </a>
                    </div>
                </Card>

                {/* TARJETA 2: Stack Tecnológico (Muestra conocimientos técnicos) */}
                <Card>
                    <h3 style={{ marginTop: 0 }}>🛠️ Tecnologías</h3>
                    <p>Este proyecto ha sido desarrollado utilizando las últimas tecnologías web:</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1rem' }}>
                        {/* Reutilizamos las clases 'badge' del CSS pero con estilos inline para colores personalizados */}
                        <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}>
                            React
                        </span>
                        <span className="badge" style={{ background: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe' }}>
                            TypeScript
                        </span>
                        <span className="badge" style={{ background: '#ffedd5', color: '#c2410c', border: '1px solid #fdba74' }}>
                            Vite
                        </span>
                        <span className="badge" style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                            Axios
                        </span>
                        <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }}>
                            CSS Modules
                        </span>
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888', fontStyle: 'italic' }}>
                        "El código limpio siempre parece que ha sido escrito por alguien a quien le importa."
                    </div>
                </Card>

            </div>
        </div>
    );
}