import React, { useContext } from 'react'
import TableUsuarios from './components/TableUsuarios'
import PopUpMuestraUsuario from './components/PopUpMuestraUsuario'
import PopUpEditaUsuario from './components/PopUpEditaUsuario'
import { UsuariosContext } from './context/UsuariosContext'
import PopUpMuestraPermisos from './components/PopUpMuestraPermisos'



const Usuarios = () => {
  const {setEditaUsuario,openPopupUsuarioEditar} = useContext(UsuariosContext)
  
  const insertarUsuario = ()=>{
    console.log('nuevo usuario')
    setEditaUsuario(null)
    openPopupUsuarioEditar()
  }
  return (
      <div className="fondo-principal">Usuarios
        <br />
        <button
          className="open-popup-btn"
          onClick={insertarUsuario}>Nuevo</button>
        <TableUsuarios/>
        <PopUpMuestraUsuario/>
        <PopUpEditaUsuario/>
        <PopUpMuestraPermisos/>
    </div>
  )
}

export default Usuarios