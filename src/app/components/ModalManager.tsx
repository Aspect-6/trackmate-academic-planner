import React, { useEffect } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { AddAssignmentModal, EditAssignmentModal, DeleteAssignmentModal } from '@/app/components/modals/AssignmentModals'
import { AddClassModal, EditClassModal, DeleteClassModal } from '@/app/components/modals/ClassModals'
import { AddEventModal, EditEventModal, DeleteEventModal } from '@/app/components/modals/EventModals'
import { AddNoSchoolModal, EditNoSchoolModal, DeleteNoSchoolModal } from '@/app/components/modals/NoSchoolModal'
import { ClearAllDataModal, ClearAllAssignmentsModal, ClearAllEventsModal } from '@/app/components/modals/ClearAllDataModal'
import { AddTermModal, EditTermModal, DeleteTermModal } from '@/app/components/modals/TermModals'
import { ScheduleClassSelectorModal } from '@/app/components/modals/ScheduleClassSelectorModal/index'
import { SemesterClassSelectorModal } from '@/app/components/modals/SemesterClassSelectorModal'
import { TypeSelectorModal } from '@/app/components/modals/TypeSelectorModal'
import { GLOBAL } from '@/app/styles/colors'

const ModalManager: React.FC = () => {
    const { activeModal, modalData, closeModal, openModal } = useApp()

    useEffect(() => {
        if (activeModal) {
            // Prevent background scrolling on all devices including mobile
            document.body.style.overflow = 'hidden'
            // document.body.style.position = 'fixed'
            // document.body.style.top = `-${window.scrollY}px`
        } else {
            // const scrollY = document.body.style.top
            document.body.style.overflow = ''
            // document.body.style.position = ''
            // document.body.style.top = ''
        }

        return () => {
            const scrollY = document.body.style.top
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
            }
        }
    }, [activeModal])

    if (!activeModal) return null

    const renderModalContent = () => {
        switch (activeModal) {
            case 'type-selector':
                return <TypeSelectorModal onClose={closeModal} openModal={openModal} />
            case 'add-assignment':
                return <AddAssignmentModal onClose={closeModal} />
            case 'edit-assignment':
                return <EditAssignmentModal onClose={closeModal} assignmentId={modalData} />
            case 'delete-assignment':
                return <DeleteAssignmentModal onClose={closeModal} assignmentId={modalData} />
            case 'add-class':
                return <AddClassModal onClose={closeModal} />
            case 'edit-class':
                return <EditClassModal onClose={closeModal} classId={modalData} />
            case 'delete-class':
                return <DeleteClassModal onClose={closeModal} classId={modalData} />
            case 'add-event':
                return <AddEventModal onClose={closeModal} />
            case 'edit-event':
                return <EditEventModal onClose={closeModal} eventId={modalData} />
            case 'delete-event':
                return <DeleteEventModal onClose={closeModal} eventId={modalData} />
            case 'add-no-school':
                return <AddNoSchoolModal onClose={closeModal} />
            case 'edit-no-school':
                return <EditNoSchoolModal onClose={closeModal} noSchoolId={modalData} />
            case 'delete-no-school':
                return <DeleteNoSchoolModal onClose={closeModal} noSchoolId={modalData} />
            case 'schedule-class-selector':
                return <ScheduleClassSelectorModal onClose={closeModal} data={modalData} />
            case 'clear-all-data':
                return <ClearAllDataModal onClose={closeModal} />
            case 'clear-assignments':
                return <ClearAllAssignmentsModal onClose={closeModal} />
            case 'clear-events':
                return <ClearAllEventsModal onClose={closeModal} />
            case 'add-term':
                return <AddTermModal onClose={closeModal} />
            case 'edit-term':
                return <EditTermModal onClose={closeModal} termId={modalData} />
            case 'delete-term':
                return <DeleteTermModal onClose={closeModal} termId={modalData} />
            case 'semester-class-selector':
                return <SemesterClassSelectorModal onClose={closeModal} data={modalData} />
            default:
                return null
        }
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{
                backgroundColor: GLOBAL.MODAL_BACKDROP,
                touchAction: 'none'
            }}
            onTouchMove={e => e.preventDefault()}
        >
            {renderModalContent()}
        </div>
    )
}

export default ModalManager
