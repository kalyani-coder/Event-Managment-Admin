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
        <Form.Group controlId="firstName">
          <Form.Label>
            First Name <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>
            Last Name <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerEmail">
          <Form.Label>
            Email <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerPhone">
          <Form.Label>
            Phone <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            value={managerPhone}
            onChange={(e) => setManagerPhone(e.target.value)}
            placeholder="Enter phone"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerAddress">
          <Form.Label>
            Address <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={managerAddress}
            onChange={(e) => setManagerAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerCity">
          <Form.Label>
            City <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={managerCity}
            onChange={(e) => setManagerCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </Form.Group>

        <Form.Group controlId="managerState">
          <Form.Label>
            State <span className="required">*</span>
          </Form.Label>
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

        {/* ... (other form fields) */}

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
