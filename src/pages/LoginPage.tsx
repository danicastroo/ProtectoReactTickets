import { useState } from "react";
import { useAuth } from "../auth/authContext";
// Asegúrate de que la S de 'services' coincide con tu carpeta real
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const session = await AuthService.login(email, password);
            login(session);
            navigate("/incidencias");
        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión. Revisa usuario/contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: "400px", margin: "4rem auto" }}>
            <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email (ej: usuario@gmail.com)"
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña"
                    required 
                />
                
                {error && <div style={{ color: "#ef4444", textAlign: "center" }}>{error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}