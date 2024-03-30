import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { Form, Button } from "react-bootstrap";

const AssigntoManager = () => {
    const [eventName, setEventName] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/advpayment');
                setEventName(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventChange = (event) => {
        const selectedEventName = event.target.value;
        const eventDetails = eventName.find(event => event.event_name === selectedEventName);
        setSelectedEvent(eventDetails);
        setCustomerName(eventDetails.client_name);
    }

    return (
        <>
            <Sidebar />
            <div className="container mt-5">
                <h2 className="mb-4">Assign to Manager</h2>
                <Form.Group controlId="SelectCustomer">
                    <Form.Label>Select Event:</Form.Label>
                    <div className="relative">
                        <Form.Select
                            className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                            aria-label="Select Customer"
                            name="customer"
                            onChange={handleEventChange}
                        >
                            <option>Select Event</option>
                            {eventName.map((event) => (
                                <option key={event._id} value={event.event_name}>
                                    {event.event_name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>
                <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={customerName}
                        readOnly
                    />
                </div>
               
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        value={selectedEvent.amount || ''}
                        readOnly
                    />
                </div>
               
            </div>
        </>
    );
}

export default AssigntoManager;
