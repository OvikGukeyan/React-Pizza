import React from "react";

type ButtonProps = {
    className: string;
    children: any;
    onClick?: () => void;
    
}

const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
    return (
        
        <button onClick={onClick} className={`button  ${className}`}>
            {children}
        </button>
    )
};

export default Button;