import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const SemesterSchedule: React.FC<SemesterSchedule.Props> = ({ title, children }) => {
    return (
        <div className="mb-8">
            <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}

export default SemesterSchedule
