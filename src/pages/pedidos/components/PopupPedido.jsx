import React, { useContext, useEffect, useState } from 'react'
import { PedidosContext } from '../context/PedidosContext';
import { fechaHoy, formatearFecha } from '../../../helpers/fechas';
import TablePedidoDetalles from './TablePedidoDetalles';
import axios from 'axios';
import { ClienteContext } from '../../clientes/context/ClienteContext';
import PopupClientesBuscar from '../../clientes/components/PopupClientesBuscar';

const PopupPedido = () => {
  
  const {pedidos,setPedidos,pedidoSeleccionado,setPedidoSeleccionado,setDataDetalle,actualizoDataDetalle, setEditaPedidoDetalle,setActualizoDataDetalle} = useContext(PedidosContext)
   
  const {openPopupClienteBuscar,clienteBuscado,setClienteBuscado} = useContext(ClienteContext)

  
  const [idCliente, setIdCliente] = useState('')
  const [fechaPedido, setFechaPedido] = useState('')
  const [clienteNombre, setClienteNombre] = useState("")

  const closePopup = () => {
    setClienteBuscado('')
    setPedidoSeleccionado(null);
  };

  const nuevoDetalle = () =>{
    const tPedidoDetalle={
      id_pedido:pedidoSeleccionado.id_pedido,
      id_producto:0,
      cantidad:0,
      precio_unitario:0
    }
    setEditaPedidoDetalle(tPedidoDetalle);
  }

  const mostrarPedidoDetalles = async(pedido)=>{
    try {
      //regresa los datos de un pedido
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidodetalles/mostrar/${pedidoSeleccionado.id_pedido}`,pedidoSeleccionado.id_pedido)
      if (respuesta.data.length>0){
        setDataDetalle(respuesta.data) 
      }else{
        setDataDetalle([])
      }
    }catch(error){
      console.log(error)
    }
  }

//puede entrar al effect cuando inicia, pasar los datos del registro seleccionado, cuando cambio de cliente o cuando modifico algun detalle  
 
useEffect(() => {
  //se abre el popup
  // console.log('clienteBuscado')
  // console.log(clienteBuscado)
    if (pedidoSeleccionado && Object.keys(pedidoSeleccionado).length>0){
          setIdCliente(pedidoSeleccionado.id_cliente)
          setClienteNombre(pedidoSeleccionado.nombre)
          setFechaPedido(pedidoSeleccionado.fecha)
          mostrarPedidoDetalles()
      }
 }, [pedidoSeleccionado])

useEffect(() => {
    if (clienteBuscado){
      setPedidoSeleccionado(prev => ({
        ...prev,
        id_cliente: clienteBuscado.id,
        nombre:clienteBuscado.nombre
      }));
    }
    if (actualizoDataDetalle){
      mostrarPedidoDetalles(pedidoSeleccionado)
      setActualizoDataDetalle(false)
    }
  }, [actualizoDataDetalle,clienteBuscado])
    
  
  ////////////////////////////////////
  const guardarPedido = async (tPedido) =>{
      if (tPedido.id_pedido){//editando
          try {
              const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/${pedidoSeleccionado.id_pedido}`,tPedido)
              const tPedidos = pedidos.map(auxPedido=>auxPedido.id_pedido=== tPedido.id_pedido ? tPedido : auxPedido)    
              setPedidos(tPedidos)
          } catch ( error ) {
              console.log(error)
          }
      }
      else{//insertando
          try{
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos`,tPedido)
            const id_pedidoAlmacenado = data
              tPedido.id_pedido=id_pedidoAlmacenado
              tPedido.total=0
              const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/mostrar/${tPedido.id_pedido}`)

              tPedido.nombre=respuesta.data[0].nombre
              setPedidos([...pedidos,tPedido])

              setPedidoSeleccionado(prev => ({
                  ...prev,
                    id_pedido: id_pedidoAlmacenado,
                  }));
          }
          catch(error){
              console.log(error.response.data.msg)
          }
      }
    }
  

  // guardar los cambios de fecha y nombre
  const handleAceptarDatosPedido=()=>{
        const tPedido={
            id_cliente:idCliente,
            fecha:fechaPedido.slice(0,10),
            estatus:0,
        }
        if (pedidoSeleccionado.id_pedido){
            tPedido.id_pedido=pedidoSeleccionado.id_pedido}
        guardarPedido(tPedido)
        // closePopup();
  }
  return (
    <>
      {pedidoSeleccionado && (
        <div className="popup">
          <div className="popup-content-amplio">
            <h2>Detalles del Pedido</h2>
            <div>
            <p><strong>Id Pedido:</strong> {pedidoSeleccionado.id_pedido}</p>
            <p><strong>No. Cliente:</strong> 
            <input type="number"
              readOnly
              value={idCliente}
              onChange={(e)=>setIdCliente(e.target.value)}
              />
              </p>
            <p><strong>Cliente:</strong> {pedidoSeleccionado.nombre}</p>
            <button
              onClick={openPopupClienteBuscar}>Buscar cliente</button>
            <br />
            <p><strong>Fecha:</strong> 
               <input type="date"
                value={fechaPedido ? fechaPedido.slice(0, 10) : fechaHoy()}
                onChange={(e)=>setFechaPedido(e.target.value)} /> 
            </p>
            <p><strong>Total:</strong> {`$${Number(pedidoSeleccionado.total).toFixed(2)}`}</p>
              </div>
            <div>
              <button 
                  disabled={
                    Object.keys(clienteBuscado).length<1
                  }
                  onClick={handleAceptarDatosPedido}>Aceptar</button>
            </div>
             <TablePedidoDetalles/> 
            <div className="contenedor">
                 <button 
                    disabled={pedidoSeleccionado.id_pedido === undefined}
                    onClick={nuevoDetalle}>Nuevo</button>
            </div>
                 <button onClick={closePopup}>Cerrar</button>
          </div>
          <PopupClientesBuscar/>
        </div>
      )}
    </>
  )
}

export default PopupPedido