import React from 'react';
import { Text } from '@/components/atoms/Typography';
import Checkbox from '@/components/atoms/Checkbox';

export interface Student {
    id: number;
    name: string;
    email: string;
}

interface StudentListItemProps {
    student: Student;
    isChecked: boolean;
    onToggle: (id: number) => void;
    isDisabled?: boolean; // Add this new prop
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, isChecked, onToggle, isDisabled = false }) => {
    return (
        // Add a class for visual feedback on disabled items
        <div className={`flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0 ${isDisabled ? 'opacity-50' : ''}`}>
            <div>
                <Text variant="body" className="font-medium text-gray-800">{student.name}</Text>
                <Text variant="small" className="text-gray-500">{student.email}</Text>
            </div>
            {/* Pass the isDisabled prop down to the Checkbox */}
            <Checkbox checked={isChecked} onChange={() => onToggle(student.id)} disabled={isDisabled} />
        </div>
    );
};

export default StudentListItem;