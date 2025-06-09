// src/components/atoms/Typography.tsx
import React from 'react';

type Align = 'left' | 'center' | 'right' | 'justify';
const alignMap: Record<Align, string> = {
    left:    'text-left',
    center:  'text-center',
    right:   'text-right',
    justify: 'text-justify',
};

/**
 * Title → H1…H6 all in one.
 */
export interface TitleProps {
    /** 1–6 → renders <h1>…<h6> */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Tailwind color (e.g. "text-primary") */
    color?: string;
    /** text alignment */
    align?: Align;
    shadow?: boolean;
    className?: string;
    children: React.ReactNode;
    [key: string]: any; // Allow any other props
}

const sizeMap = {
    1: 'text-4xl font-extrabold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
} as const;

export const Title: React.FC<TitleProps> = ({
                                                level = 1,
                                                color = 'text-primary',
                                                align = 'left',
                                                shadow = true,
                                                className = '',
                                                children,
                                                ...rest
                                            }) => {
    const shadowClass = shadow ? 'text-shadow-lg/15' : '';
    const classes = [
        sizeMap[level as keyof typeof sizeMap],
        color,
        alignMap[align],
        shadowClass,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const props = { className: classes, ...rest };

    switch (level) {
        case 1: return <h1 {...props}>{children}</h1>;
        case 2: return <h2 {...props}>{children}</h2>;
        case 3: return <h3 {...props}>{children}</h3>;
        case 4: return <h4 {...props}>{children}</h4>;
        case 5: return <h5 {...props}>{children}</h5>;
        case 6: return <h6 {...props}>{children}</h6>;
        default: return <h1 {...props}>{children}</h1>;
    }
};

/**
 * Text → body / small / caption
 */
export interface TextProps {
    /** variant → body (p), small (p), caption (span) */
    variant?: 'body' | 'small' | 'caption';
    color?: string;
    align?: Align;
    shadow?: boolean;
    className?: string;
    children: React.ReactNode;
    [key: string]: any; // Allow any other props
}

const textClasses = {
    body:    'text-base leading-relaxed',
    small:   'text-sm leading-snug',
    caption: 'text-xs',
} as const;

export const Text: React.FC<TextProps> = ({
                                              variant = 'body',
                                              color = 'text-secundary',
                                              align = 'left',
                                              shadow = false,
                                              className = '',
                                              children,
                                              ...rest
                                          }) => {
    const shadowClass = shadow ? 'text-shadow-lg/15' : '';
    const classes = [
        textClasses[variant],
        color,
        alignMap[align],
        shadowClass,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const props = { className: classes, ...rest };

    switch (variant) {
        case 'body': return <p {...props}>{children}</p>;
        case 'small': return <p {...props}>{children}</p>;
        case 'caption': return <span {...props}>{children}</span>;
        default: return <p {...props}>{children}</p>;
    }
};