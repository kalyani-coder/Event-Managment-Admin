import axios from "axios";
import React, { useState } from "react";

export default function Enquiry() {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  const [formData, setFormData] = useState({
    title: "",
    event_name: "",
    customer_name: "",
    email: "",
    contact: "",
    address: "",
    event_date: getCurrentDate(),// Default to an empty string for initial value
    guest_quantity: "",
    event_venue: "",
    event_requirement: "",
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

    // Get the current date and time
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString();

    // Update the formData state with the current date and time
    setFormData((prevData) => ({
      ...prevData,
      event_date: currentDateTime, // assuming you want to set the current date and time to the 'event_date' field
    }));

    try {
      const res = await axios.post(
        "https://eventmanagement-admin-hocm.onrender.com/api/enquiry",
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
                <label htmlFor="event_name">
                  Event Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="event_name"
                  id="event_name"
                  placeholder="Event name"
                  value={formData.event_name}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="customer_name">
                  Customer Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_name"
                  id="customer_name"
                  placeholder="Customer Name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Customer Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Customer Email"
                  value={formData.email}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">
                  Contact Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="contact"
                  id="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Customer Address
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  id="address"
                  placeholder="Customer Address"
                  value={formData.address}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="event_date">
                  Event Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="event_date"
                  id="event_date"
                  placeholder="Event date"
                  value={formData.event_date}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="guest_quantity">
                  Estimated Number of Guests
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="guest_quantity"
                  id="guest_quantity"
                  placeholder=" Estimated Number of  Guests"
                  value={formData.guest_quantity}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="event_venue">
                  Event Venue
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="event_venue"
                  id="event_venue"
                  placeholder="Event Venue"
                  value={formData.event_venue}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="event_requirement">
                  Event Management Requirement{" "}

                </label>
                <textarea
                  className="form-control"
                  name="event_requirement"
                  id="event_requirement"
                  placeholder="Event management requirement"
                  value={formData.event_requirement}
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
