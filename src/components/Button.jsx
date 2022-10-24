export const Button = ({ className, children, onClick }) => {
    return (
        
        <button onClick={onClick} className={`button  ${className}`}>
            {children}
        </button>
    )
}