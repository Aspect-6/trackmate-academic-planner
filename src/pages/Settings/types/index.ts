import { DayType } from '@/app/types';

export interface ScheduleSettingsProps {
    currentDayType: DayType;
    onSetDayType: (type: 'A' | 'B') => void;
}

export interface DangerZoneProps {
    onClearData: () => void;
}
