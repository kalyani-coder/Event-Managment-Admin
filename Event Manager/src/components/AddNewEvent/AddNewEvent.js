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
  const managerId = localStorage.getItem("managerId")



  const handleEventTypeChange = (event) => {
    setSelectedEventType(event.target.value);
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
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };
  // const statusFetch = selectedCustomer.status

  // console.log("vedant",statusFetch)

  const handleSubmit = async () => {
    if (selectedCustomer && selectedEvent && selectedEventType) {
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
          managerId : managerId,

        });
        alert("Event Created successfully");
      } catch (error) {
        console.error("Error submitting event:", error);
        // Handle error, display error message, etc.
      }
    } else {
      console.log("client not found");
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full  h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
        <div className="flex">
          <Link to={'/quotation'}>
          <button className="btn btn-primary mr-4 mb-4">View Enquiry</button>
          </Link>
          {/* <Link to={'/createquotation'}>
          <button className="btn btn-primary mr-4 mb-4">Proposal</button>
          </Link> */}
          <Link to={'/followupstatus'}>
          <button className="btn btn-primary mr-4 mb-4">FollowUp Status</button>
          </Link>
          <Link to={'/viewevent'}>
          <button className="btn btn-primary mr-4 mb-4">View Event</button>
          </Link>
        </div>
          {" "}
          <h2 className="text-[30px]  pl-[1em]">Create Event</h2>
          <div className="row mb-2">
            <div className="col px-5">
              <Form.Group controlId="SelectEvent">
                <Form.Label>Select Event:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300  focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                    aria-label="Select Event"
                    name="event"
                    onChange={handleEventChange}
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
                <Form.Label>Select Customer:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300  focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                    aria-label="Select Customer "
                    name="customer"
                    onChange={handleCustomerChange}
                  >
                    <option>Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.customer_name}
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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control "
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
                  className="form-control "
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
                  className="form-control "
                  placeholder="Enter Guest"
                  value={
                    selectedCustomer ? selectedCustomer.guest_quantity : ""
                  }
                  id="guest"
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="email">Venue</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter Venue"
                  id="Venue"
                  value={selectedCustomer ? selectedCustomer.event_venue : ""}
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
                  className="form-control "
                  placeholder="Enter Address"
                  id="address"
                  value={selectedCustomer ? selectedCustomer.address : ""}
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="status">status</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="status"
                  id="status"
                  value={selectedCustomer ? selectedCustomer.status : ""}
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
                  className="form-control "
                  placeholder="Enter Event Date"
                  id="eventdate"
                  value={selectedCustomer ? selectedCustomer.event_date : ""}
                />
              </div>
            </div>
            <div className="col px-5">
              <Form.Group controlId="SelectEventType">
                <Form.Label>Event Type:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                    aria-label="Select EventType"
                    name="eventType"
                    onChange={handleEventTypeChange}
                  >
                    <option>Select Event Type</option>
                    <option>Family Function</option>
                    <option>Wedding</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </Form.Select>
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
                  className="form-control "
                  placeholder="Enter Sub Venue"
                  id="subVenue"
                  value={subVenue}
                  onChange={(e) => setSubVenue(e.target.value)}
                />
              </div>
            </div>
            <div className="col px-5">
              {/* Input field for budget */}
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="text"
                  className="form-control "
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
