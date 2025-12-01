import React from 'react';
import { AssignmentColumnProps } from '@/pages/My Assignments/types';
import AssignmentItem from '@/pages/My Assignments/components/AssignmentItem';

const AssignmentColumn: React.FC<AssignmentColumnProps> = ({
    status,
    title,
    headerColorClass,
    assignments,
    draggedId,
    onDragOver,
    onDrop,
    onDragStart,
    onDragEnd,
    onAssignmentClick,
    getClassById
}) => {
    // Filter and sort items
    const items = assignments.filter(a => a.status === status);

    items.sort((a, b) => {
        if (status === 'To Do' || status === 'In Progress') {
            // Ascending: Oldest -> Newest (Furthest future at bottom)
            return a.dueDate.localeCompare(b.dueDate);
        } else {
            // Descending: Newest -> Oldest (Furthest future at top)
            return b.dueDate.localeCompare(a.dueDate);
        }
    });

    return (
        <div
            className="assignments-col flex-1 rounded-xl p-4 flex flex-col"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="flex justify-between items-center mb-4 px-2 border-b border-gray-700 pb-2">
                <h2 className={`text-lg font-bold ${headerColorClass}`}>{title}</h2>
                <span className={`bg-gray-700 text-xs font-bold px-2 py-1 rounded-full ${headerColorClass}`}>
                    {items.length}
                </span>
            </div>

            <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar">
                {items.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center p-4">Nothing here!</p>
                ) : (
                    items.map(assignment => (
                        <AssignmentItem
                            key={assignment.id}
                            assignment={assignment}
                            isDragged={draggedId === assignment.id}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onClick={onAssignmentClick}
                            getClassById={getClassById}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default AssignmentColumn;
