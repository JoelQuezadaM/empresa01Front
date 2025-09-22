import axios from "axios";
import { createContext,  useState } from "react";


export const ClienteContext = createContext()

export const ClienteContextProvider = (props)=>{
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})
    const [clienteBuscado, setClienteBuscado] = useState({})

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupClienteBuscarOpen, setIsPopupClienteBuscarOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true);
        ;
    const closePopup = () => setIsPopupOpen(false);

    const openPopupClienteBuscar = ()=>{
        console.log('entrando a open buscar')
        asignandoSqlArreglo();
        setIsPopupClienteBuscarOpen(true)}

    const closePopupClienteBuscar = ()=>
        setIsPopupClienteBuscarOpen(false)

    const eliminar=(id)=>{
        setClientes(clientes.filter(cliente=>cliente.id !== id))
    }

    const asignandoSqlArreglo = async()=>{
      try {
        console.log('entrando al asignando')
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/clientes/mostrar`
        const respuesta = await axios.get(url)
    
        setClientes(respuesta.data)
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <ClienteContext.Provider
            value={{clientes,setClientes,cliente,setCliente,eliminar,
                openPopup,closePopup,openPopupClienteBuscar,
                closePopupClienteBuscar,isPopupOpen,isPopupClienteBuscarOpen,asignandoSqlArreglo,clienteBuscado,setClienteBuscado}}>
            {props.children}
        </ClienteContext.Provider>
    )
}