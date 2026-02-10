import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string; // Por si queremos añadir márgenes extra desde fuera
    style?: React.CSSProperties; // Por si queremos añadir estilos en línea (bordes de color, etc.)
}

export const Card = ({ children, className, style }: Props) => {
    return (
        <div className={`card ${className || ""}`} style={style}>
            {children}
        </div>
    );
};