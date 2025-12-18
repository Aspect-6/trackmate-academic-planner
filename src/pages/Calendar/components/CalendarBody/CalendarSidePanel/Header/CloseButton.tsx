import React, { useState } from 'react';
import { CALENDAR } from '@/app/styles/colors';

interface CloseButtonProps {
    onClick: () => void;
    children: React.ReactNode;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, children }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="calendar-side-panel-close transition-colors"
            style={{ color: hovered ? CALENDAR.SIDE_PANEL_CLOSE_ICON_HOVER : CALENDAR.SIDE_PANEL_CLOSE_ICON }}
        >
            {children}
        </button>
    );
};

export default CloseButton;
