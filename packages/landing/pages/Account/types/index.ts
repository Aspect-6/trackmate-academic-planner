import { User } from 'firebase/auth'

export type ActiveSection = 'profile' | 'linked' | 'security' | 'data'

// AccountSidebar namespace
export namespace AccountSidebar {
    export interface Props {
        activeSection: ActiveSection
        onSectionChange: (section: ActiveSection) => void
        onSignOut: () => void
    }
}

// ProfileSection props
export namespace ProfileSection {
    export namespace Content {
        export interface AvatarDisplayProps {
            user: User
            isEditingDisplayName: boolean
            newDisplayName: string
            displayNameError: string
            displayNameSuccess: string
            onEditStart: () => void
            onEditCancel: () => void
            onDisplayNameChange: (value: string) => void
            onDisplayNameSave: () => void
        }

        export interface EmailRowProps {
            user: User
            hasPassword: boolean
            isEditing: boolean
            newEmail: string
            error: string
            success: string
            onEditStart: () => void
            onEditCancel: () => void
            onEmailChange: (value: string) => void
            onSave: () => void
        }

        export interface AccountIdRowProps {
            userId: string
            copied: boolean
            onCopy: () => void
        }
    }
}

// LinkedAccountsSection props
export namespace LinkedAccountsSection {
    export namespace Content {
        export interface GoogleProviderRowProps {
            isLinked: boolean
            canUnlink: boolean
            loading: boolean
            onLink: () => void
            onUnlink: () => void
        }

        export interface EmailPasswordRowProps {
            isActive: boolean
            email: string | null
        }

        export interface ComingSoonRowProps {
            providerName: string
            Icon: React.FC<React.SVGProps<SVGSVGElement>>
        }
    }
}

// SecuritySection props
export namespace SecuritySection {
    export namespace Content {
        export interface EmailVerificationRowProps {
            isVerified: boolean
            verificationSent: boolean
            verificationError: string
            onResend: () => void
        }

        export interface PasswordRowProps {
            hasPassword: boolean
            isEditing: boolean
            currentPassword: string
            newPassword: string
            confirmPassword: string
            error: string
            success: string
            loading: boolean
            onEditStart: () => void
            onEditCancel: () => void
            onCurrentPasswordChange: (value: string) => void
            onNewPasswordChange: (value: string) => void
            onConfirmPasswordChange: (value: string) => void
            onSave: () => void
        }
    }
}

// DataSection props
export namespace DataSection {
    export namespace Content {
        export interface DeleteAccountCardProps {
            showConfirm: boolean
            error: string
            loading: boolean
            onInitiateDelete: () => void
            onConfirmDelete: () => void
            onCancelDelete: () => void
        }
    }
}
