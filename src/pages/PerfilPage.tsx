import { useAuth } from "../auth/authContext";

export default function PerfilPage() {
    const { user, logout } = useAuth();

    return (
        <div className="card" style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
            <div style={{ 
                width: "80px", height: "80px", 
                background: "var(--accent)", color: "white", 
                borderRadius: "50%", margin: "0 auto 1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", fontWeight: "bold"
            }}>
                {user?.name.charAt(0).toUpperCase()}
            </div>
            
            <h1>{user?.name}</h1>
            <p style={{ color: "#888" }}>{user?.email}</p>
            
            <hr style={{ margin: "1.5rem 0", borderColor: "#eee" }} />
            
            <div style={{ textAlign: "left" }}>
                <p><strong>Rol:</strong> Administrador</p>
                <p><strong>ID Usuario:</strong> 159-AZ</p>
            </div>

            <button 
                onClick={logout} 
                className="danger" 
                style={{ width: "100%", marginTop: "1.5rem" }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}