import React, { useState,useRef,useEffect, useContext } from 'react'
import axios from "axios";
import { fechaHoy } from '../../../helpers/fechas'
import { ClienteContext } from '../context/ClienteContext';

const Popup = () => {
    const {clientes,setClientes,cliente,isPopupOpen,closePopup,setCliente} = useContext(ClienteContext)


    const [aNombre, setaNombre] = useState('')
    const [aCorreo, setaCorreo] = useState('')
    const [aFechaNacimiento, setaFechaNacimiento] = useState('')
    const [aId, setaId] = useState()

    const primerInput = useRef(null);

    useEffect(() => {
        if (Object.keys(cliente).length>0){
            setaId(cliente.id)
            setaNombre(cliente.nombre)
            setaCorreo(cliente.correo)
            setaFechaNacimiento(cliente.fechaNacimiento)
        }
    }, [cliente])

    useEffect(()=>{
        if (isPopupOpen){
            setTimeout(() => {
                primerInput.current?.focus();
            }, 1000);
        }
    },[isPopupOpen])
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
    const guardarCliente = async (cliente) =>{
        if (cliente.id){//editando
            try {
                const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/clientes/${cliente.id}`,cliente)
                const tCliente={
                    id:cliente.id,
                    nombre:aNombre,
                    correo:aCorreo,
                    fechaNacimiento:aFechaNacimiento,
                }
                const tClientes = clientes.map(auxCliente=>auxCliente.id=== cliente.id ? cliente : auxCliente)    
                setClientes(tClientes)
            } catch ( error ) {
                console.log(error)
            }
        }
        else{//insertando
            try{
                cliente.id=clientes.length+1
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/clientes`,cliente)
                const clienteAlmacenado = data
                setClientes([clienteAlmacenado,...clientes])
            }
            catch(error){
                console.log(error.response.data.msg)
            }
        }
    }
////////////////////////////////////////////////
/////////////////////////////////////////////////
    const cerrar=()=>{
        setaNombre('')
        setaCorreo('')
        setaFechaNacimiento('')
        setCliente({})
        closePopup();
    }


    const handleAceptar=(e)=>{
        e.preventDefault();
        const tCliente={
            nombre:aNombre,
            correo:aCorreo,
            // solo dejamos la fecha y quitamos la hora
            fechaNacimiento:aFechaNacimiento.slice(0,10),
        }
        if (cliente.id){
            tCliente.id=cliente.id}
        guardarCliente(tCliente)
        cerrar();
    }
    
    return (
        <>
          {isPopupOpen && (
              <div className="popup">
              <div className="popup-content">
                <h2>TARJETA CLIENTE</h2>
                <div>
                    <label >Nombre</label>
                    <input type="text" 
                        ref={primerInput}
                        placeholder="Nombre del cliente" 
                        value={aNombre}
                        onChange={(e)=>setaNombre(e.target.value)}
                        />
                </div>
                <div>
                    <label >Email</label>
                    <input type="text" 
                           placeholder="Correo electrónico"
                           value={aCorreo}
                           onChange={(e)=>setaCorreo(e.target.value)}
                            />
                </div>
                <div>
                    <label >Fecha Nacimiento</label>
                    <input type="date" 
                           placeholder="Fecha de nacimiento"
                           value={aFechaNacimiento ? aFechaNacimiento.slice(0, 10) : fechaHoy()}
                           onChange={(e)=>setaFechaNacimiento(e.target.value)}
                            />
                </div>
                <div className='popup_botones'>
                    <button className="close-popup-btn" onClick={handleAceptar}>
                    Aceptar
                    </button>
                    <button 
                        className="close-popup-btn" 
                        onClick={cerrar}
                        >
                    Cancelar
                    </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    };
    

export default Popup