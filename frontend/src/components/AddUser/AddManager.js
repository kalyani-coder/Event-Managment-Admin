import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Link } from "react-router-dom";
import "./AddManager.css";

const AddManager = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  

  const [validationMessages, setValidationMessages] = useState({});

  const isValidForm = () => {
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    let newValidationMessages = {};

    // Validate required fields and format for first name, last name, email, and password
    const requiredFields = [
      { value: fname, field: "fname", label: "First Name" },
      { value: lname, field: "lname", label: "Last Name" },
      { value: email, field: "email", label: "Email" },
      { value: password, field: "password", label: "Password" },
      { value: contact, field: "contact", label: "Phone" },
    ];

    requiredFields.forEach(({ value, field, label }) => {
      if (!value) {
        newValidationMessages[field] = `Please fill out the ${label}.`;
      }
    });

    if (!newValidationMessages.password && password.length < 4) {
      newValidationMessages.password =
        "Password must be at least 4 characters long.";
    }

    if (!newValidationMessages.contact) {
      const phoneNumber = contact.trim();
      if (!/^\d{10}$/.test(phoneNumber)) {
        newValidationMessages.contact = "Phone should have exactly 10 digits.";
      }
    }

    if (!newValidationMessages.email && !emailPattern.test(email)) {
      newValidationMessages.email = "Please enter a valid email address.";
    }

    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      window.scrollTo(0, 0);
      return false;
    }

    setValidationMessages({});
    return true;
  };

  const handleDiscard = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setContact("");
    setAddress("");
    setCity("");
    setState("");
    setAccountNumber("");
    setHolderName("");
    setBankName("");
    setBranchName("");
    setIfscCode("");
    setValidationMessages({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }
    

    const formData = {
      fname,
      lname,
      email,
      password,
      contact,
      address,
      city,
      state,
      holderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/api/addmanager",
        formData
      );
      console.log("Data posted:", response.data);

      alert("Manager Added successfully!");

      setShowSuccessAlert(true);
      handleDiscard();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const indianStates = [
    "",
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const handleAlphaInputChange = (setter) => (event) => {
    const { value } = event.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setter(value);
    }
  };

  const handleNumericInputChange = (setter, maxLength) => (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setter(value);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount  overflow-y-auto ">
        <div className="md:h-[80vh] h-[80vh] ">
          <Form onSubmit={handleSubmit} className="">
            <div className="flex">
              <Link to={"/addmanager"}> <button className="btn btn-primary mr-4 mb-4"> Add Manager </button> </Link>
              <Link to={"/addaccountant"}><button className="btn btn-primary mr-4 mb-4"> Add Accountant</button></Link>
              <Link to={"/addexecutive"}>  <button className="btn btn-primary mr-4 mb-4">  Add Executive </button></Link>
              </div>
            <h2 className="text-[30px] pl-[1em] ">Add Manager</h2>

            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="fname">
                  <Form.Label
                    className={validationMessages.fname ? "label-invalid" : ""}
                  >
                    First Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.fname ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={fname}
                    onChange={handleAlphaInputChange(setFname)}
                    placeholder="Enter first name"
                    pattern="[A-Za-z\s]+"
                  />
                  {validationMessages.fname && (
                    <div className="invalid-feedback">
                      {validationMessages.fname}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="lname">
                  <Form.Label
                    className={validationMessages.lname ? "label-invalid" : ""}
                  >
                    Last Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.lname ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={lname}
                    onChange={handleAlphaInputChange(setLname)}
                    placeholder="Enter last name"
                    pattern="[A-Za-z\s]+"
                  />
                  {validationMessages.lname && (
                    <div className="invalid-feedback">
                      {validationMessages.lname}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="email">
                  <Form.Label
                    className={validationMessages.email ? "label-invalid" : ""}
                  >
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  {validationMessages.email && (
                    <div className="invalid-feedback">
                      {validationMessages.email}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="password">
                  <Form.Label
                    className={
                      validationMessages.password ? "label-invalid" : ""
                    }
                  >
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  {validationMessages.password && (
                    <div className="invalid-feedback">
                      {validationMessages.password}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="contact">
                  <Form.Label
                    className={
                      validationMessages.contact ? "label-invalid" : ""
                    }
                  >
                    Phone<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.contact ? "is-invalid" : ""
                    }`}
                    type="tel"
                    value={contact}
                    onChange={handleNumericInputChange(setContact, 10)}
                    placeholder="Enter phone"
                  />
                  {validationMessages.contact && (
                    <div className="invalid-feedback">
                      {validationMessages.contact}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="city">
                  <Form.Label
                    className={validationMessages.city ? "label-invalid" : ""}
                  >
                    City
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.city ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={city}
                    onChange={handleAlphaInputChange(setCity)}
                    placeholder="Enter city"
                  />
                  {validationMessages.city && (
                    <div className="invalid-feedback">
                      {validationMessages.city}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
  as="select"
  value={state}
  onChange={(e) => setState(e.target.value)}
  placeholder="Select State"
>
  <option value="" disabled>
    Select State
  </option>
  {indianStates.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="holder_name">
                  <Form.Label
                    className={
                      validationMessages.holderName ? "label-invalid" : ""
                    }
                  >
                    Account Holder Name
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.holderName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={holderName}
                    onChange={handleAlphaInputChange(setHolderName)}
                    placeholder="Enter account holder name"
                  />
                  {validationMessages.holderName && (
                    <div className="invalid-feedback">
                      {validationMessages.holderName}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="account_number">
                  <Form.Label
                    className={
                      validationMessages.accountNumber ? "label-invalid" : ""
                    }
                  >
                    Account Number
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.accountNumber ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={accountNumber}
                    onChange={handleNumericInputChange(setAccountNumber, 18)}
                    placeholder="Enter account number"
                  />
                  {validationMessages.accountNumber && (
                    <div className="invalid-feedback">
                      {validationMessages.accountNumber}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="bank_name">
                  <Form.Label
                    className={
                      validationMessages.bankName ? "label-invalid" : ""
                    }
                  >
                    Bank Name
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.bankName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={bankName}
                    onChange={handleAlphaInputChange(setBankName)}
                    placeholder="Enter bank name"
                  />
                  {validationMessages.bankName && (
                    <div className="invalid-feedback">
                      {validationMessages.bankName}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="branch_name">
                  <Form.Label
                    className={
                      validationMessages.branchName ? "label-invalid" : ""
                    }
                  >
                    Branch Name
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.branchName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={branchName}
                    onChange={handleAlphaInputChange(setBranchName)}
                    placeholder="Enter branch name"
                  />
                  {validationMessages.branchName && (
                    <div className="invalid-feedback">
                      {validationMessages.branchName}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="IFSC_code">
                  <Form.Label
                    className={
                      validationMessages.ifscCode ? "label-invalid" : ""
                    }
                  >
                    IFSC Code
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.ifscCode ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    placeholder="Enter IFSC code"
                  />
                  {validationMessages.ifscCode && (
                    <div className="invalid-feedback">
                      {validationMessages.ifscCode}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Button
                  className="manager-btn my-1"
                  variant="info"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  variant="info"
                  className="manager-btn ms-1"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddManager;