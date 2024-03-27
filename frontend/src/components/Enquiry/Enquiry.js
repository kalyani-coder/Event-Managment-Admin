import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar"
import { Form, Button, Modal, Table } from 'react-bootstrap';


export default function Enquiry() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    event_name: "",
    customer_name: "",
    email: "",
    contact: "",
    address: "",
    event_date: getCurrentDate(),
    guest_quantity: "",
    event_venue: "",
    event_requirement: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/enquiry",
        formData
      );
      if (res.status === 200) {
        // Show success message
        setSuccessMessage("Enquiry Added successfully!");
        setShowSuccessAlert(true);
        // Reset the form after successful submission
        setFormData({
          title: "",
          event_name: "",
          customer_name: "",
          email: "",
          contact: "",
          address: "",
          event_date: getCurrentDate(),
          guest_quantity: "",
          event_venue: "",
          event_requirement: "",
        });
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check required fields
    if (!formData.customer_name || !formData.contact) {
      alert("Customer Name and Contact Number are required fields");
      return;
    }

    submitForm();
  };

  // Fetch and display recent inquiries
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    const fetchRecentInquiries = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recent-inquiries"
        );
        setRecentInquiries(res.data);
      } catch (e) {
        console.error(`Error fetching recent inquiries: ${e}`);
      }
    };

    fetchRecentInquiries();
  }, []); 


  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/addeventmaster');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventChange = (e) => {
    const eventName = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      event_name: eventName
    }));
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="card-1">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card-body mt-5">
                <div className="form-group">
                  <h2>Enquiry</h2>
                  {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                      {successMessage}
                    </Alert>
                  )}
                </div>

                {/* <div className="form-group">
                <label htmlFor="event_name">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="event_name"
                  id="event_name"
                  placeholder="Event name"
                  value={formData.event_name}
                  onChange={handleInputChange}
                />
              </div> */}
 <Form.Group controlId="SelectEvent">
        <Form.Label>Select Event:</Form.Label>
        <div className="relative">
          <Form.Select
            className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            aria-label="Select Event"
            name="event"
            value={formData.event_name} // Set selected value to formData.event_name
            onChange={handleEventChange}
          >
            <option>Select Event</option>
            {events.map((event, index) => (
              <option key={index} value={event.eventName}>
                {event.eventName}
              </option>
            ))}
          </Form.Select>
        </div>
      </Form.Group>


                <div className="form-group">
                  <label htmlFor="customer_name">
                    Customer Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="customer_name"
                    id="customer_name"
                    placeholder="Customer Name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Customer Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Customer Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact">
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="contact"
                    id="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    maxLength="10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Customer Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    id="address"
                    placeholder="Customer Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event_date">Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="event_date"
                    id="event_date"
                    placeholder="Event date"
                    value={formData.event_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guest_quantity">
                    Estimated Number of Guests
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="guest_quantity"
                    id="guest_quantity"
                    placeholder=" Estimated Number of Guests"
                    value={formData.guest_quantity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event_venue">Event Venue</label>
                  <input
                    type="text"
                    className="form-control"
                    name="event_venue"
                    id="event_venue"
                    placeholder="Event Venue"
                    value={formData.event_venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event_requirement">
                    Event Management Requirement
                  </label>
                  <textarea
                    className="form-control"
                    name="event_requirement"
                    id="event_requirement"
                    placeholder="Event management requirement"
                    value={formData.event_requirement}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <button
                    id="btn1"
                    className="btn btn-info"
                    onClick={handleSubmit}
                  >
                    Add Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display recent inquiries */}
        <div className="mt-5">

          <ul>
            {recentInquiries.map((inquiry, index) => (
              <li key={index}>
                {inquiry.customer_name} - {inquiry.event_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
