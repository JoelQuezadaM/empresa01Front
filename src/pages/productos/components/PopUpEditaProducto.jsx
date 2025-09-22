import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios";
import { ProductosContext } from '../context/ProductosContext';

export const PopUpEditaProducto = ()=>{

    const {productos,setProductos,editaProducto,setEditaProducto,insertarProducto} = useContext(ProductosContext)

    const setProductosArreglo=setProductos

    const [aCodigo, setaCodigo] = useState('')
    const [aNombre, setaNombre] = useState('')
    const [aAlmacen, setaAlmacen] = useState('')
    const [aExistencias, setaExistencias] = useState('')
    const [aPrecio, setaPrecio] = useState('')
    const [aFoto, setaFoto] = useState('')
    const [aId, setaId] = useState()
    
    useEffect(()=>{
      if (editaProducto!==null){
        setaCodigo(editaProducto.codigo)
        setaNombre(editaProducto.nombre)
        setaAlmacen(editaProducto.almacen)
        setaExistencias(editaProducto.existencias)
        setaPrecio(editaProducto.Precio)
        setaFoto(editaProducto.foto)
      }
    },[editaProducto])

    const primerInput = useRef(null);

    const guardaProducto = async(producto)=>{
      if (producto.id){//editando
          try {
            const {dato} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/productos/${producto.id}`,producto)
            console.log(dato)
            const tProductos = productos.map(auxProducto=>auxProducto.id=== producto.id ? producto : auxProducto)
            setProductosArreglo(tProductos)
          }catch (error){
              console.log(error)
          }
      }
      else{//insertando
          insertarProducto(producto)
      }
    }

    const closePopup = () => {
      setaCodigo('')
      setaNombre('')
      setaAlmacen('')
      setaExistencias('')
      setEditaProducto(null);
    };

    

    const handleAceptar=(e)=>{  
        e.preventDefault();
        console.log('entrando aceptar')  
        const tProducto={
          codigo:aCodigo,
          nombre:aNombre,
          almacen:aAlmacen,
          existencias:aExistencias,
          Precio:Number(aPrecio),
          foto:aFoto
        }//hay que corregir esto
        if (editaProducto.id){
            tProducto.id=editaProducto.id;}
        guardaProducto(tProducto)
        closePopup();
    }

  return (
    <>
      {editaProducto && (
        <div className="popup">
          <div className="popup-content">
            <h2>Editando del Producto</h2>
            <div>
                <label>Codigo</label>
                <input type="text" 
                    ref={primerInput}
                    value={aCodigo}
                    onChange={(e)=>setaCodigo(e.target.value)}/>
            </div>
            <div>
                <label>Nombre</label>
                <input type="text" 
                    value={aNombre}
                    onChange={(e)=>setaNombre(e.target.value)}/>
            </div>
            <div>
              <label><strong>Almacen:</strong></label>
              <input type="text"
                     value={aAlmacen}
                     onChange={(e)=>setaAlmacen(e.target.value)}/>
            </div>
            <div>
              <label><strong>Existencia:</strong></label>
              <input type="text"
                     value={aExistencias}
                     onChange={(e)=>setaExistencias(e.target.value)}/>
            </div> 
            <div>
              <label><strong>Precio:</strong></label>
              <input type="number"
                     value={aPrecio}
                     onChange={(e)=>setaPrecio(e.target.value)}/>
            </div> 
            <img 
                src={`${editaProducto.foto}.jpg`}
                alt="Employee" width={150} style={{borderRadius: '20%'}}/>
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
  // const tProductos = productos.map