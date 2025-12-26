import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const ScheduleTableRow: React.FC<SemesterSchedule.ScheduleTable.Row.Props> = ({ dayType, children }) => {
    return (
        <tr>
            <td
                className="p-3 font-semibold text-sm"
                style={{
                    color: dayType === 'A' ? MY_SCHEDULE.TEXT_A_DAY : MY_SCHEDULE.TEXT_B_DAY,
                    borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    borderRight: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`
                }}
            >
                {dayType}-Day
            </td>
            {children}
        </tr>
    )
}

export default ScheduleTableRow
