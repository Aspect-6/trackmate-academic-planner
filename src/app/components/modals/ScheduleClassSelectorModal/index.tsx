import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { ClassSelectionItem } from './ClassSelectionItem';
import { EmptyClassList } from './EmptyClassList';
import {
    GLOBAL
} from '@/app/styles/colors';

interface ScheduleModalProps {
    onClose: () => void;
    data: {
        dayType: 'A' | 'B';
        index: number;
    };
}

export const ScheduleClassSelectorModal: React.FC<ScheduleModalProps> = ({ onClose, data }) => {
    const { classes, updateSchedule } = useApp();
    const { dayType, index } = data;

    const handleSelect = (classId: string) => {
        updateSchedule(dayType, index, classId);
        onClose();
    };

    const dayLabel = dayType === 'A' ? 'A-Day' : 'B-Day';

    return (
        <div className="high-contrast-card w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>
                Select Class for {dayLabel} Period {index + 1}
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {classes.length === 0 ? (
                    <EmptyClassList />
                ) : (
                    classes.map(c => (
                        <ClassSelectionItem
                            key={c.id}
                            classItem={c}
                            onSelect={handleSelect}
                        />
                    ))
                )}
            </div>
            <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-700">
                <button
                    onClick={onClose}
                    className="py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
