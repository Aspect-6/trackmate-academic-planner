import React, { useState, useEffect } from 'react'
import { AcademicTerm } from '@/app/types'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useToast } from '@/app/contexts/ToastContext'
import { generateId } from '@/app/lib/utils'
import { GLOBAL, MODALS } from '@/app/styles/colors'
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalCancelButton,
    ModalSubmitButton,
} from '@/app/components/modals/fields'

interface TermFormModalProps {
    onClose: () => void
    termId?: string // If provided, modal is in edit mode
}

export const TermFormModal: React.FC<TermFormModalProps> = ({ onClose, termId }) => {
    const { academicTerms, addAcademicTerm, updateAcademicTerm, termMode } = useAcademicTerms()
    const { showToast } = useToast()

    const isEditMode = !!termId
    const existingTerm = isEditMode ? academicTerms.find(t => t.id === termId) : null
    const fallSemester = existingTerm?.semesters?.find(s => s.name === 'Fall')
    const springSemester = existingTerm?.semesters?.find(s => s.name === 'Spring')

    // Determine if we're using quarters mode
    const isQuartersMode = isEditMode
        ? existingTerm?.termType === 'Semesters With Quarters'
        : termMode === 'Semesters With Quarters'

    const focusColor = MODALS.ACADEMICTERM.PRIMARY_BG

    // Form state
    const [name, setName] = useState('')
    const [termStart, setTermStart] = useState('')
    const [termEnd, setTermEnd] = useState('')
    const [fallEnd, setFallEnd] = useState('')
    const [springStart, setSpringStart] = useState('')
    const [q1End, setQ1End] = useState('')
    const [q2Start, setQ2Start] = useState('')
    const [q2End, setQ2End] = useState('')
    const [q3Start, setQ3Start] = useState('')
    const [q3End, setQ3End] = useState('')
    const [q4Start, setQ4Start] = useState('')

    // Populate form with existing term data in edit mode
    useEffect(() => {
        if (isEditMode && existingTerm) {
            setName(existingTerm.name || '')
            setTermStart(existingTerm.startDate || '')
            setTermEnd(existingTerm.endDate || '')
            setFallEnd(fallSemester?.endDate || '')
            setSpringStart(springSemester?.startDate || '')
            setQ1End(fallSemester?.quarters?.find(q => q.name === 'Q1')?.endDate || '')
            setQ2Start(fallSemester?.quarters?.find(q => q.name === 'Q2')?.startDate || '')
            setQ2End(fallSemester?.endDate || '')
            setQ3Start(springSemester?.startDate || '')
            setQ3End(springSemester?.quarters?.find(q => q.name === 'Q3')?.endDate || '')
            setQ4Start(springSemester?.quarters?.find(q => q.name === 'Q4')?.startDate || '')
        }
    }, [isEditMode, existingTerm, fallSemester, springSemester])

    if (isEditMode && !existingTerm) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !termStart || !termEnd) {
            showToast('All fields are required.', 'error')
            return
        }

        if (isQuartersMode) {
            if (!q1End || !q2Start || !q2End || !q3Start || !q3End || !q4Start) {
                showToast('All fields are required.', 'error')
                return
            }
        } else {
            if (!fallEnd || !springStart) {
                showToast('All fields are required.', 'error')
                return
            }
        }

        // Check for duplicate name
        if (academicTerms.some(t => (isEditMode ? t.id !== termId : true) && t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast('A term with this name already exists.', 'error')
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        // Check for overlap
        const hasOverlap = academicTerms.some(t => {
            if (isEditMode && t.id === termId) return false
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
            showToast('Year start must be before end.', 'error')
            return
        }

        let termData: Omit<AcademicTerm, 'id'>

        if (isQuartersMode) {
            if (q1End <= termStart) { showToast('Q1 end must be after year start.', 'error'); return }
            if (q2Start <= q1End) { showToast('Q2 start must be after Q1 end.', 'error'); return }
            if (q2End <= q2Start) { showToast('Q2 end must be after Q2 start.', 'error'); return }
            if (q3Start <= q2End) { showToast('Q3 start must be after Q2 end.', 'error'); return }
            if (q3End <= q3Start) { showToast('Q3 end must be after Q3 start.', 'error'); return }
            if (q4Start <= q3End) { showToast('Q4 start must be after Q3 end.', 'error'); return }
            if (q4Start >= termEnd) { showToast('Q4 start must be before year end.', 'error'); return }

            termData = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters With Quarters',
                semesters: [
                    {
                        id: fallSemester?.id || generateId(),
                        name: 'Fall',
                        startDate: termStart,
                        endDate: q2End,
                        quarters: [
                            { id: fallSemester?.quarters?.[0]?.id || generateId(), name: 'Q1', startDate: termStart, endDate: q1End },
                            { id: fallSemester?.quarters?.[1]?.id || generateId(), name: 'Q2', startDate: q2Start, endDate: q2End }
                        ]
                    },
                    {
                        id: springSemester?.id || generateId(),
                        name: 'Spring',
                        startDate: q3Start,
                        endDate: termEnd,
                        quarters: [
                            { id: springSemester?.quarters?.[0]?.id || generateId(), name: 'Q3', startDate: q3Start, endDate: q3End },
                            { id: springSemester?.quarters?.[1]?.id || generateId(), name: 'Q4', startDate: q4Start, endDate: termEnd }
                        ]
                    }
                ]
            }
        } else {
            if (termStart >= fallEnd) { showToast('Fall end must be after year start.', 'error'); return }
            if (fallEnd >= springStart) { showToast('Spring start must be after fall end.', 'error'); return }
            if (springStart >= termEnd) { showToast('Spring start must be before year end.', 'error'); return }

            termData = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters Only',
                semesters: [
                    { id: fallSemester?.id || generateId(), name: 'Fall', startDate: termStart, endDate: fallEnd },
                    { id: springSemester?.id || generateId(), name: 'Spring', startDate: springStart, endDate: termEnd }
                ]
            }
        }

        if (isEditMode) {
            updateAcademicTerm(termId, termData)
            showToast('Academic term updated!', 'success')
        } else {
            addAcademicTerm(termData)
            showToast('Academic term added!', 'success')
        }
        onClose()
    }

    return (
        <ModalContainer className="overflow-y-auto max-h-[90vh]">
            <ModalHeader color={MODALS.ACADEMICTERM.HEADING}>
                {isEditMode ? 'Edit Academic Term' : 'Add Academic Term'}
            </ModalHeader>

            {!isEditMode && (
                <>
                    <div className="text-sm my-4 text-left" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                        {termMode === 'Semesters Only'
                            ? 'Add a term with Fall and Spring semesters.'
                            : 'Add a term with four quarters with two quarters for the Fall and Spring semesters each.'}
                    </div>
                    <div className="width-full"><div className="border-t mb-4" style={{ borderColor: GLOBAL.SIDEBAR_BORDER }}></div></div>
                </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <ModalLabel>Term Name</ModalLabel>
                    <ModalTextInput
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="2025-2026"
                        focusColor={focusColor}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <ModalLabel>Year Start</ModalLabel>
                        <ModalDateInput
                            value={termStart}
                            onChange={e => setTermStart(e.target.value)}
                            focusColor={focusColor}
                        />
                    </div>
                    <div>
                        <ModalLabel>Year End</ModalLabel>
                        <ModalDateInput
                            value={termEnd}
                            onChange={e => setTermEnd(e.target.value)}
                            focusColor={focusColor}
                        />
                    </div>
                </div>

                {isQuartersMode ? (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <ModalLabel>Q1 End</ModalLabel>
                                <ModalDateInput value={q1End} onChange={e => setQ1End(e.target.value)} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                            </div>
                            <div>
                                <ModalLabel>Q2 Start</ModalLabel>
                                <ModalDateInput value={q2Start} onChange={e => setQ2Start(e.target.value)} focusColor={focusColor} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <ModalLabel>Q2 End</ModalLabel>
                                <ModalDateInput value={q2End} onChange={e => setQ2End(e.target.value)} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Fall semester end</span>
                            </div>
                            <div>
                                <ModalLabel>Q3 Start</ModalLabel>
                                <ModalDateInput value={q3Start} onChange={e => setQ3Start(e.target.value)} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Spring semester start</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <ModalLabel>Q3 End</ModalLabel>
                                <ModalDateInput value={q3End} onChange={e => setQ3End(e.target.value)} focusColor={focusColor} />
                            </div>
                            <div>
                                <ModalLabel>Q4 Start</ModalLabel>
                                <ModalDateInput value={q4Start} onChange={e => setQ4Start(e.target.value)} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <ModalLabel>Fall Semester End</ModalLabel>
                            <ModalDateInput value={fallEnd} onChange={e => setFallEnd(e.target.value)} focusColor={focusColor} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                        </div>
                        <div>
                            <ModalLabel>Spring Semester Start</ModalLabel>
                            <ModalDateInput value={springStart} onChange={e => setSpringStart(e.target.value)} focusColor={focusColor} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                        </div>
                    </div>
                )}

                <ModalFooter>
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.ACADEMICTERM.PRIMARY_BG}
                        bgColorHover={MODALS.ACADEMICTERM.PRIMARY_BG_HOVER}
                        textColor={MODALS.ACADEMICTERM.PRIMARY_TEXT}
                    >
                        {isEditMode ? 'Save Changes' : 'Add Term'}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
