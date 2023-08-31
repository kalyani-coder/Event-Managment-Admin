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
        "http://localhost:5000/api/enquiries",
        formData
      );
      if (res.status === 200) {
        alert("Enquiry Submitted Successfully");
      } else {
        alert("something went wrong ");
      }
    } catch (e) {
      alert(`Error ${e}`);
    }
  };

  return (
    <div className="container">
      <div className="card-1">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card-body mt-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  placeholder="Event name"
                  value={formData.eventName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  placeholder="Customer Name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="customerEmail"
                  placeholder="Customer Email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  name="customerAddress"
                  placeholder="Customer Address"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  name="eventDate"
                  placeholder="Event date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="numberOfGuests"
                  placeholder="Number of Guests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="eventVenue"
                  placeholder="Event Venue"
                  value={formData.eventVenue}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  name="eventRequirement"
                  placeholder="Event management requirement"
                  value={formData.eventRequirement}
                  onChange={handleInputChange}
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
