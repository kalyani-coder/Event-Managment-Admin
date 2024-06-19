import React, { useState, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Alert } from "react-bootstrap";

function AdvancePaymentCus() {
  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const inquiryData = JSON.parse(queryParams.get("inquiryData"));

  useEffect(() => {
    if (inquiryData) {
      console.log("Inquiry data received:", inquiryData);
    }
  }, [inquiryData]);

  const [totalAmount, setTotalAmount] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [bankNames, setBankNames] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [transaction, setTransaction] = useState("");
  const [submittedTo, setSubmittedTo] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [errors, setErrors] = useState({});
  
  const managerId = localStorage.getItem('managerId');

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

  const handleTotalAmountChange = (event) => {
    const value = parseFloat(event.target.value);
    setTotalAmount(value);
    if (advancePayment) {
      setRemainingAmount(value - advancePayment);
    }
    setErrors((prevErrors) => ({ ...prevErrors, totalAmount: "" }));
  };

  const handleAdvancePaymentChange = (event) => {
    const value = parseFloat(event.target.value);
    setAdvancePayment(value);
    if (totalAmount) {
      setRemainingAmount(totalAmount - value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, advancePayment: "" }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, paymentMethod: "" }));
  };

  const handleBankSelect = (event) => {
    const selectedBankName = event.target.value;
    setSelectedBank(selectedBankName);
    const selectedBankObj = bankNames.find(bank => bank.Bank_Name === selectedBankName);
    setAccountNumber(selectedBankObj ? selectedBankObj.Account_Number : '');
    setErrors((prevErrors) => ({ ...prevErrors, selectedBank: "" }));
  };

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!totalAmount) {
      newErrors.totalAmount = "This field is mandatory.";
    }

    if (!advancePayment && advancePayment !== 0) {
      newErrors.advancePayment = "This field is mandatory.";
    }

    if (!selectedBank) {
      newErrors.selectedBank = "This field is mandatory.";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "This field is mandatory.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const additionalPaymentDetails = {
      ...(paymentMethod === "cheque" && { cheque_number: chequeNumber }),
      ...(paymentMethod === "cash" && { whome_to_submit: submittedTo }),
      ...(paymentMethod === "netbanking" && { transaction_id: transaction }),
    };

    const data = {
      managerId,
      clientId: inquiryData._id,
      client_name: inquiryData.customer_name || '',
      contact: inquiryData.contact || '',
      event_name: inquiryData.event_name || '',
      event_date: inquiryData.event_date || '',
      venue: inquiryData.event_venue || '',
      guest_number: inquiryData.guest_quantity || '',
      event_requirement: inquiryData.event_requirement || '',
      amount: totalAmount,
      adv_payment: advancePayment,
      rem_payment: remainingAmount,
      payment_method: paymentMethod,
      Bank_Name: selectedBank,
      bank_Account_Number: accountNumber,
      payment_date: currentDate.toISOString().split("T")[0],
      payment_time: currentTime,
      ...additionalPaymentDetails,
    };

    axios
      .post("http://localhost:8888/api/advpayment", data)
      .then(() => {
        alert("Customer payment successfully.");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setAlertMessage("Failed to save customer payment.");
        setAlertVariant("danger");
      });
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <h2 className="text-[30px] pl-[1em]">Advance Payment Form</h2>
          {alertMessage && (
            <Alert variant={alertVariant}>{alertMessage}</Alert>
          )}

          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={inquiryData.customer_name || ''}
                  readOnly
                />
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={inquiryData.contact || ''}
                  readOnly
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
                  value={inquiryData.event_name || ''}
                  readOnly
                />
              </div>
            </div>

            
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={inquiryData.event_date || ''}
                  readOnly
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
                  value={inquiryData.event_venue || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Guest Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={inquiryData.guest_quantity || ''}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="row mb-2">
           <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Total Amount:<span style={{ color: "red" }}>*</span></label>
                <input
                  type="number"
                  className={`form-control ${errors.totalAmount ? "is-invalid" : ""}`}
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                />
                {errors.totalAmount && (
                  <div className="text-danger">{errors.totalAmount}</div>
                )}
              </div>
            </div> 
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Advance Payment:<span style={{ color: "red" }}>*</span></label>
                <input
                  type="number"
                  className={`form-control ${errors.advancePayment ? "is-invalid" : ""}`}
                  value={advancePayment}
                  onChange={handleAdvancePaymentChange}
                />
                {errors.advancePayment && (
                  <div className="text-danger">{errors.advancePayment}</div>
                )}
              </div>
            </div>
           
          </div>

          <div className="row mb-2">
           

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Remaining Amount:</label>
                <input
                  type="number"
                  className={`form-control ${errors.remainingAmount ? "is-invalid" : ""}`}
                  value={remainingAmount}
                  readOnly
                />
                {errors.remainingAmount && (
                  <div className="text-danger">{errors.remainingAmount}</div>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Payment Method:<span style={{ color: "red" }}>*</span></label>
                <select
                  className={`form-control ${errors.paymentMethod ? "is-invalid" : ""}`}
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="netbanking">Net Banking</option>
                </select>
                {errors.paymentMethod && (
                  <div className="text-danger">{errors.paymentMethod}</div>
                )}
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                {paymentMethod === "cheque" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Cheque Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={chequeNumber}
                        onChange={(e) => setChequeNumber(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {paymentMethod === "cash" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">
                        Name to Whom Submitted:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={submittedTo}
                        onChange={(e) => setSubmittedTo(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {paymentMethod === "netbanking" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Transaction Id:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={transaction}
                        onChange={(e) => setTransaction(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Select Bank:<span style={{ color: "red" }}>*</span></label>
                <select
                  className={`form-control ${errors.selectedBank ? "is-invalid" : ""}`}
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
                {errors.selectedBank && (
                  <div className="text-danger">{errors.selectedBank}</div>
                )}
              </div>
            </div>

            <div className="col px-5">
              <div className="mb-3">
                <label className="form-label">Account Number:</label>
                <input
                  type="number"
                  className="form-control"
                  value={accountNumber}
                  readOnly
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

          <button className="manager-btn ms-4 mb-3" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AdvancePaymentCus;
