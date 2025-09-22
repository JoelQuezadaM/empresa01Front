import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import "./sistema.css"
import useAuth from '../../hooks/useAuth'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'

const SistemaLayout = () => {
  const {auth, cargando} = useAuth()
  console.log(auth)
  if (cargando) return 'cargando...'

  return (
    <>
        <div className='sistema'>
          <Topbar/>
          <div className='main-layout'>
            <Sidebar/>
            {auth.id ? <Outlet/> : <Navigate to = "/"/>}
          </div>
        </div>
    </>
  )
}

export default SistemaLayout