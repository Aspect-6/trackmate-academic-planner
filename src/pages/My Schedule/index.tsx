import React from 'react'
import { MY_SCHEDULE } from '@/app/styles/colors'
import { useScheduleData } from './hooks/useScheduleData'
import type { SemesterName } from './types'
import SemesterSchedule from './components/SemesterSchedule'
import ScheduleTable from './components/SemesterSchedule/ScheduleTable'
import ScheduleTableRow from './components/SemesterSchedule/ScheduleTable/Row'
import EmptyCell from './components/SemesterSchedule/ScheduleTable/Row/EmptyCell'
import FilledCell from './components/SemesterSchedule/ScheduleTable/Row/FilledCell'
import './index.css'

const MySchedule: React.FC = () => {
    const {
        isDirty,
        saveSchedule,
        selectedTermId,
        setTermId,
        academicTerms,
        arrowStyle,
        handleCellClick,
        handleRemove,
        getScheduleForSemester,
        getClassById
    } = useScheduleData()

    const renderScheduleTable = (semester: SemesterName) => {
        const scheduleData = getScheduleForSemester(semester)

        return (
            <ScheduleTable>
                {(['A', 'B'] as const).map(dayType => (
                    <ScheduleTableRow key={dayType} dayType={dayType}>
                        {(dayType === 'A' ? scheduleData.aDay : scheduleData.bDay).map((classId, periodIndex) => {
                            const classData = classId ? getClassById(classId) : null
                            return classData ? (
                                <FilledCell
                                    key={periodIndex}
                                    classData={classData}
                                    onRemove={() => handleRemove(semester, dayType, periodIndex)}
                                />
                            ) : (
                                <EmptyCell
                                    key={periodIndex}
                                    onClick={() => handleCellClick(semester, dayType, periodIndex)}
                                />
                            )
                        })}
                    </ScheduleTableRow>
                ))}
            </ScheduleTable>
        )
    }

    return (
        <div
            className="p-6 rounded-xl min-h-[60vh] transition-colors"
            style={{
                backgroundColor: MY_SCHEDULE.MODULE_BG,
                border: `1px solid ${MY_SCHEDULE.MODULE_BORDER}`,
                boxShadow: MY_SCHEDULE.MODULE_SHADOW,
            }}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <h2 className="text-xl font-bold flex flex-wrap items-baseline gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span>Schedule for</span>
                    <select
                        value={selectedTermId || ''}
                        onChange={(e) => setTermId(e.target.value || null)}
                        className="schedule-inline-select max-w-full text-ellipsis"
                        style={arrowStyle}
                    >
                        <option value="">select term</option>
                        {academicTerms.map(term => (
                            <option key={term.id} value={term.id}>
                                {term.name}
                            </option>
                        ))}
                    </select>
                </h2>
                {selectedTermId && (
                    <button
                        onClick={saveSchedule}
                        disabled={!isDirty}
                        className="px-4 py-2 rounded-lg font-medium transition-colors"
                        style={{
                            backgroundColor: isDirty ? 'var(--sidebar-active-tab-background)' : 'var(--block-module-bg)',
                            color: isDirty ? '#fff' : 'var(--text-secondary)',
                            cursor: isDirty ? 'pointer' : 'not-allowed',
                            border: isDirty ? '1px solid var(--sidebar-active-tab-background)' : '1px solid var(--border-primary)'
                        }}
                    >
                        Save Changes
                    </button>
                )}
            </div>

            <div
                className="-mx-6 mb-6"
                style={{ borderBottom: `1px solid ${MY_SCHEDULE.MODULE_BORDER}` }}
            />

            {selectedTermId ? (
                <>
                    <SemesterSchedule title="Fall Semester">
                        {renderScheduleTable('Fall')}
                    </SemesterSchedule>

                    <SemesterSchedule title="Spring Semester">
                        {renderScheduleTable('Spring')}
                    </SemesterSchedule>


                </>
            ) : (
                <div
                    className="text-center py-12"
                    style={{ color: 'var(--text-tertiary)' }}
                >
                    <p className="text-lg">Select an academic term to view and edit your schedule.</p>
                </div>
            )}
        </div>
    )
}

export default MySchedule
