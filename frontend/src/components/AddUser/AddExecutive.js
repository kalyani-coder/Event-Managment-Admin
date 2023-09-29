import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddExecutive.css";
import axios from "axios";

const AddExecutive = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDiscard = () => {
    setfname("");
    setlname("");
    setemail("");
    setcontact("");
    setaddress("");
    setcity("");
    setstate("");
    setAccountHolderName("");
    setAccountNumber("");
    setIfscCode("");
    setBankName("");
    setBranchName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fname,
      lname,
      email,
      contact,
      address,
      city,
      state,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture: profilePicture ? profilePicture.name : null,
    };
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/executive",
        formData
      );
      console.log(response);
      if (response.status === 200) {
        alert("data is submitted ");
        handleDiscard();
      } else {
        alert("error while submitting ");
      }
    } catch (error) {
      console.log("Error", error);
    }
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
      <h2>Add Executive</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fname">
          <Form.Label>
            First Name <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={fname}
            onChange={(e) => setfname(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </Form.Group>

        <Form.Group controlId="lname">
          <Form.Label>
            Last Name <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={lname}
            onChange={(e) => setlname(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>
            Email <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>
            Phone <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            placeholder="Enter phone"
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>
            Address <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>
            City <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>
            State <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            value={state}
            onChange={(e) => setstate(e.target.value)}
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

export default AddExecutive;
