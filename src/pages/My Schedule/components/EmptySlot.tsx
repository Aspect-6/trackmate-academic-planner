import React from 'react';
import { EmptySlotProps } from '@/pages/Schedule/types';


const EmptySlot: React.FC<EmptySlotProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 rounded-lg border-2 border-dashed border-gray-600 flex flex-col min-h-[200px] cursor-pointer hover:border-gray-400 transition-colors"
            style={{ backgroundColor: '#161b22' }}
        >
            <div className="flex-grow flex items-center justify-center">
                <h4 className="font-semibold text-gray-500 text-center">
                    Empty Slot<br />
                    <span className="text-xs text-gray-600">Click to add class</span>
                </h4>
            </div>
        </div>
    );
};

export default EmptySlot;
