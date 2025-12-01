import React from 'react';
import { ScheduleSlotProps } from '@/pages/My Schedule/types';
import FilledSlot from '@/pages/My Schedule/components/FilledSlot';
import EmptySlot from '@/pages/My Schedule/components/EmptySlot';

const ScheduleSlot: React.FC<ScheduleSlotProps> = ({
    dayType,
    index,
    classId,
    getClassById,
    onRemove,
    onSelect
}) => {
    const classInfo = classId ? getClassById(classId) : null;

    return (
        <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-300 mb-2 text-center">Period {index + 1}</h5>
            {classInfo ? (
                <FilledSlot
                    classInfo={classInfo}
                    onRemove={() => onRemove(dayType, index)}
                />
            ) : (
                <EmptySlot
                    onClick={() => onSelect(dayType, index)}
                />
            )}
        </div>
    );
};

export default ScheduleSlot;
