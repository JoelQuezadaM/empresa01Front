import React from 'react'
import { Outlet } from 'react-router-dom'
import "./login.css"

const LoginLayout = () => {
  return (
    <>
    <div className="wrapper">
        <div className="login_box">
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default LoginLayout