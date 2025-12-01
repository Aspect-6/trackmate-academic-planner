import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { AddAssignmentModal, EditAssignmentModal, DeleteAssignmentModal } from '@/app/components/modals/AssignmentModals';
import { AddClassModal, EditClassModal, DeleteClassModal } from '@/app/components/modals/ClassModals';
import { AddEventModal, EditEventModal, DeleteEventModal } from '@/app/components/modals/EventModals';
import { AddNoSchoolModal, EditNoSchoolModal, DeleteNoSchoolModal } from '@/app/components/modals/NoSchoolModal';
import { ScheduleClassSelectorModal } from '@/app/components/modals/ScheduleClassSelectorModal/index';
import { FileText, BookOpen, X } from 'lucide-react';

import {
    GLOBAL
} from '@/app/styles/colors';

interface TypeSelectorModalProps {
    onClose: () => void;
    openModal: (modalName: string, data?: string | null) => void;
}

const TypeSelectorModal: React.FC<TypeSelectorModalProps> = ({ onClose, openModal }) => (
    <div className="high-contrast-card w-full max-w-sm p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ADDITEM_HEADER_TEXT }}>What would you like to add?</h2>
        <div className="space-y-3">
            <button
                onClick={() => openModal('add-assignment')}
                className="w-full py-3 px-4 text-white rounded-lg font-medium transition duration-150 flex items-center"
                style={{ backgroundColor: GLOBAL.ASSIGNMENT_BUTTON_BG }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG}
            >
                <FileText className="w-5 h-5 mr-3" />
                Assignment
            </button>
            <button
                onClick={() => openModal('add-class')}
                className="w-full py-3 px-4 text-white rounded-lg font-medium transition duration-150 flex items-center"
                style={{ backgroundColor: GLOBAL.CLASS_BUTTON_BG }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CLASS_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CLASS_BUTTON_BG}
            >
                <BookOpen className="w-5 h-5 mr-3" />
                Class
            </button>
            <button
                onClick={() => openModal('add-event')}
                className="w-full py-3 px-4 text-white rounded-lg font-medium transition duration-150 flex items-center"
                style={{ backgroundColor: GLOBAL.EVENT_BUTTON_BG }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.EVENT_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.EVENT_BUTTON_BG}
            >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Event
            </button>
            <button
                onClick={() => openModal('add-no-school')}
                className="w-full py-3 px-4 text-white rounded-lg font-medium transition duration-150 flex items-center"
                style={{ backgroundColor: GLOBAL.NOSCHOOL_BUTTON_BG }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG}
            >
                <X className="w-5 h-5 mr-3" />
                No School
            </button>
        </div>
        <div className="flex justify-end mt-4">
            <button
                onClick={onClose}
                className="py-2 px-4 rounded-lg text-sm font-medium transition duration-150"
                style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
            >
                Cancel
            </button>
        </div>
    </div>
);

const ModalManager: React.FC = () => {
    const { activeModal, modalData, closeModal, openModal } = useApp();

    if (!activeModal) return null;

    const renderModalContent = () => {
        switch (activeModal) {
            case 'type-selector':
                return <TypeSelectorModal onClose={closeModal} openModal={openModal} />;
            case 'add-assignment':
                return <AddAssignmentModal onClose={closeModal} />;
            case 'edit-assignment':
                return <EditAssignmentModal onClose={closeModal} assignmentId={modalData} />;
            case 'delete-assignment':
                return <DeleteAssignmentModal onClose={closeModal} assignmentId={modalData} />;
            case 'add-class':
                return <AddClassModal onClose={closeModal} />;
            case 'edit-class':
                return <EditClassModal onClose={closeModal} classId={modalData} />;
            case 'delete-class':
                return <DeleteClassModal onClose={closeModal} classId={modalData} />;
            case 'add-event':
                return <AddEventModal onClose={closeModal} />;
            case 'edit-event':
                return <EditEventModal onClose={closeModal} eventId={modalData} />;
            case 'delete-event':
                return <DeleteEventModal onClose={closeModal} eventId={modalData} />;
            case 'add-no-school':
                return <AddNoSchoolModal onClose={closeModal} />;
            case 'edit-no-school':
                return <EditNoSchoolModal onClose={closeModal} noSchoolId={modalData} />;
            case 'delete-no-school':
                return <DeleteNoSchoolModal onClose={closeModal} noSchoolId={modalData} />;
            case 'schedule-class-selector':
                return <ScheduleClassSelectorModal onClose={closeModal} data={modalData} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: GLOBAL.MODAL_BACKDROP }}>
            {renderModalContent()}
        </div>
    );
};

export default ModalManager;
