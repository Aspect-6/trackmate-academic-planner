import React from 'react';

type Props = {
    children?: React.ReactNode;
};

const CalendarBody: React.FC<Props> = ({ children }) => (
    <div className="calendar-main-container flex flex-grow overflow-hidden relative">
        {children}
    </div>
);

export default CalendarBody;
