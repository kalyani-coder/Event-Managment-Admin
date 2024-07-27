import React from 'react'
import { useState } from 'react'
import "../../NewLandingPage/Navbar/Navbar.css"
import { Link } from 'react-router-dom'
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import LoginPopUp from '../../NewLandingPage/LoginPopUp/LoginPopUp';
import Sidebar from '../../NewLandingPage/Sidebar/Sidebar';
import EventNavbarLogo from "../../NewLandingPage/Images/eventnavbarlogo.png"

const Navbar = () => {

    const[menu, setMenu] = useState("home");
    const [showSidebar, setShowSidebar] = useState(false);
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  

  return (
    <>
    {showLoginPopUp && <LoginPopUp setshowLoginPopUp={setShowLoginPopUp} />}
    {showSidebar && <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />}
    <div className='navbar'>
      <div className="navbar-menu-logo">
      <div className="hamburger-menu">
     {/* <RiMenu2Line size={25} onClick={()=>setShowSidebar(!showSidebar)}/> */}
     {showSidebar?<RxCross2 size={25} onClick={()=>setShowSidebar(!showSidebar)} />:<RiMenu2Line size={25} onClick={()=>setShowSidebar(!showSidebar)}/>}
      </div>
      <img src={EventNavbarLogo} alt="logo" className='logo' />
      {/* <h1 className='logo'>{EventNavbarLogo}</h1> */}
    </div>
      <ul className="navbar-menu"> 
        <Link to="/" className={menu==="home"?"active":"" } onClick={()=>setMenu("home")} >Home</Link>
        <Link to="/about" className={menu==="menu"?"active":""} onClick={()=>setMenu("menu")} >About Us</Link>
        <Link to="/contact" className={menu==="About-Us"?"active":""} onClick={()=>setMenu("About-Us")} >Contact Us</Link>
        <Link to="/blogs" className={menu==="contact-us"?"active":""} onClick={()=>setMenu("contact-us")} >Blog</Link>
      </ul>
      <div className="navbar-right">
        {/* <img className="search-icon" src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
            {/* <img src={basket_icon} alt="" /> */}
            {/* <div className="dot"></div> */}
        </div>
        <button onClick={()=>setShowLoginPopUp(true)}>sign in</button>
      </div>
    </div>
    </>
  )
}

export default Navbar



