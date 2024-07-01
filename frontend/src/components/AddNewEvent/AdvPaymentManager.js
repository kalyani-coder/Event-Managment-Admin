import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./AdvPayManager.css";

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
        // Clear the form by resetting the state to initial values
        setFormData(initialFormData); // Reset form data to initial state
        setSelectedBank(''); // Reset selected bank
        setAccountNumber(''); // Reset account number
        setFormErrors({}); // Clear any existing form errors
      }
  
      console.log(response.data);
      alert("Advance Payment to manager successfully.");
      handleDiscard();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to advance payment.");
    }
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
    setSelectedBank(''); // Reset selected bank
    setAccountNumber(''); // Reset account number
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
           
          
            <Link to={'/viewadvpaymentmanager'}>
              <Button className="button-heading mr-4 mb-4">View Advance Payment Manager</Button>
            </Link>
          </div>
          <h2 className="text-[30px] pl-[1em]">Advance Payment to Manager</h2>

          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <Form.Group controlId="SelectManager">
                  <Form.Label>Select Manager:<span style={{ color: "red" }}>*</span></Form.Label>
                  <div className="relative">
                    <Form.Select
                      className={`w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 ${formErrors.selectedManager ? "border-red-500" : ""}`}
                      aria-label="Select Manager"
                      name="selectedManager"
                      value={formData.selectedManager}
                      onChange={handleManagerChange}
                      isInvalid={formErrors.selectedManager}
                      placeholder="Select Manager"
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option
                          key={manager._id}
                          value={manager._id} // Use _id as the value
                        >
                          {manager.fname} {manager.lname}
                        </option>
                      ))}
                    </Form.Select>
                    {formErrors.selectedManager && <span className="text-red-500">{formErrors.selectedManager}</span>}
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="selectedEvent">Event Name:<span style={{ color: "red" }}>*</span></label>
                <select
                  className={`form-control mb-2 ${formErrors.selectedEvent ? "border-red-500" : ""}`} 
                  name="selectedEvent"
                  value={formData.selectedEvent}
                  onChange={handleEventChange}
                 
                  isInvalid={formErrors.selectedEvent}
                 disabled={!formData.selectedManager}
                  
                >
                  <option value="">Select event</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.eventName}
                    </option>
                  ))}
                </select>
                {formErrors.selectedEvent && <span className="text-red-500">{formErrors.selectedEvent}</span>}
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col px-5">
              {" "}
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  className="form-control"
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={formData.time}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="selectedBank">Select Bank:<span style={{ color: "red" }}>*</span></label>
                <select
                  className={`form-control mb-2 ${formErrors.selectedBank ? "border-red-500" : ""}`}
                  name="Selectedbank"
                  value={selectedBank}
                  onChange={handleBankSelect}
                  isInvalid={formErrors.selectedBank}
                >
                  <option value="">Select Bank</option>
                  {bankNames.map((bank) => (
                    <option key={bank._id} value={bank.Bank_Name}>
                      {bank.Bank_Name}
                    </option>
                  ))}
                </select>
                {formErrors.selectedBank && <span className="text-red-500">{formErrors.selectedBank}</span>}
              </div>
            </div>
            {selectedBank && (
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={accountNumber}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="paid_amt">Paid Amount:<span style={{ color: "red" }}>*</span></label>
                <input
                  className={`form-control mb-2 ${formErrors.paid_amt ? "border-red-500" : ""}`}
                  type="text"
                  name="paid_amt"
                  placeholder="Paid Amount"
                  onChange={handlePaidAmountChange}
                  value={formData.paid_amt}
                />
                {formErrors.paid_amt && <span className="text-red-500">{formErrors.paid_amt}</span>}
              </div>
            </div>

            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="advance_payment">Advance Payment:<span style={{ color: "red" }}>*</span></label>
                <input
                  className={`form-control mb-2 ${formErrors.advance_payment ? "border-red-500" : ""}`}
                  type="text"
                  name="advance_payment"
                  placeholder="Advance Payment"
                  onChange={handleAdvancePaymentChange}
                  value={formData.advance_payment}
                />
                {formErrors.advance_payment && <span className="text-red-500">{formErrors.advance_payment}</span>}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="rem_amt">Pending Amount</label>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="rem_amt"
                  placeholder="Remaining Amount"
                  value={formData.rem_amt}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <Button
                className="manager-btn ms-1"
                type="button"
                onClick={handleDiscard}
              >
                Discard
              </Button>

              <Button className="manager-btn ms-3" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  </>
  );
};

export default AdvPaymentManager;
