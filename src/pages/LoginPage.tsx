import { useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORTANTE: Importamos el hook de navegación
import { useAuth } from "../auth/authContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { api } from "../services/http";

export default function LoginPage() {
    const { login: saveSession } = useAuth();
    const navigate = useNavigate(); // Instanciamos el navegador
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 

        try {
            // 1. Petición al servidor
            const response = await api.post("/auth/login", { email, password });
            
            // 2. Guardamos la sesión en el contexto global
            saveSession(response.data);

            // 3. REDIRECCIÓN (Esto es lo que faltaba)
            // Una vez logueado, mandamos al usuario al listado de incidencias
            navigate("/incidencias");

        } catch (err) {
            console.error(err);
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Card style={{ width: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
                
                {error && (
                    <div style={{ 
                        background: '#fee2e2', color: '#dc2626', 
                        padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem',
                        textAlign: 'center' 
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            placeholder="usuario@gmail.com"
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            placeholder="1234"
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    
                    <Button type="submit" style={{ marginTop: '1rem' }}>
                        Entrar
                    </Button>
                </form>
            </Card>
        </div>
    );
}