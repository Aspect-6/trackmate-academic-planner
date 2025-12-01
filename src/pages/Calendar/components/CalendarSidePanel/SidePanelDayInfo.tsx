import React, { useState } from 'react';
import { SidePanelDayInfoProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';

const SidePanelDayInfo: React.FC<SidePanelDayInfoProps> = ({ noSchoolDay, dayType, onNoSchoolClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!noSchoolDay && !dayType) return null;

    const isInteractive = noSchoolDay && onNoSchoolClick;

    return (
        <div
            id="day-type-info"
            className={`mb-4 p-3 rounded-lg${isInteractive ? ' calendar-side-panel-item cursor-pointer transition-colors' : ''}`}
            style={{ backgroundColor: isInteractive && isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG }}
            onClick={() => isInteractive && onNoSchoolClick(noSchoolDay.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {noSchoolDay ? (
                <div className="text-center">
                    <div className="font-semibold" style={{ color: CALENDAR.NO_SCHOOL_HEADING }}>No School</div>
                    <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{noSchoolDay.name}</div>
                </div>
            ) : dayType ? (
                <div className="text-center">
                    <div className="font-bold text-lg" style={{ color: dayType === 'A' ? CALENDAR.A_DAY_TEXT : CALENDAR.B_DAY_TEXT }}>
                        {dayType}-Day
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SidePanelDayInfo;
