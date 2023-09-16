// ExpenseList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // Fetch expenses from the API
        axios
            .get("http://localhost:5000/api/eventexpense")
            .then((response) => {
                setExpenses(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching expenses:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h5>Expense List</h5>
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
