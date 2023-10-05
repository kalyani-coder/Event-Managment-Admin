import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const VendorPaymentView = () => {
    const [vendorPayments, setVendorPayments] = useState([]);

    useEffect(() => {
        // Fetch vendor payment data from the API
        axios
            .get("http://localhost:5000/api/vendorpayment")
            .then((response) => {
                setVendorPayments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching vendor payment data:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Vendor Payments</h2>

            {vendorPayments.length > 0 ? (
                vendorPayments.map((payment) => (
                    <Card key={payment._id} style={{ width: "100%", marginBottom: "20px" }}>
                        <Card.Body>
                            <Card.Title>{`${payment.fname} ${payment.lname}`}</Card.Title>
                            <Card.Text>
                                <strong>Salary:</strong> {payment.salary}
                            </Card.Text>
                            <Card.Text>
                                <strong>Taken Amount:</strong> {payment.paid_amt}
                            </Card.Text>
                            <Card.Text>
                                <strong>Remaining Amount:</strong> {payment.rem_amt}
                            </Card.Text>
                            <Link to={`/view-more/${payment._id}`} key={payment._id}>
                                <Button variant="primary">View More</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p className="text-center">No vendor payment details found.</p>
            )}
        </div>
    );
};

export default VendorPaymentView;