import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const AddNewEvent = () => {
  const [events, setEvents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [subVenue, setSubVenue] = useState("");
  const [budget, setBudget] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [eventTypeError, setEventTypeError] = useState("");
  const managerId = localStorage.getItem("managerId");

  const handleEventTypeChange = (event) => {
    setSelectedEventType(event.target.value);
    if (event.target.value) {
      setEventTypeError("");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/addeventmaster"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/enquiry");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    const selectedCustomerData = customers.find(
      (customer) => customer._id === selectedCustomerId
    );
    setSelectedCustomer(selectedCustomerData);
    if (selectedCustomerData) {
      setCustomerError("");
    }
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleSubmit = async () => {
    let valid = true;
    if (!selectedCustomer) {
      setCustomerError("Customer name is required");
      valid = false;
    }

    if (!selectedEventType) {
      setEventTypeError("Event type is required");
      valid = false;
    }

    if (valid) {
      try {
        await axios.post("http://localhost:5000/api/event", {
          eventName: selectedEvent,
          fname: selectedCustomer.customer_name,
          email: selectedCustomer.email,
          contact: selectedCustomer.contact,
          guest_number: selectedCustomer.guest_quantity,
          venue: selectedCustomer.event_venue,
          event_date: selectedCustomer.event_date,
          address: selectedCustomer.address,
          event_type: selectedEventType,
          subvenue: subVenue,
          budget: budget,
          status: selectedCustomer.status,
          managerId: managerId,
        });
        alert("Event created successfully");
        // Clear the form
        setSelectedCustomer(null);
        setSelectedEvent("");
        setSelectedEventType("");
        setSubVenue("");
        setBudget("");
      } catch (error) {
        console.error("Error submitting event:", error);
        // Handle error, display error message, etc.
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto"
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <div className="flex">
            <Link to={'/quotation'}>
              <button className="btn btn-primary mr-4 mb-4">View Enquiry</button>
            </Link>
            <Link to={'/followupstatus'}>
              <button className="btn btn-primary mr-4 mb-4">FollowUp Status</button>
            </Link>
            <Link to={'/viewevent'}>
              <button className="btn btn-primary mr-4 mb-4">View Event</button>
            </Link>
          </div>
          <h2 className="text-[30px] pl-[1em]">Create Event</h2>
          <div className="row mb-2">
            <div className="col px-5">
              <Form.Group controlId="SelectEvent">
                <Form.Label>Select Event:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                    aria-label="Select Event"
                    name="event"
                    onChange={handleEventChange}
                    value={selectedEvent} // Added value to clear form
                  >
                    <option>Select Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.eventName}>
                        {event.eventName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>
            <div className="col px-5">
              <Form.Group controlId="SelectCustomer">
                <Form.Label>Select Customer:<span style={{ color: "red" }}>*</span></Form.Label>
                <div className="relative">
                  <Form.Select
                    className={`w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl ${customerError ? 'border-red-500' : ''}`}
                    aria-label="Select Customer"
                    name="customer"
                    onChange={handleCustomerChange}
                    value={selectedCustomer ? selectedCustomer._id : ""} // Added value to clear form
                  >
                    <option>Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.customer_name}
                      </option>
                    ))}
                  </Form.Select>
                  {customerError && <span className="text-red-500">{customerError}</span>}
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                  value={selectedCustomer ? selectedCustomer.email : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Contact Number"
                  id="number"
                  value={selectedCustomer ? selectedCustomer.contact : ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Number Of Guests</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Guest"
                  value={selectedCustomer ? selectedCustomer.guest_quantity : ""}
                  id="guest"
                  readOnly // Added readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Venue"
                  id="Venue"
                  value={selectedCustomer ? selectedCustomer.event_venue : ""}
                  readOnly // Added readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  id="address"
                  value={selectedCustomer ? selectedCustomer.address : ""}
                  readOnly // Added readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Status"
                  id="status"
                  value={selectedCustomer ? selectedCustomer.status : ""}
                  readOnly // Added readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Event Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Event Date"
                  id="eventdate"
                  value={selectedCustomer ? selectedCustomer.event_date : ""}
                  readOnly // Added readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <Form.Group controlId="SelectEventType">
                <Form.Label>Event Type:<span style={{ color: "red" }}>*</span></Form.Label>
                <div className="relative">
                  <Form.Select
                    className={`w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 ${eventTypeError ? 'border-red-500' : ''}`}
                    aria-label="Select EventType"
                    name="eventType"
                    onChange={handleEventTypeChange}
                    value={selectedEventType} // Added value to clear form
                  >
                    <option>Select Event Type</option>
                    <option>Family Function</option>
                    <option>Wedding</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </Form.Select>
                  {eventTypeError && <span className="text-red-500">{eventTypeError}</span>}
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="subVenue">Sub Venue</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Sub Venue"
                  id="subVenue"
                  value={subVenue}
                  onChange={(e) => setSubVenue(e.target.value)}
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Budget"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <Button onClick={handleSubmit} className="manager-btn ms-1">
                Save Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewEvent;
