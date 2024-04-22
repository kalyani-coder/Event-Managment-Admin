import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";

const AccountantDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [accountant, setAccountant] = useState(data);

  const handleEdit = () => {
    console.log("function is coming");
  };
  const handleSalary = () => {
    navigate("/addsalary");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${accountant.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/accountant/${_id}`)
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
    <div className="container mt-5">
      <h2>
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
            <Card.Text>Account Number: {accountant.account_number}</Card.Text>
            <Card.Text>IFSC Code: {accountant.IFSC_code}</Card.Text>
            <Card.Text>Bank Name: {accountant.bank_name}</Card.Text>
            <Card.Text>Branch Name: {accountant.branch_name}</Card.Text>
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
    </>
  );
};

export default AccountantDetailPage;
