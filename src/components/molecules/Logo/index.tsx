// src/components/molecules/Avatar.tsx
import React from 'react';
import {Circle} from "@/components/atoms/Circle";

export interface LogoProps {
    src: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * Avatar molecule — circle wrapper + img inside
 */
export const Logo: React.FC<LogoProps> = ({
                                                  src,
                                                  alt = '',
                                                  size = 'md',
                                                  className = '',
                                              }) => (
    <Circle
        size={size}
        className={`overflow-hidden ${className}`}
    >
        <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
        />
    </Circle>
);

export default Logo;
