import React from 'react'
import { MODALS } from '@/app/styles/colors'

export interface ModalContainerProps {
    children: React.ReactNode
    bgColor?: string
    className?: string
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
    children,
    bgColor = MODALS.BASE.BG,
    className = '',
}) => {
    return (
        <div
            className={`modal-container ${className}`.trim()}
            style={{ backgroundColor: bgColor }}
        >
            {children}
        </div>
    )
}
