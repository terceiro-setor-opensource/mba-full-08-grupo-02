import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import './i18n'
import { SignIn } from './pages/SignIn'
import { ProtectedRoute } from './components/commons/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { AuthProvider } from './contexts/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Places } from './pages/Places'
import { DetailedPlace } from './pages/DetailedPlace'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'places',
        element: <Places />,
      },
      {
        path: 'places/:id',
        element: <DetailedPlace />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
