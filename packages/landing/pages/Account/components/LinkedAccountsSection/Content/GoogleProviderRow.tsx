import React from 'react'
import { AUTH } from '@/app/styles/colors'
import type { LinkedAccountsSection } from '@/pages/Account/types'

const GoogleProviderRow: React.FC<LinkedAccountsSection.Content.GoogleProviderRowProps> = ({
    isLinked,
    canUnlink,
    loading,
    onLink,
    onUnlink,
}) => {
    return (
        <div
            className="p-5 rounded-xl mb-4"
            style={{
                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isLinked ? 'rgba(66, 133, 244, 0.15)' : AUTH.BACKGROUND_TERTIARY }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill={isLinked ? "#4285F4" : AUTH.TEXT_SECONDARY as string} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill={isLinked ? "#34A853" : AUTH.TEXT_SECONDARY as string} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill={isLinked ? "#FBBC05" : AUTH.TEXT_SECONDARY as string} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill={isLinked ? "#EA4335" : AUTH.TEXT_SECONDARY as string} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Google</p>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                            {isLinked ? 'Connected' : 'Not connected'}
                        </p>
                    </div>
                </div>
                {isLinked ? (
                    <button
                        onClick={onUnlink}
                        disabled={loading || !canUnlink}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            color: AUTH.TEXT_PRIMARY,
                        }}
                        title={!canUnlink ? 'You need at least one sign-in method' : undefined}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        onClick={onLink}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: AUTH.FOCUS_COLOR,
                            color: '#fff',
                        }}
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    )
}

export default GoogleProviderRow
