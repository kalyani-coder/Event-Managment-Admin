// ViewExpense.js
import React, { useEffect, useState } from "react";

const ViewExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch("https://eventmanagement-admin-hocm.onrender.com/api/eventexpense");
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h5>Expense List</h5>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Expense Type</th>
                            <th>Date</th>
                            <th>Vendor</th>
                            <th>Event</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.expense_type}</td>
                                <td>{expense.date}</td>
                                <td>{expense.to_vendor}</td>
                                <td>{expense.event_name}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewExpense;
