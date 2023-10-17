import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [fname, setfname] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [event_type, setevent_type] = useState("Family Function");
  const [venue, setvenue] = useState("");
  const [subvenue, setsubvenue] = useState("");
  const [guest_number, setguest_number] = useState("");
  const [budget, setbudget] = useState("");
  const [event_date, setevent_date] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const navigate = useNavigate();
  const handleSave = async () => {
    const eventData = {
      eventName,
      fname,
      company_name,
      email,
      contact,
      event_type,
      venue,
      subvenue,
      guest_number,
      budget,
      event_date,
      currentTime,
    };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "https://eventmanagement-admin-hocm.onrender.com/api/event",
        eventData
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Event data posted successfully!");
        // If you want to navigate to another page after posting data, you can do it here.
        // For example:
        navigate("/advancepayment", { state: eventData });
      } else {
        console.error("Failed to post event data.");
      }
    } catch (error) {
      console.error("Error posting event data:", error);
    }

    navigate("/advancepayment", { state: eventData });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-body mt-5">
            <h2 className="mb-3">Create Event</h2>
            <div className="form-group">
              <label htmlFor="eventName">
                Event Name:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                id="eventName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">
                Full Name:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                required
                id="fname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Company Name:</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Company Name"
                value={company_name}
                onChange={(e) => setcompany_name(e.target.value)}
                id="company_name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">
                Contact Number:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control "
                placeholder="Enter Contact Number"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                required
                id="contact"
              />
            </div>
            <div className="form-group">
              <label htmlFor="event_type">
                Event Type:<span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={event_type}
                onChange={(e) => setevent_type(e.target.value)}
                className="form-control"
                id="event_type"
              >
                <option value="Family Function">Family Function</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Wedding">Wedding</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="venue">
                Venue:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setvenue(e.target.value)}
                className="form-control"
                placeholder="Venue"
                required
                id="venue"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subvenue">Sub Venue:</label>
              <input
                type="text"
                value={subvenue}
                onChange={(e) => setsubvenue(e.target.value)}
                className="form-control"
                placeholder="Sub Venue"
                id="subvenue"
              />
            </div>
            <div className="form-group">
              <label htmlFor="guest_number">
                Estimate Number of Guests:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                value={guest_number}
                onChange={(e) => setguest_number(e.target.value)}
                className="form-control"
                placeholder="Estimate Number of Guests"
                required
                id="guest_number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget:</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setbudget(e.target.value)}
                className="form-control"
                placeholder="budget"
                id="budget"
              />
            </div>
            <div className="form-group">
              <label htmlFor="event_date">
                Event Date:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="Date"
                value={event_date}
                onChange={(e) => setevent_date(e.target.value)}
                className="form-control"
                placeholder="date"
                required
                id="event_date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentTime">
                Time:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                className="form-control"
                placeholder="time"
                required
                id="currentTime"
              />
            </div>
            <div className="d-flex justify-content-start">
              <button id="btn" className="btn btn-info" onClick={handleSave}>
                Save
              </button>
              <button
                id="btn"
                className="btn btn-info mx-5"
                onClick={handleSave}
              >
                Fill Advance Payment Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
