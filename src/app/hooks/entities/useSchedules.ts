import { useCallback } from 'react'
import { useLocalStorage } from '@/app/hooks/data/useLocalStorage'
import { todayString, parseDateLocal, dateToLocalISOString } from '@/app/lib/utils'
import { STORAGE_KEYS } from '@/app/config/storageKeys'
import type { Schedules, ScheduleType, TermSchedule, DayType, AcademicTerm, NoSchoolPeriod } from '@/app/types'

const DEFAULT_SCHEDULES: Schedules = {
    type: 'alternating-ab',
    'alternating-ab': {
        startDate: '2025-09-02',
        startDayType: 'A',
        dayTypeOverrides: {},
        terms: {}
    }
}

/**
 * Helper dependencies needed for getDayTypeForDate calculation.
 * These are injected to avoid circular dependencies with other entity hooks.
 */
export interface DayTypeHelpers {
    /** Returns no-school period if date falls within one, null otherwise */
    getNoSchoolStatusForDate: (date: string) => NoSchoolPeriod | null
    /** Returns the active academic term for a given date, or undefined */
    getActiveTermForDate: (date: string) => AcademicTerm | undefined
    /** Returns the active semester for a given date within a term, or undefined */
    getActiveSemesterForDate: (date: string, term: AcademicTerm) => AcademicTerm['semesters'][0] | undefined
}

/**
 * Hook for accessing and working with schedule configuration.
 * Manages the schedule type, A/B day configuration, and per-term schedules.
 */
export const useSchedules = () => {
    const [schedules, setSchedules] = useLocalStorage<Schedules>(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES)

    // Actions
    const updateTermSchedule = useCallback((termId: string, newSchedule: TermSchedule): void => {
        setSchedules(prev => {
            const abData = prev['alternating-ab']
            if (!abData) return prev
            return {
                ...prev,
                'alternating-ab': {
                    ...abData,
                    terms: {
                        ...abData.terms,
                        [termId]: newSchedule
                    }
                }
            }
        })
    }, [setSchedules])

    const setScheduleType = useCallback((type: ScheduleType): void => {
        setSchedules(prev => ({
            ...prev,
            type
        }))
    }, [setSchedules])

    const setReferenceDayType = useCallback((type: NonNullable<DayType>): void => {
        const today = todayString()
        setSchedules(prev => {
            const abData = prev['alternating-ab']
            if (!abData) return prev
            return {
                ...prev,
                'alternating-ab': {
                    ...abData,
                    dayTypeOverrides: {
                        ...abData.dayTypeOverrides,
                        [today]: type
                    }
                }
            }
        })
    }, [setSchedules])

    // Getters for schedule data
    const getTermSchedule = useCallback((termId: string): TermSchedule | undefined => {
        return schedules['alternating-ab']?.terms[termId]
    }, [schedules])

    /**
     * Calculates the A/B day type for a given date string.
     * Requires helper functions to be injected to avoid circular dependencies.
     * 
     * @param dateString - Date in YYYY-MM-DD format
     * @param helpers - Object containing getNoSchoolStatusForDate, getActiveTermForDate, getActiveSemesterForDate
     * @returns 'A', 'B', or null (for weekends, no-school days, or non-alternating schedules)
     */
    const getDayTypeForDate = useCallback((dateString: string, helpers: DayTypeHelpers): DayType => {
        if (schedules.type !== 'alternating-ab') return null

        const abData = schedules['alternating-ab']
        if (!abData) return null

        const date = parseDateLocal(dateString)
        const dayOfWeek = date.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) return null // Weekend

        // Check if date falls within an active term
        const activeTerm = helpers.getActiveTermForDate(dateString)
        if (!activeTerm) return null

        // Check if date falls within an active semester
        const activeSemester = helpers.getActiveSemesterForDate(dateString, activeTerm)
        if (!activeSemester) return null

        // For Semesters With Quarters, also check if date is within an active quarter
        if (activeTerm.termType === 'Semesters With Quarters' && activeSemester.quarters) {
            const activeQuarter = activeSemester.quarters.find(q => {
                const start = parseDateLocal(q.startDate)
                const end = parseDateLocal(q.endDate)
                return date >= start && date <= end
            })
            if (!activeQuarter) return null
        }

        // Check for no-school day
        if (helpers.getNoSchoolStatusForDate(dateString)) return null

        // Check for a day-type override
        if (abData.dayTypeOverrides[dateString]) {
            return abData.dayTypeOverrides[dateString]
        }

        // Find the most recent override before this date to use as reference
        const overrideDates = Object.keys(abData.dayTypeOverrides).sort()
        let refDate = abData.startDate
        let refType: 'A' | 'B' = abData.startDayType

        for (const overrideDate of overrideDates) {
            if (overrideDate <= dateString) {
                refDate = overrideDate
                const ot = abData.dayTypeOverrides[overrideDate]
                if (ot) refType = ot
            } else {
                break
            }
        }

        // Count school days from reference point
        const refDateParsed = parseDateLocal(refDate)
        const target = parseDateLocal(dateString)

        let count = 0
        const current = new Date(refDateParsed)

        if (target < current) {
            // Counting backwards
            while (current > target) {
                current.setDate(current.getDate() - 1)
                const dow = current.getDay()
                const currentDateStr = dateToLocalISOString(current)
                if (dow !== 0 && dow !== 6 && !helpers.getNoSchoolStatusForDate(currentDateStr)) {
                    count--
                }
            }
        } else {
            // Counting forwards
            while (current < target) {
                const dow = current.getDay()
                const currentDateStr = dateToLocalISOString(current)
                if (dow !== 0 && dow !== 6 && !helpers.getNoSchoolStatusForDate(currentDateStr)) {
                    count++
                }
                current.setDate(current.getDate() + 1)
            }
        }

        const isEven = count % 2 === 0
        return isEven ? refType : (refType === 'A' ? 'B' : 'A')
    }, [schedules])

    return {
        // Raw data
        schedules,

        // Actions
        updateTermSchedule,
        setScheduleType,
        setReferenceDayType,

        // Lookup
        getTermSchedule,
        getDayTypeForDate,
    }
}
