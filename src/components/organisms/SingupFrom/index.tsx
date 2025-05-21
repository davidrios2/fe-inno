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
    const [courseId, setCourseId]                   = useState('');
    const [roleId, setRoleId]                       = useState('');
    const [error, setError]                         = useState<string | null>(null);
    const [loading, setLoading]                     = useState(false);

    //ncomment when `/users` is available
    /*
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const res = await fetch('/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            identityDocument,
            roleId: Number(roleId),
            courseId: Number(courseId),
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || 'Error registrando usuario');
        }

        const data = await res.json();
        console.log('Usuario creado:', data);
        // ▶ e.g. redirect to /login or show success message
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    */

    // mock submit — builds the JSON from the state instead of fetching a file
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        console.log({ name, email, identityDocument, roleId, courseId });
        try {
            // simulate network latency
            await new Promise(r => setTimeout(r, 500));

            // build the mock response from your form data
            const mockUser = {
                id: Math.floor(Math.random() * 10000),    // random or fixed ID
                name,
                email,
                identityDocument,
                roleId: Number(roleId),
                courseId: Number(courseId),
            };

            console.log('Mock usuario creado:', mockUser);
            // — here you could e.g. call a callback, redirect, etc.
        } catch (err: any) {
            setError(err.message || 'Error creando usuario (mock)');
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
                    onChange={e => setName(e.currentTarget.value)}
                />

                <FormField
                    id="nationalDocument"
                    label="Documento de identidad"
                    type="text"
                    placeholder="Número de documento"
                    size="sm"
                    fullWidth
                    value={identityDocument}
                    onChange={e => setIdentityDocument(e.currentTarget.value)}
                />

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
                    id="curso"
                    label="Curso"
                    type="text"
                    placeholder="ID del curso (e.g. 3)"
                    size="sm"
                    fullWidth
                    value={courseId}
                    onChange={e => setCourseId(e.currentTarget.value)}
                />

                <FormField
                    id="rol"
                    label="Rol"
                    type="text"
                    placeholder="ID del rol (e.g. 2)"
                    size="sm"
                    fullWidth
                    value={roleId}
                    onChange={e => setRoleId(e.currentTarget.value)}
                />

                <div className="space-y-4 text-center">
                    <Button
                        type="primary"
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
                    onClick={e => {
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
