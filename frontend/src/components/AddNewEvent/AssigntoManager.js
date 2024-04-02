import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { Form, Button } from "react-bootstrap";

const AssigntoManager = () => {
    const [eventName, setEventName] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});

    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://eventmanagement-admin-hocm.onrender.com/api/advpayment');
                setEventName(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventChange = (e) => {
        const selectedEventName = e.target.value;
        const eventDetails = eventName.find(event => event.event_name === selectedEventName);
        setSelectedEvent(eventDetails);
        setSelectedCustomer(eventDetails.client_name);
    }


    // for manager selection 
    const [managerName, setManagerName] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://eventmanagement-admin-hocm.onrender.com/api/managerdetails');
                setManagerName(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedManagerName = e.target.elements.customer.value;


            const postData = {
                event_name: selectedEvent.event_name,
                customer_name: selectedEvent.client_name,
                contact: selectedEvent.contact || 0,
                email: selectedEvent.email,
                date: selectedEvent.event_date || "",
                venue: selectedEvent.venue || "",
                adv_payment: selectedEvent.adv_payment || 0,
                rem_payment: selectedEvent.rem_payment || 0,
                total_amt: selectedEvent.amount || 0,
                assign_manager_name: selectedManagerName, 
                // assign_manager_Id: selectedManagerId
            };

            const response = await axios.post('https://eventmanagement-admin-hocm.onrender.com/api/order', postData);
            // console.log('Data posted successfully:', response.data);
            alert('Order assign to manager successfully')
            // Reset form or show success message
        } catch (error) {
            console.error('Error posting data:', error);
            // Handle error
            if (error.response) {
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };


    return (
        <>
            <Sidebar />
            <div className="container mt-5">
                <h2 className="mb-4">Assign to Manager</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="SelectEvent">
                        <Form.Label>Select Event:</Form.Label>
                        <div className="relative">
                            <Form.Select
                                className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                                aria-label="Select Event"
                                name="event"
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

                    {/* Display inputs for selected event details */}
                    <div className="mb-3">
                        <label className="form-label">Customer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedCustomer}
                            readOnly
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.contact || ''}
                            readOnly
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Venue</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.venue || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Guest Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.guest_number || ''}
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

                    <div className="mb-3">
                        <label className="form-label">Advance Payment</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.adv_payment || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Pending Payment</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.rem_payment || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">payment Date</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.payment_date || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">payment Time</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedEvent.payment_time || ''}
                            readOnly
                        />
                    </div>

                    <Form.Group controlId="SelectCustomer">
                        <Form.Label>Select Manager:</Form.Label>
                        <div className="relative">
                            <Form.Select
                                className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                                aria-label="Select Customer"
                                name="customer"
                                required
                            >
                                <option>Select Manager</option>
                                {managerName.map((manager) => (
                                    <option key={manager.id} value={manager.id}>{manager.fname} {manager.lname}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>


                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </div>

        </>
    );
}

export default AssigntoManager;
