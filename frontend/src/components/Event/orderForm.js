import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";

const OrderForm = () => {
  // State variables for form input fields
  const [eventName, setEventName] = useState("");
  const [customer_name, setcustomer_name] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [adv_payment, setadv_payment] = useState(0);
  const [rem_payment, setrem_payment] = useState(0);
  const [total_amt, setTotalAmt] = useState(0); // New state for total_amt

  // State variables for event list and selected event
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to reset the form
  const resetForm = () => {
    setEventName("");
    setcustomer_name("");
    setContact("");
    setEmail("");
    setDate("");
    setTime("");
    setVenue("");
    setadv_payment(0);
    setrem_payment(0);
    setTotalAmt(0); // Reset total_amt
  };

  // Function to fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/event");
      if (response.ok) {
        const data = await response.json();
        setEventList(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  // UseEffect hook to fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to handle the selection of an event
  const handleEventSelection = (selectedEventName) => {
    const selectedEvent = eventList.find(
      (event) => event.eventName === selectedEventName
    );

    if (selectedEvent) {
      setcustomer_name(selectedEvent.fname);
      setContact(selectedEvent.contact);
      setEmail(selectedEvent.email);
      setVenue(selectedEvent.venue);
      setTotalAmt(selectedEvent.budget || 0);
    } else {
      setcustomer_name("");
      setContact("");
      setEmail("");
      setVenue("");
      setTotalAmt(0);
    }

    setSelectedEvent(selectedEvent);
  };

  // Function to handle assigning the order to a manager
  const handleAssignToManager = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: selectedEvent ? selectedEvent.eventName : "",
          customer_name,
          contact,
          email,
          date,
          time,
          venue,
          adv_payment,
          rem_payment,
          total_amt, // Include total_amt in the request body
        }),
      });

      if (response.ok) {
        alert("Order assigned to manager successfully");
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Failed to assign order to manager:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h1>Create Order For Manager</h1>
        <form>
          <div className="form-group">
            <label htmlFor="eventname" className="form-label">
              Event Name:
            </label>
            <select
              className="form-control-cust-inq-input"
              id="eventname"
              name="eventname"
              onChange={(e) => handleEventSelection(e.target.value)}
              value={selectedEvent ? selectedEvent.eventName : ""}
            >
              <option value="">Select Event</option>
              {eventList.map((event) => (
                <option key={event.id} value={event.eventName}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customer_name}
              onChange={(e) => setcustomer_name(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="tel"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Venue</label>
            <input
              type="text"
              className="form-control"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Advance Payment</label>
            <input
              type="number"
              className="form-control"
              value={adv_payment}
              onChange={(e) => setadv_payment(parseFloat(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Remaining</label>
            <input
              type="number"
              className="form-control"
              value={rem_payment}
              onChange={(e) => setrem_payment(parseFloat(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={total_amt}
              onChange={(e) => setTotalAmt(parseFloat(e.target.value))}
            />
          </div>

          <button
            className="btn btn-success my-5"
            onClick={handleAssignToManager}
          >
            Assign to Manager
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
