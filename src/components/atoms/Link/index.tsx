// src/components/atoms/Link.tsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // remove if you don't use React Router

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** URL to navigate to (href or to) */
    href?: string;
    /** for React Router—internal navigation */
    to?: string;
    /** open in new tab with rel="noopener noreferrer" */
    external?: boolean;
    /** link text or nodes */
    children: React.ReactNode;
    /** any extra classes */
    className?: string;
}

const Link: React.FC<LinkProps> = ({
                                       href,
                                       to,
                                       external = false,
                                       children,
                                       className = '',
                                       ...rest
                                   }) => {
    // Base link styles: primary purple, underlined, smooth color transition, focus ring
    const baseStyles =
        'text-primary underline transition-colors duration-200 cursor-pointer ' +
        'hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50';

    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`${baseStyles} ${className}`.trim()}
            {...rest}
        >
            {children}
        </a>
    );
};

export default Link;
