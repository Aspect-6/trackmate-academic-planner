import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { X } from 'lucide-react'

const RemoveButton: React.FC<SemesterSchedule.ScheduleTable.Row.FilledCell.RemoveButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-1 right-1 p-1 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
            }}
        >
            <X className="w-3 h-3 text-white" />
        </button>
    )
}

export default RemoveButton
