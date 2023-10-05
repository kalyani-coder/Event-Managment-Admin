import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExpenseList = () => {
    const { eventId } = useParams(); // Access the event ID from route parameters
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        
        // Fetch expenses filtered by event ID from the API
        axios
            .get(`http://localhost:5000/api/eventexpense/${eventId}`)
            .then((response) => {
                setExpenses(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching expenses:", error);
            });
    }, [eventId]); // Add eventId to the dependency array to re-fetch expenses when it changes

    return (
        <div className="container mt-5">
            <h5>Expense List for Event ID {eventId}</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>New Purchase</th>
                        <th>Date</th>
                        <th>Vendor</th>
                        <th>Event</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.new_purchase}</td>
                            <td>{expense.date}</td>
                            <td>{expense.to_vendor}</td>
                            <td>{expense.event_name}</td>
                            <td>{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
