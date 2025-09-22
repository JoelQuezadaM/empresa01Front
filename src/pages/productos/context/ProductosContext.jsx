import { createContext, useState } from "react";


export const ProductosContext = createContext()

export const ProductosContextProvider = ({children})=>{
    const [productos, setProductos] = useState([])
    
    //para los popup son los 2 siguientes
    const [muestraProducto, setMuestraProducto] = useState(null)
    const [editaProducto, setEditaProducto] = useState(null)
    

    return(
        <ProductosContext.Provider
            value={{productos,setProductos,muestraProducto,setMuestraProducto,editaProducto,setEditaProducto}}>
            {children}
        </ProductosContext.Provider>
    )
}