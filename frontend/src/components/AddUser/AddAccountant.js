import { Form, Button, Alert } from "react-bootstrap";
import "./AddAccountant.css";
import React, { useState } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';


const AddAccountant = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, alert] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [account_number, setaccount_number] = useState("");
  const [holder_name, setholder_name] = useState("");
  const [bank_name, setbank_name] = useState("");
  const [branch_name, setbranch_name] = useState("");
  const [IFSC_code, setIFSC_code] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const isValidForm = () => {
    if (
      !fname ||
      !lname ||
      !email ||
      !contact
      // !address ||
      // !city ||
      // state === "" || // Check against empty string
      // !holder_name ||
      // !account_number ||
      // !IFSC_code ||
      // !bank_name ||
      // !branch_name
    ) {
      alert("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const handleDiscard = () => {
    setfname("");
    setlname("");
    setemail("");
    setcontact("");
    setaddress("");
    setcity("");
    setstate("");
    setaccount_number("");
    setholder_name("");
    setbank_name("");
    setbranch_name("");
    setIFSC_code("");
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
      contact,
      address,
      city,
      state,
      holder_name,
      account_number,
      IFSC_code,
      bank_name,
      branch_name,
      profilePicture: profilePicture ? profilePicture.name : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/api/accountant",
        formData
      );

      if (response.status === 200) {
        console.log("Data successfully submitted:", response.data);
        // Show success message
        alert("Data submitted successfully!");
        setShowSuccessAlert(true);
        handleDiscard();
      } else {
        console.log("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setfname("");
    setlname("");
    setemail("");
    setcontact("");
    setaddress("");
    setcity("");
    setstate("");
    setholder_name("");
    setaccount_number("");
    setIFSC_code("");
    setbank_name("");
    setbranch_name("");
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
    <>
      <Header />{" "}
      <div className="w-full  h-screen  flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh]">
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
            <h2 className="text-[30px] pl-[1em] ">Add Accountant</h2>

            <div className="row mb-2">
              <div className="col px-5">
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
              </div>
              <div className="col px-5">
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
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="col px-5">
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
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    placeholder="Enter city"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  >
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="holder_name">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={holder_name}
                    onChange={(e) => setholder_name(e.target.value)}
                    placeholder="Enter account holder name"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="account_number">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={account_number}
                    onChange={(e) => setaccount_number(e.target.value)}
                    placeholder="Enter account number"
                  />
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="IFSC_code">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={IFSC_code}
                    onChange={(e) => setIFSC_code(e.target.value)}
                    placeholder="Enter IFSC code"
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
                    value={bank_name}
                    onChange={(e) => setbank_name(e.target.value)}
                    placeholder="Enter bank name"
                  />
                </Form.Group>
              </div>

              <div className="col px-5">
                <Form.Group controlId="branch_name">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={branch_name}
                    onChange={(e) => setbranch_name(e.target.value)}
                    placeholder="Enter branch name"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="profilePicture">
                  <Form.Label>Profile Picture</Form.Label>
                  <div className="custom-file ">
                    <Form.Control
                      type="file"
                      className="custom-file-input"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <Form.Label className="custom-file-label">
                      {profilePicture ? profilePicture.name : "Choose File"}
                    </Form.Label>
                    <div className="">
                      {profilePicture && (
                        <Button
                          type="button"
                          onClick={handleRemoveProfilePicture}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2 py-2">
              <div className="col px-5">
                <Button
                  className="manager-btn ms-1"
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

export default AddAccountant;
