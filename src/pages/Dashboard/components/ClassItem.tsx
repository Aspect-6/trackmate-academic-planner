import React from 'react';
import { ClassItemProps } from '@/pages/Dashboard/types';
import { DASHBOARD } from '@/app/styles/colors';

const ClassItem: React.FC<ClassItemProps> = ({ classInfo, period }) => {
    return (
        <div 
            className="flex items-center justify-between p-3 high-contrast-card rounded-lg" 
            style={{ 
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: '#161b22',
                borderColor: '#30363d'
            }}
        >
            <div className="flex-1">
                <p className="font-semibold" style={{ color: DASHBOARD.TEXT_WHITE }}>{classInfo.name}</p>
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Period {period} | {classInfo.teacherName || 'N/A'}</p>
            </div>
            <div className="text-right">
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Room: {classInfo.roomNumber || 'N/A'}</p>
            </div>
        </div>
    );
};

export default ClassItem;
