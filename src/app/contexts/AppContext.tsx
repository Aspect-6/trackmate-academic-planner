import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { generateId, todayString, parseDateLocal, addDaysToDateString, dateToLocalISOString } from '@/app/lib/utils'
import { useSettings } from '@/app/hooks/useSettings'
import { useClasses, useAssignments } from '@/app/hooks/entities'
import type {
    Event,
    NoSchoolPeriod,
    AcademicTerm,
    Schedules,
    ScheduleType,
    TermSchedule,
    AppContextType,
    DayType,
} from '../types'

const AppContext = createContext<AppContextType | undefined>(undefined)

// Keys
const SCHEDULES_KEY = 'trackmateSchedules'
const EVENTS_KEY = 'trackmateEvents'
const NO_SCHOOL_KEY = 'trackmateNoSchool'
const TERMS_KEY = 'trackmateTerms'
// Note: Assignments, Classes, Settings managed by their hooks now.

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key)
    try {
        return data ? JSON.parse(data) : defaultValue
    } catch {
        return defaultValue
    }
}

const saveToLocalStorage = <T,>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data))
}

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const {
        classes,
        addClass,
        updateClass: updateClassInternal, // Alias merely for consistency if needed, but not strictly required unless we wrapped it. Actually we don't wrap updateClass.
        deleteClass: deleteClassInternal,
        reorderClasses,
        getClassById
    } = useClasses()

    const {
        assignments,
        assignmentTypes,
        addAssignment,
        updateAssignment,
        deleteAssignment
    } = useAssignments()

    const {
        theme,
        setTheme,
        termMode,
        setTermMode,
        addAssignmentType,
        removeAssignmentType,
        reorderAssignmentTypes
    } = useSettings()

    // Legacy State managed in AppContext (to be migrated)
    const [events, setEvents] = useState<Event[]>([])
    const [noSchool, setNoSchool] = useState<NoSchoolPeriod[]>([])
    const [academicTerms, setAcademicTerms] = useState<AcademicTerm[]>([])
    const [schedules, setSchedules] = useState<Schedules>({
        type: 'alternating-ab',
        'alternating-ab': {
            startDate: '2025-09-02',
            startDayType: 'A',
            dayTypeOverrides: {},
            terms: {}
        }
    })

    // Computed: filter terms by current termMode
    const filteredAcademicTerms = academicTerms.filter(term => term.termType === termMode)

    // Modal State
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [modalData, setModalData] = useState<any>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    const openModal = (modalName: string, data: any = null): void => {
        setActiveModal(modalName)
        setModalData(data)
    }

    const closeModal = (): void => {
        setActiveModal(null)
        setModalData(null)
    }

    // Load Data
    // Load Data
    useEffect(() => {
        // Assignments and Classes loaded by hooks.
        // We only load the remaining AppContext state.

        // Load schedules from localStorage
        const loadedSchedules = loadFromLocalStorage<Schedules>(SCHEDULES_KEY, {
            type: 'alternating-ab',
            'alternating-ab': {
                startDate: '2025-09-02',
                startDayType: 'A',
                dayTypeOverrides: {},
                terms: {}
            }
        })
        setSchedules(loadedSchedules)

        let loadedEvents = loadFromLocalStorage<any[]>(EVENTS_KEY, [])
        loadedEvents = loadedEvents.map(e => {
            if ((e as any).time && !e.startTime && !e.endTime) {
                const { time, ...rest } = e
                return { ...rest, startTime: (e as any).time, endTime: null }
            }
            return e
        })
        setEvents(loadedEvents as Event[])

        setNoSchool(loadFromLocalStorage<NoSchoolPeriod[]>(NO_SCHOOL_KEY, []))

        let loadedTerms = loadFromLocalStorage<AcademicTerm[]>(TERMS_KEY, [])
        loadedTerms = loadedTerms.map(t => {
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

                return {
                    ...sem,
                    quarters: [
                        { id: generateId(), name: quarterNames[0], startDate: sem.startDate, endDate: midpoint },
                        { id: generateId(), name: quarterNames[1], startDate: dayAfterMidpoint, endDate: sem.endDate }
                    ]
                }
            })

            return {
                ...t,
                termType: t.termType || 'semesters',
                semesters: migratedSemesters
            }
        })
        setAcademicTerms(loadedTerms)

        // Mark as initialized after all data is loaded
        setIsInitialized(true)
    }, [])

    // Save Data Effects - only save after initialization
    // Assignments and Classes saved by hooks.
    useEffect(() => { if (isInitialized) saveToLocalStorage(SCHEDULES_KEY, schedules) }, [schedules, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(EVENTS_KEY, events) }, [events, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(NO_SCHOOL_KEY, noSchool) }, [noSchool, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(TERMS_KEY, academicTerms) }, [academicTerms, isInitialized])

    // Actions
    // Assignment actions managed by useAssignments hook

    // Class actions managed by useClasses hook

    const deleteClass = (id: string): void => {
        // Cascade delete assignments
        const toDelete = assignments.filter(a => a.classId === id)
        toDelete.forEach(a => deleteAssignment(a.id))

        deleteClassInternal(id)
    }

    // ... Events, NoSchool, Terms ... 
    const addEvent = (event: Omit<Event, 'id' | 'createdAt'>): void => {
        setEvents(prev => [...prev, { ...event, id: generateId(), createdAt: new Date().toISOString() }])
    }

    const updateEvent = (id: string, updates: Partial<Event>): void => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
    }

    const deleteEvent = (id: string): void => {
        setEvents(prev => prev.filter(e => e.id !== id))
    }

    const addNoSchool = (period: Omit<NoSchoolPeriod, 'id' | 'createdAt'>): void => {
        setNoSchool(prev => [...prev, { ...period, id: generateId(), createdAt: new Date().toISOString() }])
    }

    const updateNoSchool = (id: string, updates: Partial<NoSchoolPeriod>): void => {
        setNoSchool(prev => prev.map(ns => ns.id === id ? { ...ns, ...updates } : ns))
    }

    const deleteNoSchool = (id: string): void => {
        setNoSchool(prev => prev.filter(ns => ns.id !== id))
    }

    const addAcademicTerm = (term: Omit<AcademicTerm, 'id'>): void => {
        setAcademicTerms(prev => [...prev, { ...term, id: generateId() }])
    }

    const updateAcademicTerm = (id: string, updates: Partial<AcademicTerm>): void => {
        setAcademicTerms(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    }

    const deleteAcademicTerm = (id: string): void => {
        // Clear term assignment from any classes that reference this term
        // Need to update classes - this logic must be moved or use useClasses update
        // Current logic: setClasses(prev => prev.map(...))
        // We must used classesData.updateClass? No, updateClass updates ONE class.
        // We need to update multiple classes. useClasses doesn't expose bulk update.
        // I need to add bulk update or just iterate.
        // Iterating:
        const affectedClasses = classes.filter(c => c.termId === id)
        affectedClasses.forEach(c => {
            updateClassInternal(c.id, { termId: undefined, semesterId: undefined })
        })

        setAcademicTerms(prev => prev.filter(t => t.id !== id))
    }

    // ... Schedules ...
    const updateTermSchedule = (termId: string, newSchedule: TermSchedule): void => {
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
    }

    const setScheduleType = (type: ScheduleType): void => {
        setSchedules(prev => ({
            ...prev,
            type
        }))
    }

    const setReferenceDayType = (type: 'A' | 'B'): void => {
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
    }

    const deleteAllAssignments = (): void => {
        localStorage.removeItem('trackmateAssignments')
        window.location.reload()
    }

    const deleteAllEvents = (): void => {
        setEvents([])
        localStorage.removeItem(EVENTS_KEY)
        window.location.reload()
    }

    const clearAllData = (): void => {
        localStorage.removeItem('trackmateAssignments')
        localStorage.removeItem('trackmateClasses')
        localStorage.removeItem(SCHEDULES_KEY)
        localStorage.removeItem(EVENTS_KEY)
        localStorage.removeItem(NO_SCHOOL_KEY)
        localStorage.removeItem(TERMS_KEY)
        localStorage.removeItem('trackmateAssignmentTypes')
        window.location.reload()
    }


    // Helpers
    const getDayTypeForDate = (dateString: string): DayType => {
        if (schedules.type !== 'alternating-ab') return null

        const abData = schedules['alternating-ab']
        if (!abData) return null

        const date = parseDateLocal(dateString)
        const dayOfWeek = date.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) return null

        // Check if date falls within an active term
        const activeTerm = filteredAcademicTerms.find(term => {
            const start = parseDateLocal(term.startDate)
            const end = parseDateLocal(term.endDate)
            return date >= start && date <= end
        })
        if (!activeTerm) return null

        // Check if date falls within an active semester
        const activeSemester = activeTerm.semesters.find(sem => {
            const start = parseDateLocal(sem.startDate)
            const end = parseDateLocal(sem.endDate)
            return date >= start && date <= end
        })
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

        const isNoSchoolDay = noSchool.some(ns => {
            const start = parseDateLocal(ns.startDate)
            const end = parseDateLocal(ns.endDate)
            const check = parseDateLocal(dateString)
            return check >= start && check <= end
        })
        if (isNoSchoolDay) return null

        // Check for override first
        if (abData.dayTypeOverrides[dateString]) {
            return abData.dayTypeOverrides[dateString]
        }

        // Find the most recent override before this date to calculate from
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

        // Count school days from reference
        const refDateParsed = parseDateLocal(refDate)
        const target = parseDateLocal(dateString)

        let count = 0
        let current = new Date(refDateParsed)

        if (target < current) {
            while (current > target) {
                current.setDate(current.getDate() - 1)
                const dow = current.getDay()
                if (dow !== 0 && dow !== 6) {
                    const isNoSchool = noSchool.some(ns => {
                        const start = parseDateLocal(ns.startDate)
                        const end = parseDateLocal(ns.endDate)
                        return current >= start && current <= end
                    })
                    if (!isNoSchool) count--
                }
            }
        } else {
            while (current < target) {
                const dow = current.getDay()
                if (dow !== 0 && dow !== 6) {
                    const isNoSchool = noSchool.some(ns => {
                        const start = parseDateLocal(ns.startDate)
                        const end = parseDateLocal(ns.endDate)
                        return current >= start && current <= end
                    })
                    if (!isNoSchool) count++
                }
                current.setDate(current.getDate() + 1)
            }
        }

        const isEven = count % 2 === 0
        return isEven ? refType : (refType === 'A' ? 'B' : 'A')
    }

    // getClassById now provided by useClasses, but we can wrap it or destructure it. 
    // AppContext interface defines it.
    // It is already in classesData.

    return (
        <AppContext.Provider value={{
            assignments, events, noSchool, academicTerms, schedules,
            addAssignment, updateAssignment, deleteAssignment,
            assignmentTypes, addAssignmentType, removeAssignmentType,
            reorderAssignmentTypes,

            // Spread useClasses data (includes classes, addClass, updateClass, reorderClasses, getClassById, classesByTerm etc)
            classes,
            addClass,
            updateClass: updateClassInternal,
            reorderClasses,
            getClassById,
            // Override deleteClass to include assignment cleanup
            deleteClass,

            addEvent, updateEvent, deleteEvent,
            addNoSchool, updateNoSchool, deleteNoSchool,
            termMode, setTermMode, filteredAcademicTerms,
            addAcademicTerm, updateAcademicTerm, deleteAcademicTerm,
            updateTermSchedule, setScheduleType, setReferenceDayType, clearAllData,
            deleteAllAssignments, deleteAllEvents,
            getDayTypeForDate,
            activeModal, modalData, openModal, closeModal,
            theme, setTheme
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = (): AppContextType => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
