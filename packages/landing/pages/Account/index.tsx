import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { signOutUser } from '@/app/lib/auth'
import { AUTH } from '@/app/styles/colors'

import type { ActiveSection } from './types'
import AccountSidebar from './components/AccountSidebar'
import ProfileSection from './components/ProfileSection'
import LinkedAccountsSection from './components/LinkedAccountsSection'
import SecuritySection from './components/SecuritySection'
import DataSection from './components/DataSection'

const Account: React.FC = () => {
    const { user, loading: userLoading } = useCurrentUser()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState<ActiveSection>('profile')

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/sign-in', { replace: true })
        }
    }, [user, userLoading, navigate])

    if (userLoading) {
        return (
            <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>Loading...</p>
            </div>
        )
    }

    if (!user) return null

    const handleSignOut = async () => {
        await signOutUser()
        navigate('/landing')
    }

    return (
        <div className="min-h-dvh flex" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
            <AccountSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onSignOut={handleSignOut}
            />

            <main className="flex-1 p-10">
                {activeSection === 'profile' && <ProfileSection />}
                {activeSection === 'linked' && <LinkedAccountsSection />}
                {activeSection === 'security' && <SecuritySection />}
                {activeSection === 'data' && <DataSection />}
            </main>
        </div>
    )
}

export default Account
