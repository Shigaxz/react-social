import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Register from './views/Register.jsx'
import './index.css'

const rutas = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />
  }
];

const router = createBrowserRouter(rutas);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
