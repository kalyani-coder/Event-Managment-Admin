import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Form, Button, Modal } from "react-bootstrap";
import "./Enquiry.css";
import { Link } from "react-router-dom";

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
  const [validatedFields, setValidatedFields] = useState([]);
  const [customerNameError, setCustomerNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [venueError, setVenueError] = useState("");
  const [stateError, setStateError] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetchEvents();
    fetchManagers();
    fetchVenues();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/addeventmaster");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/addmanager");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/venue");
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleAddEnquiry = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setCustomerNameError("");
      setContactError("");
      setVenueError("");
      setStateError("");
    }, 3000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [customerNameError, contactError, venueError, stateError]);

  const isContactValid = (contact) => {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
  };

  const handleSubmit = async () => {
    const invalidFields = [];

    if (!customerName) {
      invalidFields.push("customerName");
      setCustomerNameError("Customer Name is required");
    }

    if (!contact || !isContactValid(contact)) {
      invalidFields.push("contact");
      setContactError("Contact number is required and must be 10 digits");
    }

    if (!eventVenue) {
      invalidFields.push("eventVenue");
      setVenueError("Event venue is required");
    }

    if (!selectedState) {
      invalidFields.push("selectedState");
      setStateError("State is required");
    }

    if (invalidFields.length > 0) {
      setValidatedFields(invalidFields);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8888/api/enquiry", {
        event_name: selectedEvent,
        customer_name: customerName,
        email: customerEmail,
        contact: contact,
        address: address,
        event_date: eventDate,
        guest_quantity: guestQuantity,
        event_venue: eventVenue,
        budget: eventRequirement,
        assign_manager_Id: selectedManagerId,
        assign_manager_name: selectedManagerName,
        state: selectedState,
      });
      alert("Enquiry added & assigned to manager successfully");
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error adding enquiry:", error);
    }
  };

  const resetForm = () => {
    setSelectedEvent("");
    setCustomerName("");
    setCustomerEmail("");
    setContact("");
    setAddress("");
    setEventDate("");
    setGuestQuantity("");
    setEventVenue("");
    setEventRequirement("");
    setSelectedManagerId("");
    setSelectedManagerName("");
    setSelectedState("");
    setValidatedFields([]);
    setCustomerNameError("");
    setContactError("");
    setVenueError("");
    setStateError("");
  };

  const handleCustomerNameChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[0-9]/g, "");
    setCustomerName(cleanedValue);
  };

  const handleContactChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, "");
    setContact(cleanedValue);
  };

  const handleContactKeyDown = (e) => {
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
      )
    ) {
      e.preventDefault();
    }
  };

  const indianStates = [
    "",
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <div>
            <Link to={"/quotation"}>
              <button className="btn btn-primary mr-4 mb-4">
                View Enquiry
              </button>
            </Link>
            <h2 className="text-[30px] pl-[1em]">Enquiry</h2>

            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="customer_name">
                    Client Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validatedFields.includes("customerName")
                        ? "is-invalid"
                        : ""
                    }`}
                    name="customer_name"
                    id="customer_name"
                    placeholder="Client Name"
                    value={customerName}
                    onChange={handleCustomerNameChange}
                    required
                  />
                  {validatedFields.includes("customerName") &&
                    !customerName && (
                      <div className="invalid-feedback">
                        Client Name is required
                      </div>
                    )}
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
                  <label htmlFor="event_venue">
                    Select Venue <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Select
                    className={`form-control ${
                      validatedFields.includes("eventVenue") ? "is-invalid" : ""
                    }`}
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
                  {validatedFields.includes("eventVenue") && (
                    <div className="invalid-feedback">
                      Event venue is required.
                    </div>
                  )}
                </div>
              </div>

              <div className="col px-5">
                <Form.Group controlId="SelectEvent">
                  <Form.Label>Select Occasion:</Form.Label>
                  <div className="relative">
                    <Form.Select
                      className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                      aria-label="Select Event"
                      name="event"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      <option value="">Select Occasion</option>
                      {events.map((event) => (
                        <option key={event._id} value={event.eventName}>
                          {event.eventName}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="event_budget">Event Budget</label>
                  <input
                    type="number"
                    className="form-control"
                    name="event_requirement"
                    id="event_requirement"
                    placeholder="Event Budget"
                    value={eventRequirement}
                    onChange={(e) => setEventRequirement(e.target.value)}
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
                    className={`form-control ${
                      validatedFields.includes("contact") ? "is-invalid" : ""
                    }`}
                    name="contact"
                    id="contact"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={handleContactChange}
                    onKeyDown={handleContactKeyDown}
                    required
                    maxLength="10"
                  />
                  {validatedFields.includes("contact") && (
                    <div className="invalid-feedback">
                      Contact number is required
                    </div>
                  )}
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
                  <label htmlFor="email">Client Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Client Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
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
                <Form.Group controlId="SelectState">
                  <Form.Label>Select State</Form.Label> <span style={{ color: "red" }}>*</span>
                  <div className="relative">
                    <Form.Select
                       className={`form-control ${
                      validatedFields.includes("selectedState") ? "is-invalid" : ""
                    }`}
                      aria-label="Select State"
                      name="selectedState"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                    </Form.Select>
                    {validatedFields.includes("selectedState") &&
                    !selectedState && (
                      <div className="invalid-feedback">
                       State is required
                      </div>
                    )}
                  </div>
                
                </Form.Group>
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="model-container-enquiry"
      >
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
                setSelectedManagerName(
                  e.target.options[e.target.selectedIndex].text
                );
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
          <Button
            className="btn btn-primary assign-btn"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            className="btn btn-secondary assign-btn"
            onClick={handleSubmit}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
