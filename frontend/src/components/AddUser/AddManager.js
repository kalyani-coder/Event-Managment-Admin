import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddManager = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    // Assuming fname, lname, and contact are the values of input fields
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const contact = document.getElementById('contact').value;

    if (!fname || !lname || !contact) {
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
        "https://eventmanagement-admin-hocm.onrender.com/api/managerdetails",
        formData
      );
      console.log("Data posted:", response.data);

      // Show success message
      setSuccessMessage("Data submitted successfully!");
      setShowSuccessAlert(true);

      // Clear the form
      handleDiscard();
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle error if needed
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
      <h2>Add Manager</h2>
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          {successMessage}
        </Alert>
      )}

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
            Email
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"

          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>
            Phone<span style={{ color: "red" }}>*</span>
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
            Address
          </Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter address"

          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>
            City
          </Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter city"

          />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>
            State
          </Form.Label>
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

        <Form.Group controlId="holder_name">
          <Form.Label>
            Account Holder Name
          </Form.Label>
          <Form.Control
            type="text"
            value={holder_name}
            onChange={(e) => setholder_name(e.target.value)}
            placeholder="Enter account holder name"

          />
        </Form.Group>

        <Form.Group controlId="account_number">
          <Form.Label>
            Account Number
          </Form.Label>
          <Form.Control
            type="text"
            value={account_number}
            onChange={(e) => setaccount_number(e.target.value)}
            placeholder="Enter account number"

          />
        </Form.Group>

        <Form.Group controlId="bank_name">
          <Form.Label>
            Bank Name
          </Form.Label>
          <Form.Control
            type="text"
            value={bank_name}
            onChange={(e) => setbank_name(e.target.value)}
            placeholder="Enter bank name"

          />
        </Form.Group>

        <Form.Group controlId="branch_name">
          <Form.Label>
            Branch Name
          </Form.Label>
          <Form.Control
            type="text"
            value={branch_name}
            onChange={(e) => setbranch_name(e.target.value)}
            placeholder="Enter branch name"

          />
        </Form.Group>

        <Form.Group controlId="IFSC_code">
          <Form.Label>
            IFSC Code
          </Form.Label>
          <Form.Control
            type="text"
            value={IFSC_code}
            onChange={(e) => setIFSC_code(e.target.value)}
            placeholder="Enter IFSC code"

          />
        </Form.Group>

        {/* ... (rest of the form fields) */}

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
