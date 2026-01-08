import React from 'react'
import type { ScheduleType } from '@/app/types'
import AlternatingABRenderer from './AlternatingAB'

/**
 * Props passed to all schedule renderer components.
 */
export interface ScheduleRendererProps {
    selectedTermId: string | null
}

/**
 * Registry of schedule type renderers.
 * Add new schedule types here.
 */
export const SCHEDULE_RENDERERS: Record<ScheduleType, React.FC<ScheduleRendererProps> | null> = {
    'alternating-ab': AlternatingABRenderer,
    'none': null
}
