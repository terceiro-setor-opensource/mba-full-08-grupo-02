import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth()
  if (user?.account_type_id === 1) {
    return children
  }
  return <Navigate to="/dashboard" />
}
