import React, { useState } from 'react'
import "./login.css"
import { useViewTransitionState } from 'react-router-dom'
import axios from 'axios'
import { clienteAxios } from '../../config/axios'


const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password !== repetirPassword){
            alert('Los password no son iguales')
            return
        }
        if(password.length< 6){
            alert('El password es muy corto')
            return
        }
        
        try{
            await clienteAxios.post(`/usuarios`,{nombre,email,password})
            alert('Usuario creado correctamente, revisa tu email')
        }catch(error){
            alert(error.response.data.msg)
        }
    }

  return (
        <form
            onSubmit={handleSubmit}>
            <div className="login-header">
                <span>Registrarse</span>
            </div>
            <div className="input_box">
                <input type="text" id="user" className="input-field" required
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}/>
                <label htmlFor="user" className="label">Nombre</label>
                <i className="bx bx-user icon"></i>
            </div>
            <div className="input_box">
                <input type="text" id="email" className="input-field" required
                    value={email} autoComplete='username'
                    onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="email" className="label">Email</label>
                <i className="bx bx-user icon"></i>
            </div>

            <div className="input_box">
                <input type="password" id="pass" className="input-field" required
                    value={password} autoComplete='new-password'
                    onChange={e=>setPassword(e.target.value)}/>
                <label htmlFor="pass" className="label">Password</label>
                <i className="bx bx-lock-alt icon"></i>
            </div>
            <div className="input_box">
                <input type="password" id="reppass" className="input-field" required
                    value={repetirPassword} autoComplete='new-password'
                    onChange={e=>setRepetirPassword(e.target.value)}
                />
                <label htmlFor="reppass" className="label">Repetir Password</label>
                <i className="bx bx-lock-alt icon"></i>
            </div>

             <div className="remember-forgot">
                {/* <div className="remember-me">
                    <input type="checkbox" id="remember"/>
                    <label htmlFor="remember">Remember me</label>
                </div> */}

                <div className="forgot">
                    <a href="/olvide-password">Olvide mi password</a>
                </div>
            </div> 

            <div className="input_box">
                <input type="submit" className="input-submit" value="Crear cuenta"/>
            </div>

            <div className="register">
                <span>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></span>
            </div> 
        </form>
  )
}

export default Registrar