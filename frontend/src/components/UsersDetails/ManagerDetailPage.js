import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Removed useLocation
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const ManagerDetailPage = () => {
  const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();

  const data = location.state;
  const [manager, setManager] = useState(data);

  const handleEdit = () => {
    console.log("function is comming ");
  };
  const handleSalary = () => {
    navigate("/addsalary");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${manager.firstName} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/managers/${_id}`)
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
    <div className="container mt-5">
      <h2>
        {manager.firstName} {manager.lastName} Details
      </h2>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{`${manager.firstName} ${manager.lastName}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Contact Number: {manager.managerPhone}
          </Card.Subtitle>
          <Card.Text>Address: {manager.managerAddress}</Card.Text>
          <Card.Text>Email: {manager.managerEmail}</Card.Text>
          <Card.Text>City: {manager.managerCity}</Card.Text>
          <Card.Text>State: {manager.managerState}</Card.Text>
          <div className="my-3">
            <hr />
            <h6 className="mb-3">Bank details : </h6>
            <Card.Text>
              Account Holder Name: {manager.accountHolderName}
            </Card.Text>
            <Card.Text>Account Number: {manager.accountNumber}</Card.Text>
            <Card.Text>IFSC Code: {manager.ifscCode}</Card.Text>
            <Card.Text>Bank Name: {manager.bankName}</Card.Text>
            <Card.Text>Branch Name: {manager.branchName}</Card.Text>
            <hr />
          </div>
          <div className="my-3">
            <Button variant="info" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" className="mx-1" onClick={handleDelete}>
              Delete
            </Button>
            <Button veriant="info" className="mx-1" onClick={handleSalary}>
              Add Salary
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ManagerDetailPage;
