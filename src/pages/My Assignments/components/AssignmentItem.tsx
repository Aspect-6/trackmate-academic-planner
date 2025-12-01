import React from 'react';
import { GripVertical } from 'lucide-react';
import { formatDate, cn } from '@/app/lib/utils';
import { AssignmentItemProps } from '@/pages/My Assignments/types';

const AssignmentItem: React.FC<AssignmentItemProps> = ({
    assignment,
    isDragged,
    onDragStart,
    onDragEnd,
    onClick,
    getClassById
}) => {
    const { id, title, dueDate, priority, classId } = assignment;
    const linkedClass = getClassById(classId);
    const classColor = linkedClass ? linkedClass.color : '#4a5568';
    const className = linkedClass ? linkedClass.name : 'Unassigned';

    const getPriorityStyles = (p: string) => {
        switch (p) {
            case 'High': return { className: 'bg-red-900 border-red-500 text-red-300' };
            case 'Medium': return {
                className: 'border text-yellow-400',
                style: { backgroundColor: '#21262d', borderColor: '#30363d' }
            };
            case 'Low': return { className: 'bg-gray-800 border-gray-500 text-gray-300' };
            default: return { className: 'bg-gray-700 border-gray-600 text-gray-400' };
        }
    };

    const priorityStyle = getPriorityStyles(priority);

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, id)}
            onDragEnd={onDragEnd}
            onClick={() => onClick(id)}
            className={`assignments-item p-3 rounded-lg text-white shadow-md border-l-4 cursor-grab active:cursor-grabbing hover:bg-gray-700 transition-colors flex gap-3 ${isDragged ? 'opacity-40' : ''}`}
            style={{ borderLeftColor: classColor }}
        >
            <div className="flex items-center justify-center text-gray-600">
                <GripVertical size={16} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-xs mb-2" style={{ color: classColor, fontWeight: 600 }}>{className}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-400">Due: {formatDate(dueDate)}</span>
                    <span
                        className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", priorityStyle.className)}
                        style={priorityStyle.style}
                    >
                        {priority}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AssignmentItem;
