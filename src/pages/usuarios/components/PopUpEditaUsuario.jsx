import { useContext, useEffect, useRef, useState } from 'react'
import { UsuariosContext } from '../context/UsuariosContext'
import axios from 'axios'

const PopUpEditaUsuario = () => {
    const {usuarios,setUsuarios,editaUsuario,setEditaUsuario,
      closePopupUsuarioEditar,isPopupUsuarioEditarOpen,
    } = useContext(UsuariosContext)

    const setUsuariosArreglo=setUsuarios

    const [aId, setaId] = useState('')
    const [aNombre, setaNombre] = useState('')
    const [aEmail, setaEmail] = useState('')
    const [aRolId, setaRolId] = useState('');
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null); 

    const [roles, setRoles] = useState([]);

    const fileInputRef = useRef();      
    

    const cargarDatosUsuarioYRoles = async () => {
        try {
          // Cargar roles
          const { data: rolesObtenidos } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/roles`);
          setRoles(rolesObtenidos);
          console.log('roles')
          console.log(rolesObtenidos)
          // Cargar datos del usuario a editar (si existe)
          if (editaUsuario) {
            setaId(editaUsuario.id);
            setaNombre(editaUsuario.nombre);
            setaEmail(editaUsuario.email);
            setaRolId(editaUsuario.rol_id);
            console.log('editaUsuario.rol_id')
            console.log(editaUsuario.rol_id)
            setPreview(`http://localhost:4000/uploads/${editaUsuario.foto}`);
          }else{
            setaId('');
            setaNombre('');
            setaEmail('');
            setaRolId('');
            setPreview(null);
            setFoto(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario y roles:', error);
        }
    };

    useEffect(()=>{
        cargarDatosUsuarioYRoles()
    },[editaUsuario])


    function crearFormData(usuario) {
        const formData = new FormData();
        formData.append("id", usuario.id || "");
        formData.append("nombre", usuario.nombre);
        formData.append("email", usuario.email);
        formData.append('rol_id', usuario.rol_id);

        if (foto) {
          formData.append("foto",foto);
        }
      return formData;
    }

    const insertarUsuario = async (usuario) => {
        try {
          const formData = crearFormData(usuario)

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/crear`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          const usuarioAlmacenado = response.data;
          setUsuarios([...usuarios, usuarioAlmacenado]);
        } catch (error) {
          console.log(error);
        }
    };

    const guardaUsuario = async (usuario) => {
        if (usuario?.id) {//editando
          try {
              const formData = crearFormData(usuario)
              const resultado= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${usuario.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              const usuarioActualizado=resultado.data
              const tUsuarios = usuarios.map(u => u.id === usuarioActualizado.id ? { ...u, nombre: usuarioActualizado.nombre, email: usuarioActualizado.email , nombreRol:usuarioActualizado.nombreRol,foto:usuarioActualizado.foto} : u);
              setUsuariosArreglo(tUsuarios);
          } catch (error) {
            console.log(error);
          }
        } else {
          // INSERTANDO (puedes dejar esto si usas el popup también para crear)
          insertarUsuario(usuario);
        }
    };

    const handleAceptar=(e)=>{
        e.preventDefault();
        const tUsuario={
           nombre:aNombre,
           email:aEmail,
           rol_id:aRolId
         }//hay que corregir esto
         console.log('tUsuario')
         console.log(tUsuario)
         if (editaUsuario!==null &&
            editaUsuario.id!==null){
              console.log('si entro al id')
             tUsuario.id=editaUsuario.id;}
        guardaUsuario(tUsuario)
        closePopup();

    }
      
    const closePopup = () => {
      setaNombre('');
      setaEmail('');
      setaRolId('');
      setFoto(null);
      setPreview(null);
      fileInputRef.current.value = ''; // reset input file
      setEditaUsuario(null);
      closePopupUsuarioEditar();
    };
    
    /////
    const handleFotoChange = (e) => {
      const file = e.target.files[0];
      setFoto(file);

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleBotonClick = () => {
      fileInputRef.current.click();
    };

  return (
      <>
      {isPopupUsuarioEditarOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Editando Usuario</h2>
            <div>
                <label>Id:<span>{aId}</span></label>
                
            </div>
            <div>
                <label>Nombre</label>
                <input type="text" 
                    value={aNombre}
                    onChange={(e)=>setaNombre(e.target.value)}/>
            </div>
            <div>
              <label>Email</label>
              <input type="email"
                     value={aEmail}
                     onChange={(e)=>setaEmail(e.target.value)}/>
            </div> 
          
            <div>
              <label>Rol</label>
              <select value={aRolId} onChange={(e) => setaRolId(Number(e.target.value))}>
                <option value="">-- Selecciona un rol --</option>
                {roles.map((rol) => (
                  <option key={rol.rol_id} value={rol.rol_id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>
            {preview && <img src={preview} 
               alt="Vista previa" width={150} style={{borderRadius: '20%'}} />}   
              {/* Input file oculto */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFotoChange}
              />
              {/* Botón visible que abre el input */}
              <button type="button" onClick={handleBotonClick}>
                    Seleccionar foto
              </button>

            <div className="contenedor">
                 <button onClick={handleAceptar}>Aceptar</button>
                 <button onClick={closePopup}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUpEditaUsuario