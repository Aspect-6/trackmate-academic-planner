import React from 'react';

const CalendarSidePanelBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="space-y-6">
        {children}
    </div>
);

export default CalendarSidePanelBody;
