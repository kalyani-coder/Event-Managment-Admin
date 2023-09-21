import { Form, Button } from "react-bootstrap";
import "./AddAccountant.css";
import React, { useState } from "react";
import axios from "axios";

const AddAccountant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountantEmail, setAccountantEmail] = useState("");
  const [accountantPhone, setAccountantPhone] = useState("");
  const [accountantAddress, setAccountantAddress] = useState("");
  const [accountantCity, setAccountantCity] = useState("");
  const [accountantState, setAccountantState] = useState("");
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
      !accountantEmail ||
      !accountantPhone ||
      !accountantAddress ||
      !accountantCity ||
      accountantState === "" ||
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
    setAccountantEmail("");
    setAccountantPhone("");
    setAccountantAddress("");
    setAccountantCity("");
    setAccountantState("");
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
      accountantEmail,
      accountantPhone,
      accountantAddress,
      accountantCity,
      accountantState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture: profilePicture ? profilePicture.name : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/accountants",
        formData
      );

      if (response.status === 200) {
        console.log("Data successfully submitted:", response.data);
        handleDiscard();
      } else {
        console.log("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setFirstName("");
    setLastName("");
    setAccountantEmail("");
    setAccountantPhone("");
    setAccountantAddress("");
    setAccountantCity("");
    setAccountantState("");
    setAccountHolderName("");
    setAccountNumber("");
    setIfscCode("");
    setBankName("");
    setBranchName("");
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
      <h2>Add Accountant</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>
            First Name <span style={{ color: "red" }}>*</span>
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
            Last Name <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="accountantEmail">
          <Form.Label>
            Email <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            value={accountantEmail}
            onChange={(e) => setAccountantEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="accountantPhone">
          <Form.Label>
            Phone <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            value={accountantPhone}
            onChange={(e) => setAccountantPhone(e.target.value)}
            placeholder="Enter phone"
            required
          />
        </Form.Group>

        <Form.Group controlId="accountantAddress">
          <Form.Label>
            Address <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={accountantAddress}
            onChange={(e) => setAccountantAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="accountantCity">
          <Form.Label>
            City <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={accountantCity}
            onChange={(e) => setAccountantCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </Form.Group>

        <Form.Group controlId="accountantState">
          <Form.Label>
            State <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            value={accountantState}
            onChange={(e) => setAccountantState(e.target.value)}
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
            <Form.Label>
              Account Holder Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              placeholder="Enter account holder name"
              required
            />
          </Form.Group>
          <Form.Group controlId="accountNumber">
            <Form.Label>
              Account Number <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              required
            />
          </Form.Group>

          <Form.Group controlId="ifscCode">
            <Form.Label>
              IFSC Code <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="Enter IFSC code"
              required
            />
          </Form.Group>

          <Form.Group controlId="bankName">
            <Form.Label>
              Bank Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="branchName">
            <Form.Label>
              Branch Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
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

export default AddAccountant;
