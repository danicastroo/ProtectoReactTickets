# 🎫 Gestión de Incidencias (React + TypeScript)

Proyecto final de desarrollo frontend para la gestión de tiquets e incidencias (CRUD).
La aplicación permite a los usuarios autenticarse, consultar sus incidencias asignadas, crear nuevos reportes y gestionar el estado y urgencia de los mismos.

Este proyecto sigue una arquitectura basada en **servicios**, **componentes reutilizables** y **tipado estricto**, comunicándose con un backend simulado mediante API REST.

## 🚀 Tecnologías Utilizadas

* **Frontend:** React 18, TypeScript, Vite.
* **Routing:** React Router DOM v6/v7.
* **HTTP Client:** Axios (con interceptores para JWT).
* **Backend:** Node.js + Express + JSON-Server (Simulación de API REST).
* **Base de Datos:** Archivo JSON (`db.json`).
* **Infraestructura:** Docker & Docker Compose.

## ⚙️ Requisitos Previos

* Node.js (v18 o superior)
* Docker y Docker Compose (Recomendado para levantar el backend)

## 🛠️ Instalación y Ejecución

### Opción A: Ejecución con Docker (Recomendada)

Esta opción levanta tanto el Backend (puerto 3000) como el Frontend (puerto 5173) automáticamente.

1. **Clonar el repositorio y entrar:**

   ```bash
   git clone <url-del-repo>
   cd gestion-incidencias
   ```
2. **Arrancar los servicios:**

   ```bash
   docker-compose up --build
   ```
3. **Abrir en el navegador:**

   * Frontend: [http://localhost:5173](http://localhost:5173)
   * API Backend: [http://localhost:3000](http://localhost:3000)

---

### Opción B: Ejecución Manual (Sin Docker)

Si no tienes Docker, puedes ejecutar los servicios en dos terminales separadas.

**Terminal 1: Backend**

```bash
cd backend
npm install
npm start
```
