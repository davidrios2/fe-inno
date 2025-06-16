'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/molecules/Header';
import { FormField } from '@/components/molecules/FormFields';
import { Title } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import InfoBanner from '@/components/atoms/InfoBanner';
import StudentListItem, { Student } from '@/components/molecules/StudentListItem';


interface UserTeam {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
/*    role: string;
    course: string | null;
    enabled: boolean;
    team: UserTeam | null;*/
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

interface UsersApiResponse {
    content: User[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

async function fetchUsers(): Promise<User[] | null> {
    const host = 'https://innosistemas-back.onrender.com';
    const endpoint = '/api/v1/users/get-users';
    let accessToken: string | null = null;

    // Asegurarse de que localStorage está disponible (entorno de navegador)
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('accessToken');
    }

    if (!accessToken) {
        console.error('No access token found in localStorage.');
        return null;
    }

    try {
        const response = await fetch(`${host}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Importante: Bearer token
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Intenta parsear el error
            console.error('Failed to fetch users:', response.status, errorData);
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: UsersApiResponse = await response.json();
        return data.content.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
        }));
        //return data.content; // Devuelve solo el array de usuarios

    } catch (error) {
        console.error('Error fetching users:', error);
        // Aquí podrías manejar el error de forma más específica si es necesario
        // Por ejemplo, si el token es inválido (401, 403), podrías redirigir al login
        return null;
    }
}

async function createTeamOnServer(teamName: string, userIds: number[], accessToken: string): Promise<any> { // Puedes definir una interfaz para la respuesta si la conoces
    const host = 'https://innosistemas-back.onrender.com';
    const endpoint = '/api/v1/teams';

    const body = {
        name: teamName,
        statusId: 1,
        userIds: userIds,
    };

    try {
        const response = await fetch(`${host}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al crear el equipo y no se pudo leer el cuerpo del error.' }));
            console.error('Failed to create team:', response.status, errorData);
            throw new Error(errorData.message || `Error del servidor: ${response.status}`);
        }

        return await response.json(); // Devuelve la respuesta del servidor (ej. el equipo creado)
    } catch (error) {
        console.error('Error creating team:', error);
        throw error; // Re-lanza el error para que el componente lo maneje
    }
}

const CreateTeamPage = () => {

    const router = useRouter();
    const [teamName, setTeamName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [availableStudents, setAvailableStudents] = useState<Student[]>([]); // Estado para estudiantes de la API
    const [loadingStudents, setLoadingStudents] = useState(true); // Estado de carga
    const [errorStudents, setErrorStudents] = useState<string | null>(null); // Changed String to string
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para la creación del equipo
    const [submitError, setSubmitError] = useState<string | null>(null); // Estado para errores de envío

    const maxSelections = 2;

    // Cargar estudiantes cuando el componente se monta
    useEffect(() => {
        const loadStudents = async () => {
            setLoadingStudents(true);
            setErrorStudents(null);
            try {
                const fetchedStudents = await fetchUsers();
                if (fetchedStudents) {
                    // Aquí podrías filtrar para excluir al usuario actual si es necesario
                    // Por ejemplo, si tienes el email del usuario actual:
                    // const currentUserEmail = getEmailFromAuthToken(); // Suponiendo que tienes esta función
                    // const studentsToDisplay = fetchedStudents.filter(s => s.email !== currentUserEmail);
                    // setAvailableStudents(studentsToDisplay);
                    setAvailableStudents(fetchedStudents);
                } else {
                    setErrorStudents("No se pudieron cargar los estudiantes o no se encontraron.");
                }
            } catch (e: any) {
                setErrorStudents(e.message || "Ocurrió un error inesperado al cargar estudiantes.");
            } finally {
                setLoadingStudents(false);
            }
        };

        loadStudents();
    }, []);

    const handleToggleStudent = (id: number) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevenir el envío tradicional del formulario
        setIsSubmitting(true);
        setSubmitError(null);

        let accessToken: string | null = null;
        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('accessToken');
        }

        if (!accessToken) {
            setSubmitError('No se encontró el token de autenticación. Por favor, inicie sesión de nuevo.');
            setIsSubmitting(false);
            return;
        }

        if (!teamName.trim()) {
            setSubmitError('El nombre del equipo no puede estar vacío.');
            setIsSubmitting(false);
            return;
        }

        // Aquí podrías añadir validación para selectedStudents si es necesario (ej. mínimo 1)

        try {
            const createdTeam = await createTeamOnServer(teamName, selectedStudents, accessToken);
            console.log('Equipo creado:', createdTeam);
            // Aquí puedes redirigir al usuario, mostrar un mensaje de éxito, etc.
            // Por ejemplo, redirigir a la página de equipos:
            router.push('/teams'); // Asegúrate de que esta ruta exista
            // O mostrar un mensaje de éxito
            // alert('¡Equipo creado exitosamente!');
        } catch (error: any) {
            setSubmitError(error.message || 'Ocurrió un error al crear el equipo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredStudents = availableStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Header userEmail="usuario@udea.edu.co" />

            <main className="w-full flex-grow flex items-center justify-center p-4 sm:p-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
                    <Title level={3} align="center" className="mb-8 text-gray-700">
                        Crear nuevo equipo
                    </Title>

                    {submitError && (
                        <InfoBanner className="text-red-500 mb-4">
                            {submitError}
                        </InfoBanner>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <FormField
                            id="teamName"
                            label="Nombre del equipo"
                            placeholder="Ingrese un nombre para su equipo"
                            value={teamName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)}
                        />

                        <div>
                            <label className="text-base font-medium text-gray-700">
                                Integrantes del equipo (Seleccione hasta {maxSelections} compañeros)
                            </label>
                            <InfoBanner className="my-2">
                                Usted será incluido automáticamente como miembro del equipo.
                            </InfoBanner>
                            <FormField
                                id="search"
                                label=""
                                placeholder="Buscar estudiantes por nombre o correo"
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Student List */}
                        <div className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
                            {loadingStudents && <p className="p-4 text-center text-gray-500">Cargando estudiantes...</p>}
                            {errorStudents && <p className="p-4 text-center text-red-500">{errorStudents}</p>}
                            {!loadingStudents && !errorStudents && filteredStudents.length === 0 && (
                                <p className="p-4 text-center text-gray-500">No se encontraron estudiantes o no hay estudiantes disponibles.</p>
                            )}
                            {!loadingStudents && !errorStudents && filteredStudents.map(student => {
                                const isChecked = selectedStudents.includes(student.id);
                                const isDisabled = !isChecked && selectedStudents.length >= maxSelections;
                                return (
                                    <StudentListItem
                                        key={student.id}
                                        student={student}
                                        isChecked={isChecked}
                                        isDisabled={isDisabled}
                                        onToggle={handleToggleStudent}
                                    />
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button variant="secondary" type="button" onClick={() => router.back()} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creando...' : 'Aceptar'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateTeamPage;