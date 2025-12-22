import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { DayType } from '@/app/types'
import { MY_SCHEDULE } from '@/app/styles/colors'
import DaySchedule from '@/pages/My Schedule/components/DaySchedule'
import DayScheduleHeader from '@/pages/My Schedule/components/DaySchedule/DayScheduleDayHeader'
import DayScheduleBody from './components/DaySchedule/Body'
import ScheduleSlot from '@/pages/My Schedule/components/DaySchedule/Body/ScheduleSlot'
import './index.css'

const MySchedule: React.FC = () => {
    const { schedule, getClassById, openModal, updateSchedule } = useApp()

    const handleRemove = (dayType: NonNullable<DayType>, index: number) => {
        updateSchedule(dayType, index, null)
    }

    const handleSelect = (dayType: NonNullable<DayType>, index: number) => {
        openModal('schedule-class-selector', { dayType, index })
    }

    return (
        <div
            className="p-6 rounded-xl min-h-[60vh] transition-colors"
            style={{
                backgroundColor: MY_SCHEDULE.MODULE_BG,
                border: `1px solid ${MY_SCHEDULE.MODULE_BORDER}`,
                boxShadow: MY_SCHEDULE.MODULE_SHADOW,
            }}
        >
            <div className="space-y-6">
                <DaySchedule>
                    <DayScheduleHeader title="A-Day Classes" />
                    <DayScheduleBody>
                        {schedule.aDay.map((classId, index) => (
                            <ScheduleSlot
                                key={`A-${index}`}
                                dayType="A"
                                index={index}
                                classId={classId}
                                getClassById={getClassById}
                                onRemove={handleRemove}
                                onSelect={handleSelect}
                            />
                        ))}
                    </DayScheduleBody>
                </DaySchedule>
                <DaySchedule>
                    <DayScheduleHeader title="B-Day Classes" />
                    <DayScheduleBody>
                        {schedule.bDay.map((classId, index) => (
                            <ScheduleSlot
                                key={`B-${index}`}
                                dayType="B"
                                index={index}
                                classId={classId}
                                getClassById={getClassById}
                                onRemove={handleRemove}
                                onSelect={handleSelect}
                            />
                        ))}
                    </DayScheduleBody>
                </DaySchedule>
            </div>
        </div>
    )
}

export default MySchedule
