import { createContext, useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({children}) =>{

    const [cargando, setCargando] = useState(true)//cargando la aplicacion
    const [auth, setAuth] = useState({})
    const [permisos, setPermisos] = useState({})

    // 👇 nuevos estados globales
    const [loading, setLoading] = useState(false)//haciendo una consulta en la base de datos

    const transformarPermisos=(data)=> {
        return data.reduce((acc, { nombreModulo, permiso }) => {
            if (!acc[nombreModulo]) {
            acc[nombreModulo] = [];
            }
            if (!acc[nombreModulo].includes(permiso)) {
            acc[nombreModulo].push(permiso);
            }
            return acc;
        }, {});
    }


    useEffect(() => {
        const autenticarUsuario = async()=>{
            //Pt_01 es el nombre que se le asigna al token en el login
            const token = localStorage.getItem('Pt_01')
            // alert(`token:${token}`)
            if (!token) {
                setCargando(false)
                return//si no existe el token no valida
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                setLoading(true)//cursor de guardando
                const {data} = await  clienteAxios(`/usuarios/perfil`,config)
                setPermisos(transformarPermisos(data.derechos))
                setAuth(data.usuario)
            } catch (error) {
                console.error(error)
                alert("No se pudo autenticar el usuario")
                setAuth({})
                setPermisos({})
            }finally{
                setLoading(false)
                setCargando(false)
            }
        }
        autenticarUsuario()
    }, [])
    
    const cerrarSesion = () =>{
        localStorage.removeItem('Pt_01')
        localStorage.removeItem("permisos");
        setAuth({})
        setPermisos({})
    }


    return(
        <AuthContext.Provider
            value={{
                auth,setAuth,
                permisos,setPermisos,
                cargando,cerrarSesion,
                transformarPermisos,
                loading, setLoading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext