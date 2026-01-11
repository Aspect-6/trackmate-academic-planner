import React, { useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useClasses } from '@/app/hooks/entities'
import ClassBoard from './components/ClassBoard'
import './index.css'

const MyClasses: React.FC = () => {
    const { openModal } = useApp()
    const { classes, reorderClasses } = useClasses()

    const handleAddClass = useCallback(() => {
        openModal('add-class')
    }, [openModal])

    const handleEditClass = useCallback((id: string) => {
        openModal('edit-class', id)
    }, [openModal])

    return (
        <div className="space-y-6">
            <ClassBoard
                classes={classes}
                onReorder={reorderClasses}
                onAddClass={handleAddClass}
                openEditClass={handleEditClass}
            />
        </div>
    )
}

export default MyClasses
