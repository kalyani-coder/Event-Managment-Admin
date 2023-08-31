import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddManager.css";
import axios from "axios";

const AddManager = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [managerAddress, setManagerAddress] = useState("");
  const [managerCity, setManagerCity] = useState("");
  const [managerState, setManagerState] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const isValidForm = () => {
    if (
      !firstName ||
      !lastName ||
      !managerEmail ||
      !managerPhone ||
      !managerAddress ||
      !managerCity ||
      managerState === "" ||
      !accountHolderName ||
      !accountNumber ||
      !ifscCode ||
      !bankName ||
      !branchName
    ) {
      alert("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const handleDiscard = () => {
    setFirstName("");
    setLastName("");
    setManagerEmail("");
    setManagerPhone("");
    setManagerAddress("");
    setManagerCity("");
    setManagerState("");
    setAccountNumber("");
    setAccountHolderName("");
    setBankName("");
    setBranchName("");
    setIfscCode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      managerEmail,
      managerPhone,
      managerAddress,
      managerCity,
      managerState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture: profilePicture ? profilePicture.name : null,
    };
    console.log(formData)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/managers",
        formData
      );
      console.log("Data posted:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }

    setFirstName("");
    setLastName("");
    setManagerEmail("");
    setManagerPhone("");
    setManagerAddress("");
    setManagerCity("");
    setManagerState("");
    setAccountNumber("");
    setAccountHolderName("");
    setBankName("");
    setBranchName("");
    setIfscCode("");
    setProfilePicture(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
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
    <div className="container mt-5">
      <h2>Add Manager</h2>
      <Form onSubmit={handleSubmit}>
        {/* Similar form fields to previous versions, but adjust the labels and placeholders */}
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={managerPhone}
            onChange={(e) => setManagerPhone(e.target.value)}
            placeholder="Enter phone"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={managerAddress}
            onChange={(e) => setManagerAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={managerCity}
            onChange={(e) => setManagerCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerState">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            value={managerState}
            onChange={(e) => setManagerState(e.target.value)}
            required
          >
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <div>
          <hr />
          <br />
          <h3>Bank Details:</h3>
          <Form.Group controlId="accountHolderName">
            <Form.Label>Account Holder Name</Form.Label>
            <Form.Control
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              placeholder="Enter account holder name"
              required
            />
          </Form.Group>
          <Form.Group controlId="accountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              required
            />
          </Form.Group>

          <Form.Group controlId="ifscCode">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="Enter IFSC code"
              required
            />
          </Form.Group>

          <Form.Group controlId="bankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="branchName">
            <Form.Label>Branch Name</Form.Label>
            <Form.Control
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
              required
            />
          </Form.Group>
          <br />
          <hr />
        </div>
        <Form.Group controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <div className="custom-file">
            <Form.Control
              type="file"
              className="custom-file-input"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Form.Label className="custom-file-label">
              {profilePicture ? profilePicture.name : "Choose File"}
            </Form.Label>
            {profilePicture && (
              <button
                type="button"
                className="btn btn-link btn-sm"
                onClick={handleRemoveProfilePicture}
              >
                Remove
              </button>
            )}
          </div>
        </Form.Group>

        <Button className="my-4" variant="info" type="submit">
          Submit
        </Button>
        <Button variant="info" className="mx-5" onClick={handleDiscard}>
          Discard
        </Button>
      </Form>
    </div>
  );
};

export default AddManager;
