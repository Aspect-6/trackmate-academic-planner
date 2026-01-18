import React from 'react'
import { AUTH } from '@/app/styles/colors'

const HomeLink: React.FC = () => {
    return (
        <a
            href="/"
            className="block text-left text-sm font-bold mb-6 transition-opacity hover:opacity-80"
            style={{ color: AUTH.TEXT_PRIMARY }}
        >
            ← Home
        </a>
    )
}

export default HomeLink
