import { useState } from "react";
import { signupUser, signUpWithGoogle } from "@/app/lib/auth";
import { User } from "firebase/auth";

interface AuthError {
    code: string
    message: string
}

interface SignUpResult {
    user: User | null
    error: AuthError | null
}

export const useSignUp = () => {
    const [loading, setLoading] = useState(false)

    const signUpEmailAndPassword = async (email: string, password: string): Promise<SignUpResult> => {
        setLoading(true)
        try {
            const user = await signupUser(email, password);
            return { user, error: null }
        } catch (error: any) {
            return { user: null, error }
        } finally {
            setLoading(false)
        }
    }

    const signUpGoogle = async (): Promise<SignUpResult> => {
        setLoading(true)
        try {
            const user = await signUpWithGoogle()
            return { user, error: null }
        } catch (error: any) {
            return { user: null, error }
        } finally {
            setLoading(false)
        }
    }

    return { signUpEmailAndPassword, signUpGoogle, loading }
}
