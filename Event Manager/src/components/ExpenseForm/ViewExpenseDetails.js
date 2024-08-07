import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Table, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./ViewExpenseDetails.css";

const ViewExpenseDetails = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const managerId = localStorage.getItem('managerId');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/api/expence/manager/${managerId}`);
      setExpenses(response.data);
      setError('');
    } catch (err) {
      setExpenses([]); 
      setError('Manager expense data not available');
    }
  };

  useEffect(() => {
    if (managerId) {
      fetchData();
    } else {
      setError('Manager ID not found in localStorage');
    }
  }, [managerId]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'declined':
        return <Badge bg="danger" className="status-badge">Decline</Badge>;
      case 'Approved':
        return <Badge bg="success" className="status-badge">Approved</Badge>;
      case 'Pending':
        return <Badge bg="warning" className="status-badge">Pending</Badge>;
      default:
        return <Badge bg="secondary" className="status-badge">{status}</Badge>;
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto"
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[70%]">
          <div className="flex">
            <Link to={'/expenseform'}>
              <button className="btn btn-primary mr-4 mb-4">Add Expense Form</button>
            </Link>
          </div>
          <h2 className="text-[30px] pl-[1em] mb-3">View Expense Details</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            {expenses.length > 0 ? (
              <Table className="table">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Client Contact</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Particular</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Query</th>
                  </tr>
                </thead>
                <tbody style={{ background: "white", borderRadius: "10px" }}>
                  {expenses.map((expense, index) => (
                    <tr key={expense._id}>
                      <td>{index + 1}</td>
                      <td>{expense.client_Name}</td>
                      <td>{expense.client_contact}</td>
                      <td>{expense.event_Date}</td>
                      <td>{expense.prticular}</td>
                      <td>{expense.amount} Rs.</td>
                      <td>{getStatusBadge(expense.status)}</td>
                      <td>{expense.decline_message}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No expense data available for this manager.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewExpenseDetails;
