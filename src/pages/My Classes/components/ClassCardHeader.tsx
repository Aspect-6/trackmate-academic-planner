import React from 'react';
import { Trash2, Edit2, GripVertical } from 'lucide-react';
import { ClassCardHeaderProps } from '@/pages/Classes/types';

const ClassCardHeader: React.FC<ClassCardHeaderProps> = ({
    name,
    attributes,
    listeners,
    onEdit,
    onDelete
}) => {
    return (
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
                <div {...attributes} {...listeners} className="cursor-grab touch-none p-1 hover:bg-gray-700 rounded">
                    <GripVertical className="w-5 h-5 text-gray-600 group-hover:text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">{name}</h2>
            </div>
            <div className="flex space-x-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onEdit}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Edit Class"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete Class"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ClassCardHeader;
