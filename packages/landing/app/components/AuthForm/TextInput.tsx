import React from 'react'

const COLORS = {
    BACKGROUND_TERTIARY: 'var(--auth-bg-tertiary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_PRIMARY: 'var(--auth-text-primary)',
    ERROR_BORDER: 'var(--auth-error-border)',
}

interface FormFieldTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}

const FormFieldTextInput: React.FC<FormFieldTextInputProps> = ({
    hasError,
    ...props
}) => {
    return (
        <input
            {...props}
            className="auth-input w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
            style={{
                backgroundColor: COLORS.BACKGROUND_TERTIARY,
                border: `1px solid ${hasError ? COLORS.ERROR_BORDER : COLORS.BORDER_PRIMARY}`,
                color: COLORS.TEXT_PRIMARY,
            }}
        />
    )
}

export default FormFieldTextInput
