import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const ScheduleTable: React.FC<SemesterSchedule.ScheduleTable.Props> = ({ children }) => {
    return (
        <div className="overflow-x-auto p-[2px]">
            <div
                className="rounded-lg overflow-hidden w-full"
                style={{
                    border: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
                    minWidth: 'max-content'
                }}
            >
                <table
                    className="w-full"
                    style={{
                        borderCollapse: 'separate',
                        borderSpacing: 0
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: MY_SCHEDULE.BLOCK_MODULE_BG }}>
                            <th
                                className="p-3 text-left font-semibold text-sm"
                                style={{
                                    color: MY_SCHEDULE.TEXT_SECONDARY,
                                    borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                                    borderRight: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`
                                }}
                            >
                                Day
                            </th>
                            {[1, 2, 3, 4].map((period, index) => (
                                <th
                                    key={period}
                                    className="p-3 text-center font-semibold text-sm"
                                    style={{
                                        color: MY_SCHEDULE.TEXT_SECONDARY,
                                        borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                                        borderRight: index < 3 ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` : 'none'
                                    }}
                                >
                                    Period {period}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ScheduleTable
