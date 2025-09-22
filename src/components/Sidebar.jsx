import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaUser,FaClipboardList, FaUserCog  } from "react-icons/fa";
import { LuPackageOpen } from "react-icons/lu";
import { MdWarehouse } from "react-icons/md";


const Sidebar = () => {
  const [activeOption, setActiveOption] = useState("inicio")

  const handleOpcion=(opcion)=>{
    setActiveOption(opcion)
  }
  
  const menuOptions = [
    { id: 1, label: 'Inicio', icon: <FaHome />, link: '' },
    { id: 2, label: 'Clientes', icon: <FaUser />, link: 'clientes' },
    { id: 3, label: 'Productos', icon: <LuPackageOpen />, link: 'productos' },
    { id: 4, label: 'Pedidos', icon: <FaClipboardList  />, link: 'pedidos' },
    { id: 5, label: 'Almacenes', icon: <LuPackageOpen />, link: 'almacenes' },
    { id: 6, label: 'Usuarios', icon: <FaUserCog />, link: 'usuarios' }
];

  return (
    <div className="sidebar">
      { menuOptions.map((option) =>(
        <Link 
            key={option.id}
            // to={`/sistema/${option.label.toLowerCase()}`}
            to={`/sistema/${option.link.toLowerCase()}`}
            className={`menu-item-side-bar ${activeOption === option.label ? 'active' : ''}`}
            onClick={()=>handleOpcion(option.label)}>
            {option.icon} &nbsp; {option.label}
        </Link>
      ))}
    </div>
  );

};

export default Sidebar;
