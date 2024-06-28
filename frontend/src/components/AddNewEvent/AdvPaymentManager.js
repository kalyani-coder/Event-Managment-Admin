import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const AdvPaymentManager = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const calculateRemainingAmount = (paidAmt, advancePayment) => {
    const paid = parseInt(paidAmt);
    const advance = parseInt(advancePayment);

    if (isNaN(paid) || isNaN(advance)) {
      return 0;
    }

    return paid - advance;
  };

  const initialFormData = {
    selectedManager: "",
    managerName: "",
    selectedEvent: "",
    eventName: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    paid_amt: "",
    advance_payment: "",
    rem_amt: 0,
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [managers, setManagers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankNames, setBankNames] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/allbanks");
        setBankNames(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/addmanager");
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    const fetchEventsForManager = async () => {
      try {
        if (formData.selectedManager) {
          console.log("Fetching events for manager:", formData.selectedManager);
          const response = await axios.get(
            `http://localhost:8888/api/event/manager/${formData.selectedManager}`
          );
          console.log("Events response:", response.data);
          setEvents(response.data);
        } else {
          setEvents([]); // Clear events if no manager is selected
        }
      } catch (error) {
        console.error("Error fetching events for manager:", error);
      }
    };

    fetchEventsForManager();
  }, [formData.selectedManager]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleManagerChange = async (event) => {
    const { value } = event.target;
    console.log("Selected manager ID:", value); // Log the selected manager ID

    const selectedManagerObj = managers.find(manager => manager._id === value);
    const managerName = selectedManagerObj ? `${selectedManagerObj.fname} ${selectedManagerObj.lname}` : '';

    setFormData((prevData) => ({
      ...prevData,
      selectedManager: value,
      managerName: managerName,
      selectedEvent: "", // Reset selected event when manager changes
      eventName: "",     // Reset event name when manager changes
    }));
  
    try {
      if (value) {
        const response = await axios.get(
          `http://localhost:8888/api/event/manager/${value}`
        );
        console.log("Events for manager:", response.data);
        setEvents(response.data);
      } else {
        setEvents([]); // Clear events if no manager is selected
      }
    } catch (error) {
      console.error("Error fetching events for manager:", error);
    }
  };

  const handleEventChange = (event) => {
    const { value } = event.target;
    const selectedEvent = events.find(event => event._id === value);

    // Log the selected event name
    console.log("Selected Event Name:", selectedEvent ? selectedEvent.eventName : "");

    setFormData((prevData) => ({
      ...prevData,
      selectedEvent: value,
      eventName: selectedEvent ? selectedEvent.eventName : ''
    }));
  };

  const handlePaidAmountChange = (event) => {
    const { value } = event.target;
    if (/^-/.test(value)) { // Check if the value is negative
      window.alert("Negative amounts are not allowed.");
    } else if (/^\d*$/.test(value)) { // Only allow non-negative integers
      const newPaidAmount = value === "" ? "" : parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        paid_amt: newPaidAmount,
        rem_amt: calculateRemainingAmount(newPaidAmount, prevData.advance_payment),
      }));
    }
  };

  const handleAdvancePaymentChange = (event) => {
    const { value } = event.target;
    const newAdvancePayment = value === "" ? "" : parseInt(value);

    if (/^-/.test(value)) { // Check if the value is negative
      window.alert("Negative amounts are not allowed.");
    } else if (newAdvancePayment > formData.paid_amt) { // Check if advance payment exceeds paid amount
      window.alert("Advance payment cannot exceed paid amount.");
    } else if (/^\d*$/.test(value)) { // Only allow non-negative integers
      setFormData((prevData) => ({
        ...prevData,
        advance_payment: newAdvancePayment,
        rem_amt: calculateRemainingAmount(prevData.paid_amt, newAdvancePayment),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = {};
    if (!formData.selectedManager) {
      errors.selectedManager = "This field is required";
    }
    if (!formData.selectedEvent) {
      errors.selectedEvent = "This field is required";
    }
    if (!selectedBank) {
      errors.selectedBank = "This field is required";
    }
    if (!formData.paid_amt) {
      errors.paid_amt = "This field is required";
    }
    if (!formData.advance_payment) {
      errors.advance_payment = "This field is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/api/advpaymanager",
        {
          manager_Id: formData.selectedManager,
          manager_Name: formData.managerName,
          EventId: formData.selectedEvent,
          EventName: formData.eventName,
          Date: formData.date,
          Time: formData.time,
          Bank_Name: selectedBank,
          paid_Amount: formData.paid_amt,
          adv_Payment: formData.advance_payment,
          Pending_Amount: formData.rem_amt,
          description: formData.description,
        }
      );

      if (response.status === 200) {
        setShowPopup(true);
        setFormData(initialFormData);
      }

      console.log(response.data);
      alert("Advance Payment to manager successfully.");

    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to advance payment.");
    }
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBankSelect = (event) => {
    const selectedBankName = event.target.value;
    setSelectedBank(selectedBankName);

    const selectedBankObj = bankNames.find(bank => bank.Bank_Name === selectedBankName);

    if (selectedBankObj) {
      setAccountNumber(selectedBankObj.Account_Number);
    } else {
      setAccountNumber('');
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <form className="order" onSubmit={handleSubmit}>
            <div className="flex">
              <Link to={'/advpaymentmanager'}>
                <Button className="mr-4 mb-4" variant="primary">
                  Advance Payment to Manager
                </Button>
              </Link>

              <Link to={'/viewadvpaymentmanager'}>
                <Button className="mr-4 mb-4">View Advance Payment Manager</Button>
              </Link>
            </div>
            <h4 className="title mt-1">Advance Payment</h4>
            <div className="card">
              <Form.Group controlId="manager">
                <Form.Label>Manager Name</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedManager"
                  value={formData.selectedManager}
                  onChange={handleManagerChange}
                  isInvalid={formErrors.selectedManager}
                >
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.fname} {manager.lname}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.selectedManager}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="event">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedEvent"
                  value={formData.selectedEvent}
                  onChange={handleEventChange}
                  isInvalid={formErrors.selectedEvent}
                  disabled={!formData.selectedManager}
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.eventName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.selectedEvent}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="bankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBank}
                  onChange={handleBankSelect}
                  isInvalid={formErrors.selectedBank}
                >
                  <option value="">Select Bank</option>
                  {bankNames.map((bank) => (
                    <option key={bank.Bank_Name} value={bank.Bank_Name}>
                      {bank.Bank_Name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.selectedBank}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="accountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={accountNumber}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="paidAmount">
                <Form.Label>Paid Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="paid_amt"
                  value={formData.paid_amt}
                  onChange={handlePaidAmountChange}
                  isInvalid={formErrors.paid_amt}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.paid_amt}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="advancePayment">
                <Form.Label>Advance Payment</Form.Label>
                <Form.Control
                  type="text"
                  name="advance_payment"
                  value={formData.advance_payment}
                  onChange={handleAdvancePaymentChange}
                  isInvalid={formErrors.advance_payment}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.advance_payment}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="remainingAmount">
                <Form.Label>Remaining Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="rem_amt"
                  value={formData.rem_amt}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                type="button"
                onClick={handleDiscard}
              >
                Discard
              </button>
            </div>
          </form>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Advance Payment Successfully Added!</h3>
              <button
                className="popup-close"
                onClick={handlePopupClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdvPaymentManager;
