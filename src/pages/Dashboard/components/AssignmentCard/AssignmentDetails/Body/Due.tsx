import React from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'
import { Clock } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'

const AssignmentDetailsDue: React.FC<AssignmentCard.Details.Body.AssignmentDetailsDueProps> = ({ assignment }) => {
    return (
        <div className="hidden sm:flex items-center text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate('short', assignment.dueDate)}
        </div>
    )
}

export default AssignmentDetailsDue
