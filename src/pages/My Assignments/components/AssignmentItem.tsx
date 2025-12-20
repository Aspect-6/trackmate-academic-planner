import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { formatDate } from '@/app/lib/utils';
import { AssignmentItemProps } from '@/pages/My Assignments/types';
import { MY_ASSIGNMENTS } from '@/app/styles/colors';
import PriorityBadge from '@/app/components/PriorityBadge';

const AssignmentItem: React.FC<AssignmentItemProps> = ({
    assignment,
    onClick,
    getClassById,
    dragEnabled
}) => {
    const { id, title, dueDate, priority, classId } = assignment;
    const linkedClass = getClassById(classId);
    const classColor = linkedClass ? linkedClass.color : MY_ASSIGNMENTS.TEXT_MUTED; // Fallback
    const className = linkedClass ? linkedClass.name : 'Unassigned';

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id, disabled: !dragEnabled });

    const transformTransition = !isDragging && transition ? transition : null;
    const baseHoverTransition = 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)';
    const combinedTransition = [transformTransition, baseHoverTransition]
        .filter(Boolean)
        .join(', ');

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition: combinedTransition,
        willChange: 'transform',
    };


    const cardStyle: React.CSSProperties = {
        ...dragStyle,
        borderColor: MY_ASSIGNMENTS.BORDER_PRIMARY,
        borderLeftWidth: '4px',
        borderLeftColor: classColor,
        color: MY_ASSIGNMENTS.ITEM_TEXT,
        boxShadow: MY_ASSIGNMENTS.ITEM_SHADOW,
        '--card-bg': MY_ASSIGNMENTS.ITEM_BG,
        '--card-hover-bg': MY_ASSIGNMENTS.ITEM_HOVER_BG,
        touchAction: dragEnabled ? 'none' : 'auto',
    } as React.CSSProperties;

    const dragHandleProps = dragEnabled ? { ...attributes, ...listeners } : {};
    const cursorClass = dragEnabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-default';
    const contentSpacingClass = dragEnabled ? 'flex gap-3' : 'flex';

    return (
        <div
            ref={setNodeRef}
            style={cardStyle}
            {...dragHandleProps}
            onClick={() => onClick(id)}
            className={`assignments-item p-4 rounded-lg border border-l-4 ${cursorClass} bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-colors ${contentSpacingClass} ${isDragging ? 'opacity-40' : ''}`}
        >
            {dragEnabled && (
                <div className="flex items-center justify-center text-gray-600" style={{ color: MY_ASSIGNMENTS.ITEM_SUBTEXT }}>
                    <GripVertical size={16} />
                </div>
            )}
            <div className="flex-grow">
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-xs mb-2" style={{ color: classColor, fontWeight: 600 }}>{className}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium" style={{ color: MY_ASSIGNMENTS.ITEM_SUBTEXT }}>Due: {formatDate(dueDate)}</span>
                    <PriorityBadge
                        priority={priority}
                        className="px-2 py-0.5"
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignmentItem;
