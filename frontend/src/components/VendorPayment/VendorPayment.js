import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { Form } from "react-bootstrap";

const VendorPayment = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const calculateRemainingAmount = (paidAmt, advancePayment) => {
    return paidAmt - advancePayment;
  };

  const initialFormData = {
    fname: "",
    // lname: "",
    event_name: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    bankaccount: "",
    paid_amt: "",
    advance_payment: "",
    rem_amt: "",
    description: "",
     selectedVendor: "",
     selectedEvent: "",
    // eventName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  //fetching vendors from addvendor
  useEffect(() => {https://eventmanagement-admin-hocm.onrender.com
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/addvendor");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  //fetching events from from selected event
  useEffect(() => {
    const fetchEventsForVendor = async () => {
      try {
        if (formData.selectedVendor) {
          const response = await axios.get(`http://localhost:5000/api/event?eventName=${formData.selectedVendor}`);
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events for vendor:", error);
      }
    };

    fetchEventsForVendor();
  }, [formData.selectedVendor]);

  const hhttps://eventmanagement-admin-hocm.onrender.com => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVendorChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedVendor: value,
      selectedEvent: "",
    }));
  };https://eventmanagement-admin-hocm.onrender.com

  const handleEventChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedEvent: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData); // Log form data to console

    try {
      const response = await axios.post(
        "http://localhost:5000/api/vendorpayment",
        formData
      );

      if (response.status === 200) {
        setShowPopup(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <form className="order p-4 " onSubmit={handleSubmit}>
          <h2>Vendor Payment</h2>
          {/* Vendor Selection */}
          <div className="form-group">
            <Form.Group controlId="SelectVendor">
              <Form.Label>Select Vendor:</https://eventmanagement-admin-hocm.onrender.com
              <div className="relative">
                <Form.Select
                  className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                  aria-label="Select Vendor"
                  name="selectedVendor"
                  onChange={handleVendorChange}
                  value={formData.selectedVendor}
                >
                  <option>Select Vendor</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.Vendor_Name} value={vendor.Vendor_Name}>
                      {vendor.Vendor_Name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </div>
          {/* Event Selection */}
          <div className="form-group">
            <label htmlFor="selectedEvent">Event Name</label>
            <select
              className="form-control mb-2"
              name="selectedEvent"
              onChange={handleEventChange}
              value={formData.selectedEvent}
              required
            >
              <option value="">Select event</option>
              {events.map((event) => (
                <option key={event._id} value={event.eventName}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>
          {/* Date and Time */}
          <div className="row mb-2">
            <div className="col">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  className="form-control"
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={formData.time}
                />
              </div>
            </div>
          </div>
          {/* Bank Account */}
          <div className="form-group">
            <label htmlFor="bankaccount">Bank Account</label>
            <input
              className="form-control mb-2"
              type="text"
              name="bankaccount"
              placeholder="Bank Account"
              onChange={handleChange}
              value={formData.bankaccount}
            />
          </div>
          {/* Paid Amount */}
          <div className="form-group">
            <label htmlFor="paid_amt">Paid Amount</label>
            <input
              className="form-control mb-2"
              type="text"
              name="paid_amt"
              placeholder="Paid Amount"
              onChange={handleChange}
              value={formData.paid_amt}
            />
          </div>
          {/* Advance Payment */}
          <div className="form-group">
            <label htmlFor="advance_payment">Advance Payment</label>
            <input
              className="form-control mb-2"
              type="text"
              name="advance_payment"
              placeholder="Advance Payment"
              onChange={handleChange}
              value={formData.advance_payment}
            />
          </div>
          {/* Remaining Amount */}
          <div className="form-group">
            <label htmlFor="rem_amt">Pending Amount</label>
            <input
              className="form-control mb-2"
              type="text"
              name="rem_amt"
              placeholder="Remaining Amount"
              value={calculateRemainingAmount(formData.paid_amt, formData.advance_payment)}
              readOnly
            />
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              className="form-control mb-2"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          {/* Discard and Save buttons */}
          <button
            className="btn btn-secondary mr-2 action1-btn"
            type="button"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="btn btn-primary action-btn"
            type="submit"
          >
            Save
          </button>
        </form>
        {/* Popup for successful data saving */}
        {showPopup && (
          <div className="alert alert-success mt-3">
            Data saved successfully!
            <button type="button" className="close" onClick={handlePopupClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorPayment;
