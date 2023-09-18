import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddExpense = () => {
    const location = useLocation();
    const id = location.state;
    console.log(id);

    const [new_purchase, setnew_purchase] = useState("");
    const [to_vendor, setto_vendor] = useState("");
    const [event_name, setevent_name] = useState("");
    const [amount, setamount] = useState("");
    const [date, setDate] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [event_id, setEvent_id] = useState(""); // State for event ID
    const navigate = useNavigate();

    // Fetch the event ID based on event name
    useEffect(() => {
        // Make an Axios GET request to fetch the event ID
        axios
            .get(`http://localhost:5000/api/event/${event_name}`)
            .then((response) => {
                // Handle success
                const fetchedEventId = response.data;
                setEvent_id(fetchedEventId);
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error("Error fetching event ID:", error);
            });
    }, [event_name]);

    const handleShow = () => {
        // Navigate to the "eventlist" page
        navigate("/expenses-list");
    };

    const handleAdd = () => {
        // Check if any of the required fields are empty
        if (!new_purchase || !to_vendor || !event_name || !amount || !date) {
            setErrorMessage("All fields are required");
            return;
        }

        // Create an object with the form data
        const expenseData = {
            event_id,
            new_purchase,
            to_vendor,
            event_name,
            amount,
            date,
        };

        console.log("Data to be posted:", expenseData);

        // Send the expenseData to the API using Axios
        axios
            .post("http://localhost:5000/api/eventexpense", expenseData)
            .then((response) => {
                // Handle success
                console.log("Expense added successfully:", response.data);
                setSuccessMessage("Expense added");
                // Clear the form fields
                setnew_purchase("");
                setto_vendor("");
                setevent_name("");
                setamount("");
                setDate("");
                setErrorMessage(""); // Clear any previous error messages
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error("Error adding expense:", error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Expense</h5>
                            {successMessage && (
                                <div className="alert alert-success">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}
                            <div className="form-group">
                                <label className="fw-bold">New Purchase</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={new_purchase}
                                    onChange={(e) => setnew_purchase(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Vendor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={to_vendor}
                                    onChange={(e) => setto_vendor(e.target.value)}
                                    placeholder="Vendor Name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Event</label>
                                <select
                                    value={event_name}
                                    onChange={(e) => setevent_name(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select an Event</option>
                                    <option value="Family Function">Family Function</option>
                                    <option value="Birthday Party">Birthday Party</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={amount}
                                    onChange={(e) => setamount(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="btn btn-info" onClick={handleAdd}>
                                Submit
                            </button>
                            <button className="btn btn-info mx-3" onClick={handleShow}>
                                Show
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
