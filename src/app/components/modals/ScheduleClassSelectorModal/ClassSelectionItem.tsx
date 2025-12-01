import React from 'react';
import { Class } from '@/app/types';

interface ClassSelectionItemProps {
    classItem: Class;
    onSelect: (classId: string) => void;
}

export const ClassSelectionItem: React.FC<ClassSelectionItemProps> = ({ classItem, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(classItem.id)}
            className="w-full text-left p-3 rounded-lg border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-colors flex items-center space-x-3"
        >
            <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: classItem.color }}
            ></div>
            <div className="flex-grow">
                <div className="font-medium text-white">{classItem.name}</div>
                <div className="text-sm text-gray-400">
                    {classItem.teacherName || 'No instructor'} • {classItem.roomNumber || 'No room'}
                </div>
            </div>
        </button>
    );
};
