import React, { useState } from 'react';
import { Assignment } from '@/app/types';
import { useApp } from '@/app/context/AppContext';
import { formatDate, cn } from '@/app/lib/utils';
import { CheckCircle, Circle, Clock, PlayCircle } from 'lucide-react';
import { 
    DASHBOARD
} from '@/app/styles/colors';

interface AssignmentCardProps {
    assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
    const { getClassById, updateAssignment, openModal } = useApp();
    const [isCompleting, setIsCompleting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const classInfo = getClassById(assignment.classId);

    const handleAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (assignment.status === 'To Do') {
            updateAssignment(assignment.id, { status: 'In Progress' });
        } else if (assignment.status === 'In Progress') {
            setIsCompleting(true);
            setTimeout(() => {
                updateAssignment(assignment.id, { status: 'Done' });
                // No need to reset isCompleting as component will unmount or re-render
            }, 800);
        } else {
            updateAssignment(assignment.id, { status: 'To Do' });
        }
    };
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return DASHBOARD.PRIORITY_HIGH;
            case 'Medium': return DASHBOARD.PRIORITY_MEDIUM;
            case 'Low': return DASHBOARD.PRIORITY_LOW;
            default: return DASHBOARD.TEXT_GRAY_400;
        }
    };

    return (
        <div
            onClick={() => openModal('edit-assignment', assignment.id)}
            className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-[var(--card-hover-bg)] transition-colors group"
            style={{
                backgroundColor: '#161b22',
                borderColor: '#30363d',
                borderLeft: `4px solid ${classInfo?.color || '#30363d'}`,
                '--card-hover-bg': '#1c2128'
            } as React.CSSProperties}
        >
            <div className="mr-4">
                <button
                    onClick={handleAction}
                    className="focus:outline-none transition-colors"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    title={
                        assignment.status === 'To Do' ? "Start Assignment" :
                            assignment.status === 'In Progress' ? "Complete Assignment" :
                                "Mark as Undone"
                    }
                >
                    {assignment.status === 'To Do' && (
                        <PlayCircle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_PLAY_HOVER : DASHBOARD.ICON_PLAY_DEFAULT }} />
                    )}
                    {assignment.status === 'In Progress' && !isCompleting && (
                        <Circle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_IN_PROGRESS_HOVER : DASHBOARD.ICON_IN_PROGRESS }} />
                    )}
                    {isCompleting && (
                        <CheckCircle className="w-6 h-6 scale-110 transition-transform duration-300 ease-out" style={{ color: DASHBOARD.ICON_COMPLETE }} />
                    )}
                    {assignment.status === 'Done' && (
                        <CheckCircle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_COMPLETE_HOVER : DASHBOARD.ICON_COMPLETE }} />
                    )}
                </button>
            </div>

            <div className="flex-grow min-w-0 flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-4">
                    <h3 className={cn(
                        "font-semibold truncate mb-1",
                        assignment.status === 'Done' && "line-through"
                    )} style={{ color: assignment.status === 'Done' ? DASHBOARD.TEXT_GRAY_500 : DASHBOARD.TEXT_WHITE }}>
                        {assignment.title}
                    </h3>

                    <div className="flex items-center text-sm" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>
                        <span className="font-medium mr-3" style={{ color: classInfo?.color }}>
                            {classInfo?.name || 'Unknown Class'}
                        </span>
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(assignment.dueDate)}
                        </div>
                    </div>
                </div>

                <span
                    className={cn("text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0")}
                    style={{ backgroundColor: '#0d1117', borderColor: '#30363d', color: getPriorityColor(assignment.priority) }}
                >
                    {assignment.priority}
                </span>
            </div>
        </div>
    );
};

export default AssignmentCard;
