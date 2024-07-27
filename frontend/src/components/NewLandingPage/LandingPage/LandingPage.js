import React from 'react'
import '../../NewLandingPage/LandingPage/LandingPage.css'
import EventImg from '../../NewLandingPage/Images/management.png'
import Navbar from  "../../NewLandingPage/Navbar/Navbar";
import Footer from "../../NewLandingPage/Footer/Footer";

const LandingPage = () => {
  return (
   <>
   <Navbar/>
     <div className='landing-container'>
        <div className='landing-content'>
            <div className='left-content'>
                <h2>Event Management</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo velit error blanditiis temporibus voluptate obcaecati quisquam, ullam repellendus eveniet alias odit recusandae accusamus iste minus dolores, modi est vel. Saepe.</p>
            </div>
            <div className='right-content'>
                <img src={EventImg} alt="" />
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default LandingPage
