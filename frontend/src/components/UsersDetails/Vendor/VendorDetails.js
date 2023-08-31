import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const VendorDetails = () => {
  const [vendorData, setVendorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendorData, setFilteredVendorData] = useState([]);

  useEffect(() => {
    // Fetch vendor data from the API
    axios
      .get("http://localhost:5000/api/vendors")
      .then((response) => {
        setVendorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter vendorData based on searchQuery
    const filteredData = vendorData.filter(
      (vendor) =>
        vendor.vendorCompanyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.vendorContactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVendorData(filteredData);
  }, [searchQuery, vendorData]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Vendor Details</h2>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by company name or contact person"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredVendorData.length > 0 ? (
        filteredVendorData.map((vendor) => (
          <Card
            key={vendor._id}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Card.Body>
              <Card.Title>{vendor.vendorCompanyName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Person: {vendor.vendorContactPerson}
              </Card.Subtitle>
              <Card.Text>Category: {vendor.vendorCategory}</Card.Text>
              <Card.Text>Email: {vendor.vendorEmail}</Card.Text>
              <Link
                to={{
                  pathname: `/vendor/${vendor._id}`,
                }}
                state={vendor}
                className="btn btn-info"
              >
                View more{" "}
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No vendor details found.</p>
      )}
    </div>
  );
};

export default VendorDetails;
