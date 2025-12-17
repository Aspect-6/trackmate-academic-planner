import React from 'react';
import { CALENDAR } from '@/app/styles/colors';
import { MonthTitleProps } from '@/pages/Calendar/types';

const MonthTitle: React.FC<MonthTitleProps> = ({ monthName }) => (
    <h2 className="text-xl md:text-2xl font-bold px-2 flex-shrink-0" style={{ color: CALENDAR.HEADER_TEXT }}>{monthName}</h2>
);

export default MonthTitle;
