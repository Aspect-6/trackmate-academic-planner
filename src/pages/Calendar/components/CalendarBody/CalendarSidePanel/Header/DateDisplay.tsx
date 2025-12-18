import React from 'react';
import { CALENDAR } from '@/app/styles/colors';

interface DateDisplayProps {
    children: React.ReactNode;
};

const DateDisplay: React.FC<DateDisplayProps> = ({ children }) => (
    <h3 className="text-base font-bold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{children}</h3>
);

export default DateDisplay;
