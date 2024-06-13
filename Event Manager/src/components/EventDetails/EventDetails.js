import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button, Table } from "react-bootstrap";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [subVenue, setSubVenue] = useState("");
  const [budget, setBudget] = useState("");
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/enquiry");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setEvents([]); // Default to an empty array if response.data is not an array
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
        setEvents([]); // Default to an empty array in case of error
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventDate) {
        try {
          const response = await axios.get(`http://localhost:8888/api/quotationinfo/event/${eventDate}`);
          console.log("Event Details Response:", response.data);
          setSelectedEventDetails(response.data);
        } catch (error) {
          console.error("Error fetching event details:", error);
          setSelectedEventDetails(null);
        }
      }
    };

    fetchEventDetails();
  }, [eventDate]);

  const handleEventDateChange = (event) => {
    const date = event.target.value;
    setEventDate(date);
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <h2 className="text-[30px] pl-[1em]">Event Details</h2>
          <div className="row mb-2">
            <div className="col px-5">
              <Form.Group controlId="SelectEvent">
                <Form.Label>Select Event:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 rounded-2xl"
                    aria-label="Select Event"
                    name="event"
                    onChange={handleEventChange}
                  >
                    <option>Select Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.event_name}>
                        {event.event_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>
            <div className="col px-5">
              <Form.Group controlId="SelectEventDate">
                <Form.Label>Select Event Date:</Form.Label>
                <div className="relative">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Event Date"
                    id="eventdate"
                    onChange={handleEventDateChange}
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          {selectedEventDetails && (
            <div className="mt-4">
              
              <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                  <tr>
                    <th>Sr. No</th>
                    <th>Stock Name</th>
                    <th>Vendor Name</th>
                    <th>Purchase Quantity</th>
                    <th>Rate</th>
                    <th>Unit</th>
                    <th>Days</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEventDetails.requirements.map((req, index) => (
                    <tr key={req._id}>
                      <td>{index + 1}</td>
                      <td>{req.stockName}</td>
                      <td>{req.vendorName}</td>
                      <td>{req.purchaseQuantity}</td>
                      <td>{req.rate_per_days}</td>
                      <td>{req.unit}</td>
                      <td>{req.days}</td>
                      <td>{req.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default EventDetails;
