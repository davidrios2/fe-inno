// src/components/atoms/Typography.tsx
import React, {JSX} from 'react';

type Align = 'left' | 'center' | 'right' | 'justify';
const alignMap: Record<Align, string> = {
    left:    'text-left',
    center:  'text-center',
    right:   'text-right',
    justify: 'text-justify',
};

const DEFAULT_COLOR = 'text-gray-900';

/**
 * Title → H1…H6 all in one.
 * Always includes your `text-shadow-lg/15` class.
 */
export interface TitleProps extends React.HTMLAttributes<HTMLElement> {
    /** 1–6 → renders <h1>…<h6> */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** override rendered tag if you really need to */
    as?: keyof JSX.IntrinsicElements;
    /** Tailwind color (e.g. "text-primary") */
    color?: string;
    /** text alignment */
    align?: Align;
    shadow?: boolean;
    className?: string;
    children: React.ReactNode;
}

const sizeMap: Record<TitleProps['level'], string> = {
    1: 'text-4xl font-extrabold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
};

export const Title: React.FC<TitleProps> = ({
                                                level    = 1,
                                                as,
                                                color    = 'text-primary',
                                                align    = 'left',
                                                shadow   = true,
                                                className = '',
                                                children,
                                                ...rest
                                            }) => {
    const Tag = (as || `h${level}`) as keyof JSX.IntrinsicElements;
    const shadowClass = shadow ? 'text-shadow-lg/15' : '';
    return (
        <Tag
            className={[
                sizeMap[level],
                color,
                alignMap[align],
                shadowClass,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...rest}
        >
            {children}
        </Tag>
    );
};


/**
 * Text → body / small / caption
 * No shadow by default.
 */
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    /** variant → body (p), small (p), caption (span) */
    variant?: 'body' | 'small' | 'caption';
    /** override rendered tag */
    as?: keyof JSX.IntrinsicElements;
    color?: string;
    align?: Align;
    shadow?: boolean;
    className?: string;
    children: React.ReactNode;
}

const textMap = {
    body:    { tag: 'p',    classes: 'text-base leading-relaxed' },
    small:   { tag: 'p',    classes: 'text-sm  leading-snug'     },
    caption: { tag: 'span', classes: 'text-xs'                  },
} as const;

export const Text: React.FC<TextProps> = ({
                                              variant   = 'body',
                                              as,
                                              color     = 'text-secundary',
                                              align     = 'left',
                                              shadow    = false,
                                              className = '',
                                              children,
                                              ...rest
                                          }) => {
    const { tag, classes } = textMap[variant];
    const Tag = (as || tag) as keyof JSX.IntrinsicElements;
    const shadowClass = shadow ? 'text-shadow-lg/15' : '';

    return (
        <Tag
            className={[
                classes,
                color,
                alignMap[align],
                shadowClass,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...rest}
        >
            {children}
        </Tag>
    );
};
