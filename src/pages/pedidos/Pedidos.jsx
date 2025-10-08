import React, { useContext, useEffect, useState } from 'react'
import TablePedidos from './components/TablePedidos'
import { PedidosContext } from './context/PedidosContext'
import axios from 'axios'
import PopupPedido from './components/PopupPedido'
import PopupPedidoDetalle from './components/PopupPedidoDetalle'


const Pedidos = () => {
  const {setPedidos,pedidoSeleccionado,setPedidoSeleccionado} = useContext(PedidosContext)
  
  const [loading, setLoading] = useState(false)//haciendo una consulta en la base de datos
  
  
  useEffect(() => {
      if (loading) {
        document.body.classList.add("waiting");
        console.log('entrando loading')
      } else {
        document.body.classList.remove("waiting");
      }
  }, [loading])

  const mostrarPedidos = async()=>{
    try {
      setLoading(true)
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/mostrar`)
      setPedidos(respuesta.data) 
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }

    useEffect(() => {
      setPedidoSeleccionado(null)
      mostrarPedidos()
    }, [])
    

  return (
    <div className="fondo-principal">
      <h1>Pedidos</h1>

      <TablePedidos/>
      <PopupPedido/>
      <PopupPedidoDetalle/>
    </div>

  ) 
}

export default Pedidos