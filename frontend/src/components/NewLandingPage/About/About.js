import React from 'react';
import '../../NewLandingPage/About/About.css';
import Img from '../../NewLandingPage/Images/event.jpg';
import Navbar from  "../../NewLandingPage/Navbar/Navbar";
import Footer from "../../NewLandingPage/Footer/Footer"

const AboutUs = () => {
    return (
        <>
        <Navbar/>
        <div className="about-container">
            <div className="about-content">
                <div className="left-content">
                    <h2>About Us</h2>
                    <p>
                        Welcome to Event Management Company, where we specialize in creating unforgettable events. Our team of experienced professionals is dedicated to providing exceptional service and ensuring that your event is a resounding success. Whether it's a corporate event, wedding, conference, or special occasion, we bring your vision to life with creativity and precision.
                    </p>
                    
                </div>
                <div className="right-content">
                    <img src={Img} alt="Event Management" />
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
