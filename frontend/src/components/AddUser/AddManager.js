import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';
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
  const [profilePicture, setProfilePicture] = useState(null);

  const isValidForm = () => {
    if (!fname || !lname || !contact || !password) {
      alert("Please fill out all required fields.");
      return false;
    }
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
        "http://localhost:5000/api/addmanager",
        formData
      );
      console.log("Data posted:", response.data);

      setSuccessMessage("Manager Added successfully!");
      setShowSuccessAlert(true);

      handleDiscard();
    } catch (error) {
      console.error("Error posting data:", error);
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
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount  overflow-y-auto ">
       
        <div className="md:h-[80vh] h-[80vh] ">
          {showSuccessAlert && (
            <Alert
              variant="success"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              {successMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="">
          <div className="flex">
            <Link to={'/addmanager'}>
              <button className="btn btn-primary mr-4 mb-4">Add Manager</button>
            </Link>
            <Link to={'/addaccountant'}>
              <button className="btn btn-primary mr-4 mb-4">Add Accountant</button>
            </Link>
            <Link to={'/addexecutive'}>
              <button className="btn btn-primary mr-4 mb-4">Add Executive</button>
            </Link>
            <Link to={'/addvendor'}>
              <button className="btn btn-primary mr-4 mb-4">Add Vendor</button>
            </Link>
          </div>
            <h2 className="text-[30px] pl-[1em] ">Add Manager</h2>

            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="fname">
                  <Form.Label>
                    First Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className="input-area"
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="lname">
                  <Form.Label>
                    Last Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="password">
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="contact">
                  <Form.Label>
                    Phone<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter phone"
                    required
                  />
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
                  <Form.Label>City</Form.Label>
                  <Form.Control
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
                    as="select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
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
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="Enter account holder name"
                  />
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="account_number">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="bank_name">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                  />
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="branch_name">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="Enter branch name"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="IFSC_code">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    placeholder="Enter IFSC code"
                  />
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

            {/* <button className="manager-btn"> Hover me
          </button> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddManager;
