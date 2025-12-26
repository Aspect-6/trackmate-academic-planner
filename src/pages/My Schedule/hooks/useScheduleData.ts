import { useState, useEffect } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { SemesterScheduleData, SemesterName, ScheduleDayType } from '@/pages/My Schedule/types'

const STORAGE_KEY = 'trackmateSchedules'

const EMPTY_SEMESTER: SemesterScheduleData = {
    aDay: [null, null, null, null],
    bDay: [null, null, null, null]
}

interface TermSchedule {
    Fall: SemesterScheduleData
    Spring: SemesterScheduleData
}

/** Map of termId -> schedule data for that term */
type ScheduleStore = Record<string, TermSchedule>

const EMPTY_TERM_SCHEDULE: TermSchedule = {
    Fall: { ...EMPTY_SEMESTER },
    Spring: { ...EMPTY_SEMESTER }
}

/**
 * Loads all schedules from localStorage.
 */
const loadAllSchedules = (): ScheduleStore => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return {}
        return JSON.parse(saved)
    } catch {
        return {}
    }
}

/**
 * Gets schedule for a specific term, or empty schedule if not found.
 */
const getScheduleForTerm = (store: ScheduleStore, termId: string | null): TermSchedule => {
    if (!termId) return EMPTY_TERM_SCHEDULE
    return store[termId] || EMPTY_TERM_SCHEDULE
}

/**
 * Generates an SVG dropdown arrow with the given color
 */
const getArrowSvg = (color: string) => {
    const encodedColor = encodeURIComponent(color)
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodedColor}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
}

/**
 * Custom hook for managing schedule data.
 * Stores separate schedules for each academic term.
 */
export const useScheduleData = () => {
    const { getClassById, openModal, academicTerms } = useApp()

    // All schedules (persisted)
    const [allSchedules, setAllSchedules] = useState<ScheduleStore>(loadAllSchedules)
    const [savedSchedules, setSavedSchedules] = useState<ScheduleStore>(loadAllSchedules)

    // Currently selected term
    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)

    // Auto-select the current term based on today's date
    useEffect(() => {
        if (selectedTermId !== null) return // Don't override if already set

        const today = new Date()
        const currentTerm = academicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return today >= start && today <= end
        })

        if (currentTerm) {
            setSelectedTermId(currentTerm.id)
        }
    }, [academicTerms, selectedTermId])

    // Arrow color for dropdown (reads from CSS)
    const [arrowColor, setArrowColor] = useState('')

    // Read the accent color from CSS on mount and theme change
    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue('--sidebar-active-tab-background')
                .trim()
            if (color) setArrowColor(color)
        }
        updateColor()

        // Watch for theme changes
        const observer = new MutationObserver(updateColor)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    const arrowStyle = { backgroundImage: getArrowSvg(arrowColor) }

    // Current term's schedule data
    const currentSchedule = getScheduleForTerm(allSchedules, selectedTermId)
    const savedCurrentSchedule = getScheduleForTerm(savedSchedules, selectedTermId)

    const isDirty = selectedTermId
        ? JSON.stringify(currentSchedule) !== JSON.stringify(savedCurrentSchedule)
        : false

    const saveSchedule = () => {
        if (!selectedTermId) return

        const newStore = {
            ...allSchedules,
            [selectedTermId]: currentSchedule
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore))
        setSavedSchedules(newStore)
    }

    const setTermId = (termId: string | null) => {
        setSelectedTermId(termId)
    }

    /**
     * Updates a cell in the schedule (for both semester and year-long classes)
     */
    const updateCell = (
        semester: SemesterName,
        dayType: ScheduleDayType,
        periodIndex: number,
        classId: string | null,
        isSemesterClass: boolean
    ) => {
        if (!selectedTermId) return

        setAllSchedules(prev => {
            const termSchedule = prev[selectedTermId] || EMPTY_TERM_SCHEDULE

            if (isSemesterClass) {
                // Semester class: fill BOTH A and B days at this period
                return {
                    ...prev,
                    [selectedTermId]: {
                        ...termSchedule,
                        [semester]: {
                            aDay: termSchedule[semester].aDay.map((id, i) => i === periodIndex ? classId : id),
                            bDay: termSchedule[semester].bDay.map((id, i) => i === periodIndex ? classId : id)
                        }
                    }
                }
            } else {
                // Year-long class: only fill the specific slot that was clicked
                return {
                    ...prev,
                    [selectedTermId]: {
                        ...termSchedule,
                        [semester]: {
                            ...termSchedule[semester],
                            [dayType === 'A' ? 'aDay' : 'bDay']: termSchedule[semester][dayType === 'A' ? 'aDay' : 'bDay'].map(
                                (id, i) => i === periodIndex ? classId : id
                            )
                        }
                    }
                }
            }
        })
    }

    /**
     * Opens modal to select a class for a cell
     */
    const handleCellClick = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const otherSemester: SemesterName = semester === 'Fall' ? 'Spring' : 'Fall'
        openModal('semester-class-selector', {
            semester,
            dayType,
            periodIndex,
            termId: selectedTermId,
            otherSemesterSchedule: currentSchedule[otherSemester],
            onSelect: (classId: string | null, isSemesterClass: boolean) => {
                updateCell(semester, dayType, periodIndex, classId, isSemesterClass)
            }
        })
    }

    /**
     * Removes a class from a cell (handles semester vs year-long logic)
     */
    const handleRemove = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const classId = currentSchedule[semester][dayType === 'A' ? 'aDay' : 'bDay'][periodIndex]
        const classData = classId ? getClassById(classId) : null
        const isSemesterClass = classData?.semesterId ? true : false

        updateCell(semester, dayType, periodIndex, null, isSemesterClass)
    }

    /**
     * Gets schedule data for a specific semester
     */
    const getScheduleForSemester = (semester: SemesterName): SemesterScheduleData => {
        return currentSchedule[semester]
    }

    return {
        isDirty,
        saveSchedule,
        selectedTermId,
        setTermId,
        academicTerms,
        arrowStyle,
        handleCellClick,
        handleRemove,
        getScheduleForSemester,
        getClassById
    }
}
