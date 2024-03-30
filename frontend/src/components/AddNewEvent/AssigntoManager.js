import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar"
import { Form, Button } from "react-bootstrap";

const AssigntoManager = () => {

    const [managerName, setManagerName] = useState([]);
    const [eventName, setEventName] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/managerdetails');
                setManagerName(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

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

                        >
                            <option>Select Event</option>
                            {eventName.map((event) => (
                                <option key={event.id} value={event.event_name}>
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

                    />
                </div>


                {/* 
                <Form.Group controlId="SelectCustomer">
                    <Form.Label>Select Manager:</Form.Label>
                    <div className="relative">
                        <Form.Select
                            className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                            aria-label="Select Customer"
                            name="customer"

                        >
                            <option>Select Manager</option>
                            {managerName.map((manager) => (
                                <option key={manager.id} value={manager.fname}>
                                    {manager.fname} {manager.lname}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group> */}
            </div>





        </>
    )
}

export default AssigntoManager