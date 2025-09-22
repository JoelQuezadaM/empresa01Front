import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { clienteAxios } from '../../config/axios'
// import { clienteAxios } from '../config/axios'


const NuevoPassword = () => {
    const [nuevoPassword, setNuevoPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
      const comprobarToken = async()=>{
        try{
          await clienteAxios(`/usuarios/olvide-password/${token}`)
          setTokenValido(true)
        }catch(error){
          alert('Hubo un error con el enlace')
        }
      }
      comprobarToken()
    }, [])
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('entrando al handle')
        if(nuevoPassword.length<6){
          alert('El password debe de tener por lo menos 6 caracteres')
          return
        }
        try {
          const password=nuevoPassword
          const url = `/usuarios/olvide-password/${token}`
          const {data} = await clienteAxios.post(url,{password})

          console.log(data)
          alert(data.msg)
        } catch (error) {
          alert(error.response.data.msg)
        }
    }
  
  return (
    <>
        <div className="login-header-amplio">
            <span>Restablece Password</span>
        </div>
        {tokenValido &&(
          <>
            {(nuevoPassword.length)<1 && alert('Teclea tu nuevo password')}
            <form onSubmit={handleSubmit}>
                <div className="input_box">
                    <input type="password" id="pass" className="input-field" required
                        value={nuevoPassword}
                        onChange={e=>setNuevoPassword(e.target.value)}/>
                    <label htmlFor="pass" className="label">Nuevo Password</label>
                    <i className="bx bx-lock-alt icon"></i>
                </div>

                <div className="input_box">
                    <input type="submit" className="input-submit" value="Guardar nuevo Password"/>
                </div>
            </form>
            <div className="register">
                  <span>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></span>
            </div> 
        </>
        )}
          
  </>
  )
}

export default NuevoPassword