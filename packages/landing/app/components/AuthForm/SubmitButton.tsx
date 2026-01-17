import { useHover } from '@shared/hooks/ui/useHover'
import React from 'react'

const COLORS = {
    TEXT_WHITE: 'var(--auth-text-white)',
    BUTTON_BG: 'var(--auth-button-bg)',
    BUTTON_BG_HOVER: 'var(--auth-button-bg-hover)',
}

interface SubmitButtonProps {
    disabled: boolean
    children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, children }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            type="submit"
            className="auth-button w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
                backgroundColor: isHovered ? COLORS.BUTTON_BG_HOVER : COLORS.BUTTON_BG,
                color: COLORS.TEXT_WHITE,
            }}
            {...hoverProps}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default SubmitButton
