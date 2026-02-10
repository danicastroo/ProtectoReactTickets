import React from "react";

// Definimos las propiedades (Props)
// "extends React.Button..." es un TRUCO MUY ÚTIL:
// Significa: "Coge todas las propiedades normales de un botón HTML (onClick, disabled, type, etc.)"
// y añádele las nuestras (en este caso, 'variant').
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger"; 
}

export function Button({ variant = "primary", className, children, ...rest }: Props) {
    
    // 1. Calculamos la clase del color
    const claseColor = variant === "primary" ? "" : variant;

    // 2. Combinamos las clases
    // Juntamos el color + cualquier clase extra que nos pasen (ej: márgenes)
    const claseFinal = `${claseColor} ${className || ""}`.trim();

    return (
        <button 
            className={claseFinal}
            {...rest} // "Spread operator": Pasa todo lo demás (onClick, type...) automáticamente al botón
        >
            {children} {/* 'children' es el texto o iconos que pongas dentro del botón */}
        </button>
    );
}