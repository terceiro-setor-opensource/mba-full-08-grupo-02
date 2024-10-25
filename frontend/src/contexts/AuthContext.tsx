import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '@/types/User'
import useLocalStorage from '@/hooks/useLocalStorage'

export interface AuthContextType {
  user: User | null
  login: (data: { email: string; password: string }) => Promise<void>
  logout: () => void
  token: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | null>('auth_token', null)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const fetchUserData = (token: string) => {
    try {
      //TODO:Substituir por chamada à API
      console.log(token)
      setUser({
        id: '1',
        name: 'John Doe',
        birthdate: '12/12/2000',
        email: 'user@gmail.com',
        addressId: null,
        accountId: null,
        datetime_creation: '12/12/2021',
      })
    } catch (error) {
      setUser(null)
    }
  }

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }
    fetchUserData(token)
  }, [token])

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      // TODO:Substituir por chamada à API de login
      console.log(email, password)
      const token = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`mocked_token`)
        }, 1000)
      })

      setToken(token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    navigate('/', { replace: true })
  }

  const value = { user, login, logout, token }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
