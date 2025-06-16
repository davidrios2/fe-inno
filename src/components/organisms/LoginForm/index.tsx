'use client';

import React, { useState } from 'react';
import { Title, Text } from '@/components/atoms/Typography';
import Button            from '@/components/atoms/Button';
import Link              from '@/components/atoms/Link';
import { FormField }     from '@/components/molecules/FormFields';
import { useRouter } from 'next/navigation';

export interface LoginFormProps {
    onSwitchToSignup: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState<string | null>(null);
    const [loading, setLoading]   = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const host = 'https://innosistemas-back.onrender.com';
            const res = await fetch(`${host}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || 'Failed to log in');
            }

            const data = await res.json();
            console.log('Logged in successfully:', data);
            localStorage.setItem('accessToken', data.accessToken);
            router.push('/teams');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:w-1/2 p-8 bg-white">
            <Title level={1} shadow className="mb-25" align="center">
                Iniciar Sesión
            </Title>

            {error && (
                <Text variant="body" className="mb-4 text-red-600" align="center">
                    {error}
                </Text>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="email"
                    label="Correo Institucional"
                    type="email"
                    placeholder="usuario@udea.edu.co"
                    size="sm"
                    fullWidth
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                />

                <FormField
                    id="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    size="sm"
                    fullWidth
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                />

                <div className="space-y-4 text-center">
                    <Button
                        type="submit"
                        size="md"
                        fullWidth={false}
                        className="px-12 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Iniciar Sesión'}
                    </Button>

                    <Link to="/forgot-password" className="text-sm block">
                        ¿Olvidaste la contraseña?
                    </Link>
                </div>
            </form>

            <div className="mt-8 text-center">
                <Text variant="body" className="inline">
                    ¿No tienes cuenta?{' '}
                </Text>
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault()
                        onSwitchToSignup()
                    }}
                    className="text-primary text-shadow-lg/15 font-semibold cursor-pointer"
                >
                    Registrarse
                </a>
            </div>
        </div>
    );
};

export default LoginForm;