import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Form, Button, Modal } from "react-bootstrap";
import "./Enquiry.css";

export default function Enquiry() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestQuantity, setGuestQuantity] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventRequirement, setEventRequirement] = useState("");
  const [managers, setManagers] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedManagerName, setSelectedManagerName] = useState("");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchManagers();
    fetchVenues();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/addeventmaster");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/addmanager");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/venue");
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleAddEnquiry = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!customerName || !customerEmail) {
      alert("Customer name and email are required.");
      return;
    }
  
    if (!selectedManagerId) {
      alert("Please select a manager.");
      return; 
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/enquiry", {
        event_name: selectedEvent,
        customer_name: customerName,
        email: customerEmail,
        contact: contact,
        address: address,
        event_date: eventDate,
        guest_quantity: guestQuantity,
        event_venue: eventVenue,
        event_requirement: eventRequirement,
        assign_manager_Id: selectedManagerId,
        assign_manager_name: selectedManagerName,
      });
      alert("Enquiry added & assign to manager successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding enquiry:", error);
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <div>
          {/* <button className="btn btn-primary"> View Enquiry</button> */}
            <h2 className="text-[30px] pl-[1em]">Enquiry</h2>

            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="SelectEvent">
                  <Form.Label>Select Event:</Form.Label>
                  <div className="relative">
                    <Form.Select
                      className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                      aria-label="Select Event"
                      name="event"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      <option value="">Select Event</option>
                      {events.map((event) => (
                        <option key={event._id} value={event.eventName}>
                          {event.eventName}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>
              <div className="col px-5">
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="email">Customer Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="col px-5">
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
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    maxLength="10"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="address">Customer Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    id="address"
                    placeholder="Customer Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="event_date">Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="event_date"
                    id="event_date"
                    placeholder="Event date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
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
                    value={guestQuantity}
                    onChange={(e) => setGuestQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div className="col px-5">
              <div className="form-group">
                  <label htmlFor="event_venue">
                    Select Venue <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Select
                    className="form-control"
                    name="event_venue"
                    id="event_venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    required
                  >
                    <option value="">Select Venue</option>
                    {venues.map((venue) => (
                      <option key={venue._id} value={venue.venue}>
                        {venue.venue}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="event_requirement">
                    Event Management Requirement
                  </label>
                  <textarea
                    className="form-control"
                    name="event_requirement"
                    id="event_requirement"
                    placeholder="Event management requirement"
                    value={eventRequirement}
                    onChange={(e) => setEventRequirement(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Button
                    variant="info"
                    className="manager-btn ms-1"
                    onClick={handleAddEnquiry}
                  >
                    Add Enquiry & Assign to Manager
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="assignManagerName">
            <Form.Label>Manager Name:</Form.Label>
            <Form.Select
              value={selectedManagerId}
              onChange={(e) => {
                setSelectedManagerId(e.target.value);
                setSelectedManagerName(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option value="">Select Manager Name</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.fname} {manager.lname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary assign-btn" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button className="btn btn-secondary assign-btn" onClick={handleSubmit}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
