import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'

import './i18n'
import { SignIn } from './pages/SignIn'
import { ProtectedRoute } from './components/commons/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
