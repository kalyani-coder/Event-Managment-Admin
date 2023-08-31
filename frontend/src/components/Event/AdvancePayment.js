import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdvancePaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const eventData = location.state;
  const [eventName, setEventName] = useState(eventData.eventName);
  const [customerName, setCustomerName] = useState(eventData.fullName);
  const [totalAmount, setTotalAmount] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const [transactionId, setTransactionId] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  console.log(eventData);
  useEffect(() => {
    setRemainingAmount(totalAmount - advancePayment);
  }, [totalAmount, advancePayment]);

  const handleCreateOrder = () => {
    const orderDetails = {
      eventName,
      customerName,
      totalAmount,
      advancePayment,
      remainingAmount,
      transactionId,
      utrNumber,
      transactionDate,
      transactionTime,
    };

    navigate("/orderform");

    console.log("Order Details:", orderDetails);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Advance Payment Form</h2>
      <div className="mb-3">
        <label className="form-label">Event Name:</label>
        <input
          type="text"
          className="form-control"
          value={eventName}
          disabled
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Customer Name:</label>
        <input
          type="text"
          className="form-control"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Total Amount:</label>
        <input
          type="number"
          className="form-control"
          value={totalAmount}
          onChange={(e) => setTotalAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Advance Payment:</label>
        <input
          type="number"
          className="form-control"
          value={advancePayment}
          onChange={(e) => setAdvancePayment(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Remaining Amount:</label>
        <input
          type="number"
          className="form-control"
          value={remainingAmount}
          readOnly
        />
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transaction Details</h5>
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">UTR Number / RTGS ID:</label>
            <input
              type="text"
              className="form-control"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Transaction:</label>
            <input
              type="date"
              className="form-control"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time of Transaction:</label>
            <input
              type="time"
              className="form-control"
              value={transactionTime}
              onChange={(e) => setTransactionTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-info my-5" onClick={handleCreateOrder}>
        Create Order for manager
      </button>
    </div>
  );
}

export default AdvancePaymentForm;
