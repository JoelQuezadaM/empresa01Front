import React, { useContext, useEffect } from 'react'
import TablePedidos from './components/TablePedidos'
import { PedidosContext } from './context/PedidosContext'
import axios from 'axios'
import PopupPedido from './components/PopupPedido'
import PopupPedidoDetalle from './components/PopupPedidoDetalle'

const Pedidos = () => {
  const {setPedidos,pedidoSeleccionado,setPedidoSeleccionado} = useContext(PedidosContext)
  

  const mostrarPedidos = async()=>{
    console.log('entrando a mostrar pedidos')
    try {
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/mostrar`)
      setPedidos(respuesta.data) 
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