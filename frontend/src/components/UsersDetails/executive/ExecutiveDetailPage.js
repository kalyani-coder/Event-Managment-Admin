import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const ExecutiveDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [executive, setExecutive] = useState(data);

  const handleEdit = () => {
    console.log("Edit function is coming");
  };
  const handleSalary = () => {
    navigate("/addsalary");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${executive.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/executive/${_id}`)
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
    <div className="container mt-5">
      <h2>
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
            <h6 className="mb-3">Bank details : </h6>
            <Card.Text>
              Account Holder Name: {executive.holder_name}
            </Card.Text>
            <Card.Text>Account Number: {executive.account_number}</Card.Text>
            <Card.Text>IFSC Code: {executive.IFSC_code}</Card.Text>
            <Card.Text>Bank Name: {executive.bank_name}</Card.Text>
            <Card.Text>Branch Name: {executive.branch_name}</Card.Text>
            <hr />
          </div>
          <div className="my-3">
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" className="mx-1" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="info" className="mx-1" onClick={handleSalary}>
              Add Salary
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExecutiveDetailPage;
