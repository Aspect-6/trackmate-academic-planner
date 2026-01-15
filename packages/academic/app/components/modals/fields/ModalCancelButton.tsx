import React from 'react'
import { MODALS } from '@/app/styles/colors'

export interface ModalCancelButtonProps {
    onClick: () => void
    children?: React.ReactNode
    className?: string
}

export const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({
    onClick,
    children = 'Cancel',
    className = '',
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`modal-btn modal-btn-cancel modal-btn-inline ${className}`.trim()}
            style={{
                '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                '--modal-btn-border': MODALS.BASE.CANCEL_BORDER,
            } as React.CSSProperties}
        >
            {children}
        </button>
    )
}
