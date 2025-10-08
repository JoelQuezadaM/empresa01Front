import { createContext, useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";
import { jwtDecode } from "jwt-decode";


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
        const autenticarUsuario = async () => {
        const token = localStorage.getItem('Pt_01');
        console.log('token')
        console.log(token)
        if (!token) {
            console.log('entro a no existe token')
            setCargando(false);
        return;
        }

        try {
            // 🧩 Decodificamos el token
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // en segundos

            if (decoded.exp && decoded.exp < now) {
                console.log('si expiro')
                console.warn("Token expirado, eliminando...");
                localStorage.removeItem('Pt_01');
                setCargando(false);
                return;
            }
            console.log('pasando si expiro')
            setLoading(true);

            const config = {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
            };
            console.log('antes del axios')
            const { data } = await clienteAxios(`/usuarios/perfil`, config);
            console.log('despues del axios')
            setPermisos(transformarPermisos(data.derechos));
            setAuth(data.usuario);

            } catch (error) {
            console.error(error);
            if (token) {
                alert("No se pudo autenticar el usuario");
            }
            localStorage.removeItem('Pt_01');
            setAuth({});
            setPermisos({});
            } finally {
            setLoading(false);
            setCargando(false);
            }
        };

        autenticarUsuario();
    }, []);
    
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