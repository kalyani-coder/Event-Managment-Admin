import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";

const Sidebar = ({setShowSidebar,showSidebar}) => {

  return (
    <div>
       <div className='sidebar'>
      <div className="sidebar-content">
        <ul>
          <Link to='/' onClick={()=>setShowSidebar(!showSidebar)}><IoHomeSharp size={22} onClick={()=>setShowSidebar(!showSidebar)}/>Home</Link>
          <Link to='/blog' onClick={()=>setShowSidebar(!showSidebar)}><MdOutlineMenuBook size={22}/>Blog</Link>
          <Link to='/contactUs' onClick={()=>setShowSidebar(!showSidebar)}><IoIosContact size={22}/>Contact Us</Link>
          <Link to='/aboutUs' onClick={()=>setShowSidebar(!showSidebar)}><TiInfoLarge size={22} />About Us</Link>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
