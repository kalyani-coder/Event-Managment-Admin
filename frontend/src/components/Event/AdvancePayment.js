import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdvancePaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const eventData = location.state;
  const [eventName, setEventName] = useState(eventData.eventName);
  const [customerName, setCustomerName] = useState(eventData.fname);
  const [totalAmount, setTotalAmount] = useState(eventData.budget);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const [transactionId, setTransactionId] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState(getCurrentDate());
  const [transactionTime, setTransactionTime] = useState(getCurrentTime());
  const [paymentMethod, setPaymentMethod] = useState("upi"); // Default to UPI
  const [cashRecipientName, setCashRecipientName] = useState("");
  const [chequeRecipientName, setChequeRecipientName] = useState("");
  const [receiptFile, setReceiptFile] = useState(null); // To store the uploaded receipt file

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
      paymentMethod,
      cashRecipientName,
      receiptFile,
    };

    navigate("/orderform");

    console.log("Order Details:", orderDetails);
  };

  // Function to handle file input change and store the selected file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceiptFile(file);
  };

  // Function to render payment method-specific input fields
  const renderPaymentMethodFields = () => {
    if (paymentMethod === "upi") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">UPI ID:</label>
            <input
              type="text"
              className="form-control"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
        </>
      );
    } else if (paymentMethod === "cheque") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Cheque Number:</label>
            <input
              type="text"
              className="form-control"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted cheque:</label>
            <input
              type="text"
              className="form-control"
              value={chequeRecipientName}
              onChange={(e) => setChequeRecipientName(e.target.value)}
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
        </>
      );
    } else if (paymentMethod === "cash") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted Cash:</label>
            <input
              type="text"
              className="form-control"
              value={cashRecipientName}
              onChange={(e) => setCashRecipientName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Receipt:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </>
      );
    } else {
      // Default case: netbanking
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
        </>
      );
    }
  };

  // Function to get the current date in "YYYY-MM-DD" format
  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  // Function to get the current time in "HH:MM" format
  function getCurrentTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Advance Payment Form</h2>
      <div className="mb-3">
        <label className="form-label">Event Name:</label>
        <input type="text" className="form-control" value={eventName} disabled />
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
        <input type="number" className="form-control" value={remainingAmount} readOnly />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Method:</label>
        <select
          className="form-control"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="upi">UPI</option>
          <option value="cheque">Cheque</option>
          <option value="cash">Cash</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>
      {renderPaymentMethodFields()}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transaction Details</h5>
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
        Create Order for Manager
      </button>
    </div>
  );
}

export default AdvancePaymentForm;
