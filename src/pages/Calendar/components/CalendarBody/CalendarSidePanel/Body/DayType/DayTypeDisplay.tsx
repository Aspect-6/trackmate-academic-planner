import React from 'react';
import { CALENDAR } from '@/app/styles/colors';

interface DayTypeDisplayProps {
    dayType?: 'A' | 'B' | null;
}

const DayTypeDisplay: React.FC<DayTypeDisplayProps> = ({ dayType }) => {
    if (!dayType) return null;

    return (
        <div className="text-center">
            <div className="font-bold text-lg" style={{ color: dayType === 'A' ? CALENDAR.A_DAY_TEXT : CALENDAR.B_DAY_TEXT }}>
                {dayType}-Day
            </div>
        </div>
    );
};

export default React.memo(DayTypeDisplay);
