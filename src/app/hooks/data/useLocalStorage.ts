import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    const readValue = useCallback((): T => {
        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch (error) {
            throw new Error(`Error reading localStorage key "${key}": ${error}`)
        }
    }, [initialValue, key])

    const [storedValue, setStoredValue] = useState<T>(readValue)

    // Sync state to local storage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            throw new Error(`Error setting localStorage key "${key}": ${error}`)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const
}
