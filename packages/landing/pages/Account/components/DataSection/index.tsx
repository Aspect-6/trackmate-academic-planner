import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@/app/hooks/useAccount'
import { AUTH } from '@/app/styles/colors'
import DeleteAccountCard from './Content/DeleteAccountCard'

const DataSection: React.FC = () => {
    const navigate = useNavigate()
    const { deleteAccount, loading } = useAccount()

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    const handleDeleteAccount = async () => {
        setDeleteError('')
        const result = await deleteAccount()
        if (result.success) {
            navigate('/landing')
        } else {
            setDeleteError(result.error?.message || 'Failed to delete account')
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Your Data
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Manage your account data
            </p>
            <DeleteAccountCard
                showConfirm={showDeleteConfirm}
                error={deleteError}
                loading={loading}
                onInitiateDelete={() => setShowDeleteConfirm(true)}
                onConfirmDelete={handleDeleteAccount}
                onCancelDelete={() => setShowDeleteConfirm(false)}
            />
        </div>
    )
}

export default DataSection
