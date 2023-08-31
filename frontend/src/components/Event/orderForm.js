import React, { useState } from "react";

const OrderForm = () => {
  const [eventName, setEventName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [advancePayment, setAdvancePayment] = useState(0);
  const [paymentRemaining, setPaymentRemaining] = useState(0);

  const handleAssignToManager = () => {
    console.log("Assigned to manager");
  };

  return (
    <div className="container mt-5">
      <h1>Create Order For Manager </h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
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
            value={advancePayment}
            onChange={(e) => setAdvancePayment(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Remaining</label>
          <input
            type="number"
            className="form-control"
            value={paymentRemaining}
            onChange={(e) => setPaymentRemaining(parseFloat(e.target.value))}
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
