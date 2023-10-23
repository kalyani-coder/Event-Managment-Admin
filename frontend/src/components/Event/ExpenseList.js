// ExpenseList.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExpenseList = () => {
    const { eventId } = useParams();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://eventmanagement-admin-hocm.onrender.com/api/eventexpense")
            .then(response => response.json())
            .then(data => setExpenses(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

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
                    {expenses.map(expense => (
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
