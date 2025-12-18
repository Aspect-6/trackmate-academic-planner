import React, { useState } from 'react';
import { DayTypeProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';
import NoSchoolInfo from './NoSchoolInfo';
import DayTypeDisplay from './DayTypeDisplay';

type PropsWithChildren = DayTypeProps & { children?: React.ReactNode };

const DayType: React.FC<PropsWithChildren> = ({ noSchoolDay, dayType, onNoSchoolClick, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!noSchoolDay && !dayType) return null;

    const isInteractive = Boolean(noSchoolDay && onNoSchoolClick);

    return (
        <div
            id="day-type-info"
            className={`mb-4 p-3 rounded-lg${isInteractive ? ' calendar-side-panel-item cursor-pointer transition-colors' : ''}`}
            style={{ backgroundColor: isInteractive && isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG }}
            onClick={() => isInteractive && onNoSchoolClick!(noSchoolDay!.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children ? (
                children
            ) : noSchoolDay ? (
                <NoSchoolInfo noSchoolDay={noSchoolDay} />
            ) : dayType ? (
                <DayTypeDisplay dayType={dayType} />
            ) : null}
        </div>
    );
};

export default DayType;
