import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, SubmitButton, GoogleButton } from '@/app/components/AuthForm'
import { BRAND_NAME } from '@shared/config/brand'
import './index.css'

const COLORS = {
    BACKGROUND_SECONDARY: 'var(--auth-bg-secondary)',
    BACKGROUND_TERTIARY: 'var(--auth-bg-tertiary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_PRIMARY: 'var(--auth-text-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
    TEXT_WHITE: 'var(--auth-text-white)',
    FOCUS_COLOR: 'var(--focus-color)',
    FOCUS_COLOR_70: 'var(--focus-color-70)',
    BUTTON_BG: 'var(--auth-button-bg)',
    BUTTON_BG_HOVER: 'var(--auth-button-bg-hover)',
}

const SignIn: React.FC = () => {
    return (
        <div className="auth-page min-h-[100dvh] flex items-center justify-center p-4">
            {/* Login card */}
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: COLORS.BACKGROUND_SECONDARY,
                    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                }}
            >
                {/* Header / Branding */}
                <Title>Sign in to {BRAND_NAME}</Title>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault() }}>
                    <FormField>
                        <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
                        <FormFieldTextInput
                            type="email"
                            placeholder="you@example.com"
                            id="email"
                            name="email"
                        />
                    </FormField>

                    <FormField>
                        <FormFieldLabel htmlFor="password">Password</FormFieldLabel>
                        <FormFieldTextInput
                            type="password"
                            placeholder="••••••••"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </FormField>

                    <SubmitButton>
                        Sign In
                    </SubmitButton>
                </form>

                <FormDivider />

                <GoogleButton>Sign in with Google</GoogleButton>

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: COLORS.TEXT_SECONDARY }}
                >
                    Don't have an account?{' '}
                    <a
                        href="/sign-up"
                        className="auth-link font-medium transition-colors duration-200"
                        style={{ color: COLORS.FOCUS_COLOR }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignIn
