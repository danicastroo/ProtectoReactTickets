import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "80vh",
            textAlign: "center" 
        }}>
            <Card style={{ padding: "3rem", maxWidth: "600px" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--accent)" }}>
                    Gestión de Incidencias
                </h1>
                <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
                    Bienvenido al sistema corporativo. Gestiona tus tickets de soporte de forma rápida y segura.
                </p>
                
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    {/* Este botón lleva al Login */}
                    <Button onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </Button>
                </div>
            </Card>
        </div>
    );
}