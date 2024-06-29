import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Link } from "react-router-dom";
import "./AddManager.css";

const AddManager = () => {
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
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    let newValidationMessages = {};

    // Validate required fields and format for first name, last name, email, and password
    const requiredFields = [
      { value: fname, field: "fname", label: "First Name" },
      { value: lname, field: "lname", label: "Last Name" },
      { value: email, field: "email", label: "Email" },
      { value: password, field: "password", label: "Password" },
      { value: contact, field: "contact", label: "Phone" },
      { value: accountNumber, field: "accountNumber", label: "Account Number" },
      { value: holderName, field: "holderName", label: "Account Holder Name" },
      { value: bankName, field: "bankName", label: "Bank Name" },
      { value: branchName, field: "branchName", label: "Branch Name" },
      { value: ifscCode, field: "ifscCode", label: "IFSC Code" },
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
      accountNumber,
      holderName,
      bankName,
      branchName,
      ifscCode,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/api/addmanager",
        formData
      );
      console.log("Data posted:", response.data);

      alert("Manager Added successfully!");

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

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount  overflow-y-auto ">
        <div className="md:h-[80vh] h-[80vh] ">
          <Form onSubmit={handleSubmit} className="">
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
                    onChange={(e) => setFname(e.target.value)}
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
                    onChange={(e) => setLname(e.target.value)}
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
                    Phone <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.contact ? "is-invalid" : ""
                    }`}
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
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
                    className="input-area"
                    as="textarea"
                    rows={3}
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
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    className="input-area"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                  />
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    className="input-area"
                    as="select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {indianStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="account_number">
                  <Form.Label
                    className={
                      validationMessages.accountNumber ? "label-invalid" : ""
                    }
                  >
                    Account Number <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.accountNumber ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                  {validationMessages.accountNumber && (
                    <div className="invalid-feedback">
                      {validationMessages.accountNumber}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="holder_name">
                  <Form.Label
                    className={
                      validationMessages.holderName ? "label-invalid" : ""
                    }
                  >
                    Account Holder Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.holderName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="Enter account holder name"
                  />
                  {validationMessages.holderName && (
                    <div className="invalid-feedback">
                      {validationMessages.holderName}
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
                    Bank Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.bankName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
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
                    Branch Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className={`input-area ${
                      validationMessages.branchName ? "is-invalid" : ""
                    }`}
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
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
                <Form.Group controlId="ifsc_code">
                  <Form.Label
                    className={validationMessages.ifscCode ? "label-invalid" : ""}
                  >
                    IFSC Code <span style={{ color: "red" }}>*</span>
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
                <Button variant="secondary" onClick={handleDiscard}>
                  Discard
                </Button>
              </div>
              <div className="col px-5">
                <Button variant="primary" type="submit">
                  Save
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
