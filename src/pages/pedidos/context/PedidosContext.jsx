import { createContext, useState } from "react";

export const PedidosContext = createContext()

export const PedidosContextProvider = (props)=>{
    //es el arreglo de pedidos
    const [pedidos, setPedidos] = useState([])
    //es el arreglo de detalles del pedido
    const [dataDetalle, setDataDetalle] = useState([])
    //si se actualiza un detalle, afecta al pedido, y se refresca PopupPedido
    const [actualizoDataDetalle, setActualizoDataDetalle] = useState(false)
    

    ///PARA LOS POPUP
    //muestra el pedido
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    //edita el pedido
    const [editaPedido, setEditaPedido] = useState(null)


    //uno debe ser para el popup de insertar y otro para el editar, ya que no existe el mostrar porque se muestra todos los datos en el popup
    const [muestraPedidoDetalle, setMuestraPedidoDetalle] = useState(null)
    const [editaPedidoDetalle, setEditaPedidoDetalle] = useState(null)
//  a cambiar muestraPedido y setMuestraPedido
//            pedidoSeleccionado, setPedidoSeleccionado

    return(
        <PedidosContext.Provider
            value={{pedidos,setPedidos,pedidoSeleccionado,setPedidoSeleccionado,editaPedido,setEditaPedido,
            dataDetalle,setDataDetalle,muestraPedidoDetalle,setMuestraPedidoDetalle,editaPedidoDetalle,setEditaPedidoDetalle,actualizoDataDetalle,setActualizoDataDetalle}}>
                {props.children}
        </PedidosContext.Provider>
    )
}