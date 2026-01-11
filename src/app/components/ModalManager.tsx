import React, { useEffect } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useToast } from '@/app/contexts/ToastContext'
import { AssignmentFormModal } from '@/app/components/modals/AssignmentFormModal'
import { ClassFormModal } from '@/app/components/modals/ClassFormModal'
import { EventFormModal } from '@/app/components/modals/EventFormModal'
import { NoSchoolFormModal } from '@/app/components/modals/NoSchoolFormModal'
import { TermFormModal } from '@/app/components/modals/TermFormModal'

import { DeleteConfirmationModal } from '@/app/components/modals/DeleteConfirmationModal'
import { AlternatingABClassSelectorModal } from '@/app/components/modals/AlternatingABClassSelectorModal'
import { TypeSelectorModal } from '@/app/components/modals/TypeSelectorModal'
import { GLOBAL } from '@/app/styles/colors'

const ModalManager: React.FC = () => {
    const {
        activeModal,
        modalData,
        closeModal,
        openModal,
        assignments,
        deleteAssignment,
        classes,
        deleteClass,
        events,
        deleteEvent,
        noSchool,
        deleteNoSchool,
        clearAllData,
        deleteAllAssignments,
        deleteAllEvents
    } = useApp()
    const { academicTerms, deleteAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()

    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
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

            // Assignment modals
            case 'add-assignment':
                return <AssignmentFormModal onClose={closeModal} />
            case 'edit-assignment':
                return <AssignmentFormModal onClose={closeModal} assignmentId={modalData} />
            case 'delete-assignment': {
                const assignment = assignments.find(a => a.id === modalData)
                if (!assignment) return null
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete Assignment?"
                        entityName={assignment.title}
                        buttonText="Delete Assignment"
                        onDelete={() => deleteAssignment(modalData)}
                    />
                )
            }

            // Class modals
            case 'add-class':
                return <ClassFormModal onClose={closeModal} />
            case 'edit-class':
                return <ClassFormModal onClose={closeModal} classId={modalData} />
            case 'delete-class': {
                const classToDelete = classes.find(c => c.id === modalData)
                if (!classToDelete) return null
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete Class?"
                        entityName={classToDelete.name}
                        description="This will delete all assignments from this class."
                        buttonText="Delete Class"
                        onDelete={() => deleteClass(modalData)}
                    />
                )
            }

            // Event modals
            case 'add-event':
                return <EventFormModal onClose={closeModal} />
            case 'edit-event':
                return <EventFormModal onClose={closeModal} eventId={modalData} />
            case 'delete-event': {
                const event = events.find(e => e.id === modalData)
                if (!event) return null
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete Event?"
                        entityName={event.title}
                        buttonText="Delete Event"
                        onDelete={() => deleteEvent(modalData)}
                    />
                )
            }

            // No School modals
            case 'add-no-school':
                return <NoSchoolFormModal onClose={closeModal} />
            case 'edit-no-school':
                return <NoSchoolFormModal onClose={closeModal} noSchoolId={modalData} />
            case 'delete-no-school': {
                const period = noSchool.find(ns => ns.id === modalData)
                if (!period) return null
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete No School Period?"
                        entityName={period.name}
                        buttonText="Delete Period"
                        onDelete={() => deleteNoSchool(modalData)}
                    />
                )
            }

            // Term modals
            case 'add-term':
                return <TermFormModal onClose={closeModal} />
            case 'edit-term':
                return <TermFormModal onClose={closeModal} termId={modalData} />
            case 'delete-term': {
                const term = academicTerms.find(t => t.id === modalData)
                if (!term) return null
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete Academic Term?"
                        entityName={term.name}
                        description="Any classes in this term will be unassigned. This action cannot be undone."
                        buttonText="Delete Term"
                        onDelete={() => {
                            deleteAcademicTerm(modalData)
                            showToast('Academic term deleted.', 'success')
                        }}
                    />
                )
            }

            // Clear data modals
            case 'clear-all-data':
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Clear All Data?"
                        message="This will permanently delete all assignments, classes, events, schedules, no-school days, and custom assignment types. This action cannot be undone."
                        buttonText="Delete Everything"
                        onDelete={clearAllData}
                    />
                )
            case 'delete-assignments':
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete All Assignments?"
                        message="This will permanently delete every assignment from your account. This action cannot be undone."
                        buttonText="Delete All Assignments"
                        onDelete={deleteAllAssignments}
                    />
                )
            case 'delete-events':
                return (
                    <DeleteConfirmationModal
                        onClose={closeModal}
                        title="Delete All Events?"
                        message="This will permanently delete every calendar event from your account. This action cannot be undone."
                        buttonText="Delete All Events"
                        onDelete={deleteAllEvents}
                    />
                )

            // Other modals
            case 'semester-class-selector':
                return <AlternatingABClassSelectorModal onClose={closeModal} data={modalData} />

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
