import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const prefixedKey = `@cidade-ativa:${key}`

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(prefixedKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(prefixedKey, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Error setting localStorage', error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === prefixedKey) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [prefixedKey, initialValue])

  return [storedValue, setValue]
}

export default useLocalStorage
