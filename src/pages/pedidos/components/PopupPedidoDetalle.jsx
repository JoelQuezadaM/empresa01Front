import React, { useContext, useEffect, useState } from 'react'
import { formatearFecha } from '../../../helpers/fechas'
import { PedidosContext } from '../context/PedidosContext'
import axios from 'axios'


const PopupPedidoDetalle = () => {
    const { setActualizoDataDetalle,editaPedidoDetalle,dataDetalle,setDataDetalle,setEditaPedidoDetalle,setPedidoSeleccionado} = useContext(PedidosContext)

    const [aId_producto, setaId_producto] = useState('')
    const [aCantidad, setaCantidad] = useState("")
    const [aPrecioUnitario, setaPrecioUnitario] = useState("")

    const subtotal = (parseFloat(aCantidad) || 0) * (parseFloat(aPrecioUnitario) || 0);

    useEffect(() => {
      if(editaPedidoDetalle){
        setaId_producto(editaPedidoDetalle.id_producto)
        setaCantidad(editaPedidoDetalle.cantidad)
        setaPrecioUnitario(editaPedidoDetalle.precio_unitario)
      }
    }, [editaPedidoDetalle])

    const actualizaPedido =async (pedido_detalle)=>{
        //consultamos el pedido en la base de datos porque se actualizo
        const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/mostrar/${pedido_detalle.id_pedido}`)
        setPedidoSeleccionado(respuesta.data[0])

        //actualizamos el listado de detalles del pedido
        setActualizoDataDetalle(true)
    }


    const insertarPedidoDetalle = async (pedido_detalle) =>{
      try{ 
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pedidodetalles/${pedido_detalle.id_pedido}`,pedido_detalle)
          setDataDetalle([...dataDetalle,pedido_detalle])
          
          actualizaPedido(pedido_detalle)
      }
      catch(error){
          console.log(error)
      }
    }

    const actualizaPedidoDetalle=async(pedido_detalle)=>{
      try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/pedidodetalles/${pedido_detalle.id_pedido_detalle}`,pedido_detalle)

            const tPedidosDetalles = dataDetalle.map(auxPedidoDetalle=>auxPedidoDetalle.id=== pedido_detalle.id ? pedido_detalle : auxPedidoDetalle)
            setDataDetalle(tPedidosDetalles)
            
            actualizaPedido(pedido_detalle)
          }catch (error){
            console.log(error)
          }
      }

      const guardaPedidoDetalle = (pedido_detalle)=>{
        if (pedido_detalle.id_pedido_detalle){//editando
            actualizaPedidoDetalle(pedido_detalle)
          }
          else{//insertando
            insertarPedidoDetalle(pedido_detalle)
          }
      }

      const closePopup=()=>{
        setaId_producto('')
        setaCantidad('')
        setaPrecioUnitario('')
        setEditaPedidoDetalle(null);
    }

    const handleAceptar=(e)=>{
      e.preventDefault();
      const tPedidoDetalle={
          id_pedido:editaPedidoDetalle.id_pedido,
          id_producto:aId_producto,
          cantidad:Number(aCantidad),
          precio_unitario:Number(aPrecioUnitario)
      }
      if (editaPedidoDetalle.id_pedido_detalle){
          tPedidoDetalle.id_pedido_detalle=editaPedidoDetalle.id_pedido_detalle;}
      guardaPedidoDetalle(tPedidoDetalle)
      closePopup();
    }
 
  return (
    <>
      {editaPedidoDetalle && (
        <div className="popup-segundo">
          <div className="popup-content">
            <h2>Detalles del Pedido</h2>
            <label>Producto</label>
            <input type="text"
                    value={aId_producto}
                    onChange={(e)=>setaId_producto(e.target.value)}
                    onFocus={(e) => setTimeout(() => e.target.select(), 0)} />
            <label>Cantidad</label>
            <input type="number"
                    value={aCantidad}
                    onChange={(e)=>setaCantidad(e.target.value)}
                    onFocus={(e) => setTimeout(() => e.target.select(), 0)} />
            <label>Precio uniario</label>
            <input type="number"
                    value={aPrecioUnitario}
                    onChange={(e)=>setaPrecioUnitario(e.target.value)}
                    onFocus={(e) => setTimeout(() => e.target.select(), 0)}/>
            <label>Subtotal</label>
            <input type='text'
                   readOnly
                   tabIndex={-1}
                   value={`$${subtotal.toFixed(2)}`}/>
            <div>
            </div>
            <div className="contenedor">
                 <button onClick={handleAceptar}>Aceptar</button>
                 <button onClick={closePopup}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupPedidoDetalle