import React from "react";
import "./Topbar.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from '../hooks/useAuth'

const Topbar = () => {
  const {auth,cerrarSesion} = useAuth()
return(
  <header className="topbar">
    <div className="topbar">
      <img
        src="/logo.png"
        alt="Usuario"
        className="user-photo"
        />
        <label htmlFor="">PLATAFORMA CONTROL DE PEDIDOS</label>
    </div>
    <div className="perfil">
        {/* <span className="user-name">Usuario: </span> */}
        <nav>
            <NavLink to="#">Usuario:{auth.nombre}</NavLink>
            <NavLink to="/">Cerrar Sesion</NavLink>
        </nav>
    </div>
  </header>)
};

export default Topbar;
