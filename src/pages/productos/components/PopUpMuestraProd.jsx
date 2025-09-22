import React, { useContext } from 'react'
import { ProductosContext } from '../context/ProductosContext';

const PopUpMuestraProd = () => {
  const {muestraProducto,setMuestraProducto} = useContext(ProductosContext)

  const closePopup = () => {
    setMuestraProducto(null);
  };

  return (
    <>
      {muestraProducto && (
        <div className="popup">
          <div className="popup-content">
            <h2>Detalles del Producto</h2>
            <p><strong>Codigo:</strong> {muestraProducto.codigo}</p>
            <p><strong>Nombre:</strong> {muestraProducto.nombre}</p>
            <p><strong>Almacen:</strong> {muestraProducto.almacen}</p>
            <p><strong>Existencia:</strong> {muestraProducto.existencias}</p>
            <img 
                src={`${muestraProducto.foto}.jpg`}
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

export default PopUpMuestraProd