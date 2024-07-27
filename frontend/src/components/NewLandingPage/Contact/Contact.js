import React from 'react'
import '../../NewLandingPage/Contact/Contact.css'
import Navbar from  "../../NewLandingPage/Navbar/Navbar";
import Footer from "../../NewLandingPage/Footer/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className='contact-us'>
        <h4>Contact Us</h4>
        <hr />
        <div className="contact-us-content">
          <div className="contact-us-left">
            <h5>Investor Queries and Grievances</h5>
            <h6>Laksh Gundale</h6>
            <p>Vice President, Investor Relations</p>
            <p>Email: <span className="email">ir@event.in</span> </p><br />
            <h6>Spandan Jagtap</h6>
            <p>Company Secretary</p>
            <p>Email: <span className="email">sj@event.in</span> </p>
          </div>

          <div className="contact-us-right">
            <h5>Public Relations and Media</h5>
            <h6>Mahesh Rohane</h6>
            <p>Vice President, Corporate Affairs</p><br /><br />
            <h6>Customer Support</h6>
            <p>Email: <span className='email'>support@event.in</span> </p>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default ContactUs
