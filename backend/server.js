const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Base de Datos en memoria (VOLÁTIL) ---
// En el futuro, aquí conectaríamos con MySQL o MongoDB
let users = [{ email: 'usuario@gmail.com', password: '1234', name: 'Usuario Real' }];
let incidencias = [];

// --- Endpoint de Login ---
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Devolvemos un token falso y los datos del usuario
        res.json({ 
            token: 'token-falso-seguro-123', 
            user: { email: user.email, name: user.name } 
        });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

// --- Endpoints de Incidencias ---
app.get('/incidencias', (req, res) => {
    res.json(incidencias);
});

app.post('/incidencias', (req, res) => {
    const nueva = req.body;
    // Asignamos ID automático
    nueva.id = Date.now(); 
    incidencias.push(nueva);
    res.json(nueva);
});

app.delete('/incidencias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    incidencias = incidencias.filter(inc => inc.id !== id);
    res.json({ success: true });
});

// Arrancar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Backend REAL corriendo en el puerto 3000');
});