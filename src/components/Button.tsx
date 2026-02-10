import React from "react";

// Definimos qué opciones acepta nuestro botón
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger"; // Solo permitimos estos 3 tipos
}

export const Button = ({ variant = "primary", className, children, ...props }: Props) => {
    // Calculamos la clase CSS según la variante elegida
    // Si es "primary", no ponemos clase (usa el estilo por defecto del CSS)
    // Si es "danger" o "secondary", añadimos esa clase
    const variantClass = variant === "primary" ? "" : variant;

    return (
        <button 
            className={`${variantClass} ${className || ""}`.trim()} 
            {...props} // Pasamos el resto de props (onClick, type, disabled, etc.)
        >
            {children}
        </button>
    );
};