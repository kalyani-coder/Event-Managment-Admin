import React from 'react'
import './Footer.css';
import { Link } from "react-router-dom"
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import logo from "../../NewLandingPage/Images/Prabandh.jpg"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="logo" className='logo' />
          <p>We specialize in transforming your vision into unforgettable experiences. As a full-service event management company, we pride ourselves on our attention to detail, creative solutions, and seamless execution.</p>
          <div className="footer-social-icons">
            <TiSocialFacebook size={25} />
            <SlSocialInstagram size={25} />
            <SlSocialTwitter size={25} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul className='text-dark'>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/contact"}>
              <li>Contact</li>
            </Link>
            <Link to={"/blogs"}>
              <li>Blogs</li>
            </Link>

          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-222-666-5555</li>
            <li>Contact@event.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @event.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
