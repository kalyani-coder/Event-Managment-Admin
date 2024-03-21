import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./AddVendor.css";
import axios from "axios";

const AddVendor = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [contact_person_name, setcontact_person_name] = useState("");
  const [gmail, setgmail] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [vendorCity, setVendorCity] = useState("");
  const [vendorState, setVendorState] = useState("");
  const [gst_no, setgst_no] = useState("");
  const [pan_no, setpan_no] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDiscard = () => {
    setVendorCategory("");
    setcompany_name("");
    setcontact_person_name("");
    setgmail("");
    setcontact("");
    setaddress("");
    setVendorCity("");
    setVendorState("");
    setgst_no("");
    setpan_no("");
    setProfilePicture(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert form data to JSON object
    const formData = {
      vendorCategory,
      company_name,
      contact_person_name,
      gmail,
      contact,
      address,
      vendorCity,
      vendorState,
      gst_no,
      pan_no,
      profilePicture: profilePicture ? profilePicture.name : null,
    };

    try {
      const response = await axios.post(
        "https://eventmanagement-admin-hocm.onrender.com/api/vendor",
        formData
      );

      if (response.status === 200) {
        // Show success message
      setSuccessMessage("Data submitted successfully!");
      setShowSuccessAlert(true);
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
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          {successMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="company_name">
          <Form.Label>
            Company Name
          </Form.Label>
          <Form.Control
            type="text"
            value={company_name}
            onChange={(e) => setcompany_name(e.target.value)}
            placeholder="Enter company name"

          />
        </Form.Group>

        <Form.Group controlId="contact_person_name">
          <Form.Label>Contact Person Name</Form.Label>
          <Form.Control
            type="text"
            value={contact_person_name}
            onChange={(e) => setcontact_person_name(e.target.value)}
            placeholder="Enter contact person name"
          />
        </Form.Group>

        <Form.Group controlId="vendorCategory">
          <Form.Label>
            Vendor Category
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorCategory}
            onChange={(e) => setVendorCategory(e.target.value)}
            placeholder="Enter vendor category"

          />
        </Form.Group>

        <Form.Group controlId="gmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
            placeholder="Enter vendor email"
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>
            Phone
          </Form.Label>
          <Form.Control
            type="tel"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            placeholder="Enter vendor phone"
            maxLength={10}

          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>
            Address
          </Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter vendor address"

          />
        </Form.Group>

        <Form.Group controlId="vendorCity">
          <Form.Label>
            City
          </Form.Label>
          <Form.Control
            type="text"
            value={vendorCity}
            onChange={(e) => setVendorCity(e.target.value)}
            placeholder="Enter vendor city"

          />
        </Form.Group>

        <Form.Group controlId="vendorState">
          <Form.Label>
            State
          </Form.Label>
          <Form.Control
            as="select"
            value={vendorState}
            onChange={(e) => setVendorState(e.target.value)}

          >
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="gst_no">
          <Form.Label>GST Number</Form.Label>
          <Form.Control
            type="text"
            value={gst_no}
            onChange={(e) => setgst_no(e.target.value)}
            placeholder="Enter GST number"
          />
        </Form.Group>

        <Form.Group controlId="pan_no">
          <Form.Label>PAN Number</Form.Label>
          <Form.Control
            type="text"
            value={pan_no}
            onChange={(e) => setpan_no(e.target.value)}
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
