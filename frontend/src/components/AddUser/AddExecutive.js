import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Link } from 'react-router-dom';

const AddExecutive = () => {
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
  const [errors, setErrors] = useState({});

  const handleDiscard = () => {
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
    setErrors({});
  };

  const isValidForm = () => {
    const newErrors = {};
    if (!fname) newErrors.fname = "First name is required";
    if (!lname) newErrors.lname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!contact) newErrors.contact = "Phone is required";
    if (!account_number) newErrors.account_number = "Account number is required";
    if (!bank_name) newErrors.bank_name = "Bank name is required";
    if (!holder_name) newErrors.holder_name = "Account holder name is required";
    if (!IFSC_code) newErrors.IFSC_code = "IFSC code is required";
    if (!branch_name) newErrors.branch_name = "Branch name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        "http://localhost:8888/api/executive",
        formData
      );

      if (response.status === 200) {
        alert("Data submitted successfully!");
        handleDiscard();
      } else {
        alert("Error while submitting data.");
      }
    } catch (error) {
      console.log("Error", error);
      alert("Error submitting data. Please try again later.");
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
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh]">
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
              {/* <Link to={'/addvendor'}>
                <button className="btn btn-primary mr-4 mb-4">Add Vendor</button>
              </Link> */}
            </div>
            <h2 className="text-[30px] pl-[1em]">Add Executive</h2>

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
                    style={{ borderColor: errors.fname ? "red" : "" }}
                  />
                  {errors.fname && <div style={{ color: "red" }}>{errors.fname}</div>}
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
                    style={{ borderColor: errors.lname ? "red" : "" }}
                  />
                  {errors.lname && <div style={{ color: "red" }}>{errors.lname}</div>}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="email">
                  <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter email"
                    style={{ borderColor: errors.email ? "red" : "" }}
                  />
                  {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
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
                    style={{ borderColor: errors.contact ? "red" : "" }}
                  />
                  {errors.contact && <div style={{ color: "red" }}>{errors.contact}</div>}
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
                  <Form.Label>Account Holder Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={holder_name}
                    onChange={(e) => setholder_name(e.target.value)}
                    placeholder="Enter account holder name"
                    style={{ borderColor: errors.holder_name ? "red" : "" }}
                  />
                  {errors.holder_name && <div style={{ color: "red" }}>{errors.holder_name}</div>}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="account_number">
                  <Form.Label>Account Number <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={account_number}
                    onChange={(e) => setaccount_number(e.target.value)}
                    placeholder="Enter account number"
                    style={{ borderColor: errors.account_number ? "red" : "" }}
                  />
                  {errors.account_number && <div style={{ color: "red" }}>{errors.account_number}</div>}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="IFSC_code">
                  <Form.Label>IFSC Code <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={IFSC_code}
                    onChange={(e) => setIFSC_code(e.target.value)}
                    placeholder="Enter IFSC code"
                    style={{ borderColor: errors.IFSC_code ? "red" : "" }}
                  />
                  {errors.IFSC_code && <div style={{ color: "red" }}>{errors.IFSC_code}</div>}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="bank_name">
                  <Form.Label>Bank Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={bank_name}
                    onChange={(e) => setbank_name(e.target.value)}
                    placeholder="Enter bank name"
                    style={{ borderColor: errors.bank_name ? "red" : "" }}
                  />
                  {errors.bank_name && <div style={{ color: "red" }}>{errors.bank_name}</div>}
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="branch_name">
                  <Form.Label>Branch Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={branch_name}
                    onChange={(e) => setbranch_name(e.target.value)}
                    placeholder="Enter branch name"
                    style={{ borderColor: errors.branch_name ? "red" : "" }}
                  />
                  {errors.branch_name && <div style={{ color: "red" }}>{errors.branch_name}</div>}
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="profilePicture">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                  />
                  {profilePicture && (
                    <div>
                      <p>{profilePicture.name}</p>
                      <Button variant="link" onClick={handleRemoveProfilePicture}>
                        Remove
                      </Button>
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleDiscard} className="ml-2">
              Discard
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddExecutive;
