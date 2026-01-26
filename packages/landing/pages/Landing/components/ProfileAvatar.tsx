import React from 'react'
import { User } from 'firebase/auth'
import { AUTH } from '@/app/styles/colors'

interface ProfileAvatarProps {
    user: User
    onClick?: () => void
    className?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, onClick, className = '' }) => {
    if (user.photoURL) return (
        <img
            src={user.photoURL}
            alt="Profile"
            className={`w-12 h-12 rounded-full object-cover cursor-pointer ${className}`}
            onClick={onClick}
        />
    )
    else return (
        <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold leading-none cursor-pointer ${className}`}
            onClick={onClick}
            style={{
                backgroundColor: AUTH.GLOBAL_ACCENT,
                color: AUTH.TEXT_WHITE,
            }}
        >
            {user.email?.charAt(0).toUpperCase()}
        </div>
    )
}

export default ProfileAvatar
