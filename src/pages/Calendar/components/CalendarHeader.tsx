import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarHeaderProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthName, onPrevMonth, onNextMonth }) => {
    const [hoveredBtn, setHoveredBtn] = useState<'prev' | 'next' | null>(null);

    return (
        <div className="flex justify-between items-center mb-4 md:mb-6 flex-shrink-0">
            <button 
                onClick={onPrevMonth} 
                onMouseEnter={() => setHoveredBtn('prev')}
                onMouseLeave={() => setHoveredBtn(null)}
                className="calendar-header-btn p-3 md:p-2 rounded-full transition touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                style={{ backgroundColor: hoveredBtn === 'prev' ? CALENDAR.HEADER_BUTTON_HOVER : undefined }}
                aria-label="Previous Month"
            >
                <ChevronLeft className="w-7 h-7 md:w-6 md:h-6" style={{ color: CALENDAR.HEADER_ICON }} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold px-2 flex-shrink-0" style={{ color: CALENDAR.HEADER_TEXT }}>{monthName}</h2>
            <button 
                onClick={onNextMonth} 
                onMouseEnter={() => setHoveredBtn('next')}
                onMouseLeave={() => setHoveredBtn(null)}
                className="calendar-header-btn p-3 md:p-2 rounded-full transition touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                style={{ backgroundColor: hoveredBtn === 'next' ? CALENDAR.HEADER_BUTTON_HOVER : undefined }}
                aria-label="Next Month"
            >
                <ChevronRight className="w-7 h-7 md:w-6 md:h-6" style={{ color: CALENDAR.HEADER_ICON }} />
            </button>
        </div>
    );
};

export default CalendarHeader;
