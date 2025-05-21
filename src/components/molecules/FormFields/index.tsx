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

}

export const FormField: React.FC<FormFieldProps> = ({
                                                        id,
                                                        label,
                                                        type = 'text',
                                                        placeholder = '',
                                                        size = 'sm',
                                                        fullWidth = true,
                                                        shadow = true,
                                                        ...rest
                                                    }) => (
    <div className="space-y-1">
        <Label htmlFor={id} text={label} shadow={shadow} />
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            size={size}
            fullWidth={fullWidth}
            className={'rounded-lg'}
            {...rest}
        />
    </div>
);
