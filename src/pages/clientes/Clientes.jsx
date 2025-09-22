import React, { useContext, useEffect } from "react";
import "../../styles/Popup.css";
import MuestraClientes from "./components/MuestraClientes.jsx";
import "./css/styles.css"
import Popup from "./components/Popup.jsx";
import { ClienteContext } from "./context/ClienteContext.jsx";
import PopupClientesBuscar from "./components/PopupClientesBuscar.jsx";

// useContext(ClienteContext)

const Clientes = () => {
  const {openPopup,openPopupClienteBuscar,asignandoSqlArreglo}= useContext(ClienteContext)
    
  
  useEffect(() => {
      asignandoSqlArreglo();
  }, [])

  return (
    <div className="clientesPagina">
      <h1>Clientes</h1>
      <button className="open-popup-btn" onClick={openPopup}>
        Nuevo cliente
      </button>
      <button
        onClick={openPopupClienteBuscar}>Busar</button>
      <br />
      <MuestraClientes/>
      <Popup/>
      <PopupClientesBuscar/>
    </div>
  );
};

export default Clientes;
