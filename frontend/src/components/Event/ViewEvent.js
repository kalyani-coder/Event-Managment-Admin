import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { format } from "date-fns";
import axios from "axios";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import './EventDetails.css'; // Import your CSS file

const EventDetails = ({ routes }) => {
  const [eventData, setEventData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/event")
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  const handleViewMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);
  const handleStartDateChange = (e) => setDateRange({ ...dateRange, startDate: e.target.value });
  const handleEndDateChange = (e) => setDateRange({ ...dateRange, endDate: e.target.value });

  const closePopup = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const exportToExcel = () => {
    const sheetData = eventData.map((event) => ({
      Name: event.fname,
      Company: event.company_name,
      Event: event.eventName,
      Venue: event.venue,
      Subvenue: event.subvenue,
      "Event Date": event.event_date,
      "Guest Number": event.guest_number,
      Budget: `Rs.${event.budget}`,
      Date: event.event_date,
      Time: event.currentTime,
    }));

    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EventDetailsSheet");
    XLSX.writeFile(wb, "EventDetails.xlsx");
  };

  // Sorting events by date in descending order (latest first)
  const sortedEvents = eventData.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

  const filteredEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.event_date);
    const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
    const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

    if (startDate && endDate) {
      if (eventDate < startDate || eventDate > endDate) return false;
    } else if (startDate) {
      if (eventDate < startDate) return false;
    } else if (endDate) {
      if (eventDate > endDate) return false;
    }

    const searchTermLower = searchTerm.toLowerCase();
    return (
      (event.fname && event.fname.toLowerCase().includes(searchTermLower)) ||
      (event.eventName && event.eventName.toLowerCase().includes(searchTermLower)) ||
      (event.managerName && event.managerName.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="filter-container">
            <input 
              type="text" 
              style={{width:"450px"}} 
              placeholder="Search by customer name, event name, or manager name" 
              value={searchTerm} 
              onChange={handleSearchInputChange} 
            />
            <span className="ml-16">Start date:</span> 
            <input 
              type="date" 
              value={dateRange.startDate} 
              onChange={handleStartDateChange} 
            />
            <span>End date:</span>
            <input 
              type="date" 
              value={dateRange.endDate} 
              onChange={handleEndDateChange} 
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl">View Events</h2>
            <button className="export-button-viewevents" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Manager Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.fname}</td>
                    <td>{event.eventName}</td>
                    <td>{event.managerName}</td>
                    <td>{event.event_date ? format(new Date(event.event_date), "dd/MM/yyyy") : ""}</td>
                    <td>{event.contact}</td>
                    <td>
                      <button className="button-view" onClick={() => handleViewMore(event)}>
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {selectedEvent && (
              <Modal
                show={showModal}
                onHide={closePopup}
                dialogClassName="modal-dialog-centered modal-dialog-responsive"
              >
                <Modal.Header>
                  <button className="header-close-button-popup" onClick={closePopup}>
                    &times;
                  </button>
                  <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <h2>{selectedEvent.eventName}</h2>
                    <p style={{ lineHeight: "35px" }}>
                      Customer Name: {selectedEvent.fname}
                      <br />
                      Event Date: {selectedEvent.event_date ? format(new Date(selectedEvent.event_date), "dd/MM/yyyy") : ""}
                      <br />
                      Number of Estimated Guests: {selectedEvent.guest_number}
                      <br />
                      Event Venue: {selectedEvent.venue}
                      <br />
                      Subvenue: {selectedEvent.subvenue}
                      <br />
                      Event Type: {selectedEvent.event_type}
                      <br />
                      Customer Email: {selectedEvent.email}
                      <br />
                      Contact Number: {selectedEvent.contact}
                      <br />
                      Event Address: {selectedEvent.address}
                      <br />
                      Budget: Rs.{selectedEvent.budget}
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "none" }}>
                  <button className="close-button-popup" onClick={closePopup}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
