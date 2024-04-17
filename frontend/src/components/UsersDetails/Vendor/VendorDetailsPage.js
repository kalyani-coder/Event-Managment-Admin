import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../Sidebar/Sidebar";


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
      `Are you sure you want to delete ${vendor.company_name} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/vendor/${_id}`)
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
    <>
    <Sidebar />
    <div className="container mt-5">
      <h2>{vendor.company_name} Details</h2>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{vendor.company_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Contact Person: {vendor.contact_person_name}
          </Card.Subtitle>
          <Card.Text>Category: {vendor.vendorCategory}</Card.Text>
          <Card.Text>Email: {vendor.gmail}</Card.Text>
          <Card.Text>Contact Number: {vendor.contact}</Card.Text>
          <Card.Text>Address: {vendor.address}</Card.Text>
          {/* <Card.Text>City: {vendor.vendorCity}</Card.Text> */}
          {/* <Card.Text>State: {vendor.vendorState}</Card.Text> */}
          <div className="my-3">
            <hr />
            <h6 className="mb-3">Financial details : </h6>
            <Card.Text>GST Number: {vendor.gst_no}</Card.Text>
            <Card.Text>PAN Number: {vendor.pan_no}</Card.Text>
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
    </>
  );
};

export default VendorDetailPage;
