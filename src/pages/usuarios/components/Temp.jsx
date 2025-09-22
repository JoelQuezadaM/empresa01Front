


import React, { useEffect, useState } from "react";

export default function PermisosPopup() {
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    // Simulamos lo que regresa tu backend
    const data = [
      { rol_id: 4, modulo_id: 1, permiso_id: 1, nombreModulo: "usuarios", permiso: "ver" },
      { rol_id: 4, modulo_id: 1, permiso_id: 2, nombreModulo: "usuarios", permiso: "altas" },
      { rol_id: 4, modulo_id: 1, permiso_id: 3, nombreModulo: "usuarios", permiso: "bajas" },
      { rol_id: 4, modulo_id: 1, permiso_id: 4, nombreModulo: "usuarios", permiso: "eliminar" },
      { rol_id: 4, modulo_id: 2, permiso_id: 1, nombreModulo: "clientes", permiso: "ver" },
      { rol_id: 4, modulo_id: 3, permiso_id: 2, nombreModulo: "productos", permiso: "altas" },
    ];
    setPermisos(data);
  }, []);

  // Agrupamos permisos por módulo
  const modulos = permisos.reduce((acc, permiso) => {
    if (!acc[permiso.nombreModulo]) {
      acc[permiso.nombreModulo] = [];
    }
    acc[permiso.nombreModulo].push(permiso.permiso);
    return acc;
  }, {});

  return (
    <div className="popup">
      <h2>Permisos del rol</h2>
      <div className="permisos-container">
        {Object.keys(modulos).map((modulo) => (
          <div key={modulo} className="modulo">
            <strong>{modulo}</strong>
            <ul>
              {modulos[modulo].map((permiso, i) => (
                <li key={i}>{permiso}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
