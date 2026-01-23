import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Link2, Lock, Database, LogOut } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { AccountSidebar as AccountSidebarTypes, ActiveSection } from '@/pages/Account/types'

const navItems: Array<{ id: ActiveSection; label: string; icon: typeof User }> = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'linked', label: 'Linked Accounts', icon: Link2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'data', label: 'Your Data', icon: Database },
]

const AccountSidebar: React.FC<AccountSidebarTypes.Props> = ({
    activeSection,
    onSectionChange,
    onSignOut,
}) => {
    const navigate = useNavigate()

    return (
        <aside
            className="w-64 p-6 flex flex-col"
            style={{
                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                borderRight: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <button
                onClick={() => navigate('/landing')}
                className="flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
                style={{ color: AUTH.TEXT_SECONDARY }}
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <h1 className="text-xl font-bold mb-6" style={{ color: AUTH.TEXT_PRIMARY }}>
                Account
            </h1>

            <nav className="flex-1 space-y-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onSectionChange(id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                        style={{
                            backgroundColor: activeSection === id ? AUTH.FOCUS_COLOR_30 : 'transparent',
                            color: activeSection === id ? AUTH.FOCUS_COLOR : AUTH.TEXT_SECONDARY,
                        }}
                    >
                        <Icon size={18} />
                        {label}
                    </button>
                ))}
            </nav>

            <button
                onClick={onSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: AUTH.TEXT_SECONDARY }}
            >
                <LogOut size={18} />
                Sign Out
            </button>
        </aside>
    )
}

export default AccountSidebar
