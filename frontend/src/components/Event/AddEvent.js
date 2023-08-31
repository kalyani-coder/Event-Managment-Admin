import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [eventType, setEventType] = useState("Family Function");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [subVenue, setSubVenue] = useState("");
  const [numOfGuests, setNumOfGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const navigate = useNavigate();
  const handleSave = () => {
    const eventData = {
      eventName,
      fullName,
      companyName,
      email,
      contactNumber,
      eventType,
      selectedVenue,
      subVenue,
      numOfGuests,
      budget,
      currentDate,
      currentTime,
    };

    console.log(eventData);
    navigate("/advancepayment", { state: eventData });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-body mt-5">
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter event name "
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control text-center"
                placeholder="Enter Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="form-control"
              >
                <option value="Family Function">Family Function</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Wedding">Wedding</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="form-control"
                placeholder="Venue"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={subVenue}
                onChange={(e) => setSubVenue(e.target.value)}
                className="form-control"
                placeholder="Sub Venue"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={numOfGuests}
                onChange={(e) => setNumOfGuests(e.target.value)}
                className="form-control"
                placeholder="Number of Guests"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="form-control"
                placeholder="Budget (optional)"
              />
            </div>
            <div className="form-group">
              <input
                type="Date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="form-control"
                placeholder="date"
              />
            </div>
            <div className="form-group">
              <input
                type="time"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                className="form-control"
                placeholder="time"
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
                fill Advance Payment form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
