import React from 'react';

/**
 * Button component - Atomic design element
 *
 * @param {Object} props
 * @param {string} props.text - Button text content
 * @param {string} props.type - Button type (primary, secondary, gradient)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {Function} props.onClick - Click handler function
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {React.ReactNode} props.children - Optional children to replace text
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
                    text = "Button",
                    type = "primary",
                    size = "md",
                    onClick,
                    fullWidth = false,
                    children,
                    className = "",
                    ...rest
                }: { text: string; type: string; size: string; onClick: Function; fullWidth: boolean; children: React.ReactNode; className: string; }) => {
    // Size classes
    const sizeClasses = {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg"
    };

    // Type classes
    const typeClasses = {
        primary: " bg-primary text-white hover:bg-purple-700",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300",
        gradient: "gradient text-white hover:opacity-90"
    };

    // Base classes
    const baseClasses = "font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 cursor-pointer";

    // Width classes
    const widthClasses = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${widthClasses} ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children || text}
        </button>
    );
};

export default Button;