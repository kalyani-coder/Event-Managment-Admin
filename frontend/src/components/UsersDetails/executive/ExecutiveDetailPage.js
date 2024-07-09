import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../Sidebar/Header";
import "./ExecutiveDetailPage.css"; // Import the custom CSS file

const ExecutiveDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [executive, setExecutive] = useState(data);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setExecutive(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation logic
    if (
      ["city", "state", "holder_name", "bank_name", "branch_name"].includes(name) &&
      !/^[a-zA-Z\s]*$/.test(value)
    ) {
      return; // If the value contains non-alphabetic characters, do nothing
    }

    if (name === "contact" && (!/^\d*$/.test(value) || value.length > 10)) {
      return; // If the value contains non-numeric characters or exceeds 10 digits, do nothing
    }

    if (name === "account_number" && (!/^\d*$/.test(value) || value.length > 18)) {
      return; // If the value contains non-numeric characters or exceeds 18 digits, do nothing
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8888/api/executive/${_id}`, formData);
      console.log("Executive data updated successfully");
      setShowModal(false);
      setExecutive((prevExecutive) => ({ ...prevExecutive, ...formData }));
      alert("Executive data updated successfully");
    } catch (error) {
      console.error("Error updating executive data:", error);
    }
  };

  const handleEdit = () => {
    setFormData({
      contact: executive.contact,
      address: executive.address,
      email: executive.email,
      city: executive.city,
      state: executive.state,
      holder_name: executive.holder_name,
      account_number: executive.account_number,
      IFSC_code: executive.IFSC_code,
      bank_name: executive.bank_name,
      branch_name: executive.branch_name,
    });
    setShowModal(true);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${executive.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8888/api/executive/${_id}`)
        .then(() => {
          console.log("Executive data deleted successfully");
          navigate("/executivedetails");
        })
        .catch((error) => {
          console.error("Error deleting executive data:", error);
        });
    }
  };

  if (!executive) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[50%] min-w-3 px-3 ml-3">
          <h2 className="text-[35px]">
            {executive.fname} {executive.lname} Details
          </h2>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{`${executive.fname} ${executive.lname}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {executive.contact}
              </Card.Subtitle>
              <Card.Text>Address: {executive.address}</Card.Text>
              <Card.Text>Email: {executive.email}</Card.Text>
              <Card.Text>City: {executive.city}</Card.Text>
              <Card.Text>State: {executive.state}</Card.Text>
              <div className="my-3">
                <hr />
                <h6 className="mb-3">Bank details:</h6>
                <Card.Text>Account Holder Name: {executive.holder_name}</Card.Text>
                <Card.Text>Account Number: {executive.account_number}</Card.Text>
                <Card.Text>IFSC Code: {executive.IFSC_code}</Card.Text>
                <Card.Text>Bank Name: {executive.bank_name}</Card.Text>
                <Card.Text>Branch Name: {executive.branch_name}</Card.Text>
                <hr />
              </div>
              <div className="my-3 grid gap-1 md:flex">
                <Button className="manager-btn" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="danger" className="manager-btn" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>


      <Modal show={showModal} onHide={handleCancel} className="Model-mdp">
        <Modal.Header closeButton>
          <Modal.Title>Edit Executive Details</Modal.Title>
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
    </>
  );
};

export default ExecutiveDetailPage;
