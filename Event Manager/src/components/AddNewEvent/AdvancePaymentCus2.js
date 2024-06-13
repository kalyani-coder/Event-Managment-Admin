import React, { useState, useEffect } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

function AdvancePaymentCus2() {
  


  const navigate = useNavigate("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [advancePayment, setAdvancePayment] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [bankNames, setBankNames] = useState([]);
  // const [selectedBank, setSelectedBank] = useState("");



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

  const managerId = localStorage.getItem('managerId')

  
//   const handleSave = () => {
//     const additionalPaymentDetails = {
//       ...(paymentMethod === "cheque" && {
//         cheque_number: chequeNumber,
//         whome_to_submit: submittedTo,
//         utrno_rtgs_id: utrNumber,
//       }),
//       ...(paymentMethod === "cash" && {
//         cash_whome_to_submit: cash,
//       }),
//       ...(paymentMethod === "netbanking" && {
//         transaction_id: transaction,
//       }),
//     };
    

//     const { customer_name, contact, event_name,event_date ,guest_quantity,event_venue,event_requirement,

//     } = inquiryData;
//     const data = {
//       managerId : managerId,
//       clientId :inquiryData._id,
//       client_name: customer_name || '',
//       contact: contact || '',
//       event_name: event_name || '',
//       event_date : event_date || '' ,
//       venue : event_venue || '' ,
//       guest_number : guest_quantity || '' ,
//       event_requirement : event_requirement || '' ,
//       amount: totalAmount,
//       adv_payment: advancePayment,
//       rem_payment: remainingAmount,
//       payment_method: paymentMethod,
//       Bank_Name : selectedBank,
//       bank_Account_Number : accountNumber,
//       payment_date: formattedDate,
//       payment_time: currentTime,
//       ...additionalPaymentDetails,

     
//     };


//     axios
//       .post("http://localhost:8888/api/advpayment", data)
//       .then((response) => {
//         // Display alert box after successfully saving data
//         alert("Customer payment successfully.");
//         setShowModal(true);
//         fetchManagers();
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//         setAlertMessage("Failed to save customer payment.");
//         setAlertVariant("danger");
//       });
//   };



  const fetchManagers = () => {
    axios
      .get("http://localhost:8888/api/addmanager")
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  };


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

  // const handleBankSelect = (event) => {
  //   setSelectedBank(event.target.value);
  // };


  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

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

const showMessage = () => {
    alert("please make payment from followup status tab")
}

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] ">
          <div className="flex">
            {/* <Link to={'/advpaymentcus'}>
              <button className="btn btn-primary mr-4 mb-4">Customer Payment</button>
            </Link> */}
            {/* <Link to={'/internalcosting'}>
              <button className="btn btn-primary mr-4 mb-4">Costing Form</button>
            </Link> */}

          </div>
          <h2 className="text-[30px] pl-[1em]">Advance Payment Form</h2>
          {alertMessage && (
            <div>
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </div>
          )}

          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"

                />
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"

                />
              </div>
            </div>

          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"

                />
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="text"
                  className="form-control"

                />
              </div>
            </div>
          </div>
          <div className="row mb-2">

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"


                />
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Guest Number</label>
                <input
                  type="text"
                  className="form-control"


                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Requirements</label>
                <input
                  type="text"
                  className="form-control"


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


          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
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
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Account Number:</label>
                <input
                  type="number"
                  className="form-control"
                  value={accountNumber}
                  onChange={(event) => setAccountNumber(event.target.value)}
                />
              </div>
            </div>
          </div>

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

          <button className="manager-btn ms-4 mb-3" onClick={showMessage}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AdvancePaymentCus2;
