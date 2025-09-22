import React, { useContext } from 'react'
import { UsuariosContext } from '../context/UsuariosContext';

const PopUpMuestraUsuario = () => {
  const {isPopupUsuarioMostrarOpen,closePopupUsuarioMostrar,muestraUsuario,setMuestraUsuario} = useContext(UsuariosContext)

  const closePopup = () => {
    setMuestraUsuario(null);
    closePopupUsuarioMostrar();
  };

  return (
    <>
      {isPopupUsuarioMostrarOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Detalles del Producto</h2>
            <p><strong>Id:</strong> {muestraUsuario.id}</p>
            <p><strong>Nombre:</strong> {muestraUsuario.nombre}</p>
            <p><strong>Email:</strong> {muestraUsuario.email}</p>
            <p><strong>Confirmado:</strong> {muestraUsuario.confirmado}</p>
            <p><strong>Confirmado:</strong> {muestraUsuario.foto}</p>
            
            <img 
                // src={`${muestraUsuario.foto}`}
                src={`http://localhost:4000/uploads/${muestraUsuario.foto}?${Date.now()}`}
                alt="Employee" width={150} style={{borderRadius: '20%'}}/>
            <div className="contenedor">
                 <button onClick={closePopup}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUpMuestraUsuario