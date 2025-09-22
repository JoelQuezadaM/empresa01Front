import React, { useContext, useEffect, useState } from "react";
import "../../styles/Popup.css";
import TableProductos from "./components/TableProductos"
import {dataProductos} from "./data/data.js"
import "./productos.css"
import PopUpMuestraProd from "./components/PopUpMuestraProd.jsx";
import axios from "axios";
import { PopUpEditaProducto } from "./components/PopUpEditaProducto.jsx";
import { ProductosContext } from "./context/ProductosContext.jsx";
import { BsFront } from "react-icons/bs";


const Productos = () => {
  const {productos,setProductos, setEditaProducto} = useContext(ProductosContext)


  
  //para los popup son los 2 siguientes
  // const [muestraProducto, setMuestraProducto] = useState(null)
  // const [editaProducto, setEditaProducto] = useState(null)

  const insertarProducto = async (producto) =>{
    try{ 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/productos`,producto)
        const productoAlmacenado = response.data

        setProductos([...productos,productoAlmacenado])
    }
    catch(error){
        console.log(error)
    }
  }

  
  const importarDatos=()=>{
    console.log(dataProductos[0])
      for (let i = 0; i < dataProductos.length; i++){
         insertarProducto(dataProductos[i])
       }
  }


  const handleNuevo = ()=>{
    const tProducto={
      codigo:'',
      nombre:'',
      almacen:'',
      existencias:'',
      Precio:0,
      foto:''
    }
    setEditaProducto(tProducto)
  }

  return (
    <div className="fondo-principal">
      <h1>Productos</h1>
      <br />
      {/* <button className="open-popup-btn" onClick={importarDatos}>
        Importar datos
      </button> */}
      <button className="open-popup-btn" onClick={handleNuevo}>
        Insertar producto
      </button>
      
      <TableProductos/>
      <PopUpMuestraProd/>
      <PopUpEditaProducto/>

     </div>
  );
};

export default Productos;
