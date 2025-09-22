import React, { createContext, useState } from 'react'

export const UsuariosContext = createContext() 

export const UsuariosContextProvider = ({children})=>{
    const [usuarios, setUsuarios] = useState([])

    const [muestraUsuario, setMuestraUsuario] = useState(null)
    const [editaUsuario, setEditaUsuario] = useState(null)


    //////////editar/////////////
    const [isPopupUsuarioEditarOpen, setIsPopupUsuarioEditarOpen] = useState(false)

    const openPopupUsuarioEditar = ()=>{
        console.log('entrando a open buscar')
        setIsPopupUsuarioEditarOpen(true)}

    const closePopupUsuarioEditar = ()=>
        setIsPopupUsuarioEditarOpen(false)


    ///////////////mostrar/////////////
    const [isPopupUsuarioMostrarOpen, setIsPopupUsuarioMostrarOpen] = useState(false)

    const openPopupUsuarioMostrar = () =>{
        setIsPopupUsuarioMostrarOpen(true)
    }

    const closePopupUsuarioMostrar = ()=>{
        setIsPopupUsuarioMostrarOpen(false)
    }


    ///////////permisos por rol de usuario
    const [isPopupUsuarioMuestraPermisosOpen, setIsPopupUsuarioMuestraPermisosOpen] = useState(false)

    const openPopupUsuarioMuestraPermisos = ()=>{
        setIsPopupUsuarioMuestraPermisosOpen(true)
    }
    
    const closePopupUsuarioMuestraPermisos = () =>{
        setIsPopupUsuarioMuestraPermisosOpen(false)
        
    }

    return(
        <UsuariosContext.Provider
            value={{usuarios,setUsuarios,
            muestraUsuario,setMuestraUsuario,
            editaUsuario,setEditaUsuario,
            openPopupUsuarioEditar,closePopupUsuarioEditar,isPopupUsuarioEditarOpen,
            openPopupUsuarioMostrar,closePopupUsuarioMostrar,
            isPopupUsuarioMostrarOpen,isPopupUsuarioMuestraPermisosOpen,
            openPopupUsuarioMuestraPermisos,closePopupUsuarioMuestraPermisos
            }}>
                {children}
        </UsuariosContext.Provider>
    )
}