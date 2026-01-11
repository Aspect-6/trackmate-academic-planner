import React from 'react'
import { MODALS } from '@/app/styles/colors'

export interface ModalDeleteButtonProps {
    onClick: () => void
    children?: React.ReactNode
    inline?: boolean
    className?: string
}

export const ModalDeleteButton: React.FC<ModalDeleteButtonProps> = ({
    onClick,
    children = 'Delete',
    inline = true,
    className = '',
}) => {
    const inlineClass = inline ? 'modal-btn-inline' : ''

    return (
        <button
            type="button"
            onClick={onClick}
            className={`modal-btn ${inlineClass} ${className}`.trim()}
            style={{
                '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                '--modal-btn-text': MODALS.BASE.DELETE_TEXT,
            } as React.CSSProperties}
        >
            {children}
        </button>
    )
}
