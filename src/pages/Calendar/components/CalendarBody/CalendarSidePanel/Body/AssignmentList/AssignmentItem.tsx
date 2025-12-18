import React, { useState } from 'react';
import { Assignment } from '@/app/types';
import { SidePanelAssignmentsProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';

interface AssignmentItemProps {
    assignment: Assignment;
    getClassById: SidePanelAssignmentsProps['getClassById'];
    onAssignmentClick: SidePanelAssignmentsProps['onAssignmentClick'];
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ assignment, getClassById, onAssignmentClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const linkedClass = getClassById(assignment.classId);
    const classColor = linkedClass ? linkedClass.color : CALENDAR.DEFAULT_CLASS_COLOR;
    const className = linkedClass ? linkedClass.name : 'Unassigned';
    const isDone = assignment.status === 'Done';

    const priorityStyle = (() => {
        if (isDone) {
            return {
                backgroundColor: CALENDAR.STATUS_DONE_TAG_BG,
                color: CALENDAR.STATUS_DONE_TAG_TEXT,
                border: `1px solid ${CALENDAR.STATUS_DONE_TAG_BORDER}`
            };
        }
        if (assignment.priority === 'High') {
            return {
                backgroundColor: CALENDAR.PRIORITY_HIGH_BG,
                color: CALENDAR.PRIORITY_HIGH_TEXT,
                border: `1px solid ${CALENDAR.PRIORITY_HIGH_BORDER}`
            };
        }
        if (assignment.priority === 'Medium') {
            return {
                backgroundColor: CALENDAR.PRIORITY_MEDIUM_BG,
                color: CALENDAR.PRIORITY_MEDIUM_TEXT,
                border: `1px solid ${CALENDAR.PRIORITY_MEDIUM_BORDER}`
            };
        }
        return {
            backgroundColor: CALENDAR.PRIORITY_LOW_BG,
            color: CALENDAR.PRIORITY_LOW_TEXT,
            border: `1px solid ${CALENDAR.PRIORITY_LOW_BORDER}`
        };
    })();

    return (
        <div
            onClick={() => onAssignmentClick(assignment.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`calendar-side-panel-item p-3 rounded-lg cursor-pointer transition-colors ${isDone ? 'opacity-60' : ''}`}
            style={{ 
                borderLeft: `4px solid ${classColor}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
        >
            <div className={`font-semibold ${isDone ? 'line-through' : ''}`} style={{ color: isDone ? CALENDAR.STATUS_DONE_TEXT : CALENDAR.SIDE_PANEL_TEXT }}>{assignment.title}</div>
            <div className="text-sm flex items-center justify-between mt-1" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>
                <span style={{ color: isDone ? CALENDAR.STATUS_DONE_TEXT : classColor }}>{className}</span>
                <span 
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    style={priorityStyle}
                >
                    {assignment.status === 'Done' ? 'Done' : assignment.priority}
                </span>
            </div>
        </div>
    );
};

export default React.memo(AssignmentItem);
