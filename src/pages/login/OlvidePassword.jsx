import React, { useState } from 'react'
import { clienteAxios } from '../../config/axios';

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [habilitado, setHabilitado] = useState(true)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email)
        if(email === ''){
            alert('El Email es obligatorio')
            return
        }
        try{
            const {data} = await clienteAxios.post('/usuarios/olvide-password',{email})
            alert(data.msg)
            setHabilitado(false)
        }catch(error){
            alert(error.response.data.msg)
        }
    }

  return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="login-header-amplio">
                <span>Recuperar Cuenta</span>
            </div>
            <div className="input_box">
                <input type="text" id="user" className="input-field" required
                    value={email}
                    onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="user" className="label">Email</label>
                <i className="bx bx-user icon"></i>
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
            <input type="submit" className="input-submit" value="Enviar instrucciones"
            disabled={!habilitado}/>
            </div>

            <div className="register">
                <span>¿Ya tienes un cuenta? <a href="/">Inicia sesión</a></span>
            </div>
    </form>
    </>
  ) 
}

export default OlvidePassword