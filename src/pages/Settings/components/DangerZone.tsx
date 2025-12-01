import React from 'react';
import { Trash2 } from 'lucide-react';
import { DangerZoneProps } from '@/pages/Settings/types';

const DangerZone: React.FC<DangerZoneProps> = ({ onClearData }) => {
    return (
        <div className="high-contrast-card p-6 rounded-xl border border-red-900/50">
            <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-gray-400 mb-6">
                This action will permanently delete all your assignments, classes, events, and schedule data.
                This cannot be undone.
            </p>
            <button
                onClick={onClearData}
                className="flex items-center py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-150"
            >
                <Trash2 className="w-5 h-5 mr-2" />
                Clear All Data
            </button>
        </div>
    );
};

export default DangerZone;
