import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import {Form} from "react-bootstrap"

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

  const initialFormData = {
    fname: "",
    lname: "",
    event_name: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    bankaccount: "",
    // salary: '',
    paid_amt: "",
    advance_payment: "",
    rem_amt: "",
    description: "",
    selectedVendor: "",
    selectedEvent: "", // Add a new field for selected event
    eventName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch the list of vendors when the component mounts
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vendor");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []); // Empty dependency array to run the effect only once

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVendorChange = async (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedVendor: value,
      selectedEvent: "", // Reset selected event when vendor changes
    }));

    // Fetch vendor details based on the selected vendor
    try {
      const response = await axios.get(
        `http://localhost:5000/api/addvendor?Vendor_Name=${value}`
      );
      const vendorDetails = response.data[0];
      setFormData((prevData) => ({
        ...prevData,
        fname: vendorDetails.contact_person_name,
        // Add other fields as needed based on the vendor details
      }));
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }

    // Fetch events based on the selected vendor
    try {
      const response = await axios.get(
        `http://localhost:5000/api/eventeventName?Vendor_Name=${value}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedEvent: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://eventmanagement-admin-hocm.onrender.com/api/vendorpayment",
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

  const [managerName, setManagerName] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/addvendor");
        setManagerName(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="container">
        <form className="order p-4 " onSubmit={handleSubmit}>
          <h2>Vendor Payment</h2>
          <div className="form-group">
            <label htmlFor="selectedVendor">Select Vendor</label>
            <Form.Group controlId="SelectCustomer">
              <Form.Label>Select Manager:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                  aria-label="Select Customer"
                  name="customer"
                >
                  <option>Select Manager</option>
                  {managerName.map((manager) => (
                    <option key={manager.id} value={manager.Vendor_Name}>
                      {manager.Vendor_Name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </div>
          <div className="form-group">
            <label htmlFor="selectedEvent">Event Name</label>
            <select
              className="form-control mb-2"
              name="selectedEvent"
              onChange={handleEventChange}
              value={formData.selectedEvent}
              required
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event.eventName} value={event.eventName}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="form-group">
                        <label htmlFor="fname">Name<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="fname"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={`${formData.fname} ${formData.lname}`}
                            required
                        />
                    </div> */}

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
          <div className="form-group">
            <label htmlFor="rem_amt">Remaining Amount</label>
            <input
              className="form-control mb-2"
              type="text"
              name="rem_amt"
              placeholder="Remaining Amount"
              onChange={handleChange}
              value={formData.rem_amt}
            />
          </div>
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
          <button
            className="btn btn-secondary mr-2 action1-btn"
            type="button"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="btn btn-primary action-btn"
            onClick={handleSubmit}
            type="submit"
          >
            Save
          </button>
        </form>

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
