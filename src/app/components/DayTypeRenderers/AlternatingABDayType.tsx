import React from 'react'
import type { DayTypeRendererProps } from './index'
import { CALENDAR } from '@/app/styles/colors'

/**
 * DayType renderer for alternating A/B schedule.
 * Displays A-Day or B-Day label with appropriate colors.
 */
const AlternatingABDayType: React.FC<DayTypeRendererProps> = ({ dayType }) => {
    if (!dayType) return null

    return (
        <div className="text-center">
            <div
                className="font-bold text-lg"
                style={{ color: dayType === 'A' ? CALENDAR.TEXT_A_DAY : CALENDAR.TEXT_B_DAY }}
            >
                {dayType}-Day
            </div>
        </div>
    )
}

export default AlternatingABDayType
