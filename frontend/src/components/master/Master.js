import React from 'react'
import Sidebar from "../Sidebar/Sidebar"
import { Form, Button, Alert, Modal, Table } from 'react-bootstrap';


const Master = () => {
    return (
        <>

            <Sidebar />
            <div className="container">
                <h4 className='mt-5'>Master</h4>
                <Form.Group controlId="addvendor">
                    <h5>Add Vendors:</h5>
                    <div className="relative">
                        <Form.Control
                            type="text"
                            placeholder="Add Vendor"
                            required
                        />
                    </div>
                    <div className="d-flex">
                        <Button className="mt-3" type="submit" variant="info">Add Vendor</Button>
                        <div style={{ width: '10px' }}></div>
                        <Button className="mt-3" type="submit" variant="info">View Vendor</Button>
                    </div>
                </Form.Group>


                <Form>
                    <Form.Group controlId="event">
                        <h5 className='mt-3'>Add Events Name:</h5>
                        <div className="relative">
                            <Form.Control
                                placeholder="Add Event Name Here..."
                                name="event"
                                required
                            />
                        </div>
                        <div className="d-flex">
                            <Button className="mt-3" type="submit" variant="info">Add Event</Button>
                            <div style={{ width: '10px' }}></div>
                            <Button className="mt-3" type="submit" variant="info">View Events</Button>
                        </div>

                    </Form.Group>
                </Form>

            </div>


        </>
    )
}

export default Master