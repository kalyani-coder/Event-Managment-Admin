// ViewMoreDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <p>Event ID: {eventId}</p>
      {/* Render the details of the event based on the fetched data */}
      <p>Event Name: {eventDetails.fname}</p>
      <p>Company: {eventDetails.company_name}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ViewMoreDetails;
