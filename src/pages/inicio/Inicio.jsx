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
          <Link to="/sistema/clientes" className="card">
            <h3 className="clientes">Clientes</h3>
            <p>Administra cuentas de clientes</p>
            </Link>

          {/* Productos */}
          <Link to="/sistema/productos" className="card">
            <h3 className="productos">Productos</h3>
            <p>Gestiona el catálogo de productos.</p>
            </Link>
          {/* Ventas */}
          <Link to="/sistema/pedidos" className="card">
            <h3 className="pedidos">Pedidos</h3>
            <p>Consulta y registra pedidos.</p>
            </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        © 2025 Sistema de Gestión. Todos los derechos reservados.
      </footer>
    </div>
  );
}
