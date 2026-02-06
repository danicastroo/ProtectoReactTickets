# Usamos una imagen ligera de Node
FROM node:18-alpine

# Creamos la carpeta dentro del contenedor
WORKDIR /app

# Copiamos el archivo de dependencias
COPY package.json .

# Instalamos las librerías automáticamente
RUN npm install

# Copiamos el código del servidor
COPY server.js .

# Abrimos el puerto 3000
EXPOSE 3000

# Comando para arrancar
CMD ["npm", "start"]