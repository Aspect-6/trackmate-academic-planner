import React from 'react';
import { EmptyClassesStateProps } from '@/pages/Classes/types';

const EmptyClassesState: React.FC<EmptyClassesStateProps> = ({ onAddClass }) => {
    return (
        <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No classes added yet.</p>
            <button
                onClick={onAddClass}
                className="mt-4 text-violet-400 hover:text-violet-300 font-medium"
            >
                Add your first class
            </button>
        </div>
    );
};

export default EmptyClassesState;
