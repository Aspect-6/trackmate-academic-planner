import { useMemo, useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/app/hooks/data/useLocalStorage'
import {
    generateId,
    parseDateLocal,
    addDaysToDateString,
    dateToLocalISOString
} from '@/app/lib/utils'
import { STORAGE_KEYS } from '@/app/config/storageKeys'
import type { AcademicTerm, Semester, TermMode } from '@/app/types'

/**
 * Hook for accessing and working with academic terms.
 * Should be used within AppContext or by components that need access to terms data.
 */
export const useAcademicTerms = (termMode: TermMode = 'Semesters Only') => {
    const [academicTerms, setAcademicTerms] = useLocalStorage<AcademicTerm[]>(STORAGE_KEYS.TERMS, [])

    // Data Migration / Sanitization
    useEffect(() => {
        setAcademicTerms(prev => {
            let hasChanges = false
            const next = prev.map(t => {
                // Migrate semesters if missing
                const semesters = t.semesters || []

                // Migrate quarters for each semester if missing
                const migratedSemesters = semesters.map(sem => {
                    if (sem.quarters && sem.quarters.length > 0) {
                        return sem
                    }

                    // Calculate midpoint for default quarter boundary
                    const startDate = parseDateLocal(sem.startDate)
                    const endDate = parseDateLocal(sem.endDate)
                    const midpointTime = startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2
                    const midpointDate = new Date(midpointTime)
                    const midpoint = dateToLocalISOString(midpointDate)
                    const dayAfterMidpoint = addDaysToDateString(midpoint, 1)

                    const quarterNames = sem.name === 'Fall'
                        ? ['Q1', 'Q2'] as const
                        : ['Q3', 'Q4'] as const

                    hasChanges = true
                    return {
                        ...sem,
                        quarters: [
                            { id: generateId(), name: quarterNames[0], startDate: sem.startDate, endDate: midpoint },
                            { id: generateId(), name: quarterNames[1], startDate: dayAfterMidpoint, endDate: sem.endDate }
                        ]
                    }
                })

                // Default termType
                if (!t.termType) {
                    hasChanges = true
                }

                if (hasChanges) {
                    return {
                        ...t,
                        termType: t.termType || 'semesters',
                        semesters: migratedSemesters
                    }
                }
                return t
            })

            return hasChanges ? next : prev
        })
    }, [setAcademicTerms])

    // Computed: filter terms by current termMode
    const filteredAcademicTerms = useMemo(() =>
        academicTerms.filter(term => term.termType === termMode)
        , [academicTerms, termMode])

    // Counts
    const totalNum = academicTerms.length
    const filteredNum = filteredAcademicTerms.length

    // Indexed by id for quick lookups
    const termsById = useMemo(() => academicTerms.reduce<Record<string, AcademicTerm>>((acc, term) => {
        acc[term.id] = term
        return acc
    }, {}), [academicTerms])

    // Lookup functions
    const getTermById = useCallback((id: string): AcademicTerm | undefined => {
        return academicTerms.find(term => term.id === id)
    }, [academicTerms])

    const getSemesterById = useCallback((termId: string, semesterId: string): Semester | undefined => {
        const term = academicTerms.find(t => t.id === termId)
        return term?.semesters.find(s => s.id === semesterId)
    }, [academicTerms])

    const getTermDisplay = useCallback((termId: string | undefined, semesterId?: string): string => {
        if (!termId) return 'Not Assigned'

        const term = academicTerms.find(t => t.id === termId)
        if (!term) return 'Not Assigned'

        if (semesterId) {
            const semester = term.semesters.find(s => s.id === semesterId)
            if (semester) {
                return `${term.name} – ${semester.name}`
            }
        }

        return term.name
    }, [academicTerms])

    // Date utilities
    const getActiveTermForDate = useCallback((date: string): AcademicTerm | undefined => {
        const dateObj = new Date(date)
        return filteredAcademicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [filteredAcademicTerms])

    const getActiveSemesterForDate = useCallback((date: string, term: AcademicTerm): Semester | undefined => {
        const dateObj = new Date(date)
        return term.semesters.find(semester => {
            const start = new Date(semester.startDate)
            const end = new Date(semester.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [])

    // Actions
    const addAcademicTerm = useCallback((term: Omit<AcademicTerm, 'id'>): void => {
        setAcademicTerms(prev => [...prev, { ...term, id: generateId() }])
    }, [setAcademicTerms])

    const updateAcademicTerm = useCallback((id: string, updates: Partial<AcademicTerm>): void => {
        setAcademicTerms(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    }, [setAcademicTerms])

    const deleteAcademicTerm = useCallback((id: string): void => {
        setAcademicTerms(prev => prev.filter(t => t.id !== id))
    }, [setAcademicTerms])

    return {
        // Raw data
        academicTerms,
        filteredAcademicTerms,

        // Counts
        totalNum,
        filteredNum,

        // Indexed data
        termsById,

        // Lookup functions
        getTermById,
        getSemesterById,
        getTermDisplay,

        // Date utilities
        getActiveTermForDate,
        getActiveSemesterForDate,

        // Actions
        addAcademicTerm,
        updateAcademicTerm,
        deleteAcademicTerm,
    }
}
