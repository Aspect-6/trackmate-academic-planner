import React, { useState } from 'react'
import { AcademicTerm } from '@/app/types'
import { useApp } from '@/app/contexts/AppContext'
import { useToast } from '@/app/contexts/ToastContext'
import { generateId } from '@/app/lib/utils'
import { GLOBAL, MODALS } from '@/app/styles/colors'

interface ModalProps {
    onClose: () => void
}

export const AddTermModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addAcademicTerm, academicTerms } = useApp()
    const { showToast } = useToast()

    const [name, setName] = useState('')
    const [termStart, setTermStart] = useState('')
    const [termEnd, setTermEnd] = useState('')
    const [fallEnd, setFallEnd] = useState('')
    const [springStart, setSpringStart] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !termStart || !termEnd || !fallEnd || !springStart) {
            showToast('All fields are required.', 'error')
            return
        }

        // Check for duplicate name
        if (academicTerms.some(t => t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast('A term with this name already exists.', 'error')
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        // Check for date overlaps
        const hasOverlap = academicTerms.some(t => {
            const existingStart = new Date(t.startDate)
            const existingEnd = new Date(t.endDate)
            return (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            )
        })

        if (hasOverlap) {
            showToast('This term overlaps with an existing term.', 'error')
            return
        }

        if (termStart >= termEnd) {
            showToast('Term start date must be before end date.', 'error')
            return
        }
        if (termStart >= fallEnd) {
            showToast('Fall semester end date must be after term start date.', 'error')
            return
        }
        if (fallEnd >= springStart) {
            showToast('Spring semester start date must be after Fall semester end date.', 'error')
            return
        }
        if (springStart >= termEnd) {
            showToast('Spring semester start date must be before term end date.', 'error')
            return
        }

        const newTerm: Omit<AcademicTerm, 'id'> = {
            name,
            startDate: termStart,
            endDate: termEnd,
            semesters: [
                {
                    id: generateId(),
                    name: 'Fall',
                    startDate: termStart,
                    endDate: fallEnd
                },
                {
                    id: generateId(),
                    name: 'Spring',
                    startDate: springStart,
                    endDate: termEnd
                }
            ]
        }

        addAcademicTerm(newTerm)
        showToast('Academic term added successfully!', 'success')
        onClose()
    }

    return (
        <div className="modal-container overflow-y-auto max-h-[90vh]" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.NOSCHOOL.HEADING }}>Add Academic Term</h2>

            <div className="text-sm my-4 text-left" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                Add a school year and the Fall and Spring semesters will automatically be created within and be available for you to add classes to.
            </div>

            <div className="width-full">
                <div className="border-t mb-4" style={{ borderColor: GLOBAL.SIDEBAR_BORDER }}></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Term Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="2025-2026"
                        className="modal-input"
                        style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Year Start</label>
                        <input
                            type="date"
                            value={termStart}
                            onChange={e => setTermStart(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">Year End</label>
                        <input
                            type="date"
                            value={termEnd}
                            onChange={e => setTermEnd(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Fall Semester End</label>
                        <input
                            type="date"
                            value={fallEnd}
                            onChange={e => setFallEnd(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                        <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                    </div>
                    <div>
                        <label className="modal-label">Spring Semester Start</label>
                        <input
                            type="date"
                            value={springStart}
                            onChange={e => setSpringStart(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                        <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="modal-btn modal-btn-cancel modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                            '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                            '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                            '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                        } as React.CSSProperties}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.NOSCHOOL.PRIMARY_BG,
                            '--modal-btn-bg-hover': MODALS.NOSCHOOL.PRIMARY_BG_HOVER,
                            '--modal-btn-text': MODALS.NOSCHOOL.PRIMARY_TEXT
                        } as React.CSSProperties}
                    >
                        Add Term
                    </button>
                </div>
            </form>
        </div>
    )
}

interface EditTermModalProps extends ModalProps {
    termId: string
}

export const EditTermModal: React.FC<EditTermModalProps> = ({ onClose, termId }) => {
    const { academicTerms, updateAcademicTerm } = useApp()
    const { showToast } = useToast()

    const term = academicTerms.find(t => t.id === termId)

    const [name, setName] = useState(term?.name || '')
    const [termStart, setTermStart] = useState(term?.startDate || '')
    const [termEnd, setTermEnd] = useState(term?.endDate || '')
    const [fallEnd, setFallEnd] = useState(term?.semesters?.find(s => s.name === 'Fall')?.endDate || '')
    const [springStart, setSpringStart] = useState(term?.semesters?.find(s => s.name === 'Spring')?.startDate || '')

    if (!term) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !termStart || !termEnd || !fallEnd || !springStart) {
            showToast('All fields are required.', 'error')
            return
        }

        // Check for duplicate name (excluding current term)
        if (academicTerms.some(t => t.id !== termId && t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast('A term with this name already exists.', 'error')
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        // Check for date overlaps (excluding current term)
        const hasOverlap = academicTerms.some(t => {
            if (t.id === termId) return false
            const existingStart = new Date(t.startDate)
            const existingEnd = new Date(t.endDate)
            return (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            )
        })

        if (hasOverlap) {
            showToast('This term overlaps with an existing term.', 'error')
            return
        }

        if (termStart >= termEnd) {
            showToast('Term start date must be before end date.', 'error')
            return
        }
        if (termStart >= fallEnd) {
            showToast('Fall semester end date must be after term start date.', 'error')
            return
        }
        if (fallEnd >= springStart) {
            showToast('Spring semester start date must be after Fall semester end date.', 'error')
            return
        }
        if (springStart >= termEnd) {
            showToast('Spring semester start date must be before term end date.', 'error')
            return
        }

        const updatedTerm: Omit<AcademicTerm, 'id'> = {
            name,
            startDate: termStart,
            endDate: termEnd,
            semesters: [
                {
                    id: term.semesters[0]?.id || generateId(),
                    name: 'Fall',
                    startDate: termStart,
                    endDate: fallEnd
                },
                {
                    id: term.semesters[1]?.id || generateId(),
                    name: 'Spring',
                    startDate: springStart,
                    endDate: termEnd
                }
            ]
        }

        updateAcademicTerm(termId, updatedTerm)
        showToast('Academic term updated successfully!', 'success')
        onClose()
    }

    return (
        <div className="modal-container overflow-y-auto max-h-[90vh]" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.NOSCHOOL.HEADING }}>Edit Academic Term</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Term Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="2025-2026"
                        className="modal-input"
                        style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Year Start</label>
                        <input
                            type="date"
                            value={termStart}
                            onChange={e => setTermStart(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">Year End</label>
                        <input
                            type="date"
                            value={termEnd}
                            onChange={e => setTermEnd(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Fall Semester End</label>
                        <input
                            type="date"
                            value={fallEnd}
                            onChange={e => setFallEnd(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                        <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                    </div>
                    <div>
                        <label className="modal-label">Spring Semester Start</label>
                        <input
                            type="date"
                            value={springStart}
                            onChange={e => setSpringStart(e.target.value)}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.NOSCHOOL.PRIMARY_BG } as React.CSSProperties}
                        />
                        <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="modal-btn modal-btn-cancel modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                            '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                            '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                            '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                        } as React.CSSProperties}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.NOSCHOOL.PRIMARY_BG,
                            '--modal-btn-bg-hover': MODALS.NOSCHOOL.PRIMARY_BG_HOVER,
                            '--modal-btn-text': MODALS.NOSCHOOL.PRIMARY_TEXT
                        } as React.CSSProperties}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

interface DeleteTermModalProps extends ModalProps {
    termId: string
}

export const DeleteTermModal: React.FC<DeleteTermModalProps> = ({ onClose, termId }) => {
    const { academicTerms, deleteAcademicTerm } = useApp()
    const { showToast } = useToast()

    const term = academicTerms.find(t => t.id === termId)

    if (!term) return null

    const handleDelete = () => {
        deleteAcademicTerm(termId)
        showToast('Academic term deleted successfully.', 'success')
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>Delete Academic Term?</h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                Are you sure you want to delete <strong>{term.name}</strong>? If any classes are still in this term, they will be unassigned from it, removing the ability to integrate them across the webpage. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.DELETE_TEXT
                    } as React.CSSProperties}
                >
                    Delete Term
                </button>
            </div>
        </div>
    )
}
