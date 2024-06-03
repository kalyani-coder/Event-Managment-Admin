import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Table, Badge, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../Expense/ViewExpence.css"


const ViewExpense = () => {
  const [clientName, setClientName] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [managers, setManagers] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventStartDate, setEventStartDate] = useState(""); // State for event start date
  const [eventEndDate, setEventEndDate] = useState(""); // State for event end date


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expence", {
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
      const response = await axios.get("http://localhost:5000/api/addmanager");
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

  const handleShowEventModal = (expense) => {
    setSelectedExpense(expense);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedExpense(null);
  };
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState('')
  const [paymentDone, setPaymentDone] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/allbanks')
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the banks!', error);
      });
  }, []);

  const handleBankSelect = (e) => {
    const bankName = e.target.value;
    setSelectedBank(bankName);
    const selectedBank = banks.find(bank => bank.Bank_Name === bankName);
    setAccountNumber(selectedBank ? selectedBank.Account_Number : "");
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Payment date is required.");
      return;
    }
    if (!selectedBank) {
      alert("Please select a bank.");
      return;
    }
    if (!amount) {
      alert("Please fill in the amount.");
      return;
    }

    const formData = {
      payment_Date: selectedDate,
      from_Bank: selectedBank,
      bank_Account_Number: accountNumber,
      managerId: selectedExpense.managerId,
      manager_Name: managers[selectedExpense.managerId],
      amount: amount
    };

    axios.post('http://localhost:5000/api/advanceexpence', formData)
      .then(response => {
        alert("Expense submitted successfully");
        handleCloseEventModal();
        setPaymentDone(true);

        updateExpenseStatus(selectedExpense._id, "Approved");
      })
      .catch(error => {
        console.error("Error submitting expense data:", error);
      });
  };

  const updateExpenseStatus = (expenseId, newStatus, declineMessage = "") => {
    const patchData = { status: newStatus, decline_message: declineMessage };

    axios.patch(`http://localhost:5000/api/expence/${expenseId}`, patchData)
      .then(response => {
        console.log("Expense status updated successfully:", response.data);
      })
      .catch(error => {
        console.error("Error updating expense status:", error);
      });
  };

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

 

  const handleDecline = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeclineModal(true);
  };

  const handleCloseDeclineModal = () => {
    setShowDeclineModal(false);
    setDeclineReason('');
    setSelectedExpenseId(null);
  };

  const handleSubmitDecline = () => {
    if (declineReason.trim().split(/\s+/).length <= 10) {
      // Submit the decline reason
      setShowDeclineModal(false);
      setDeclineReason('');
    }
    if (!declineReason) {
      alert("Please enter a reason for declining the expense.");
      return;
    }

    if (!selectedExpenseId) {
      alert("No expense selected for decline.");
      return;
    }

    updateExpenseStatus(selectedExpenseId, "declined", declineReason);
    handleCloseDeclineModal();
    alert("Expense declined successfully.");
  };
  const handleDeclineReasonChange = (event) => {
    const words = event.target.value.trim().split(/\s+/);
    if (words.length <= 10) {
      setDeclineReason(event.target.value);
    } else {
      window.alert('10 words limit only');
    }
  };
  
  const handleStartDateChange = (event) => {
    setEventStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEventEndDate(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const managerName = managers[expense.managerId] || ""; // Default to empty string if manager name not found
    const formattedManagerName = managerName.toLowerCase();
    const formattedEventName = expense.event_name ? expense.event_name.toLowerCase() : "";
    const formattedSearchTerm = searchTerm.toLowerCase();

    // Convert event dates to timestamp for comparison
    const eventDateTimestamp = new Date(expense.event_Date).getTime();
    const startDateTimestamp = eventStartDate ? new Date(eventStartDate).getTime() : -Infinity;
    const endDateTimestamp = eventEndDate ? new Date(eventEndDate).getTime() : Infinity;

    return (
      (formattedManagerName.includes(formattedSearchTerm) ||
        formattedEventName.includes(formattedSearchTerm)) &&
      eventDateTimestamp >= startDateTimestamp &&
      eventDateTimestamp <= endDateTimestamp
    );
  });

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[70%]">
        
        
          <h2 className="text-[30px] pl-[1em] mb-3">View Expense Details</h2>
          <div className="filter-container">
            <input type="text" placeholder="Search by Manager Name or Event Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-expense"
              style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  width:"30.5%",
                }} />
          
          <label className="mr-1">Event Start Date:</label>
              <input
                type="date"
                value={eventStartDate}
                onChange={handleStartDateChange}
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
              <label className="mr-1">Event End Date:</label>
              <input
                type="date"
                value={eventEndDate}
                onChange={handleEndDateChange}
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            {filteredExpenses.length > 0 && (
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
                    <th scope="col">Proceed</th>
                    <th scope="col">Decline</th>
                    
                  </tr>
                </thead>
                <tbody style={{ background: "white", borderRadius: "10px" }}>
                  {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id}>
                      <td>{index + 1}</td>
                      <td>{managers[expense.managerId] || "Unknown"}</td>
                      <td>{expense.event_name}</td>
                      <td>{expense.event_Date}</td>
                      <td>{expense.prticular}</td>
                      <td>{expense.expence_date}</td>
                      <td>{expense.amount} Rs.</td>

                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleShowEventModal(expense)}
                        >
                          Proceed
                        </button>
                      </td>
                      <td>

                      <button
                    className="btn btn-danger ms-4"
                    onClick={() => handleDecline(expense._id)}
                  >
                    Decline
                  </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      <Modal show={showEventModal} onHide={handleCloseEventModal}>
        <Modal.Header closeButton style={{ marginTop: "30px" }}>
          <Modal.Title>Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          {selectedExpense && (
            <Form>
              <Form.Group controlId="formManagerName">
                <Form.Label>Manager Name</Form.Label>
                <Form.Control
                  type="text"
                  value={managers[selectedExpense.managerId]}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedExpense.event_name}
                  readOnly
                />
              </Form.Group>


              <Form.Group controlId="formAmount">
                <Form.Label>Select Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select Payment Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Form.Group>

              <Form.Group controlId="formBank">
                <Form.Label htmlFor="from_Bank">Select Bank</Form.Label>
                <Form.Select
                  className="form-control mb-2"
                  name="from_Bank"
                  value={selectedBank}
                  onChange={handleBankSelect}
                  required
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank) => (
                    <option key={bank._id} value={bank.Bank_Name}>
                      {bank.Bank_Name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {selectedBank && (
                <Form.Group controlId="formAccountNumber">
                  <Form.Label htmlFor="bank_Account_Number">Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank_Account_Number"
                    value={accountNumber}
                    readOnly
                  />
                </Form.Group>
              )}

              <Form.Group controlId="formAmount">
                <Form.Label>Enter Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>

            </Form>
          )}


        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseEventModal}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Proceed To Pay
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeclineModal} onHide={handleCloseDeclineModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Enter Reason for Decline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="declineReason">
            <Form.Label>Type Reason:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type Reason For Decline Payment"
              rows={2}
              value={declineReason}
              onChange={handleDeclineReasonChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeclineModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDecline}>
            Confirm Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewExpense;
