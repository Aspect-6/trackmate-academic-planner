import React from 'react'
import type { ScheduleType, Class, NoSchoolPeriod } from '@/app/types'
import AlternatingABClassList from './AlternatingABClassList'

/**
 * Props passed to all ClassList renderer components.
 */
export interface ClassListRendererProps {
    /** Date to show classes for (YYYY-MM-DD) */
    date: string
    /** No school period if applicable */
    noSchoolDay?: NoSchoolPeriod
    /** Function to get class data by ID */
    getClassById: (id: string) => Class
    /** Function to open modals (for Dashboard interactions) */
    openModal?: (name: string, data: any) => void
    /** Variant for styling differences */
    variant: 'dashboard' | 'calendar'
}

/**
 * Registry of ClassList renderers by schedule type.
 * Add new schedule types here.
 */
export const CLASS_LIST_RENDERERS: Record<ScheduleType, React.FC<ClassListRendererProps> | null> = {
    'alternating-ab': AlternatingABClassList,
    'none': null
}
