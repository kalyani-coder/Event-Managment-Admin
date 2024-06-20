import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form } from "react-bootstrap";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [selectedEventNameDetails, setSelectedEventNameDetails] = useState(null);

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
          if (response.data && response.data.requirements && response.data.requirements.length > 0) {
            setSelectedEventDetails(response.data);
            setSelectedEventNameDetails(null); // Clear event name details if event date is selected
          } else {
            setSelectedEventDetails(null);
            window.alert("Details are not available for the selected event date.");
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          setSelectedEventDetails(null);
          window.alert("Details are not available for the selected event date.");
        }
      }
    };

    fetchEventDetails();
  }, [eventDate]);

  useEffect(() => {
    const fetchEventNameDetails = async () => {
      if (selectedEvent) {
        try {
          const response = await axios.get(`http://localhost:8888/api/quotationinfo/eventname/${selectedEvent}`);
          console.log("Event Name Details Response:", response.data);
          if (response.data && response.data.requirements && response.data.requirements.length > 0) {
            setSelectedEventNameDetails(response.data);
            setSelectedEventDetails(null); // Clear event date details if event name is selected
          } else {
            setSelectedEventNameDetails(null);
            window.alert("Details are not available for the selected event name.");
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          setSelectedEventNameDetails(null);
          window.alert("Details are not available for the selected event name.");
        }
      }
    };

    fetchEventNameDetails();
  }, [selectedEvent]);

  const handleEventDateChange = (event) => {
    const date = event.target.value;
    setEventDate(date);
    setSelectedEvent(""); // Clear selected event name if event date is selected
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
    setEventDate(""); // Clear selected event date if event name is selected
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                    value={selectedEvent}
                  >
                    <option value="">Select Event</option>
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
                    value={eventDate}
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
                    <th>Event Name</th>
                    {/* <th>Date</th> */}
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
                      <td>{selectedEventDetails.event_name}</td>
                      {/* <td>{formatDate(eventDate)}</td>  */}
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
          {selectedEventNameDetails && (
            <div className="mt-4">
              <table className="table table-bordered bg-white">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th>Sr. No</th>
                    <th>Event Name</th>
                    {/* <th>Date</th> */}
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
                  {selectedEventNameDetails.requirements.map((req, index) => (
                    <tr key={req._id}>
                      <td>{index + 1}</td>
                      <td>{selectedEventNameDetails.event_name}</td>
                      {/* <td>{formatDate(selectedEventNameDetails.date)}</td>  */}
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
