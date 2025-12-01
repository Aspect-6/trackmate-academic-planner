import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { DayType } from '@/app/types';
import DaySchedule from '@/pages/My Schedule/components/DaySchedule';
import './index.css';

const Schedule: React.FC = () => {
    const { schedule, getClassById, openModal, updateSchedule } = useApp();

    const handleRemove = (dayType: NonNullable<DayType>, index: number) => {
        updateSchedule(dayType, index, null);
    };

    const handleSelect = (dayType: NonNullable<DayType>, index: number) => {
        openModal('schedule-class-selector', { dayType, index });
    };

    return (
        <div className="high-contrast-card p-6 rounded-xl min-h-[60vh]">
            <div className="space-y-6">
                <DaySchedule
                    title="A-Day Classes"
                    dayType="A"
                    scheduleIds={schedule.aDay}
                    getClassById={getClassById}
                    onRemove={handleRemove}
                    onSelect={handleSelect}
                />
                <DaySchedule
                    title="B-Day Classes"
                    dayType="B"
                    scheduleIds={schedule.bDay}
                    getClassById={getClassById}
                    onRemove={handleRemove}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    );
};

export default Schedule;
