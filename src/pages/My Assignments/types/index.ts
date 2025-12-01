import { Assignment, Status, Class } from '@/app/types';

export interface AssignmentItemProps {
    assignment: Assignment;
    isDragged: boolean;
    onDragStart: (e: React.DragEvent, id: string) => void;
    onDragEnd: () => void;
    onClick: (id: string) => void;
    getClassById: (id: string) => Class | undefined;
}

export interface AssignmentColumnProps {
    status: Status;
    title: string;
    headerColorClass: string;
    assignments: Assignment[];
    draggedId: string | null;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, status: Status) => void;
    onDragStart: (e: React.DragEvent, id: string) => void;
    onDragEnd: () => void;
    onAssignmentClick: (id: string) => void;
    getClassById: (id: string) => Class | undefined;
}
