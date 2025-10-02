import React, { useState } from 'react'
import "./login.css"
import useAuth from '../../hooks/useAuth'
import { clienteAxios } from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';
import axios from 'axios'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {setAuth,setPermisos,transformarPermisos, loading, setLoading}=useAuth()


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if ([email,password].includes('')){
            alert('Todos los campos son obligatorios')
            return
        }
        try {
            setLoading(true)

            const {data}= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,{email,password})
            localStorage.setItem('Pt_01',data.token)
            const permisosTransformados=transformarPermisos(data.derechos)

            ///almacenamos localmente los permisos
            localStorage.setItem('Permisos',JSON.stringify(permisosTransformados))            
            setAuth(data)
            setPermisos(permisosTransformados)

            navigate('/sistema')
        } catch (error) {
            console.error(error)
            const msg = err.response?.data?.msg || "Error en el servidor"
            alert(msg)   // 👈 aquí mostramos el error en popup
            // alert(error.response?.data?.msg)
        }
    }

  return (
        <>
            <div className="login-header">
                <span>Bienvenido 0.7</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input_box">
                    <input type="text" id="email" className="input-field" required
                        value={email} autoComplete='username'
                        onChange={e=>setEmail(e.target.value)}/>
                    <label htmlFor="email" className="label">Email</label>
                    <i className="bx bx-user icon"></i>
                </div>

                <div className="input_box">
                    <input type="password" id="pass" className="input-field" required
                        value={password} autoComplete='current-password'
                        onChange={e=>setPassword(e.target.value)}/>
                    <label htmlFor="pass" className="label">Password</label>
                    <i className="bx bx-lock-alt icon"></i>
                </div>

                <div className="remember-forgot">
                    {/* <div className="remember-me">
                        <input type="checkbox" id="remember"/>
                        <label for="remember">Remember me</label>
                    </div> */}

                    <div className="forgot">
                        <a href="/olvide-password">Olvide mi password</a>
                    </div>
                </div>

                <div className="input_box">
                <input type="submit" className="input-submit" value="Iniciar sesión"/>
                </div>

                <div className="register">
                    <span>No tienes un cuenta? <a href="/registrar">Regístrate</a></span>
                </div>
            </form>
    </>
  )
}
//hasta aqui
export default Login