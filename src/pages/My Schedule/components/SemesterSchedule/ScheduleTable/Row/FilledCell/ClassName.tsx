import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'

const ClassName: React.FC<SemesterSchedule.ScheduleTable.Row.FilledCell.ClassNameProps> = ({ name }) => {
    return (
        <span className="text-sm font-medium text-white truncate">
            {name}
        </span>
    )
}

export default ClassName
