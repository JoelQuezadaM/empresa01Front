import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/login/Login'
import LoginLayout from './pages/login/LoginLayout'
import OlvidePassword from './pages/login/OlvidePassword'
import Registrar from './pages/login/Registrar'
import ConfirmarCuenta from './pages/login/ConfirmarCuenta'
import NuevoPassword from './pages/login/NuevoPassword'
import { AuthProvider } from './context/AuthProvider'
import "./index.css"

import { ClienteContextProvider } from './pages/clientes/context/ClienteContext'
import { ProductosContextProvider } from './pages/productos/context/ProductosContext'
import { PedidosContextProvider } from './pages/pedidos/context/PedidosContext'
import { UsuariosContextProvider } from './pages/usuarios/context/UsuariosContext'


import SistemaLayout from './pages/sistema/SistemaLayout'
import Clientes from './pages/clientes/Clientes'
import Productos from './pages/productos/Productos'
import Inicio from './pages/inicio/Inicio'
import Pedidos from './pages/pedidos/Pedidos'
import Usuarios from './pages/usuarios/Usuarios'

function FondoManager() {
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === '/' || 
        location.pathname === '/registrar' ||
        location.pathname === '/confirmar' ||
        location.pathname.startsWith('/confirmar') ||
        location.pathname.startsWith('/olvide-password') 
      ) {
      document.body.className = 'login';
    } else if (location.pathname === '/sistema') {
      document.body.className = 'fondo2';
    } else {
      document.body.className = '';
    }
  }, [location]);

  return null;
}

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuariosContextProvider>
        <ClienteContextProvider>
        <ProductosContextProvider>
        <PedidosContextProvider>

        <FondoManager/>
        <Routes>
            <Route path="/" element={<LoginLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="registrar" element={<Registrar/>}/> 
                <Route path="olvide-password" element={<OlvidePassword/>}/>
                <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>
            <Route path="/sistema" element={<SistemaLayout/>}>
                 <Route index element={<Inicio/>}/> 
                 <Route path='clientes' element={<Clientes/>}/>
                 <Route path='productos' element={<Productos/>}/>
                 <Route path='pedidos' element={<Pedidos/>}/>
                 <Route path='usuarios' element={<Usuarios/>}/>
            </Route>
        </Routes>
        </PedidosContextProvider>
        </ProductosContextProvider>
        </ClienteContextProvider>
        </UsuariosContextProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}  

export default App
