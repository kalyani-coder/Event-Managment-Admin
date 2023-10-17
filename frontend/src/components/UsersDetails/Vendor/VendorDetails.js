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
      .get("https://eventmanagement-admin-hocm.onrender.com/api/vendor")
      .then((response) => {
        setVendorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter vendorData based on searchQuery
    const filteredData = vendorData.filter((vendor) => {
      const company_name = vendor.company_name || "";
      const contact_person_name = vendor.contact || "";
      return (
        company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact_person_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
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
              <Card.Title>{vendor.company_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Person Name: {vendor.contact_person_name}
              </Card.Subtitle>
              <Card.Text>Contact: {vendor.contact}</Card.Text>
              <Card.Text>Email: {vendor.gmail}</Card.Text>
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
