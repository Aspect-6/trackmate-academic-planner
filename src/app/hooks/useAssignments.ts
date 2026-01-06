import { useMemo, useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { Assignment, Status } from '@/app/types'

/**
 * Hook for accessing and working with assignments.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useAssignments = () => {
    const { assignments, addAssignment, updateAssignment, deleteAssignment, openModal } = useApp()

    // Counts
    const totalNum = assignments.length

    // Filtered views
    const activeAssignments = useMemo(() => assignments.filter(assignment =>
        assignment.status === 'To Do' || assignment.status === 'In Progress'
    ), [assignments])

    const completedAssignments = useMemo(() => assignments.filter(assignment =>
        assignment.status === 'Done'
    ), [assignments])

    const overdueAssignments = useMemo(() => assignments.filter(assignment =>
        assignment.status !== 'Done' && new Date(assignment.dueDate) < new Date()
    ), [assignments])

    // Sorted views
    const sortedByDueDate = useMemo(() => assignments.toSorted((assignmentA, assignmentB) =>
        new Date(assignmentA.dueDate).getTime() - new Date(assignmentB.dueDate).getTime()
    ), [assignments])

    // Indexed by date
    const assignmentsByDate = useMemo(() => assignments.reduce<Record<string, Assignment[]>>((acc, assignment) => {
        if (assignment.dueDate) {
            if (!acc[assignment.dueDate]) acc[assignment.dueDate] = []
            acc[assignment.dueDate]!.push(assignment)
        }
        return acc
    }, {}), [assignments])

    // Lookup functions
    const getAssignmentById = useCallback((id: string) => assignments.find(assignment => assignment.id === id) ?? null
        , [assignments])
    const getAssignmentsForDate = useCallback((date: string) => assignmentsByDate[date] ?? []
        , [assignmentsByDate])
    const getAssignmentsByStatus = useCallback((status: Status) => assignments.filter(assignment => assignment.status === status)
        , [assignments])
    const getAssignmentsByClass = useCallback((classId: string) => assignments.filter(assignment => assignment.classId === classId)
        , [assignments])

    // Actions
    const markAsDone = useCallback((id: string) => updateAssignment(id, { status: 'Done' })
        , [updateAssignment])
    const openAddAssignment = useCallback(() => openModal('add-assignment')
        , [openModal])
    const openEditAssignment = useCallback((id: string) => openModal('edit-assignment', id)
        , [openModal])

    return {
        // Raw data
        assignments,

        // Counts
        totalNum,

        // Filtered views
        activeAssignments,
        completedAssignments,
        overdueAssignments,

        // Sorted views
        sortedByDueDate,

        // Indexed data
        assignmentsByDate,

        // Lookup functions
        getAssignmentById,
        getAssignmentsForDate,
        getAssignmentsByStatus,
        getAssignmentsByClass,

        // Actions
        addAssignment,
        updateAssignment,
        deleteAssignment,
        markAsDone,
        openAddAssignment,
        openEditAssignment,
    }
}
