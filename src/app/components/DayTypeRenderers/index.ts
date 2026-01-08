import React from 'react'
import type { ScheduleType, DayType } from '@/app/types'
import AlternatingABDayType from './AlternatingABDayType'

/**
 * Props passed to all DayType renderer components.
 */
export interface DayTypeRendererProps {
    /** The day type (A, B, etc.) or null */
    dayType: DayType
}

/**
 * Registry of DayType renderers by schedule type.
 * Add new schedule types here.
 */
export const DAY_TYPE_RENDERERS: Record<ScheduleType, React.FC<DayTypeRendererProps> | null> = {
    'alternating-ab': AlternatingABDayType,
    'none': null
}
