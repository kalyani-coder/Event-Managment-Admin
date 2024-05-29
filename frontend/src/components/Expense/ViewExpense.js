import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./ViewExpenseDetails.css";

const ViewExpense = () => {
  const [clientName, setClientName] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [managers, setManagers] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("https://node-backend.macj-abuyerschoice.com/api/expence", {
        params: {
          client_Name: clientName,
          expence_date: expenseDate,
        },
      });
      setExpenses(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching expenses");
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get("https://node-backend.macj-abuyerschoice.com/api/addmanager");
      const managerData = response.data.reduce((acc, manager) => {
        acc[manager._id] = `${manager.fname} ${manager.lname}`;
        return acc;
      }, {});
      setManagers(managerData);
    } catch (err) {
      console.error("Error fetching managers", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchManagers();
  }, []);

  const handleSearch = async () => {
    await fetchData();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Decline":
        return (
          <Badge bg="danger" className="status-badge">
            Decline
          </Badge>
        );
      case "Approved":
        return (
          <Badge bg="success" className="status-badge">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge bg="warning" className="status-badge">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary" className="status-badge">
            {status}
          </Badge>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[70%]">
          <div className="flex">
            <Link to={"/expenseform"}>
              <button className="btn btn-primary mr-4 mb-4">
                Add Expense Form
              </button>
            </Link>
            <Link to={"/viewexpensedetails"}>
              <button className="btn btn-primary mr-4 mb-4">
                View Expense Details
              </button>
            </Link>
          </div>
          <h2 className="text-[30px] pl-[1em] mb-3">View Expense Details</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            {expenses.length > 0 && (
              <Table className="table">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Manager Name</th>
                    <th scope="col">Event Name</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Particular</th>
                    <th scope="col">Expense Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody style={{ background: "white", borderRadius: "10px" }}>
                  {expenses.map((expense, index) => (
                    <tr key={expense.id}>
                      <td>{index + 1}</td>
                      <td>{managers[expense.managerId] || "Unknown"}</td>
                      <td>{expense.event_name}</td>
                      <td>{expense.event_Date}</td>
                      <td>{expense.prticular}</td>
                      <td>{expense.expence_date}</td>
                      <td>{expense.amount} Rs.</td>

                      <td>
                        <Link
                          to={{
                            pathname: "/advanceexpense",
                            state: {
                              managerId: expense.managerId,
                              managerName:
                                managers[expense.managerId] || "Unknown",
                            },
                          }}
                        >
                          <button className="btn btn-primary">Proceed</button>
                        </Link>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewExpense;
