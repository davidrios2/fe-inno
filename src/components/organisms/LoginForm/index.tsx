// src/components/organisms/LoginForm.tsx
import React, { useState } from 'react';
import { Title, Text } from '@/components/atoms/Typography';
import Button            from '@/components/atoms/Button';
import Link              from '@/components/atoms/Link';
import { FormField }     from '@/components/molecules/FormFields';

export interface LoginFormProps {
    onSwitchToSignup: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState<string | null>(null);
    const [loading, setLoading]   = useState(false);

    // handleSubmit function when endpoint is available
    /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                // try to read error message from JSON, or fallback
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || 'Failed to log in');
            }

            const data = await res.json();
            console.log('Logged in successfully:', data);
            // ▶ e.g. save token, redirect, update context, etc.
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };*/

    //Mock of the response
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await fetch('/mock/loginResponse.json')
            if (!res.ok) throw new Error('No pude cargar el mock')

            const data = await res.json()
            console.log('Mock login:', data)
            // …do whatever you’d do with a real response…
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

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
                    onChange={e => setEmail(e.currentTarget.value)}
                />

                <FormField
                    id="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    size="sm"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                />

                <div className="space-y-4 text-center">
                    <Button
                        // note: your Button uses default <button> whose default HTML type is "submit"
                        size="md"
                        fullWidth={false}
                        className="px-12 rounded-lg"
                        // disable while loading
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
