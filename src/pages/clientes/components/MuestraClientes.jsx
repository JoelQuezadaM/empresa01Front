import React, { useContext } from 'react'
import Tarjeta from './Tarjeta'
import { ClienteContext } from '../context/ClienteContext'


const MuestraClientes = () => {
  const {clientes} = useContext(ClienteContext)
  return (
    <>
    <div className="scroll-container-cards">
        <div className='contenedor'>
          {clientes.map(cliente=>(
            <Tarjeta 
              key={cliente.id}
              cliente={cliente}
            />
          ))}
        </div>
        </div>
    </>
  )
}

export default MuestraClientes