import React from 'react'
import { useAuth } from '@shared/contexts/AuthContext'
import { AUTH } from '@/app/styles/colors'
import AvatarDisplay from './Content/AvatarDisplay'
import EmailRow from './Content/EmailRow'
import AccountIdRow from './Content/AccountIdRow'

const ProfileSection: React.FC = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Profile
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Your personal information
            </p>
            <AvatarDisplay user={user} />
            <EmailRow user={user} />
            <AccountIdRow userId={user.uid} />
        </div>
    )
}

export default ProfileSection
