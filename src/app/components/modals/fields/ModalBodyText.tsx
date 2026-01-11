import React from 'react'
import { MODALS } from '@/app/styles/colors'

export interface ModalBodyTextProps {
    children: React.ReactNode
    className?: string
    color?: string
}

export const ModalBodyText: React.FC<ModalBodyTextProps> = ({
    children,
    className = '',
    color,
}) => {
    return (
        <p
            className={`text-gray-300 mb-4 ${className}`.trim()}
            style={{ color: color ?? MODALS.BASE.DELETE_BODY }}
        >
            {children}
        </p>
    )
}
