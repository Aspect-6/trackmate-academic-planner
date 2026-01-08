import React from 'react'
import { useAlternatingABClasses } from '@/app/hooks/useAlternatingABClasses'
import type { ClassListRendererProps } from '@/app/contexts/ScheduleComponentsContext'

import DashboardClassItem from '@/pages/Dashboard/components/TodaysClasses/Body/ClassList/ClassItem'
import CalendarClassItem from '@/pages/Calendar/components/CalendarBody/SidePanel/Body/ClassList/ClassItem'

import { DASHBOARD } from '@/app/styles/colors'
import { CALENDAR } from '@/app/styles/colors'

/**
 * ClassList renderer for alternating A/B schedule.
 * Works for both Dashboard and Calendar variants.
 */
const AlternatingABClassList: React.FC<ClassListRendererProps> = ({
    date,
    noSchoolDay,
    getClassById,
    openModal,
    variant
}) => {
    const { classIds } = useAlternatingABClasses(date)

    const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)

    // Dashboard variant
    if (variant === 'dashboard') {
        if (noSchoolDay) {
            return (
                <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                    No school today: {noSchoolDay.name}
                </p>
            )
        }

        if (!hasClasses) {
            return (
                <p className="text-center" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                    No classes scheduled for today.
                </p>
            )
        }

        return (
            <>
                {classIds.map((classId, index) => {
                    if (!classId) return null
                    const classInfo = getClassById(classId)
                    if (!classInfo) return null
                    return (
                        <DashboardClassItem
                            key={index}
                            classInfo={classInfo}
                            period={index + 1}
                            openModal={openModal!}
                        />
                    )
                })}
            </>
        )
    }

    // Calendar variant
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING_TEXT }}>
                Classes
            </h4>
            <div className="space-y-2">
                {noSchoolDay ? (
                    <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                        No classes (no school)
                    </p>
                ) : hasClasses ? (
                    classIds.map((classId, index) => {
                        if (!classId) return null
                        return (
                            <CalendarClassItem
                                key={index}
                                classId={classId}
                                index={index}
                                getClassById={getClassById}
                            />
                        )
                    })
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                        No classes scheduled
                    </p>
                )}
            </div>
        </div>
    )
}

export default AlternatingABClassList
