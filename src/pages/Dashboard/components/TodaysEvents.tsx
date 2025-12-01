import React from 'react';
import { TodaysEventsProps } from '@/pages/Dashboard/types';
import EventItem from '@/pages/Dashboard/components/EventItem';
import {
    DASHBOARD,
    GLOBAL
} from '@/app/styles/colors';

const TodaysEvents: React.FC<TodaysEventsProps> = ({ events, onEventClick }) => {
    return (
        <div
            className="high-contrast-card p-6 rounded-xl"
            style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.EVENT_HEADING_TEXT }}>Today's Events</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {events.length === 0 ? (
                    <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_GRAY_500 }}>No events scheduled for today.</p>
                ) : (
                    events.map(event => (
                        <EventItem
                            key={event.id}
                            event={event}
                            onClick={() => onEventClick(event.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodaysEvents;
