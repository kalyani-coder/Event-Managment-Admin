import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import "./AccountantDetailPage.css"; // Import the custom CSS file

const AccountantDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  
  const [accountant, setAccountant] = useState(data);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAccountant(data);
    setFormData(data);
  }, [data]);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (["city", "state", "holder_name", "bank_name", "branch_name"].includes(name)) {
      // Allow only characters and spaces
      const charOnlyPattern = /^[a-zA-Z\s]*$/;
      if (!charOnlyPattern.test(value)) {
        return;
      }
    }

    if (name === "contact") {
      // Allow only numeric values and limit to 10 digits
      const numericPattern = /^\d{0,10}$/;
      if (!numericPattern.test(value)) {
        return;
      }
    }

    if (name === "account_number") {
      // Allow only numeric values and limit to 18 digits
      const numericPattern = /^\d{0,18}$/;
      if (!numericPattern.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    axios
      .patch(`http://localhost:8888/api/accountant/${_id}`, formData)
      .then((response) => {
        console.log("Accountant data updated successfully:", response.data);
        setAccountant(formData); // Update local state with new data
        setShowModal(false); // Close modal after saving
        alert("Accountant data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating accountant data:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${accountant.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8888/api/accountant/${_id}`)
        .then(() => {
          console.log("Accountant data deleted successfully");
          navigate("/accountantdetails");
        })
        .catch((error) => {
          console.error("Error deleting accountant data:", error);
        });
    }
  };

  if (!accountant) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[50%]  min-w-3 px-3 ml-3  ">
          <h2 className="text-[35px]">
            {accountant.fname} {accountant.lname} Details
          </h2>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{`${accountant.fname} ${accountant.lname}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {accountant.contact}
              </Card.Subtitle>
              <Card.Text>Address: {accountant.address}</Card.Text>
              <Card.Text>Email: {accountant.email}</Card.Text>
              <Card.Text>City: {accountant.city}</Card.Text>
              <Card.Text>State: {accountant.state}</Card.Text>
              <div className="my-3">
                <hr />
                <h6 className="mb-3">Bank details:</h6>
                <Card.Text>
                  Account Holder Name: {accountant.holder_name}
                </Card.Text>
                <Card.Text>
                  Account Number: {accountant.account_number}
                </Card.Text>
                <Card.Text>IFSC Code: {accountant.IFSC_code}</Card.Text>
                <Card.Text>Bank Name: {accountant.bank_name}</Card.Text>
                <Card.Text>Branch Name: {accountant.branch_name}</Card.Text>
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
            <Modal.Title>Edit Accountant Details</Modal.Title>
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
  )
};

export default AccountantDetailPage;
