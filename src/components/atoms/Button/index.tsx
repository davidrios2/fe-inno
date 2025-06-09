import React from 'react';

// Define specific literal types for 'size' and 'variant'
export type ButtonSize = 'sm' | 'md' | 'lg';
// IMPORTANT: Renamed 'type' to 'variant' to avoid conflict with native HTML button 'type' attribute
export type ButtonVariant = 'primary' | 'secondary' | 'gradient';

/**
 * Interface for the Button component's props.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button text content. Can be overridden by `children`. */
    text?: string;
    /** Button style variant (primary, secondary, gradient). This replaces the conflicting 'type' prop. */
    variant?: ButtonVariant; // Use the specific literal type
    /** Button size (sm, md, lg). */
    size?: ButtonSize; // Use the specific literal type
    /** Click handler function. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // More specific type for onClick
    /** Whether the button takes full width. */
    fullWidth?: boolean;
    /** Optional children to replace or complement `text`. */
    children?: React.ReactNode;
    /** Additional CSS classes for custom styling. */
    className?: string;
    // Note: The native 'type' attribute (e.g., "submit", "reset", "button") is still available
    // from React.ButtonHTMLAttributes and can be passed directly if needed.
}

/**
 * Button component - Atomic design element
 *
 * @param {ButtonProps} props - Props for the Button component.
 */
const Button: React.FC<ButtonProps> = ({ // Use React.FC<ButtonProps> for clearer typing
                                           text = "Button",
                                           variant = "primary", // Use 'variant' here as the prop name
                                           size = "md",
                                           onClick,
                                           fullWidth = false,
                                           children,
                                           className = "",
                                           ...rest
                                       }) => {
    // Size classes - Explicitly typed with Record to ensure correct key access
    const sizeClasses: Record<ButtonSize, string> = {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg"
    };

    // Variant classes - Explicitly typed with Record to ensure correct key access
    const variantClasses: Record<ButtonVariant, string> = { // Renamed from typeClasses
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
            // Use variantClasses[variant] here
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children || text}
        </button>
    );
};

export default Button;