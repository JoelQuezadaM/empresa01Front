import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { clienteAxios } from '../../config/axios'


const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [mensaje, setMensaje] = useState('vacio')

    
    const params=useParams();
    const {id} = params;

    useEffect(()=>{
        const confirmar = async () =>{
           try{
                console.log('entrando al try de confirmar cuenta')
                const url = `/usuarios/confirmar/${id}`
                const {data}= await clienteAxios(url)
                setCuentaConfirmada(true)
                setMensaje('Cuenta confirmada')
                console.log('si paso confirmacion')
                console.log(data.msg)
           }catch(error){
                console.log('entro al catch')
                console.log(mensaje)
                // console.log(error.response.data.msg)
                if(mensaje==='vacio'){
                    setMensaje(error.response.data.msg)
                }
           }
           console.log
           console.log(mensaje)
           setCargando(false)
        }
        confirmar()
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        window.location.href = "/";
        navigate
    }
  return (
        <>
            <div className="login-header-amplio">
                <span>Cuenta confirmada</span>
            </div>
            {!cargando &&
                <form onSubmit={handleSubmit}>

                <div className="register">
                    <div className="input_box">
                        <input type="submit" className="input-submit" value={mensaje}/>
                    </div>

                </div>
                </form>
                 }

            
        </>
  )
}

export default ConfirmarCuenta