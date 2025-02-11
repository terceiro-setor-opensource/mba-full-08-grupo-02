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
import { Benefits } from './pages/Benefits'
import { DetailedPlace } from './pages/DetailedPlace'
import { ToastContainer } from 'react-toastify'
import About from './pages/About'
import { ProtectedAdminRoute } from './components/commons/ProtectedAdminRoute'
import { ManagePlaces } from './pages/Admin/Places'

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
        path: 'places/:id/benefits',
        element: <Benefits />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/places',
        element: (
          <ProtectedAdminRoute>
            <ManagePlaces />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
