import React from 'react';
import { Title, Text } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

export interface TeamCardProps {
    role: string;
    subject: string;
    members: number;
    status: 'completo' | 'incompleto';
    onViewDetails: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ role, subject, members, status, onViewDetails }) => {
    return (
        // UPDATE: Changed max-w-2xl to max-w-3xl to make the card wider
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full max-w-3xl">
            <div className="flex flex-col space-y-2">
                <Title level={4} className="text-gray-800">{role}</Title>
                <Text variant="body" className="text-gray-600">
                    {subject} - {members} miembros
                </Text>
                <Badge text={status} variant={status === 'completo' ? 'complete' : 'incomplete'} />
            </div>
            <Button variant="primary" size="sm" onClick={onViewDetails}>
                Ver Detalles
            </Button>
        </div>
    );
};

export default TeamCard;