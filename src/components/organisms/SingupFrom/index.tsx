// src/components/organisms/SignupForm.tsx
import React, { useState } from 'react';
import { Title, Text }           from '@/components/atoms/Typography';
import Button                    from '@/components/atoms/Button';
import Link                      from '@/components/atoms/Link';
import { FormField }             from '@/components/molecules/FormFields';

export interface SignupFormProps {
    onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
    // 1) Form state
    const [name, setName]                           = useState('');
    const [identityDocument, setIdentityDocument]   = useState('');
    const [email, setEmail]                         = useState('');
    const [password, setPassword]                   = useState('');
    const [courseId, setCourseId]                   = useState('');
    const [roleId, setRoleId]                       = useState('');
    const [error, setError]                         = useState<string | null>(null);
    const [loading, setLoading]                     = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const host = 'https://innosistemas-back.onrender.com';
            const res = await fetch(host+'/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    identityDocument,
                    email,
                    password,
                    roleId: Number(roleId),
                    courseId: Number(courseId),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || 'Error registrando usuario');
            }

            alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
            onSwitchToLogin();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:w-1/2 p-8 bg-white">
            <Title level={1} shadow className="mb-25" align="center">
                Registrarse
            </Title>

            {error && (
                <Text variant="body" className="mb-4 text-red-600" align="center">
                    {error}
                </Text>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="username"
                    label="Nombre y apellidos"
                    type="text"
                    placeholder="Nombre Completo"
                    size="sm"
                    fullWidth
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                />

                <FormField
                    id="nationalDocument"
                    label="Documento de identidad"
                    type="text"
                    placeholder="Número de documento"
                    size="sm"
                    fullWidth
                    value={identityDocument}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentityDocument(e.target.value)}
                    required
                />

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

                <FormField
                    id="curso"
                    label="Curso"
                    type="number"
                    placeholder="ID del curso (e.g. 2)"
                    size="sm"
                    fullWidth
                    value={courseId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseId(e.target.value)}
                    required
                />

                <FormField
                    id="rol"
                    label="Rol"
                    type="number"
                    placeholder="ID del rol (e.g. 1)"
                    size="sm"
                    fullWidth
                    value={roleId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleId(e.target.value)}
                    required
                />

                <div className="space-y-4 text-center">
                    <Button
                        variant="primary"
                        size="md"
                        className="px-12 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Registrarse'}
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <Text variant="body" className="inline">
                    ¿Ya tienes cuenta?{' '}
                </Text>
                <Link
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        onSwitchToLogin();
                    }}
                    className="text-primary text-shadow-lg/15 font-semibold"
                >
                    Iniciar sesión
                </Link>
            </div>
        </div>
    );
};

export default SignupForm;