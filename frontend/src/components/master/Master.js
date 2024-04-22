import React, { useState, useEffect } from 'react';
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Modal } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

const Master = () => {
    const [vendorName, setVendorName] = useState('');
    const [eventName, setEventName] = useState(''); 
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [vendors, setVendors] = useState([]); 
    const [events, setEvents] = useState([]); // State for storing events data

    useEffect(() => {
        fetchEvents(); // Fetch events when component mounts
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/addeventmaster');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleVendorSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/addvendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Vendor_Name: vendorName }),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                setAlertMessage("Vendor added successfully.");
                setAlertVariant("success");
                setVendorName('');
            } else {
                setAlertMessage("Failed to add vendor.");
                setAlertVariant("danger");
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
            setAlertMessage("Failed to add vendor. Please try again later.");
            setAlertVariant("danger");
        }
    };

    const handleTrashIconClick = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/addeventmaster/${eventId}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    setAlertMessage("Event deleted successfully.");
                    setAlertVariant("success");
                    setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
                } else {
                    setAlertMessage("Failed to delete event.");
                    setAlertVariant("danger");
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                setAlertMessage("Failed to delete event. Please try again later.");
                setAlertVariant("danger");
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleViewEvents = () => {
        setShowModal(true);
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/addeventmaster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventName }),
            });

            if (response.ok) {
                setAlertMessage("Event added successfully.");
                setAlertVariant("success");
                setEventName('');
                fetchEvents(); // Fetch events again to update the list
            } else {
                setAlertMessage("Failed to add event.");
                setAlertVariant("danger");
            }
        } catch (error) {
            console.error('Error adding event:', error);
            setAlertMessage("Failed to add event. Please try again later.");
            setAlertVariant("danger");
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h4 className='mt-5'>Master</h4>
                {alertMessage && (
                    <div>
                        <Alert variant={alertVariant}>{alertMessage}</Alert>
                    </div>
                )}
                <Form.Group controlId="addvendor">
                    <h5>Add Vendors:</h5>
                    <div className="relative">
                        <Form.Control
                            type="text"
                            placeholder="Add Vendor"
                            value={vendorName} // Corrected variable name
                            onChange={(e) => setVendorName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex">
                        <Button className="mt-3" type="submit" variant="info" onClick={handleVendorSubmit}>Add Vendor</Button>
                        <div style={{ width: '10px' }}></div>
                        <Button className="mt-3" type="button" variant="info" onClick={handleViewEvents}>View Vendor</Button>
                    </div>
                </Form.Group>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vendors List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>Vendors Name</div>
                            <div>Action</div>
                        </div>
                        {vendors.map((vendor) => (
                            <div
                                key={vendor._id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div style={{ lineHeight: "45px" }}>{vendor.Vendor_Name}</div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="ml-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleTrashIconClick(vendor._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                </Modal>
               {/* Event List */}
               
               <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Events List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>Event Name</div>
                            <div>Action</div>
                        </div>
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div style={{ lineHeight: "45px" }}>{event.eventName}</div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="ml-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleTrashIconClick(event._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                </Modal>
                <Form>
                    <Form.Group controlId="event">
                        <h5 className='mt-3'>Add Events Name:</h5>
                        <div className="relative">
                            <Form.Control
                                placeholder="Add Event Name Here..."
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex">
                            <Button className="mt-3" type="submit" variant="info" onClick={handleEventSubmit}>Add Event</Button>
                            <div style={{ width: '10px' }}></div>
                            <Button className="mt-3" type="submit" variant="info" onClick={handleViewEvents}>View Events</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default Master;
