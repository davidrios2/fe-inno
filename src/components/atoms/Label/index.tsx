// src/components/atoms/Label.tsx
import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
    shadow?: boolean;
    className?: string;
}

const Label: React.FC<LabelProps> = ({
                                         text,
                                         htmlFor,
                                         shadow = true,
                                         className = '',
                                         children,
                                         ...rest
                                     }) => {
    // Tailwind “filter drop-shadow” applies a lightweight shadow under the text
    const shadowClass = shadow ? 'filter text-shadow-lg/15' : '';

    return (
        <label
            htmlFor={htmlFor}
            className={`
            text-primary
        text-base
        font-medium
        text-gray-700
        ${shadowClass}
        ${className}
      `.trim()}
            {...rest}
        >
            {children || text}
        </label>
    );
};

export default Label;