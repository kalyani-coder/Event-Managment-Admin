import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const VendorDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [vendor, setVendor] = useState(data);

  const handleEdit = () => {
    console.log("Edit function is coming");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${vendor.vendorCompanyName} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/vendors/${_id}`)
        .then(() => {
          console.log("Vendor data deleted successfully");
          navigate("/vendordetails");
        })
        .catch((error) => {
          console.error("Error deleting vendor data:", error);
        });
    }
  };

  if (!vendor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{vendor.vendorCompanyName} Details</h2>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{vendor.vendorCompanyName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Contact Person: {vendor.vendorContactPerson}
          </Card.Subtitle>
          <Card.Text>Category: {vendor.vendorCategory}</Card.Text>
          <Card.Text>Email: {vendor.vendorEmail}</Card.Text>
          <Card.Text>Contact Number: {vendor.vendorPhone}</Card.Text>
          <Card.Text>Address: {vendor.vendorAddress}</Card.Text>
          <Card.Text>City: {vendor.vendorCity}</Card.Text>
          <Card.Text>State: {vendor.vendorState}</Card.Text>
          <div className="my-3">
            <hr />
            <h6 className="mb-3">Financial details : </h6>
            <Card.Text>GST Number: {vendor.gstNumber}</Card.Text>
            <Card.Text>PAN Number: {vendor.panNumber}</Card.Text>
            <hr />
          </div>
          <div className="my-3">
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VendorDetailPage;
