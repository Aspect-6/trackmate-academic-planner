import React from 'react'

// Local color constants (matching auth page)
const COLORS = {
    TEXT_WHITE: 'var(--auth-text-white)',
    BUTTON_BG: 'var(--auth-button-bg)',
}

interface SubmitButtonProps {
    onClick: () => void
    children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, children }) => {
    return (
        <button
            type="submit"
            className="auth-button w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
                backgroundColor: COLORS.BUTTON_BG,
                color: COLORS.TEXT_WHITE,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default SubmitButton
