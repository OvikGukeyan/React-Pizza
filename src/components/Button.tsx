import React from "react";

type ButtonProps = {
    className: string;
    children: any;
    onClick?: any;
    
}

export const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
    return (
        
        <button onClick={onClick} className={`button  ${className}`}>
            {children}
        </button>
    )
}