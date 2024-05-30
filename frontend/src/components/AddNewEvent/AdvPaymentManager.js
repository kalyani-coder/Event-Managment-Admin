import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link} from 'react-router-dom';

const AdvPaymentManager = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
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
    selectedManagerId: "", // Added selectedManagerId
    selectedEvent: "",
    fname: "",
    lname: "",
    event_name: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    bankaccount: "",
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
  console.log(accountNumber)


  const [selectedBank, setSelectedBank] = useState('');

  // const handleBankSelect = (event) => {
  //   setSelectedBank(event.target.value);
  // };
  
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allbanks");
        setBankNames(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  // const handleBankSelect = (event) => {
  //   setSelectedBank(event.target.value);
  // };


  
  const handleBankSelect = (event) => {
    const selectedBankName = event.target.value;
    setSelectedBank(selectedBankName);

    // Find the selected bank object from the bankNames array
    const selectedBankObj = bankNames.find(bank => bank.Bank_Name === selectedBankName);

    // Set the account number based on the selected bank
    if (selectedBankObj) {
      setAccountNumber(selectedBankObj.Account_Number);
    } else {
      setAccountNumber('');
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/order");
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
          const response = await axios.get(
            `http://localhost:5000/api/order?assign_manager_Id=${formData.selectedManagerId}`
          );
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events for manager:", error);
      }
    };

    fetchEventsForManager();
  }, [formData.selectedManager, formData.selectedManagerId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleManagerChange = (event) => {
    const { value } = event.target;
    const selectedManagerData = managers.find(
      (manager) => manager.assign_manager_name === value
    );
    setFormData((prevData) => ({
      ...prevData,
      selectedManager: value,
      selectedManagerId: selectedManagerData
        ? selectedManagerData.assign_manager_Id
        : "",
      selectedEvent: "",
    }));
  };

  const handleEventChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedEvent: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/advpaymanager",
        {
          manager_Name: formData.selectedManager,
          EventName: formData.selectedEvent,
          Date: formData.date,
          Time: formData.time,
          Bank_Name: selectedBank,
          paid_Amount: formData.paid_amt,
          adv_Payment: formData.advance_payment,
          Pending_Amount: formData.rem_amt,
          description: formData.description,
          manager_Id: formData.selectedManagerId,
        }
      );
  
      if (response.status === 200) {
        setShowPopup(true);
        setFormData(initialFormData);
      }
  
      console.log(response.data); // Output response data to console
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

  const handleAdvancePaymentChange = (event) => {
    const newAdvancePayment = parseInt(event.target.value);
    if (!isNaN(newAdvancePayment)) {
      setFormData((prevData) => ({
        ...prevData,
        advance_payment: newAdvancePayment,
        rem_amt: calculateRemainingAmount(prevData.paid_amt, newAdvancePayment),
      }));
    }
  };
  const [bankNames, setBankNames] = useState([]);
 




  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] ">
          <form className="order  " onSubmit={handleSubmit}>
          <div className="flex">
            <Link to={'/advpaymentmanager'}>
              <button className="btn btn-primary mr-4 mb-4">Advance Payment Manager</button>
            </Link>
            <Link to={'/viewadvpaymentmanager'}>
              <button className="btn btn-primary mr-4 mb-4">View Advance Payment Manager</button>
            </Link>
            
          </div>
            <h2 className="text-[30px] pl-[1em]">Advance Payment to Manager</h2>
           
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Form.Group controlId="SelectManager">
                    <Form.Label>Select Manager:</Form.Label>
                    <div className="relative">
                      <Form.Select
                        className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label="Select Manager"
                        name="selectedManager"
                        onChange={handleManagerChange}
                        value={formData.selectedManager}
                        placeholder="Select Manager"
                      >
                        <option>Select Manager</option>
                        {managers.map((manager) => (
                          <option
                            key={manager.assign_manager_Id}
                            value={manager.assign_manager_name}
                          >
                            {manager.assign_manager_name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="selectedEvent">Event Name</label>
                  <select
                    className="form-control mb-2"
                    name="selectedEvent"
                    onChange={handleEventChange}
                    value={formData.selectedEvent}
                    required
                  >
                    <option value="">Select event</option>
                    {events.map((event) => (
                      <option key={event.manager_Id} value={event.event_name}>
                        {event.event_name}
                      </option>
                    ))}
                  </select>
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
                    onChange={handleChange}
                    value={formData.date}
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
                  <label htmlFor="selectedBank">Select Bank</label>
                  <select
                    className="form-control mb-2"
                    name="Selectedbank"
                    value={selectedBank}
                    onChange={handleBankSelect}
                    required
                  >
                    <option value="">Select Bank</option>
                    {bankNames.map((bank) => (
                      <option key={bank._id} value={bank.Bank_Name}>
                        {bank.Bank_Name}
                      </option>
                    ))}
                  </select>
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
                  <label htmlFor="advance_payment">Advance Payment</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="advance_payment"
                    placeholder="Advance Payment"
                    onChange={handleAdvancePaymentChange}
                    value={formData.advance_payment}
                  />
                </div>
              </div>
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
            </div>
            <div className="row mb-2">
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
            {/* <div className="row mb-2">
              <div className="col px-5">
                <button
                  className="manager-btn ms-1 mb-3"
                  type="button"
                  onClick={handleDiscard}
                >
                  Discard
                </button>

                <button className="manager-btn ms-1 mb-3" type="submit">
                  Save
                </button>
              </div>
            </div> */}
            <div className="row mb-2">
              <div className="col px-5">
                <Button
                  className="manager-btn ms-1"
                  type="button"
                  onClick={handleDiscard}
                >
                  {" "}
                  Discard
                </Button>

                <Button className="manager-btn ms-3" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
          {showPopup && (
            <div className="alert alert-success mt-3">
              Data saved successfully!
              <button
                type="button"
                className="close"
                onClick={handlePopupClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvPaymentManager;
