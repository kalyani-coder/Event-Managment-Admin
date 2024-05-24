import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Header from "../Sidebar/Header";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


// const [newManagerData, setManagerData] = useState([]);
// console.log("aish", newManagerData);
// const managerData = async () => {
//   const getManagerId = localStorage.getItem("managerId");
//   try {
//     const response = await fetch(
//       `http://localhost:5000/api/event/manager/${getManagerId}`
//     );
//     const data = await response.json();
//     setManagerData(data);
//   } catch (e) {
//     console.log(`data not been get ${e}`);
//   }
// };
// useEffect(() => {
//   managerData();
// });

const [newManagerData, setManagerData]=useState([])
console.log("aish",newManagerData)
const managerData = async () => {
  const getManagerId = localStorage.getItem("managerId");
  try{
    const response = await fetch(`http://localhost:5000/api/event/manager/${getManagerId}`);
    const data = await response.json();
    setManagerData(data);
    }catch(e){
      console.log('data not been get ${e}');
      }
  };
  useEffect(() => {managerData();
  });


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value, dateRange.startDate, dateRange.endDate);
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setDateRange((prev) => ({ ...prev, startDate: newStartDate }));
    filterData(searchTerm, newStartDate, dateRange.endDate);
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setDateRange((prev) => ({ ...prev, endDate: newEndDate }));
    filterData(searchTerm, dateRange.startDate, newEndDate);
  };

  const filterData = (searchTerm, startDate, endDate) => {
    let filtered = events.filter((event) => {
      const eventName = event.eventName ? event.eventName.toLowerCase() : "";
      const companyName = event.company_name
        ? event.company_name.toLowerCase()
        : "";
      const customerName = event.fname ? event.fname.toLowerCase() : "";

      return (
        eventName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        customerName.includes(searchTerm.toLowerCase())
      );
    });

    if (startDate && endDate) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
        );
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
                {newManagerData.length > 0 && (
                  <tbody style={{ background: "white", borderRadius: "10px" }}>
                    {newManagerData.map((event) => (
                      <tr key={event._id}>
                        <td>{event.fname}</td>
                        <td>
                          {event.event_date
                            ? format(new Date(event.event_date), "dd/MM/yyyy")
                            : ""}
                        </td>
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
                )}
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
                <Modal.Header closeButton>
                  <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedEvent && (
                    <div>
                      <h2>{selectedEvent.eventName}</h2>
                      <p style={{ lineHeight: "35px" }}>
                        Customer Name: {selectedEvent.fname}
                        <br />
                        Event Date:{" "}
                        {selectedEvent.event_date
                          ? format(
                              new Date(selectedEvent.event_date),
                              "dd/MM/yyyy"
                            )
                          : ""}
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
                  )}
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
      </div>
    </>
  );
};

export default ViewEvent;
