import React, { useState } from 'react';
import { SidePanelClassesProps } from '@/pages/Calendar/types';
import { CALENDAR } from '@/app/styles/colors';

const ClassItem = ({ classId, index, getClassById }: { classId: string, index: number, getClassById: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!classId) return null;
    const classInfo = getClassById(classId);
    if (!classInfo) return null;

    return (
        <div 
            className="flex items-center justify-between p-3 rounded-lg transition-colors" 
            style={{ 
                borderLeft: `4px solid ${classInfo.color}`, 
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex-1">
                <div className="font-semibold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{classInfo.name}</div>
                <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>
                    Period {index + 1} • {classInfo.teacherName || 'No instructor'}
                </div>
            </div>
        </div>
    );
};

const SidePanelClasses: React.FC<SidePanelClassesProps> = ({ classes, noSchoolDay, getClassById }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING }}>Classes</h4>
            <div className="space-y-2">
                {noSchoolDay ? (
                    <p className="text-sm italic" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>No classes (no school)</p>
                ) : classes.length > 0 ? (
                    classes.map((classId, index) => (
                        <ClassItem key={index} classId={classId} index={index} getClassById={getClassById} />
                    ))
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>No classes scheduled</p>
                )}
            </div>
        </div>
    );
};

export default SidePanelClasses;
