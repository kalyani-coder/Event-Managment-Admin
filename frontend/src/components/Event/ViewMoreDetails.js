// ViewMoreDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";

import axios from 'axios';

const ViewMoreDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    // Fetch event details based on the eventId
    axios
      .get(`https://eventmanagement-admin-hocm.onrender.com/api/event/${eventId}`)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  if (!eventDetails) {
    // Loading state or handle the case where details are not available
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Event More Details</h2>
      {/* <p>Event ID: {eventId}</p> */}
      {/* Render the details of the event based on the fetched data */}
      {/* <p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.lname}</p>
      <p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.company_name}</p><p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.company_name}</p><p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.company_name}</p><p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.company_name}</p>
      Add more details as needed */}

      <card>
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
        </Card.Body>
      </card>
    </div>
  );
};

export default ViewMoreDetails;
