import React from 'react';
import { Title, Text } from '@/components/atoms/Typography';
import { Circle } from '@/components/atoms/Circle';
import Logo from '@/components/molecules/Logo';

interface HeaderProps {
    userEmail: string | null;
}

const Header: React.FC<HeaderProps> = ({ userEmail }) => {
    return (
        <header className="w-full bg-primary p-4 shadow-md flex justify-between items-center text-white">
            <Title level={3} color="text-white">InnoSistemas</Title>
            <div className="flex items-center space-x-3">
                <Text variant="body" color="text-white">{userEmail}</Text>
                <Circle size="sm" bg="bg-gray-200" className="overflow-hidden">
                    {/* You can place a user avatar image here */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </Circle>
            </div>
        </header>
    );
};

export default Header;