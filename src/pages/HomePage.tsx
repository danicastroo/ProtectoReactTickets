import { useNavigate } from "react-router-dom";
// Reutilizamos nuestros componentes de diseño para mantener la coherencia
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function HomePage() {
    // Hook de React Router para poder navegar "programáticamente"
    // (es decir, cambiar de página cuando hacemos clic en el botón)
    const navigate = useNavigate();

    return (
        // Contenedor principal:
        // Uso Flexbox para centrar la tarjeta exactamente en el medio de la pantalla vertical y horizontalmente.
        // height: "80vh" hace que ocupe casi toda la altura de la ventana.
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "80vh",
            textAlign: "center" 
        }}>
            {/* Usamos el componente Card para que tenga el borde y la sombra igual que el resto de la app */}
            <Card style={{ padding: "3rem", maxWidth: "600px" }}>
                
                {/* Título principal con el color de acento definido en index.css */}
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--primary)" }}>
                    Gestión de Incidencias
                </h1>
                
                <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
                    Bienvenido al sistema corporativo. Gestiona tus tickets de soporte de forma rápida y segura.
                </p>
                
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    {/* Al hacer clic, redirigimos al usuario a la pantalla de Login */}
                    <Button onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </Button>
                </div>

            </Card>
        </div>
    );
}