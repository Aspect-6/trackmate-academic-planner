import React, { useState } from 'react'
import { useAccount } from '@/app/hooks/useAccount'
import { Mail, Check, X } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

const EmailRow: React.FC<ProfileSection.Content.EmailRowProps> = ({
    user,
}) => {
    const { changeEmail } = useAccount()
    const [isEditing, setIsEditing] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Check if user has password provider
    const hasPassword = user.providerData.some(p => p.providerId === 'password')

    const handleSave = async () => {
        setError('')
        setSuccess('')
        if (!newEmail) {
            setError('Please enter a new email')
            return
        }
        const result = await changeEmail(newEmail)
        if (result.success) {
            setSuccess('Verification email sent to new address')
            setIsEditing(false)
            setNewEmail('')
        } else {
            setError(result.error.message || 'Failed to update email')
        }
    }

    const handleEditStart = () => {
        setSuccess('')
        setError('')
        setIsEditing(true)
    }

    const handleEditCancel = () => {
        setIsEditing(false)
        setNewEmail('')
        setError('')
    }

    return (
        <div
            className="p-5 rounded-xl mb-4 relative"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div
                        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: AUTH.BACKGROUND_QUATERNARY }}
                    >
                        <Mail size={20} style={{ color: AUTH.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm items-center pb-2 sm:pb-0" style={{ color: AUTH.TEXT_SECONDARY }}>Email</p>
                        {!isEditing ? (
                            <p className=" break-all sm:break-normal" style={{ color: AUTH.TEXT_PRIMARY }}>{user.email}</p>
                        ) : (
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="New email"
                                className="mt-1 px-3 py-2 rounded-lg text-sm outline-none w-full sm:w-64"
                                style={{
                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                    color: AUTH.TEXT_PRIMARY,
                                }}
                                autoFocus
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center sm:block">
                    {hasPassword ? (
                        !isEditing ? (
                            <button
                                onClick={handleEditStart}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                style={{
                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                    color: AUTH.TEXT_PRIMARY,
                                }}
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                    style={{ backgroundColor: '#22c55e', color: '#fff' }}
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={handleEditCancel}
                                    className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                    style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY, color: AUTH.TEXT_PRIMARY }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )
                    ) : (
                        <span
                            className="absolute top-5 right-5 sm:static inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-medium whitespace-nowrap rounded-full"
                            style={{
                                backgroundColor: 'rgba(66, 133, 244, 0.15)',
                                color: '#4285F4',
                            }}
                        >
                            Managed by Google
                        </span>
                    )}
                </div>
            </div>
            {error && <p className="text-sm mt-2" style={{ color: AUTH.TEXT_DANGER }}>{error}</p>}
            {success && <p className="text-sm mt-2" style={{ color: '#22c55e' }}>{success}</p>}
        </div>
    )
}

export default EmailRow
