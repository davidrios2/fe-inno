// src/components/atoms/Circle.tsx
import React from 'react'

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm'|'md'|'lg'
    bg?: string
    children: React.ReactNode
}

const sizes = { sm:'w-12 h-12', md:'w-16 h-16', lg:'w-28 h-28' }

export const Circle: React.FC<CircleProps> = ({
                                                  size='md', bg='bg-white', className='', children, ...rest
                                              }) => (
    <div
        className={[
            sizes[size],
            bg,
            'rounded-full flex items-center justify-center',
            className
        ].join(' ')}
        {...rest}
    >
        {children}
    </div>
)
