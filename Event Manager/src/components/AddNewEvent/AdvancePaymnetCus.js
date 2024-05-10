import React, { useState, useEffect } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

function AdvancePaymnetCus() {
  const navigate = useNavigate("");
  const [cusName, setCusName] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [advancePayment, setAdvancePayment] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [bankNames, setBankNames] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/event");
        setCusName(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerSelect = (e) => {
    setSelectedCustomer(e.target.value);

    const customerDetails = cusName.find(
      (item) => item.fname === e.target.value
    );
    if (customerDetails) {
      setSelectedCustomerDetails(customerDetails);
    } else {
      setSelectedCustomerDetails({});
    }
  };

  const handleTotalAmountChange = (event) => {
    setTotalAmount(parseFloat(event.target.value));
    updateRemainingAmount(parseFloat(event.target.value), advancePayment);
  };
  const handleAdvancePaymentChange = (event) => {
    const newAdvancePayment = parseFloat(event.target.value);
    if (newAdvancePayment >= 0 && newAdvancePayment <= totalAmount) {
      setAdvancePayment(newAdvancePayment);
      updateRemainingAmount(totalAmount, newAdvancePayment);
    } else if (newAdvancePayment > totalAmount) {
      // Reset advance payment to total amount if it exceeds total amount
      setAdvancePayment(totalAmount);
      updateRemainingAmount(totalAmount, totalAmount);
    } else {
      // Reset advance payment to 0 if negative value is entered
      setAdvancePayment(0);
      updateRemainingAmount(totalAmount, 0);
    }
  };

  const updateRemainingAmount = (total, advance) => {
    const remaining =
      total !== null && advance !== null ? total - advance : null;
    setRemainingAmount(remaining !== null && remaining >= 0 ? remaining : null);
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [submittedTo, setSubmittedTo] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [transaction, setTransaction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");

  const [cash, setCash] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const handleSave = () => {
    const additionalPaymentDetails = {
      ...(paymentMethod === "cheque" && {
        cheque_number: chequeNumber,
        whome_to_submit: submittedTo,
        utrno_rtgs_id: utrNumber,
      }),
      ...(paymentMethod === "cash" && {
        cash_whome_to_submit: cash,
      }),
      ...(paymentMethod === "netbanking" && {
        transaction_id: transaction,
      }),
    };

    const data = {
      client_name: selectedCustomer,
      event_name: selectedCustomerDetails.eventName,
      contact: selectedCustomerDetails.contact,
      event_Type: selectedCustomerDetails.event_Type,
      guest_number: selectedCustomerDetails.guest_number,
      venue: selectedCustomerDetails.venue,
      event_date: selectedCustomerDetails.event_date,
      amount: totalAmount,
      adv_payment: advancePayment,
      rem_payment: remainingAmount,
      payment_date: formattedDate,
      payment_time: currentTime,
      payment_method: paymentMethod,
      customer_name: selectedCustomerDetails.customer_name,
      contact: selectedCustomerDetails.contact,
      email: selectedCustomerDetails.email,
      date: selectedCustomerDetails.date,
      venue: selectedCustomerDetails.venue,
      event_name: selectedCustomerDetails.event_name,
      event_Type: selectedCustomerDetails.event_Type,
      guest_Number: selectedCustomerDetails.guest_Number,
      assign_manager_name: "",
      assign_manager_Id: "",
      Bank_Name: selectedBank,
      ...additionalPaymentDetails, // Include additional payment details
    };


    axios
      .post("http://localhost:5000/api/advpayment", data)
      .then((response) => {
        // Display alert box after successfully saving data
        alert("Customer payment successfully saved.");
        setShowModal(true);
        fetchManagers();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setAlertMessage("Failed to save customer payment.");
        setAlertVariant("danger");
      });
  };

  const fetchManagers = () => {
    axios
      .get("http://localhost:5000/api/addmanager")
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  };

  const handleAssign = () => {
    if (selectedManager) {
      const manager = JSON.parse(selectedManager);
      console.log("manager", manager);

      const transactionData = {
        date_of_transaction: currentDate.toISOString().split("T")[0],
      };

      const data = {
        customer_name: selectedCustomer,
        contact: selectedCustomerDetails.contact,
        email: selectedCustomerDetails.email,
        date: selectedCustomerDetails.event_date,
        venue: selectedCustomerDetails.venue,
        event_name: selectedCustomerDetails.eventName,
        event_Type: selectedCustomerDetails.event_type,
        guest_Number: selectedCustomerDetails.guest_number,
        assign_manager_name: manager.fname + " " + manager.lname,
        assign_manager_Id: manager._id,
        transaction_details: transactionData,
      };

    
      axios
        .post("http://localhost:5000/api/order", data)
        .then((response) => {
          console.log("Data assigned to manager successfully:", response.data);
          setShowModal(false);
          alert("Data assigned to manager successfully.");
          setAlertVariant("success");
        })
        .catch((error) => {
          console.error("Error assigning data to manager:", error);
          setAlertMessage("Failed to assign data to manager.");
          setAlertVariant("danger");
        });
    }
  };

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

  const handleBankSelect = (event) => {
    setSelectedBank(event.target.value);
  };
  

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] ">
          <div className="flex">
            <Link to={'/advpaymentcus'}>
              <button className="btn btn-primary mr-4 mb-4">Customer Payment</button>
            </Link>
            
          </div>
          <h2 className="text-[30px] pl-[1em]">Advance Payment Form</h2>
          {alertMessage && (
            <div>
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </div>
          )}
          <div className="row mb-2">
            <div className="col px-5">
              <Form.Group controlId="SelectCustomer">
                <Form.Label>Select Customers:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                    aria-label="Select Customer"
                    name="customer"
                    onChange={handleCustomerSelect}
                  >
                    <option>Select Customer</option>
                    {cusName.map((cus) => (
                      <option key={cus._id} value={cus.fname}>
                        {cus.fname}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.eventName || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.contact || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.event_type || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Guest Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.guest_number || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.venue || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCustomerDetails.event_date || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
             

              <div className="mb-3">
                <label className="form-label">Total Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Advance Payment:</label>
                <input
                  type="number"
                  className="form-control"
                  value={advancePayment}
                  onChange={handleAdvancePaymentChange}
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Remaining Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  value={remainingAmount}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Payment Method:</label>
                <select
                  className="form-control"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                {paymentMethod === "cheque" && (
                  <>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="form-label">Cheque Number:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={chequeNumber}
                          onChange={(e) => setChequeNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "cash" && (
                  <>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Name to Whom Submitted cheque:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={cash}
                          onChange={(e) => setCash(e.target.value)}
                        />
                      </div>
                    </div>

                  </>
                )}

                {paymentMethod === "netbanking" && (
                  <>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label className="form-label">Transaction Id:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={transaction}
                          onChange={(e) => setTransaction(e.target.value)}
                        />
                      </div>
                    </div>



                  </>
                )}
              </div>
            </div>
          </div>


          <div className="mb-3 px-5">
            <label className="form-label">Select Bank:</label>
            <select
              className="form-control"
              value={selectedBank}
              onChange={handleBankSelect}
            >
              <option value="">Select Bank</option>
              {bankNames.map((bank) => (
                <option key={bank._id} value={bank.Bank_Name}>
                  {bank.Bank_Name}
                </option>
              ))}
            </select>
          </div>

          <h5 className="card-title pl-[1.5em]">Transaction Details</h5>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Date of Transaction:</label>
                <input
                  type="date"
                  className="form-control"
                  value={currentDate.toISOString().split("T")[0]}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Time of Transaction:</label>
                <input
                  type="time"
                  className="form-control"
                  value={currentTime}
                  readOnly
                />
              </div>
            </div>
          </div>

          <button className="manager-btn ms-4 mb-3" onClick={handleSave}>
            Save
          </button>

          {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton style={{ marginTop: "30px" }}>
              <Modal.Title>Assign to Manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option
                    key={manager.manager_Id}
                    value={JSON.stringify(manager)}
                  >
                    {manager.fname} {manager.lname}
                  </option>
                ))}
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAssign}>
                Assign
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </>
  );
}

export default AdvancePaymnetCus;
