import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // <-- importamos el hook de auth



export default function Home() {
  const { auth } = useAuth();


  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Sistema de Gestión</h1>
      </header>

      {/* Main content */}
      <main className="home-main">
        <h2>
          Bienvenido 👋 <span className="username">{auth.nombre || "Usuario"}</span> 
        </h2>

        <div className="card-grid">
          {/* Usuarios */}
          <Link to="/sistema/usuarios" className="card card-usuarios">
            <h3 className="usuarios">Usuarios</h3>
            <p>Administra cuentas de usuarios.</p>
            </Link>

          {/* Productos */}
          <div className="card">
            <h3 className="productos">Productos</h3>
            <p>Gestiona el catálogo de productos.</p>
          </div>

          {/* Ventas */}
          <div className="card">
            <h3 className="ventas">Ventas</h3>
            <p>Consulta y registra ventas.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        © 2025 Sistema de Gestión. Todos los derechos reservados.
      </footer>
    </div>
  );
}
