import { useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const { currentUser } = useAuth();
  return (
    <>

    <Navbar />
    <h1 className="saludo">Hola XD</h1>
    {currentUser ? console.log(`Welcome, ${currentUser.email}`) : console.log('Please log in')}
    </>
  )
}

export default App
