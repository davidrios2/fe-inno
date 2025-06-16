'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/molecules/Header';
import TeamCard, { TeamCardProps } from '@/components/molecules/TeamCards';
import { Title, Text } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

// Define an interface for the team data structure from your API
interface TeamDetails {
    id: number;
    name: string;
    creatorEmail: string;
    currentMembers: number;
    currentMembersDetails: {
        courseName: string;
        // Add other member details if needed
    }[];
    availableSpots: number;
}

const TeamsPage = () => {
    const router = useRouter();
    const [team, setTeam] = useState<TeamDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Retrieves the JWT from localStorage, decodes its payload,
     * and extracts the user's email from the 'sub' (subject) claim.
     */
    function getEmailFromAuthToken(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }
        const jwtTokenString = localStorage.getItem('accessToken');
        if (!jwtTokenString) {
            return null;
        }
        try {
            // Decode the payload from the token
            const payload = JSON.parse(atob(jwtTokenString.split('.')[1]));
            return payload.sub || null; // 'sub' usually holds the email
        } catch (e) {
            console.error('Failed to decode JWT or find email:', e);
            return null;
        }
    }

    useEffect(() => {
        const fetchMyTeam = async () => {
            setLoading(true);
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                setError('Authentication required. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://innosistemas-back.onrender.com/api/v1/teams/my-team', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 404) {
                    // This is not an error, it just means the user has no team yet.
                    setTeam(null);
                } else if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch your team');
                } else {
                    const data: TeamDetails = await response.json();
                    setTeam(data);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyTeam();
    }, []);

    // Helper to map API data to the props the TeamCard component expects
    const mapTeamToCardProps = (teamData: TeamDetails): TeamCardProps => ({
        role: teamData.name,
        subject: teamData.currentMembersDetails[0]?.courseName || 'N/A',
        members: teamData.currentMembers,
        status: teamData.availableSpots === 0 ? 'completo' : 'incompleto',
        onViewDetails: () => alert(`Viewing details for ${teamData.name}`),
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Header userEmail={getEmailFromAuthToken()} />

            <main className="w-full max-w-4xl mx-auto p-8 flex flex-col items-center flex-grow">
                <Title level={2} className="mb-8 text-gray-700">
                    Mi Equipo
                </Title>

                <div className="w-full flex flex-col items-center space-y-6">
                    {loading ? (
                        <p>Loading your team...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : team ? (
                        // If a team was found, display it
                        <TeamCard {...mapTeamToCardProps(team)} />
                    ) : (
                        // If no team was found, display the "empty state" card
                        <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-3xl">
                            <Title level={4} className="text-gray-700 mb-2">
                                Aún no tienes un equipo
                            </Title>
                            <Text variant="body" className="text-gray-500">
                                Parece que no has creado un equipo o no te han invitado a uno.
                                ¡Usa el botón de abajo para crear tu primer equipo!
                            </Text>
                        </div>
                    )}
                </div>

                <div className="mt-12">
                    <Button
                        variant="primary"
                        size="lg"
                        className="flex flex-col items-center !px-6 !py-4"
                        onClick={() => router.push('/teams/create')}
                        disabled={!!team || loading} // Disable button if a team exists or is loading
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Crear Grupo
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default TeamsPage;