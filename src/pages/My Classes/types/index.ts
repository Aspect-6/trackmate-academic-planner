import { Class } from '@/app/types';

export interface EmptyClassesStateProps {
    onAddClass: () => void;
}

export interface SortableClassCardProps {
    classInfo: Class;
    openModal: (modal: string, id: string) => void;
}

export interface ClassCardHeaderProps {
    name: string;
    attributes: any;
    listeners: any;
    onEdit: () => void;
    onDelete: () => void;
}

export interface ClassCardDetailsProps {
    teacherName: string;
    roomNumber: string;
    color: string;
}
