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
        "http://localhost:5000/api/event",
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
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter Company Name"
                value={company_name}
                onChange={(e) => setcompany_name(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control text-center"
                placeholder="Enter Contact Number"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                value={event_type}
                onChange={(e) => setevent_type(e.target.value)}
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
                value={venue}
                onChange={(e) => setvenue(e.target.value)}
                className="form-control"
                placeholder="Venue"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={subvenue}
                onChange={(e) => setsubvenue(e.target.value)}
                className="form-control"
                placeholder="Sub Venue"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={guest_number}
                onChange={(e) => setguest_number(e.target.value)}
                className="form-control"
                placeholder="Number of Guests"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={budget}
                onChange={(e) => setbudget(e.target.value)}
                className="form-control"
                placeholder="budget (optional)"
              />
            </div>
            <div className="form-group">
              <input
                type="Date"
                value={event_date}
                onChange={(e) => setevent_date(e.target.value)}
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
