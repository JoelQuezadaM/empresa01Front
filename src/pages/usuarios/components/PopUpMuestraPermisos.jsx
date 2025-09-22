import React, { useContext, useEffect, useState } from 'react'
import { UsuariosContext } from '../context/UsuariosContext';
import "./permisos.css"
import axios from 'axios';


const PopUpMuestraPermisos = () => {
  const { isPopupUsuarioMuestraPermisosOpen, closePopupUsuarioMuestraPermisos,muestraUsuario } = useContext(UsuariosContext)

  const handleCerrar = () => {
    closePopupUsuarioMuestraPermisos();
  }

  const [permisos, setPermisos] = useState([]);

  const mostrarRolPermisoUsuarios = async()=>{
        console.log('entra al filtro')
      try {
        const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rolpermiso/mostrar/${muestraUsuario.rol_id}`)
        console.log(respuesta.data)
        setPermisos(respuesta.data);
      }catch(error){
        console.log(error)
      }
  }

  useEffect(() => {
    if (isPopupUsuarioMuestraPermisosOpen) {
      mostrarRolPermisoUsuarios()
    }
  }, [isPopupUsuarioMuestraPermisosOpen]);

  // Agrupar permisos por módulo (usando el estado actualizado)
  const modulos = permisos.reduce((acc, p) => {
    if (!acc[p.nombreModulo]) {
      acc[p.nombreModulo] = [];
    }
    acc[p.nombreModulo].push(p.permiso);
    return acc;
  }, {});

  return (
    <>
      {isPopupUsuarioMuestraPermisosOpen && (
        <div className='popup'>
          <div className="popup-content">
            <h2>Mostrando permiso del Usuario</h2>
            <label>PopUpMuestraPermisos</label>

          <div className="permisos-container">
            {Object.entries(modulos).map(([modulo, perms]) => (
              <div key={modulo} className="modulo">
                <div className="modulo-nombre">[+] {modulo}</div>
                <ul className="permisos-lista">
                  {perms.map((perm, index) => (
                    <li key={index} className="permiso">
                      ☑ {perm}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
            <button onClick={handleCerrar}>cerrar</button>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUpMuestraPermisos
