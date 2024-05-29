import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";
import Header from "../Sidebar/Header";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const managerData = async () => {
    const managerId = localStorage.getItem("managerId");
    try {
      const response = await fetch(`https://node-backend.macj-abuyerschoice.com/api/event/manager/${managerId}`);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data); // Initialize filteredEvents with the fetched data
    } catch (e) {
      console.error(`Failed to fetch data: ${e}`);
    }
  };

  useEffect(() => {
    managerData();
  }, []);

  useEffect(() => {
    filterData(searchTerm, dateRange.startDate, dateRange.endDate);
  }, [searchTerm, dateRange]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setDateRange((prev) => ({ ...prev, startDate: event.target.value }));
  };

  const handleEndDateChange = (event) => {
    setDateRange((prev) => ({ ...prev, endDate: event.target.value }));
  };

  const filterData = (searchTerm, startDate, endDate) => {
    let filtered = events.filter((event) => {
      const eventName = event.eventName?.toLowerCase() || "";
      const companyName = event.company_name?.toLowerCase() || "";
      const customerName = event.fname?.toLowerCase() || "";

      return (
        eventName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        customerName.includes(searchTerm.toLowerCase())
      );
    });

    if (startDate && endDate) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.event_date);
        return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
      });
    }

    setFilteredEvents(filtered);
  };

  const openPopup = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search Order"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[30px]">View Events</h2>
          </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.fname}</td>
                    <td>{event.event_date ? format(new Date(event.event_date), "dd/MM/yyyy") : ""}</td>
                    <td>{event.contact}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => openPopup(event)}
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedEvent && (
            <Modal
              show={showModal}
              onHide={closePopup}
              dialogClassName="modal-dialog-centered modal-dialog-responsive"
            >
              <Modal.Header closeButton>
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
                    Budget: ${selectedEvent.budget}
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closePopup}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewEvent;
