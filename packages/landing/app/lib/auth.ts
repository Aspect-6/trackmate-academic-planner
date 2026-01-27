import { auth, googleAuthProvider } from "@shared/lib"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    verifyBeforeUpdateEmail,
    updateProfile,
    deleteUser,
    linkWithPopup,
    unlink,
    getAdditionalUserInfo,
    sendEmailVerification,
    reauthenticateWithCredential,
    EmailAuthProvider,
    GoogleAuthProvider,
    User
} from "firebase/auth"

// Sign Up Functions
export const signUpEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signUpGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    if (!additionalInfo?.isNewUser) {
        // If the user already exists, Firebase might have automatically linked this credential.
        // We only want to unlink if it was a *merge* (i.e., user had other providers).
        // If the user has ONLY Google (length === 1), then no merge happened (they just signed in),
        // so we shouldn't unlink (which would leave them with 0 providers).
        if (userCredential.user.providerData.length > 1) {
            try {
                await unlink(userCredential.user, GoogleAuthProvider.PROVIDER_ID)
            } catch (unlinkError) {
                // Ignore unlink errors (e.g. if it wasn't linked for some reason)
                console.error("Failed to unlink provider during rollback", unlinkError)
            }
        }

        await signOut(auth)
        throw {
            code: "auth/email-already-in-use",
            message: "Account already exists. Please sign in."
        }
    }

    return userCredential.user
}

// Sign In Functions
export const signInEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signInGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    // If this is a new user, delete the account and throw an error
    if (additionalInfo?.isNewUser) {
        await deleteUser(userCredential.user)
        const error = new Error("No account exists with this Google account. Please sign up first.") as any
        error.code = "auth/account-not-found"
        throw error
    }

    return userCredential.user
}

// Sign Out Function
export const signOutUser = async (): Promise<void> => {
    await signOut(auth)
}

// Account Management Functions
export const reauthenticateUser = async (currentPassword: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    if (!auth.currentUser.email) throw new Error("No email associated with account")
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
}

export const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await reauthenticateUser(currentPassword)
    await updatePassword(auth.currentUser, newPassword)
}

export const updateUserEmail = async (newEmail: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail)
}

export const updateUserDisplayName = async (displayName: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await updateProfile(auth.currentUser, { displayName })
}

export const deleteUserAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await deleteUser(auth.currentUser)
}

// Linked Account Functions
export const linkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await linkWithPopup(auth.currentUser, googleAuthProvider)
}

export const unlinkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await unlink(auth.currentUser, "google.com")
}

// Email Verification
export const sendUserEmailVerification = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await sendEmailVerification(auth.currentUser)
}
