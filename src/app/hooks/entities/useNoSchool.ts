import { useMemo, useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { parseDateLocal, dateToLocalISOString } from '@/app/lib/utils'
import type { NoSchoolPeriod } from '@/app/types'

/**
 * Hook for accessing and working with no-school periods.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useNoSchool = () => {
    const { noSchool: noSchoolPeriods, addNoSchool, updateNoSchool, deleteNoSchool, openModal } = useApp()

    // Indexed by date (expands date ranges into individual dates)
    const noSchoolByDate = useMemo(() => noSchoolPeriods.reduce<Record<string, NoSchoolPeriod>>((acc, period) => {
        const start = parseDateLocal(period.startDate)
        const end = parseDateLocal(period.endDate)
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const dateStr = dateToLocalISOString(date)
            acc[dateStr] = period
        }
        return acc
    }, {}), [noSchoolPeriods])

    // Lookup functions
    const getNoSchoolById = useCallback((id: string) => noSchoolPeriods.find(period => period.id === id) ?? null
        , [noSchoolPeriods])

    const getNoSchoolStatusForDate = useCallback((date: string) => noSchoolByDate[date] ?? null
        , [noSchoolByDate])

    // Actions
    const openAddNoSchool = useCallback(() => openModal('add-no-school'), [openModal])
    const openEditNoSchool = useCallback((id: string) => openModal('edit-no-school', id), [openModal])

    return {
        // Raw data
        noSchoolPeriods,

        // Indexed data
        noSchoolByDate,

        // Lookup functions
        getNoSchoolById,
        getNoSchoolStatusForDate,

        // Actions
        addNoSchool,
        updateNoSchool,
        deleteNoSchool,
        openAddNoSchool,
        openEditNoSchool,
    }
}
