import { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { X } from 'lucide-react';
import { dateToLocalISOString } from '@/app/lib/utils';
import { CalendarSidePanelProps } from '@/pages/Calendar/types';
import SidePanelDayInfo from '@/pages/Calendar/components/CalendarSidePanel/SidePanelDayInfo';
import SidePanelClasses from '@/pages/Calendar/components/CalendarSidePanel/SidePanelClasses';
import SidePanelAssignments from '@/pages/Calendar/components/CalendarSidePanel/SidePanelAssignments';
import SidePanelEvents from '@/pages/Calendar/components/CalendarSidePanel/SidePanelEvents';
import { CALENDAR } from '@/app/styles/colors';

const CalendarSidePanel = ({ date, onClose }: CalendarSidePanelProps) => {
    const {
        assignments, events, noSchool,
        getClassById, getDayTypeForDate, getClassesForDate,
        openModal
    } = useApp();
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    if (!date) return null;

    const dateString = dateToLocalISOString(date);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Check for no school
    const noSchoolDay = noSchool.find(ns => {
        return dateString >= ns.startDate && dateString <= ns.endDate;
    });

    // Get Day Type
    const dayType = getDayTypeForDate(dateString);
    const dayClasses = !noSchoolDay && dayType ? getClassesForDate(dateString) : [];

    // Get Assignments due
    const dueAssignments = assignments.filter(a => a.dueDate === dateString);

    // Get Events
    const dayEvents = events.filter(e => e.date === dateString).sort((a, b) => {
        if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
        if (a.startTime) return -1;
        if (b.startTime) return 1;
        return 0;
    });

    return (
        <div
            id="calendar-side-panel"
            className="absolute top-0 right-0 bottom-0 w-full lg:w-80 border-l shadow-2xl overflow-y-auto z-20 flex flex-col p-4"
            style={{ backgroundColor: CALENDAR.SIDE_PANEL_BG, borderColor: CALENDAR.SIDE_PANEL_BORDER }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{formattedDate}</h3>
                <button 
                    onClick={onClose} 
                    onMouseEnter={() => setIsCloseHovered(true)}
                    onMouseLeave={() => setIsCloseHovered(false)}
                    className="calendar-side-panel-close transition-colors" 
                    style={{ color: isCloseHovered ? CALENDAR.SIDE_PANEL_CLOSE_ICON_HOVER : CALENDAR.SIDE_PANEL_CLOSE_ICON }}
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-6">
                <SidePanelDayInfo
                    noSchoolDay={noSchoolDay}
                    dayType={dayType}
                    onNoSchoolClick={(id) => openModal('edit-no-school', id)}
                />

                <SidePanelClasses
                    classes={dayClasses}
                    noSchoolDay={noSchoolDay}
                    getClassById={getClassById}
                />

                <SidePanelAssignments
                    assignments={dueAssignments}
                    getClassById={getClassById}
                    onAssignmentClick={(id) => openModal('edit-assignment', id)}
                />

                <SidePanelEvents
                    events={dayEvents}
                    onEventClick={(id) => openModal('edit-event', id)}
                />
            </div>
        </div>
    );
};

export default CalendarSidePanel;
