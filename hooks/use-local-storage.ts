import { useState, useEffect } from 'react'

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false
    const test = '__localStorage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [isClient, setIsClient] = useState(false)
  const [storageAvailable, setStorageAvailable] = useState(false)

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available, using memory storage')
        return initialValue
      }
      
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    setIsClient(true)
    setStorageAvailable(isLocalStorageAvailable())
  }, [])

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      // Save to local storage if available
      if (isClient && storageAvailable) {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error)
          // If localStorage fails, continue with memory storage
        }
      }
    } catch (error) {
      console.error(`Error processing value for localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
} 