import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";

const ViewMoreDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    // Fetch event details based on the eventId
    axios
      .get(`http://localhost:8888/api/event/${eventId}`)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [eventId]);

  if (!eventDetails) {
    // Loading state or handle the case where details are not available
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2>Event More Details</h2>

        <Card bg="light" className="mt-3">
          <Card.Body>
            <Card.Title>{eventDetails.fname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Company: {eventDetails.company_name}
            </Card.Subtitle>
            <Card.Text>Event: {eventDetails.eventName}</Card.Text>
            <Card.Text>Venue: {eventDetails.venue}</Card.Text>
            <Card.Text>Subvenue: {eventDetails.subvenue}</Card.Text>
            <Card.Text>Event Date: {eventDetails.event_date}</Card.Text>
            <Card.Text>Guest Number: {eventDetails.guest_number}</Card.Text>
            <Card.Text>Budget: ${eventDetails.budget}</Card.Text>
            <Card.Text>Date: {eventDetails.event_date}</Card.Text>
            <Card.Text>Time: {eventDetails.currentTime}</Card.Text>

            <Link to={`/add-expense/${eventId}`}>
              <Button variant="primary" className="mr-2">
                Add Expense
              </Button>
            </Link>

            <Link to={`/expenses/${eventId}`}>
              <Button variant="success">View Expenses</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ViewMoreDetails;
