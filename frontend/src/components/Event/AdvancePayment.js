import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AdvPaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const eventData = location.state;
  const [event_name, setEventName] = useState(eventData.event_name);
  const [client_name, setClientName] = useState(eventData.fname);
  const [amount, setAmount] = useState(eventData.budget);
  const [adv_payment, setAdvPayment] = useState(0);
  const [rem_payment, setRemPayment] = useState(0);
  const [UPI_id, setUPI_id] = useState("");
  const [cheque_no, setChequeNo] = useState("");
  const [utr_no, setUtrNo] = useState("");
  const [payment_date, setPaymentDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());
  const [payment_method, setPaymentMethod] = useState("upi");
  const [cash_reciever, setCashReceiver] = useState("");
  const [check_reciever, setCheckReceiver] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  useEffect(() => {
    setRemPayment(amount - adv_payment);
  }, [amount, adv_payment]);

  const handleCreateOrder = async () => {
    const orderDetails = {
      event_name,
      client_name,
      amount,
      adv_payment,
      rem_payment,
      UPI_id,
      cheque_no,
      utr_no,
      payment_date,
      time,
      payment_method,
      cash_reciever,
      check_reciever,
      receiptFile,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/advpayment", orderDetails);
      console.log("Order Details:", orderDetails);
      console.log("API Response:", response.data);
      navigate("/orderform");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceiptFile(file);
  };

  const renderpayment_methodFields = () => {
    if (payment_method === "upi") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">UPI ID:</label>
            <input
              type="text"
              className="form-control"
              value={UPI_id}
              onChange={(e) => setUPI_id(e.target.value)}
            />
          </div>
        </>
      );
    } else if (payment_method === "cheque") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Cheque Number:</label>
            <input
              type="text"
              className="form-control"
              value={cheque_no}
              onChange={(e) => setChequeNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted cheque:</label>
            <input
              type="text"
              className="form-control"
              value={check_reciever}
              onChange={(e) => setCheckReceiver(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">UTR Number / RTGS ID:</label>
            <input
              type="text"
              className="form-control"
              value={utr_no}
              onChange={(e) => setUtrNo(e.target.value)}
            />
          </div>
        </>
      );
    } else if (payment_method === "cash") {
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Name to Whom Submitted Cash:</label>
            <input
              type="text"
              className="form-control"
              value={cash_reciever}
              onChange={(e) => setCashReceiver(e.target.value)}
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
      return (
        <>
          <div className="mb-3">
            <label className="form-label">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              value={cheque_no}
              onChange={(e) => setChequeNo(e.target.value)}
            />
          </div>
        </>
      );
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function getCurrentTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  const handleSave = () => {
    // Trigger the handleCreateOrder function when the "Save" button is clicked
    handleCreateOrder();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Advance Payment Form</h2>
      <div className="mb-3">
        <label className="form-label">Event Name:</label>
        <input type="text" className="form-control" value={event_name} disabled />
      </div>
      <div className="mb-3">
        <label className="form-label">Customer Name:</label>
        <input
          type="text"
          className="form-control"
          value={client_name}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Total Amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Advance Payment:</label>
        <input
          type="number"
          className="form-control"
          value={adv_payment}
          onChange={(e) => setAdvPayment(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Remaining Amount:</label>
        <input type="number" className="form-control" value={rem_payment} readOnly />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Method:</label>
        <select
          className="form-control"
          value={payment_method}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="upi">UPI</option>
          <option value="cheque">Cheque</option>
          <option value="cash">Cash</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>
      {renderpayment_methodFields()}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transaction Details</h5>
          <div className="mb-3">
            <label className="form-label">Date of Transaction:</label>
            <input
              type="date"
              className="form-control"
              value={payment_date}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time of Transaction:</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="btn btn-success mx-2" onClick={handleSave}>
        Save
      </button>

      <button className="btn btn-info my-5" onClick={handleCreateOrder}>
        Create Order for Manager
      </button>
    </div>
  );
}

export default AdvPaymentForm;
