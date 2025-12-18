import { Assignment, Event, NoSchoolPeriod, Class } from '@/app/types';

// Props/types for the CalendarHeader component subtree
export interface CalendarHeaderButtonProps {
    onClick: () => void;
}

export interface MonthTitleProps {
    monthName: string;
}

// Types related to the Calendar UI
export interface CalendarHeaderProps {
    monthName: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
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

export interface AssignmentItemsProps {
    assignment: Assignment;
    color: string;
    onClick: (id: string) => void;
}

export interface EventItemProps {
    event: Event;
    onClick: (id: string) => void;
}

// Props/types for the CalendarGrid component subtree
export interface CalendarGridDayHeaderProps {
    backgroundColor?: string;
    textColor?: string;
}

export interface CalendarDayContainerProps {
    year: number;
    month: number;
    day: number;
    isToday?: boolean;
    noSchool?: NoSchoolPeriod | undefined;
    onSelectDate: (d: Date) => void;
    children?: React.ReactNode;
}

export interface CalendarDayNumberProps {
    day: number;
    noSchool?: NoSchoolPeriod | undefined;
}

export type CalendarDot = { id: string; color: string };

export interface CalendarDayMobileDotsProps {
    dots: CalendarDot[];
}

export interface AssignmentListProps {
    assignments: Assignment[];
    getClassColor: (classId: string) => string;
    onAssignmentClick: (id: string) => void;
}

export interface EventListProps {
    events: Event[];
    onEventClick: (id: string) => void;
    hasAssignments?: boolean;
}

// Props/types for the SidePanel component subtree
export interface CalendarSidePanelProps {
    date: Date | null;
    onClose: () => void;
}

export interface DayTypeProps {
    noSchoolDay?: NoSchoolPeriod;
    dayType: 'A' | 'B' | null;
    onNoSchoolClick?: (id: string) => void;
}

export interface ClassListProps {
    classes: (string | null)[];
    noSchoolDay?: NoSchoolPeriod;
    getClassById: (id: string) => Class | undefined;
}

export interface SidePanelAssignmentsProps {
    assignments: Assignment[];
    getClassById: (id: string) => Class | undefined;
    onAssignmentClick: (id: string) => void;
}

export interface CalendarSidePanelEventsProps {
    events: Event[];
    onEventClick: (id: string) => void;
}

// Calendar Hooks Types
interface BaseCalendarCell {
    key: string;
}

export interface EmptyCalendarCell extends BaseCalendarCell {
    type: 'empty';
}

export interface DayCalendarCell extends BaseCalendarCell {
    type: 'day';
    day: number;
    dateString: string;
    isToday: boolean;
    noSchool: NoSchoolPeriod | undefined;
    assignments: Assignment[];
    events: Event[];
}

export type CalendarCell = EmptyCalendarCell | DayCalendarCell;
