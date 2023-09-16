import React from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";




const EventMoreDetails = () => {
    const location = useLocation();
    const event = location.state;
    const navigate = useNavigate();
    console.log(event);


    if (!event) {
        // Handle the case where there's no event data
        return <p>No event details found.</p>;
    }

    const handleExpences = (event) => {
        navigate("/add-expence", { state: event });
    };
    const handleAdvancePayment = (event) => {
        navigate("/advance-payment", { state: event });
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Event Details</h2>

            <Card className="p-3">
                <Card.Body>
                    <Card.Title className="py-3" >{event.fname}</Card.Title>
                    <Card.Subtitle className="mb-3">
                        Company: {event.company_name}
                    </Card.Subtitle>
                    <Card.Text>Venue: {event.venue}</Card.Text>
                    <Card.Text>Subvenue: {event.subvenue}</Card.Text>
                    <Card.Text>Event Date: {event.event_date}</Card.Text>
                    <Card.Text>Guest Number: {event.guest_number}</Card.Text>
                    <Card.Text>Budget: ${event.budget}</Card.Text>
                    {/* Add more fields as needed */}


                    <button className="btn btn-info" onClick={() => handleExpences(event)}>
                        Add Expences
                    </button>
                    <button className="btn btn-info mx-3" onClick={() => handleAdvancePayment(event)}>
                        Advance Payment
                    </button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EventMoreDetails;
