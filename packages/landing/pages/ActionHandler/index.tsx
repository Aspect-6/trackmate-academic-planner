import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VerifyEmailAction from './components/VerifyEmail'
import { useEffect } from 'react'

type ActionMode = 'verifyEmail' | 'resetPassword' | 'recoverEmail'

const ActionHandler: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    
    const mode = searchParams.get('mode') as ActionMode | null
    const oobCode = searchParams.get('oobCode')

    useEffect(() => {
        if (!mode || !oobCode) {
            navigate('/sign-in')
        }
    }, [mode, oobCode, navigate])

    if (!mode || !oobCode) {
        return null
    }

    switch (mode) {
        case 'verifyEmail':
            return <VerifyEmailAction oobCode={oobCode} />
        case 'resetPassword':
            return null
        case 'recoverEmail':
            return null
        default:
            navigate('/sign-in')
            return null
    }
}

export default ActionHandler
