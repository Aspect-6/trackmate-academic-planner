import React from 'react';
import { CalendarDayAssignmentProps } from '@/pages/Calendar/types';
import { getTextColorForBackground } from '@/app/lib/utils';

const CalendarDayAssignment: React.FC<CalendarDayAssignmentProps> = ({ assignment, color, onClick }) => {
    const textColor = getTextColorForBackground(color);
    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(assignment.id); }}
            className="calendar-assignment"
            style={{ backgroundColor: color, color: textColor }}
        >
            {assignment.title}
        </div>
    );
};

export default CalendarDayAssignment;
