import React, { useMemo } from "react"
import { useAssignments } from "@/app/hooks/useAssignments"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentBoardAssignmentCount: React.FC<AssignmentBoardTypes.Header.AssignmentCountProps> = ({ status }) => {
	const { getAssignmentsByStatus } = useAssignments()

	const count = useMemo(() => getAssignmentsByStatus(status).length, [getAssignmentsByStatus, status])

	const getColor = () => {
		if (status === "To Do") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_UPCOMING
		if (status === "In Progress") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_INPROGRESS
		if (status === "Done") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_DONE
	}

	const color = getColor()

	return (
		<span
			className="text-xs font-bold px-2 py-1 rounded-full border"
			style={{
				backgroundColor: MY_ASSIGNMENTS.BACKGROUND_TERTIARY,
				color: color,
				borderColor: color,
			}}
		>
			{count}
		</span>
	)
}

export default AssignmentBoardAssignmentCount
