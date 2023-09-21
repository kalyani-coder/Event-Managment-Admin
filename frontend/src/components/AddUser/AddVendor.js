import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddVendor.css";
import axios from "axios";

const AddVendor = () => {
  const [vendorCategory, setVendorCategory] = useState("");
  const [vendorCompanyName, setVendorCompanyName] = useState("");
  const [vendorContactPerson, setVendorContactPerson] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorCity, setVendorCity] = useState("");
  const [vendorState, setVendorState] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDiscard = () => {
    setVendorCategory("");
    setVendorCompanyName("");
    setVendorContactPerson("");
    setVendorEmail("");
    setVendorPhone("");
    setVendorAddress("");
    setVendorCity("");
    setVendorState("");
    setGstNumber("");
    setPanNumber("");
    setProfilePicture(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert form data to JSON object
    const formData = {
      vendorCategory,
      vendorCompanyName,
      vendorContactPerson,
      vendorEmail,
      vendorPhone,
      vendorAddress,
      vendorCity,
      vendorState,
      gstNumber,
      panNumber,
      profilePicture: profilePicture ? profilePicture.name : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/vendors",
        formData
      );

      if (response.status === 200) {
        alert("data has been submitted ");
        handleDiscard();
      } else {
        alert("something went wrong");
        console.log(response);
      }
    } catch (e) {
      alert(`error ${e}`);
    }

    // Clear form fields after submission
    handleDiscard();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
  };

  // List of Indian states for the select options (in alphabetical order)
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
      <h2>Add Vendor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="vendorCompanyName">
          <Form.Label>
            Company Name <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorCompanyName}
            onChange={(e) => setVendorCompanyName(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </Form.Group>

        <Form.Group controlId="vendorContactPerson">
          <Form.Label>Contact Person Name</Form.Label>
          <Form.Control
            type="text"
            value={vendorContactPerson}
            onChange={(e) => setVendorContactPerson(e.target.value)}
            placeholder="Enter contact person name"
          />
        </Form.Group>

        <Form.Group controlId="vendorCategory">
          <Form.Label>
            Vendor Category <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorCategory}
            onChange={(e) => setVendorCategory(e.target.value)}
            placeholder="Enter vendor category"
            required
          />
        </Form.Group>

        <Form.Group controlId="vendorEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
            placeholder="Enter vendor email"
          />
        </Form.Group>

        <Form.Group controlId="vendorPhone">
          <Form.Label>
            Phone <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            value={vendorPhone}
            onChange={(e) => setVendorPhone(e.target.value)}
            placeholder="Enter vendor phone"
            maxLength={10}
            required
          />
        </Form.Group>

        <Form.Group controlId="vendorAddress">
          <Form.Label>
            Address <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
            placeholder="Enter vendor address"
            required
          />
        </Form.Group>

        <Form.Group controlId="vendorCity">
          <Form.Label>
            City <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorCity}
            onChange={(e) => setVendorCity(e.target.value)}
            placeholder="Enter vendor city"
            required
          />
        </Form.Group>

        <Form.Group controlId="vendorState">
          <Form.Label>
            State <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            value={vendorState}
            onChange={(e) => setVendorState(e.target.value)}
            required
          >
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="gstNumber">
          <Form.Label>GST Number</Form.Label>
          <Form.Control
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="Enter GST number"
          />
        </Form.Group>

        <Form.Group controlId="panNumber">
          <Form.Label>PAN Number</Form.Label>
          <Form.Control
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            placeholder="Enter PAN number"
          />
        </Form.Group>

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
                className="btn btn-link btn-sm my-4"
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

export default AddVendor;
