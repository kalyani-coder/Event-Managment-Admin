import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';
import Sidebar from "../Sidebar/Sidebar"


const EventDetails = ({ routes }) => {
  const [eventData, setEventData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event")
      .then((response) => {
        setEventData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  const handleViewMore = (event) => {
    navigate(`/event-more-details/${event._id}`);
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
      Budget: `$${event.budget}`,
      Date: event.event_date,
      Time: event.currentTime,
    }));

    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EventDetailsSheet');
    XLSX.writeFile(wb, 'EventDetails.xlsx');
  };


  return (
<>
    <Sidebar />
    <div className="container mt-5">
      <h2 className="mb-4">Event Details</h2>
      <button className="btn btn-success mb-3" onClick={exportToExcel}>
        Export to Excel
      </button>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {eventData
        .filter((event) =>
          event.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((event) => (
          <Card key={event.event_id} style={{ width: "100%", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{event.fname}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Company: {event.company_name}
              </Card.Subtitle>
              <Card.Text>Venue: {event.venue}</Card.Text>
              <Card.Text>Subvenue: {event.subvenue}</Card.Text>
              <Card.Text>Event Date: {event.event_date}</Card.Text>
              <Card.Text>Guest Number: {event.guest_number}</Card.Text>
              <Card.Text>Budget: ${event.budget}</Card.Text>
              <button className="btn btn-info" onClick={() => handleViewMore(event)}>
                View More
              </button>
            </Card.Body>
          </Card>
        ))}
      {eventData.length === 0 && (
        <p className="text-center">No event details found.</p>
      )}
    </div>
    </>
  );
};

export default EventDetails;
