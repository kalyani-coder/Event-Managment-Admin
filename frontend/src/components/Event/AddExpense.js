import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AddExpense = () => {
    const EventId = useParams().event_id;
    console.log(EventId);
    const [event_id, setEventId] = useState("");
    const [to_vendor, setToVendor] = useState("");
    const [event_name, setEventName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [expense_type, setExpenseType] = useState("");


    const expense_typeoptions = [
        "Food Expense",
        "Travel Expense",
        "Office Supplies",
        "Other",
    ];

    const handleShow = () => {
        if (event_id) {
            window.location.href = `/expenses/${event_id}`;
        } else {
            setErrorMessage("Please select an event before showing expenses.");
        }
    };

    const handleAdd = () => {
        if (!to_vendor || !event_name || !amount || !date || !expense_type) {
            setErrorMessage("All fields are required");
            return;
        }

        const expenseData = {
            expense_type,
            to_vendor,
            event_name,
            amount: parseFloat(amount), // Ensure amount is a number
            date,
        };

        console.log('Sending data:', expenseData);

        axios.post(`https://eventmanagement-admin-hocm.onrender.com/api/eventexpense/${event_id}`, expenseData, {
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(response => {
                console.log('Success:', response.data);
                setSuccessMessage('Expense added successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Failed to add expense');
            })
            .finally(() => {
                setExpenseType("");
                setToVendor("");
                setEventName("");
                setAmount("");
                setDate("");
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
                            <form>
                                <div className="form-group">
                                    <label className="fw-bold" htmlFor="type">
                                        Expense Type
                                    </label>
                                    <select
                                        value={expense_type}
                                        onChange={(e) => setExpenseType(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Select Expense Type</option>
                                        {expense_typeoptions.map((expense_type, index) => (
                                            <option key={index} value={expense_type}>
                                                {expense_type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="fw-bold" htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="fw-bold" htmlFor="to_vendor">Vendor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={to_vendor}
                                        onChange={(e) => setToVendor(e.target.value)}
                                        placeholder="Vendor Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="fw-bold" htmlFor="event_name">Event</label>
                                    <select
                                        value={event_name}
                                        onChange={(e) => setEventName(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Select an Event</option>
                                        <option value="Family Function">Family Function</option>
                                        <option value="Birthday Party">Birthday Party</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="fw-bold" htmlFor="amount">Amount</label>
                                    <input
                                        type="number" // Use type="number" for amount
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={handleAdd}
                                >
                                    Submit
                                </button>

                                <Link to={`/expenses/${EventId}`}>
                                    <button
                                        type="button"
                                        className="btn btn-info mx-3"
                                        onClick={handleShow}
                                    >
                                        View Expenses
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
