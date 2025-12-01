import { Event, NoSchoolPeriod, Class } from '@/app/types';

export interface TodaysEventsProps {
    events: Event[];
    onEventClick: (id: string) => void;
}

export interface EventItemProps {
    event: Event;
    onClick: () => void;
}

export interface TodaysClassesProps {
    classIds: (string | null)[];
    noSchool?: NoSchoolPeriod;
    getClassById: (id: string) => Class | undefined;
}

export interface ClassItemProps {
    classInfo: Class;
    period: number;
}

export interface DashboardActionModalProps {
    isOpen: boolean;
    onClose: () => void;
}
