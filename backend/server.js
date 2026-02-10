const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Importamos la librería para leer archivos
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- CONFIGURACIÓN DE LA "BASE DE DATOS" ---
const DB_FILE = path.join(__dirname, 'db.json');

// Función auxiliar para LEER el archivo
const leerDatos = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            // Si el archivo no existe, creamos uno vacío
            fs.writeFileSync(DB_FILE, '[]');
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo DB:", error);
        return [];
    }
};

// Función auxiliar para GUARDAR en el archivo
const guardarDatos = (datos) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(datos, null, 2));
    } catch (error) {
        console.error("Error guardando DB:", error);
    }
};

// --- DATOS INICIALES ---
// Cargamos las incidencias del archivo al arrancar
let incidencias = leerDatos();
let users = [{ email: 'usuario@gmail.com', password: '1234', name: 'Usuario Real' }];

// --- ENDPOINTS ---

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ token: 'token-123', user: { email: user.email, name: user.name } });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

app.get('/incidencias', (req, res) => {
    // Siempre leemos del archivo antes de responder, por si acaso
    incidencias = leerDatos(); 
    res.json(incidencias);
});

app.get('/incidencias/:id', (req, res) => {
    incidencias = leerDatos();
    const id = parseInt(req.params.id);
    const item = incidencias.find(i => i.id === id);
    item ? res.json(item) : res.status(404).json({error: 'No encontrado'});
});

app.post('/incidencias', (req, res) => {
    const nueva = req.body;
    nueva.id = Date.now();
    
    incidencias.push(nueva);
    guardarDatos(incidencias); // <--- ¡AQUÍ GUARDAMOS EN EL DISCO!
    
    res.json(nueva);
});

app.put('/incidencias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = incidencias.findIndex(i => i.id === id);
    
    if (index !== -1) {
        incidencias[index] = { ...incidencias[index], ...req.body, id };
        guardarDatos(incidencias); // <--- ¡AQUÍ GUARDAMOS!
        res.json(incidencias[index]);
    } else {
        res.status(404).json({error: 'No encontrado'});
    }
});

app.delete('/incidencias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    incidencias = incidencias.filter(i => i.id !== id);
    guardarDatos(incidencias); // <--- ¡AQUÍ GUARDAMOS!
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Backend con PERSISTENCIA corriendo en puerto 3000');
});