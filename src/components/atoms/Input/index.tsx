import React, { InputHTMLAttributes } from 'react';

type InputProps = {
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Input type (text, email, password, etc.) */
    type?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>,
    'placeholder' | 'value' | 'onChange' | 'type'>;

const Input: React.FC<InputProps> = ({
                                         placeholder = '',
                                         value,
                                         onChange,
                                         type = 'text',
                                         size = 'md',
                                         fullWidth = false,
                                         className = '',
                                         ...rest
                                     }) => {
    // Padding/font sizes
    const sizeClasses: Record<typeof size, string> = {
        sm: 'py-1 px-2 text-sm',
        md: 'py-2 px-3 text-base',
        lg: 'py-3 px-4 text-lg',
    };

    // Base styles
    const base =
        'border border-primary rounded transition duration-200 ' +
        'focus:outline-none focus:border-gradient ' +
        'focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50';

    const widthClass = fullWidth ? 'w-full' : 'inline-block';

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${base} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...rest}
        />
    );
};

export default Input;