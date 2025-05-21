import React from 'react'
import { Circle }      from '@/components/atoms/Circle'
import Logo            from '@/components/molecules/Logo'
import { Title, Text } from '@/components/atoms/Typography'

export const UdeACard: React.FC = () => (
    <div
        className={`
        md:w-1/2
        gradient
        p-8
        flex flex-col items-center justify-start
        self-stretch
        text-white
        `}
    >
        <Circle size="lg" bg="bg-white" className="overflow-hidden mb-25">
            <Logo
                src="/udea-logo.png"
                alt="UdeA Logo"
                size="lg"
                className="object-contain"
            />
        </Circle>

        <div className="space-y-2">
            <Title level={2} color="secundary" shadow align={'center'}>
                InnoSistemas
            </Title>
            <Title level={5} color="secundary" shadow align={'center'}>
                Gestión de Equipos
            </Title>
        </div>

        <Text variant="body" align={'center'} className="mt-4 max-w-xs">
            Desarrollo colaborativo para estudiantes de la Universidad de Antioquia.
        </Text>
    </div>
)

export default UdeACard
