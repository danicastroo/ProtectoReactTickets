import React from "react";

interface Props {
    children: React.ReactNode;   // Esto es lo que va dentro de las etiquetas <Card>...</Card>
    className?: string;          // Opcional (?) para añadir márgenes o clases extra
    style?: React.CSSProperties; // Opcional (?) para estilos inline (como el borde rojo de error)
}

export function Card({ children, className, style }: Props) {
    
    // Paso 1: Construir la clase final.
    // Siempre tendrá la clase 'card' (que tiene el estilo base: sombra, fondo blanco...).
    // Si nos pasan 'className', se la añadimos detrás.
    const clasesFinales = className ? `card ${className}` : "card";

    return (
        <div className={clasesFinales} style={style}>
            {children}
        </div>
    );
}