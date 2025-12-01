import React, { useState } from 'react';
import { SidePanelEventsProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';

const EventItem = ({ event, onEventClick }: { event: any, onEventClick: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const formatEventTime = (start: string | null, end: string | null) => {
        if (!start && !end) return 'All day';
        if (start && !end) {
            return new Date(`2000-01-01T${start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        }
        if (!start && end) {
            return `Until ${new Date(`2000-01-01T${end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
        }
        const s = new Date(`2000-01-01T${start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const e = new Date(`2000-01-01T${end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${s} - ${e}`;
    };

    return (
        <div
            onClick={() => onEventClick(event.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="calendar-side-panel-item p-3 rounded-lg cursor-pointer transition-colors"
            style={{ 
                borderLeft: `4px solid ${event.color}`, 
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG 
            }}
        >
            <div className="font-semibold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{event.title}</div>
            <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{formatEventTime(event.startTime, event.endTime)}</div>
            {event.description && <div className="text-xs mt-1" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{event.description}</div>}
        </div>
    );
};

const SidePanelEvents: React.FC<SidePanelEventsProps> = ({ events, onEventClick }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.EVENT_HEADING }}>Events</h4>
            <div className="space-y-2">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventItem key={event.id} event={event} onEventClick={onEventClick} />
                    ))
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>No events scheduled</p>
                )}
            </div>
        </div>
    );
};

export default SidePanelEvents;
