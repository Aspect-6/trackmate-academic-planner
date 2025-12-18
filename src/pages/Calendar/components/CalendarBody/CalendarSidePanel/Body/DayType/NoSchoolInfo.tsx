import React from 'react';
import { NoSchoolPeriod } from '@/app/types';
import { CALENDAR } from '@/app/styles/colors';

interface NoSchoolInfoProps {
    noSchoolDay?: NoSchoolPeriod | null;
}

const NoSchoolInfo: React.FC<NoSchoolInfoProps> = ({ noSchoolDay }) => {
    if (!noSchoolDay) return null;

    return (
        <div className="text-center">
            <div className="font-semibold" style={{ color: CALENDAR.NO_SCHOOL_HEADING }}>No School</div>
            <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{noSchoolDay.name}</div>
        </div>
    );
};

export default React.memo(NoSchoolInfo);
