import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
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
    navigate("/event-more-details", { state: event });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Event Details</h2>
      {eventData.length > 0 ? (
        eventData.map((event) => (
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
        ))
      ) : (
        <p className="text-center">No event details found.</p>
      )}
    </div>
  );
};

export default EventDetails;
