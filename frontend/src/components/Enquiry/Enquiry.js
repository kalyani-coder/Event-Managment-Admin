import axios from "axios";
import React, { useState } from "react";

export default function Enquiry() {
  const [formData, setFormData] = useState({
    title: "",
    eventName: "",
    customerName: "",
    customerEmail: "",
    contactNumber: "",
    customerAddress: "",
    eventDate: "",
    numberOfGuests: "",
    eventVenue: "",
    eventRequirement: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/enquiry",
        formData
      );
      if (res.status === 200) {
        alert("Enquiry Submitted Successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  return (
    <div className="container">
      <div className="card-1">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card-body mt-5">
              <div className="form-group">
                <h2>Enquiry</h2>
              </div>

              <div className="form-group">
                <label htmlFor="eventName">
                  Event Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  id="eventName"
                  placeholder="Event name"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerName">
                  Customer Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  id="customerName"
                  placeholder="Customer Name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">
                  Customer Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="customerEmail"
                  id="customerEmail"
                  placeholder="Customer Email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">
                  Contact Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerAddress">
                  Customer Address <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  name="customerAddress"
                  id="customerAddress"
                  placeholder="Customer Address"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventDate">
                  Event Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="eventDate"
                  id="eventDate"
                  placeholder="Event date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfGuests">
                  Estimated Number of Guests <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="numberOfGuests"
                  id="numberOfGuests"
                  placeholder=" Estimated Number of  Guests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventVenue">
                  Event Venue <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="eventVenue"
                  id="eventVenue"
                  placeholder="Event Venue"
                  value={formData.eventVenue}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventRequirement">
                  Event Management Requirement{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  name="eventRequirement"
                  id="eventRequirement"
                  placeholder="Event management requirement"
                  value={formData.eventRequirement}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <button
                  id="btn1"
                  className="btn btn-info"
                  onClick={handleSubmit}
                >
                  Add Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
