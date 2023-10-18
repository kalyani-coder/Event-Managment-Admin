import React, { useState } from "react";

const OrderForm = () => {
  const [eventName, setEventName] = useState("");
  const [customer_name, setcustomer_name] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [adv_payment, setadv_payment] = useState(0);
  const [rem_payment, setrem_payment] = useState(0);

  const resetForm = () => {
    setEventName("");
    setcustomer_name("");
    setcontact("");
    setemail("");
    setDate("");
    setTime("");
    setVenue("");
    setadv_payment(0);
    setrem_payment(0);
  };

  const handleAssignToManager = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
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
        console.error("Failed to assign order to manager");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Order For Manager</h1>
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
            value={customer_name}
            onChange={(e) => setcustomer_name(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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

        {/* <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div> */}

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
            onChange={(e) => setadv_payment(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Remaining</label>
          <input
            type="number"
            className="form-control"
            value={rem_payment}
            onChange={(e) => setrem_payment(parseFloat(e.target.value))}
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
