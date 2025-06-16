import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-purple-500"
                {...rest}
            />
            {label && <span className="text-gray-700">{label}</span>}
        </label>
    );
};

export default Checkbox;