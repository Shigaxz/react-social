import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.jsx'
import Index from './views/Index.jsx'
import Register from './views/Register.jsx'
import MyProfile from './views/MyProfile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getCollection } from './firebase/firebaseFunctions.js'
import UserProfile from './views/UserProfile.jsx'
import './index.css'


const rutas = [
  {
    path: "/",
    element: <Index />,
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

const UserRoutes = async () => {
  try {
    const users = await getCollection('user');
    const usersRoutes = users.map(user => ({
      path: `/profile/${user.id}`,
      element: <UserProfile user={user} />
    }));
    rutas.push(...usersRoutes);
  } catch (e) {
    console.error("Error creando rutas de usuarios: ", e);
  }
};

await UserRoutes();
const router = createBrowserRouter(rutas);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
