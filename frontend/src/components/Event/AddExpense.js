import React, { useState } from "react";

const AddExpense = () => {
  const [event_id, setEventId] = useState("");
  const [new_purchase, setNewPurchase] = useState("");
  const [to_vendor, setToVendor] = useState("");
  const [event_name, setEventName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleShow = () => {
    if (event_id) {
      window.location.href = `/expenses-list/${event_id}`;
    } else {
      setErrorMessage("Please select an event before showing expenses.");
    }
  };

  const handleAdd = () => {
    if (!new_purchase || !to_vendor || !event_name || !amount || !date) {
      setErrorMessage("All fields are required");
      return;
    }

    const expenseData = {
      event_id,
      new_purchase,
      to_vendor,
      event_name,
      amount,
      date,
    };

    console.log("Data to be posted:", expenseData);

    setSuccessMessage("Expense added successfully");

    setNewPurchase("");
    setToVendor("");
    setEventName("");
    setAmount("");
    setDate("");
    setErrorMessage("");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Expense</h5>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form>
                <div className="form-group">
                  <label className="fw-bold" htmlFor="new_purchase">New Purchase<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={new_purchase}
                    onChange={(e) => setNewPurchase(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="fw-bold" htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="fw-bold" htmlFor="to_vendor">Vendor<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={to_vendor}
                    onChange={(e) => setToVendor(e.target.value)}
                    placeholder="Vendor Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="fw-bold" htmlFor="event_name">Event<span style={{ color: "red" }}>*</span></label>
                  <select
                    value={event_name}
                    onChange={(e) => setEventName(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select an Event</option>
                    <option value="Family Function">Family Function</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="fw-bold" htmlFor="amount">Amount<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleAdd}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn btn-info mx-3"
                  onClick={handleShow}
                >
                  View Expenses
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
