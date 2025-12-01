import { Assignment, Event, NoSchoolPeriod, Class } from '@/app/types';

export interface CalendarHeaderProps {
    monthName: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export interface CalendarDayAssignmentProps {
    assignment: Assignment;
    color: string;
    onClick: (id: string) => void;
}

export interface CalendarDayEventProps {
    event: Event;
    onClick: (id: string) => void;
}

export interface CalendarDayProps {
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    noSchool?: NoSchoolPeriod;
    assignments: Assignment[];
    events: Event[];
    onSelectDate: (date: Date) => void;
    onAssignmentClick: (id: string) => void;
    onEventClick: (id: string) => void;
    getClassColor: (classId: string) => string;
}

export interface CalendarGridProps {
    year: number;
    month: number;
    todayStr: string;
    assignmentsByDate: Record<string, Assignment[]>;
    eventsByDate: Record<string, Event[]>;
    noSchoolByDate: Record<string, NoSchoolPeriod>;
    onSelectDate: (date: Date) => void;
    onAssignmentClick: (id: string) => void;
    onEventClick: (id: string) => void;
    getClassColor: (classId: string) => string;
}

export interface CalendarSidePanelProps {
    date: Date | null;
    onClose: () => void;
}

export interface SidePanelDayInfoProps {
    noSchoolDay?: NoSchoolPeriod;
    dayType: 'A' | 'B' | null;
    onNoSchoolClick?: (id: string) => void;
}

export interface SidePanelClassesProps {
    classes: (string | null)[];
    noSchoolDay?: NoSchoolPeriod;
    getClassById: (id: string) => Class | undefined;
}

export interface SidePanelAssignmentsProps {
    assignments: Assignment[];
    getClassById: (id: string) => Class | undefined;
    onAssignmentClick: (id: string) => void;
}

export interface SidePanelEventsProps {
    events: Event[];
    onEventClick: (id: string) => void;
}
