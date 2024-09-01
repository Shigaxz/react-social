import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.jsx'
import App from './App.jsx'
import Register from './views/Register.jsx'
import MyProfile from './views/MyProfile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './index.css'
import './output.css'

const rutas = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/myprofile",
    element: <ProtectedRoute element={<MyProfile />} />
  }
];

const router = createBrowserRouter(rutas);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
