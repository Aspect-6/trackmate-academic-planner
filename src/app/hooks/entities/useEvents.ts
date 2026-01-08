import { useMemo, useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { todayString } from '@/app/lib/utils'
import type { Event } from '@/app/types'

/**
 * Hook for accessing and working with events.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useEvents = () => {
    const { events, addEvent, updateEvent, deleteEvent, openModal } = useApp()

    // Counts
    const totalNum = events.length

    // Helper: sort events by start time
    const sortByStartTime = useCallback((eventA: Event, eventB: Event) => {
        if (eventA.startTime && eventB.startTime) return eventA.startTime.localeCompare(eventB.startTime)
        if (eventA.startTime) return -1
        if (eventB.startTime) return 1
        return 0
    }, [])

    // Filtered views
    const todaysEvents = useMemo(() => {
        const today = todayString()
        return events.filter(event => event.date === today).toSorted(sortByStartTime)
    }, [events, sortByStartTime])

    const upcomingEvents = useMemo(() => {
        const today = todayString()
        return events.filter(event => event.date >= today).toSorted((eventA, eventB) => {
            // First sort by date
            const dateCompare = eventA.date.localeCompare(eventB.date)
            if (dateCompare !== 0) return dateCompare
            // Then by start time
            return sortByStartTime(eventA, eventB)
        })
    }, [events, sortByStartTime])

    // Indexed by date (pre-sorted by start time)
    const eventsByDate = useMemo(() => events.reduce<Record<string, Event[]>>((acc, event) => {
        if (event.date) {
            if (!acc[event.date]) acc[event.date] = []
            acc[event.date]!.push(event)
        }
        return acc
    }, {}), [events])

    // Sort each date's events by start time
    const eventsByDateSorted = useMemo(() => {
        const sorted: Record<string, Event[]> = {}
        for (const [date, dateEvents] of Object.entries(eventsByDate)) {
            sorted[date] = dateEvents.toSorted(sortByStartTime)
        }
        return sorted
    }, [eventsByDate, sortByStartTime])

    // Lookup functions
    const getEventById = useCallback((id: string) => events.find(event => event.id === id) ?? null
        , [events])
    const getEventsForDate = useCallback((date: string) => eventsByDateSorted[date] ?? []
        , [eventsByDateSorted])

    // Actions
    const openAddEvent = useCallback(() => openModal('add-event'), [openModal])
    const openEditEvent = useCallback((id: string) => openModal('edit-event', id), [openModal])

    return {
        // Raw data
        events,

        // Counts
        totalNum,

        // Filtered views
        todaysEvents,
        upcomingEvents,

        // Indexed data
        eventsByDate: eventsByDateSorted,

        // Lookup functions
        getEventById,
        getEventsForDate,

        // Actions
        addEvent,
        updateEvent,
        deleteEvent,
        openAddEvent,
        openEditEvent,
    }
}
