import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import "./ManagerDetailsPage.css";

const ManagerDetailPage = () => {
  const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();

  const [manager, setManager] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      console.log(location.state); // Log the data to see its structure
      setManager(location.state);
    } else {
      // Fetch manager details if not available in location.state
      axios
        .get(`http://localhost:8888/api/addmanager/${_id}`)
        .then((response) => {
          setManager(response.data);
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });
    }
  }, [location.state, _id]);

  const handleEdit = () => {
    setFormData(manager); // Initialize the form with current manager details
    setShowModal(true); // Show the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validateField(name, value);
    if (isValid || value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Invalid ${name}`,
      }));
    }
  };

  const validateField = (name, value) => {
    const charOnlyFields = ["city", "state", "branch_name", "holder_name", "bank_name"];
    const intOnlyFields = ["contact", "account_number"];
    
    if (charOnlyFields.includes(name)) {
      const regex = /^[A-Za-z\s]+$/;
      return regex.test(value);
    }

    if (intOnlyFields.includes(name)) {
      const regex = /^\d*$/;
      if (name === "contact" && value.length > 10) {
        return false; // Contact number must be at most 10 digits
      }
      if (name === "account_number" && value.length > 18) {
        return false; // Account number must be at most 18 digits
      }
      return regex.test(value);
    }

    return true;
  };

  const handleSave = () => {
    // Check for errors before sending data
    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please fix the errors before saving.");
      return;
    }

    // Update manager details on the backend
    axios
      .patch(`http://localhost:8888/api/addmanager/${_id}`, formData)
      .then((response) => {
        console.log("Manager data updated successfully");
        setManager(formData); // Update the local state with the new data
        setShowModal(false); // Close the modal
        alert("Manager details updated successfully!"); // Show alert
      })
      .catch((error) => {
        console.error("Error updating manager data:", error);
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${manager?.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8888/api/addmanager/${_id}`)
        .then(() => {
          console.log("Manager data deleted successfully");
          navigate("/managerdetails");
        })
        .catch((error) => {
          console.error("Error deleting manager data:", error);
        });
    }
  };

  if (!manager) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[50%] min-w-3 px-3 ml-3">
          <h2 className="text-[30px]">
            {manager.fname} {manager.lname} Details
          </h2>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{`${manager.fname} ${manager.lname}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {manager.contact}
              </Card.Subtitle>
              <Card.Text>Address: {manager.address}</Card.Text>
              <Card.Text>Email: {manager.email}</Card.Text>
              <Card.Text>City: {manager.city}</Card.Text>
              <Card.Text>State: {manager.state}</Card.Text>
              <div className="my-3">
                <hr />
                <h6 className="mb-3">Bank details:</h6>
                <Card.Text>
                  Account Holder Name: {manager.holder_name}
                </Card.Text>
                <Card.Text>Account Number: {manager.account_number}</Card.Text>
                <Card.Text>IFSC Code: {manager.IFSC_code}</Card.Text>
                <Card.Text>Bank Name: {manager.bank_name}</Card.Text>
                <Card.Text>Branch Name: {manager.branch_name}</Card.Text>
                <hr />
              </div>
              <div className="my-3 grid gap-1 md:flex">
                <Button className="manager-btn" onClick={handleEdit}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="manager-btn"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onHide={handleCancel} className="Model-mdp">
          <Modal.Header closeButton>
            <Modal.Title>Edit Manager Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={formData.contact || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHolderName">
                    <Form.Label>Account Holder Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="holder_name"
                      value={formData.holder_name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formAccountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="account_number"
                      value={formData.account_number || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formIFSC">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="IFSC_code"
                      value={formData.IFSC_code || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formBankName">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_name"
                      value={formData.bank_name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBranchName">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="branch_name"
                      value={formData.branch_name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <button className="custom-btn-mdp" onClick={handleCancel}>
    Cancel
  </button>
  <button className="custom-btn-mdp secondary" onClick={handleSave}>
    Save
  </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ManagerDetailPage;
