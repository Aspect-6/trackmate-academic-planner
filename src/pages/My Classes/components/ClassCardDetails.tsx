import React from 'react';
import { ClassCardDetailsProps } from '@/pages/Classes/types';

const ClassCardDetails: React.FC<ClassCardDetailsProps> = ({ teacherName, roomNumber, color }) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center text-sm">
                <span className="w-24 text-gray-500">Instructor:</span>
                <span className="text-gray-300 font-medium">{teacherName || 'N/A'}</span>
            </div>
            <div className="flex items-center text-sm">
                <span className="w-24 text-gray-500">Room:</span>
                <span className="text-gray-300 font-medium">{roomNumber || 'N/A'}</span>
            </div>
            <div className="flex items-center text-sm">
                <span className="w-24 text-gray-500">Color:</span>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: color }}></div>
                    <span className="text-gray-400 text-xs uppercase">{color}</span>
                </div>
            </div>
        </div>
    );
};

export default ClassCardDetails;
