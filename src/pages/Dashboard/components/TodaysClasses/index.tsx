import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useNoSchool } from '@/app/hooks/useNoSchool'
import { todayString } from '@/app/lib/utils'
import { CLASS_LIST_RENDERERS } from '@/app/components/ClassListRenderers'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'
import TodaysClassesHeader from './TodaysClassesHeader'
import TodaysClassesBody from './Body'

const TodaysClasses: React.FC<TodaysClasses.Props> = ({
    isMobile,
    isCollapsed,
    onToggleCollapse
}) => {
    const { schedules, getClassById, openModal } = useApp()
    const { getNoSchoolStatusForDate } = useNoSchool()

    const today = todayString()
    const noSchool = getNoSchoolStatusForDate(today)

    // Get the renderer for the current schedule type
    const ClassListRenderer = CLASS_LIST_RENDERERS[schedules.type]

    return (
        <div
            className="p-6 rounded-xl shadow-sm sm:shadow-md"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                paddingBottom: isMobile && isCollapsed ? '0' : undefined
            }}
        >
            <TodaysClassesHeader
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />

            <TodaysClassesBody isMobile={isMobile} isCollapsed={isCollapsed}>
                {ClassListRenderer ? (
                    <ClassListRenderer
                        date={today}
                        noSchoolDay={noSchool ?? undefined}
                        getClassById={getClassById}
                        openModal={openModal}
                        variant="dashboard"
                    />
                ) : (
                    <p className="text-center" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                        No schedule configured.
                    </p>
                )}
            </TodaysClassesBody>
        </div>
    )
}

export default TodaysClasses
