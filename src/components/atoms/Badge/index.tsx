import React from 'react';

interface BadgeProps {
    text: string;
    variant?: 'complete' | 'incomplete';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, variant = 'complete', className = '' }) => {
    const baseClasses = 'inline-block px-3 py-1 text-xs font-semibold rounded-full';

    const variantClasses = {
        complete: 'bg-purple-100 text-primary',
        incomplete: 'bg-gray-200 text-gray-800',
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {text}
    </span>
    );
};

export default Badge;