import './App.css'
import Card from './components/Card'
import ShowHide from './components/ShowHide'
import productos from './data/productos'
import Navbar from './components/Navbar'

function App() {
  const productoList = productos.map(v => {
    return <Card id={v.id} title={v.nombre} desc={v.descripcion}/>
  })

  return (
    <>
    <Navbar />
    <h1 className="saludo">Hola XD</h1>
    <div className="container">
      {productoList}
    </div>
    <ShowHide />
    </>
  )
}

export default App
