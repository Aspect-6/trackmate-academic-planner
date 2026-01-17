import { auth, googleAuthProvider } from "@shared/lib/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, User } from "firebase/auth"

export const signupUser = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signUpWithGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    return userCredential.user
}
