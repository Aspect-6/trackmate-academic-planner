import React from 'react';
import { Calendar } from 'lucide-react';
import { ScheduleSettingsProps } from '@/pages/Settings/types';
import { GLOBAL, SETTINGS } from '@/app/styles/colors';

const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({ currentDayType, onSetDayType }) => {
    return (
        <div className="high-contrast-card p-6 rounded-xl mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: SETTINGS.SCHEDULE_SETTINGS_HEADER }}>
                <Calendar className="w-6 h-6 mr-2" />
                Schedule Settings
            </h2>
            <p className="text-gray-400 mb-4">
                Manually set the current day type to correct the A/B day rotation.
                Future days will alternate based on this setting.
            </p>

            <div
                className="flex items-center justify-between p-4 rounded-lg border mb-4"
                style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}
            >
                <span className="text-gray-300">Current Calculation for Today:</span>
                <span className={`font-bold ${currentDayType === 'A' ? 'text-violet-400' : currentDayType === 'B' ? 'text-blue-400' : 'text-gray-500'}`}>
                    {currentDayType ? `${currentDayType}-Day` : 'No School / Weekend'}
                </span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => onSetDayType('A')}
                    className="flex-1 py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition duration-150"
                >
                    Set Today as A-Day
                </button>
                <button
                    onClick={() => onSetDayType('B')}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-150"
                >
                    Set Today as B-Day
                </button>
            </div>
        </div>
    );
};

export default ScheduleSettings;
