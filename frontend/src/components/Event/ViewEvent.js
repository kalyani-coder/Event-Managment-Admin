import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEventData, setFilteredEventData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = eventData.filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEventData(filteredData);
  }, [searchQuery, eventData]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Event Details</h2>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by event name or full name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredEventData.length > 0 ? (
        filteredEventData.map((event) => (
          <Card
            key={event.id}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Organizer: {event.fullName}
              </Card.Subtitle>
              <Card.Text>Event Type: {event.eventType}</Card.Text>
              <Link
                to={{
                  pathname: `/event/${event._id}`,
                }}
                className="btn btn-info"
                state={event}
              >
                View More
              </Link>
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
