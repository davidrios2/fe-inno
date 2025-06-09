// src/components/molecules/FormField.tsx
import React from 'react';
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

export interface FormFieldProps {
    /** the `id` / htmlFor */
    id: string;
    /** label text */
    label: string;
    /** input type (text, email, password…) */
    type?: string;
    /** placeholder text */
    placeholder?: string;
    /** Input size: sm | md | lg (defaults to sm) */
    size?: 'sm' | 'md' | 'lg';
    /** fullWidth on the input? defaults to true */
    fullWidth?: boolean;
    /** label shadow on/off? defaults to true */
    shadow?: boolean;
    [key: string]: any; // Allow any other props
}

const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-4',
    lg: 'h-12 text-lg px-4',
};

export const FormField: React.FC<FormFieldProps> = ({
                                                        id,
                                                        label,
                                                        type = 'text',
                                                        placeholder = '',
                                                        size = 'sm',
                                                        fullWidth = true,
                                                        shadow = true,
                                                        className = '',
                                                        ...rest
                                                    }) => {
    const sizeClass = sizeClasses[size];
    const inputClassName = `rounded-lg ${sizeClass} ${className}`.trim();

    return (
        <div className="space-y-1">
            <Label htmlFor={id} text={label} shadow={shadow} />
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                fullWidth={fullWidth}
                className={inputClassName}
                {...rest}
            />
        </div>
    );
};