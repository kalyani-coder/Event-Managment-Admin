import React, { useState, useEffect } from "react";

const OrderForm = () => {
  const [eventName, setEventName] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [adv_payment, setAdvPayment] = useState(0);
  const [rem_payment, setRemPayment] = useState(0);
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const resetForm = () => {
    setEventName("");
    setCustomerName("");
    setContact("");
    setEmail("");
    setDate("");
    setTime("");
    setVenue("");
    setAdvPayment(0);
    setRemPayment(0);
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/event');
      if (response.ok) {
        const data = await response.json();
        setEventList(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleAssignToManager = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order", {
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
        }),
      });

      if (response.ok) {
        alert("Order assigned to manager successfully");
        resetForm(); // Reset the form after successful assignment
      } else {
        const errorData = await response.json();
        console.error("Failed to assign order to manager:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
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
            onChange={(e) => {
              const selectedEvent = eventList.find(
                (event) => event.eventName === e.target.value
              );
              setSelectedEvent(selectedEvent);
            }}
            value={selectedEvent ? selectedEvent.eventName : ''}
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
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            type="text"
            className="form-control"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Advance Payment</label>
          <input
            type="number"
            className="form-control"
            value={adv_payment}
            onChange={(e) => setAdvPayment(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Remaining</label>
          <input
            type="number"
            className="form-control"
            value={rem_payment}
            onChange={(e) => setRemPayment(parseFloat(e.target.value))}
            required
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
  );
};

export default OrderForm;
