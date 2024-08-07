import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import { format } from "date-fns";
import Header from "../Sidebar/Header";
import { Link } from "react-router-dom";

const ExpenseForm = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [prticular, setParticular] = useState("");
  const [amount, setAmount] = useState("");
  const [clientName, setClientName] = useState("");
  const [formErrors, setFormErrors] = useState({ amount: false });
  const [addedExpenses, setAddedExpenses] = useState([]);

  const managerData = async () => {
    const managerId = localStorage.getItem("managerId");
    try {
      const response = await fetch(
        `http://localhost:8888/api/event/manager/${managerId}`
      );
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data); // Initialize filteredEvents with the fetched data
    } catch (e) {
      console.error(`Failed to fetch data: ${e}`);
    }
  };

  useEffect(() => {
    managerData();
  }, []);

  useEffect(() => {
    filterData(searchTerm, dateRange.startDate, dateRange.endDate);
  }, [searchTerm, dateRange]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterData = (searchTerm, startDate, endDate) => {
    let filtered = events.filter((event) => {
      const eventName = event.eventName?.toLowerCase() || "";
      const eventDate = event.event_date || "";
      const venue = event.venue?.toLowerCase() || "";

      return (
        eventName.includes(searchTerm.toLowerCase()) ||
        eventDate.includes(searchTerm) ||
        venue.includes(searchTerm.toLowerCase())
      );
    });

    if (startDate && endDate) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
        );
      });
    }

    setFilteredEvents(filtered);
  };

  const handleExpenseSubmit = async () => {
    if (!selectedEvent) return;

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      setFormErrors((prevErrors) => ({ ...prevErrors, amount: true }));
      return;
    }

    const expenseData = {
      prticular: prticular,
      amount: parseFloat(amount),
      client_Name: selectedEvent.fname,
      client_contact: selectedEvent.contact,
      event_name: selectedEvent.eventName,
      event_Date: selectedEvent.event_date,
      managerId: selectedEvent.managerId,
      manager_Name: selectedEvent.manager_Name,
      status: "Pending",
      venue: selectedEvent.venue,
    };
    console.log("Expense data:", expenseData);

    try {
      const response = await axios.post(
        "http://localhost:8888/api/expence",
        expenseData
      );
      console.log(response.data);
      alert("Expense Added Successfully.");
      // Update the added expenses list
      setAddedExpenses((prev) => [...prev, selectedEvent._id]);
      // Clear form fields after successful submission
      setParticular("");
      setAmount("");
      setShowExpenseModal(false);
    } catch (error) {
      console.error(error);
      // Handle error - e.g., show an error message
    }
  };

  const handleGetExpenseClick = (event) => {
    console.log("Event selected:", event); // Debugging line
    setSelectedEvent(event);
    setClientName(event.fname);
    setShowExpenseModal(true);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (value === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, amount: true }));
    } else {
      const amountValue = parseFloat(value);
      if (amountValue <= 0 || isNaN(amountValue)) {
        setFormErrors((prevErrors) => ({ ...prevErrors, amount: true }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, amount: false }));
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[30px]">Expense Form</h2>
            <Link to="/viewexpensedetails">
              <button className="btn btn-primary">View Expense</button>
            </Link>
            <input
              type="text"
              placeholder="Search by Event Name, Date or Venue"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="form-control w-1/3"
            />
          </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Venue</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr key={event._id}>
                      <td>{event.fname}</td>
                      <td>{event.eventName}</td>
                      <td>
                        {event.event_date
                          ? format(new Date(event.event_date), "dd/MM/yyyy")
                          : ""}
                      </td>
                      <td>{event.venue}</td>
                      <td>{event.contact}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleGetExpenseClick(event)}
                          disabled={addedExpenses.includes(event._id)}
                        >
                          {addedExpenses.includes(event._id)
                            ? "Expense Added"
                            : "Get Expense"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No events found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Modal
            show={showExpenseModal}
            onHide={() => setShowExpenseModal(false)}
            dialogClassName="modal-dialog-centered modal-dialog-responsive"
          >
            <Modal.Header closeButton>
              <Modal.Title>Expense Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="clientName">
                  <Form.Label>Select Client</Form.Label>
                  <Form.Control type="text" value={clientName} readOnly />
                </Form.Group>
                <Form.Group controlId="particular">
                  <Form.Label>Particular</Form.Label>
                  <Form.Control
                    type="text"
                    value={prticular}
                    onChange={(e) => setParticular(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label>
                    Amount <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    isInvalid={formErrors.amount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {amount === ""
                      ? "Please enter an amount."
                      : "Please enter an amount greater than zero."}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowExpenseModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleExpenseSubmit}>
                Send Form for Approval
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
