import React from 'react'
import { BRAND_NAME } from '@shared/config/brand'

const COLORS = {
    TEXT_PRIMARY: 'var(--auth-text-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
}

interface TitleProps {
    children: React.ReactNode
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <div className="text-center mb-8">
            <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: COLORS.TEXT_PRIMARY }}
            >
                {BRAND_NAME}
            </h1>
            <p
                className="mt-2 text-sm"
                style={{ color: COLORS.TEXT_SECONDARY }}
            >
                {children}
            </p>
        </div>
    )
}

export default Title
