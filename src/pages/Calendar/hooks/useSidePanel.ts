import { useMemo } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useAssignments } from '@/app/hooks/useAssignments'
import { useEvents } from '@/app/hooks/useEvents'
import { useCalendarData } from './useCalendarData'
import { dateToLocalISOString, formatDate } from '@/app/lib/utils'

interface UseSidePanelProps {
    selectedDate: Date | null
}

/**
 * Hook for computing the side panel data for a selected calendar day.
 * Returns null if no date is selected.
 */
export const useSidePanel = ({ selectedDate }: UseSidePanelProps) => {
    const { getDayTypeForDate } = useApp()
    const { getAssignmentsForDate } = useAssignments()
    const { getEventsForDate } = useEvents()
    const { noSchool } = useCalendarData()

    const sidePanelData = useMemo(() => {
        if (!selectedDate) return null

        const dateString = dateToLocalISOString(selectedDate)
        const noSchoolDay = noSchool.find(ns => dateString >= ns.startDate && dateString <= ns.endDate) || null
        const dayType = getDayTypeForDate ? getDayTypeForDate(dateString) : null
        // TODO: Classes now stored per-term - need to determine active term to show classes
        const dayClasses: (string | null)[] = []
        const dueAssignments = getAssignmentsForDate(dateString)
        const dayEvents = getEventsForDate(dateString)

        const formattedDate = formatDate('full', dateString)

        return {
            date: selectedDate,
            dateString,
            formattedDate,
            noSchoolDay,
            dayType,
            classes: dayClasses,
            dueAssignments,
            dayEvents
        }
    }, [selectedDate, getAssignmentsForDate, getEventsForDate, noSchool, getDayTypeForDate])

    return sidePanelData
}
