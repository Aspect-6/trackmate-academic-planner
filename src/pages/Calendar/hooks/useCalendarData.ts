import { useMemo } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useAssignments } from '@/app/hooks/useAssignments'
import { useEvents } from '@/app/hooks/useEvents'
import { NoSchoolPeriod } from '@/app/types'
import { dateToLocalISOString, parseDateLocal } from '@/app/lib/utils'

/**
 * Hook for indexing calendar data by date.
 * Creates lookup maps for assignments, events, and no-school periods.
 */
export const useCalendarData = () => {
    const { noSchool: noSchoolPeriods } = useApp()
    const { assignments, assignmentsByDate } = useAssignments()
    const { events, eventsByDate } = useEvents()

    const noSchoolByDate = useMemo(() =>
        noSchoolPeriods.reduce<Record<string, NoSchoolPeriod>>((acc, noSchoolPeriod) => {
            const start = parseDateLocal(noSchoolPeriod.startDate)
            const end = parseDateLocal(noSchoolPeriod.endDate)
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                const dateStr = dateToLocalISOString(date)
                acc[dateStr] = noSchoolPeriod
            }
            return acc
        }, {}),
        [noSchoolPeriods])

    return {
        assignments,
        events,
        noSchool: noSchoolPeriods,
        assignmentsByDate,
        eventsByDate,
        noSchoolByDate,
    }
}
