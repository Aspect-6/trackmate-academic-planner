import React from 'react';
import { CalendarSidePanelProps } from '@/pages/Calendar/types';
import Header from './Header';
import { CALENDAR } from '@/app/styles/colors';


const CalendarSidePanel: React.FC<CalendarSidePanelProps & { children: React.ReactNode }> = ({ date, children }) => {
    if (!date) return null;
    
    return (
        <div
        id="calendar-side-panel"
        className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto w-full lg:w-80 border rounded-xl shadow-2xl overflow-y-auto z-20 flex flex-col p-4 lg:rounded-none lg:border-0 lg:border-l"
        style={{ backgroundColor: CALENDAR.SIDE_PANEL_BG, borderColor: CALENDAR.SIDE_PANEL_BORDER }}
        >
            {children}
        </div>
    );
};

export default CalendarSidePanel;

export const CalendarSidePanelHeader = Header;
export { default as DateDisplay } from './Header/DateDisplay';
export { default as CloseButton } from './Header/CloseButton';
export { default as DayType } from './Body/DayType';
export { default as ClassList } from './Body/ClassList';
export { default as AssignmentList } from './Body/AssignmentList';
export { default as EventList } from './Body/EventList';
export { default as NoSchoolInfo } from './Body/DayType/NoSchoolInfo';
export { default as DayTypeDisplay } from './Body/DayType/DayTypeDisplay';
export { default as CalendarSidePanelBody } from './Body';