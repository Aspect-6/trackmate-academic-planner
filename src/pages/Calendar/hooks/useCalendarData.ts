import { useAssignments } from '@/app/hooks/useAssignments'
import { useEvents } from '@/app/hooks/useEvents'
import { useNoSchool } from '@/app/hooks/useNoSchool'

/**
 * Hook for indexing calendar data by date.
 * Aggregates data from useAssignments, useEvents, and useNoSchool hooks.
 */
export const useCalendarData = () => {
    const { assignments, assignmentsByDate } = useAssignments()
    const { events, eventsByDate } = useEvents()
    const { noSchoolPeriods, noSchoolByDate } = useNoSchool()

    return {
        assignments,
        events,
        noSchool: noSchoolPeriods,
        assignmentsByDate,
        eventsByDate,
        noSchoolByDate,
    }
}
