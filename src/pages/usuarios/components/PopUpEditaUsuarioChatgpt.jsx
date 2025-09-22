import { useEffect, useState } from 'react';
import axios from 'axios';

const PopupUsuario = ({ usuarioEditar, cerrarPopup, agregarUsuario, actualizarUsuario, roles }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rolId, setRolId] = useState('');
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    if (usuarioEditar) {
      setNombre(usuarioEditar.nombre || '');
      setEmail(usuarioEditar.email || '');
      setRolId(usuarioEditar.rol_id || '');
      setFoto(null);
      setPreviewFoto(usuarioEditar.foto ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${usuarioEditar.foto}` : null);
    } else {
      // Si es nuevo
      setNombre('');
      setEmail('');
      setRolId('');
      setFoto(null);
      setPreviewFoto(null);
    }
  }, [usuarioEditar]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreviewFoto(URL.createObjectURL(file));
  };

  const guardarUsuario = async () => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('rol_id', rolId);

    if (foto) {
      formData.append('foto', foto);
    }

    try {
      if (usuarioEditar?.id) {
        // Actualizar
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${usuarioEditar.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        actualizarUsuario({ id: usuarioEditar.id, nombre, email, rol_id: rolId });
      } else {
        // Insertar
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        agregarUsuario(res.data); // El backend debe devolver el nuevo usuario creado
      }

      cerrarPopup();
    } catch (error) {
      console.error('Error al guardar usuario', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-contenido">
        <h2>{usuarioEditar ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>

        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />

        <select value={rolId} onChange={e => setRolId(e.target.value)}>
          <option value="">Seleccione un rol</option>
          {roles.map(rol => (
            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleFotoChange} />

        {previewFoto && (
          <img src={previewFoto} alt="Vista previa" width="100" style={{ marginTop: '10px' }} />
        )}

        <div style={{ marginTop: '20px' }}>
          <button onClick={guardarUsuario}>Guardar</button>
          <button onClick={cerrarPopup} style={{ marginLeft: '10px' }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PopupUsuario;
