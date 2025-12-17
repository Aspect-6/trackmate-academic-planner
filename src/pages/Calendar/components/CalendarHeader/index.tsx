import React from 'react';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import MonthTitle from './MonthTitle';

type CalendarHeaderProps = { children?: React.ReactNode };

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ children }) => (
    <div className="flex justify-between items-center mb-4 md:mb-6 flex-shrink-0">
        {children}
    </div>
);

export default CalendarHeader;

// Named re-exports so things can import the subcomponents and use them as children
export { PrevButton, NextButton, MonthTitle };