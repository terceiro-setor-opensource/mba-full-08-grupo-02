import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import axios from 'axios'
import { Account } from '@/models/account'
import api from '@/services/api'

export interface AuthContextType {
  user: Account | null
  login: (data: { email: string; password: string }) => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
    phone_number?: string
    account_type_id: number
  }) => Promise<void>
  logout: () => void
  token: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | null>('auth_token', null)
  const [user, setUser] = useState<Account | null>(null)
  const navigate = useNavigate()

  const fetchUserData = async (token: string) => {
    try {
      const response = await api.get(`/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data)
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

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post(`/login`, { email, password })
      const token = response.data.token

      setToken(token)
      fetchUserData(token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Invalid credentials')
    }
  }

  const register = async ({
    name,
    email,
    password,
    phone_number,
    account_type_id,
  }: {
    name: string
    email: string
    password: string
    phone_number?: string
    account_type_id: number
  }) => {
    try {
      await api.post(`/register`, {
        name,
        email,
        password,
        phone_number,
        account_type_id,
      })
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error('Registration failed')
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    navigate('/', { replace: true })
  }

  const value = { user, login, register, logout, token }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
