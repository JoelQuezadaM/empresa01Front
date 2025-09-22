import React, { useContext } from 'react'
import { formatearFecha } from '../../../helpers/fechas'
import axios from "axios";
import { ClienteContext } from '../context/ClienteContext';


const Tarjeta = ({cliente}) => {
  const {setCliente,openPopup,clientes,setClientes} = useContext(ClienteContext)
    
  
    const handleOnclick=()=>{
      console.log('entrando a editar')
      setCliente({})
      setCliente(cliente)
      console.log('entrando al openPopup')
      openPopup();
    }
    ////////////////////////////////////////////////////////////////////
    const eliminarCliente = async (id) =>{
      const confirmar = confirm('Deseas eliminar el cliente?')
        if (confirmar){
          alert(id)
          try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/clientes/${id}`,cliente)
              setClientes(clientes.filter(cliente=>cliente.id !== id))
          }
          catch(error){
              console.log(error.response.data.msg)
          }
        }  
    }
    /////////////////////////////////////////////////////////////

  return (
    <>
        <div className="tarjeta">
            <p>CLIENTE</p>
            <p>Id:{cliente.id}</p>
            <p>Nombre:{cliente.nombre}</p>
            <p>Correo:{cliente.correo}</p>
            <p>Fecha nacimiento:{formatearFecha(cliente.fechaNacimiento)}</p>
            <div className="botonesTarjeta">
                <button
                  onClick={handleOnclick}>Editar</button>
                <button
                  onClick={()=>
                    // eliminar(cliente.id)}
                    eliminarCliente(cliente.id)}
                  >Eliminar</button>
            </div>
        </div>
    </>
  )
}

export default Tarjeta