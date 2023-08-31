import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountantDetails = () => {
  const [accountantData, setAccountantData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAccountantData, setFilteredAccountantData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/accountants")
      .then((response) => {
        setAccountantData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accountant data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = accountantData.filter(
      (accountant) =>
        accountant.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        accountant.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAccountantData(filteredData);
  }, [searchQuery, accountantData]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Accountant Details</h2>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name or last name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredAccountantData.length > 0 ? (
        filteredAccountantData.map((accountant) => (
          <Card
            key={accountant.id}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Card.Body>
              <Card.Title>{`${accountant.firstName} ${accountant.lastName}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {accountant.accountantPhone}
              </Card.Subtitle>
              <Card.Text>Address: {accountant.accountantAddress}</Card.Text>
              <Link
                to={{
                  pathname: `/accountant/${accountant._id}`,
                }}
                className="btn btn-info"
                state={accountant}
              >
                View More
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No accountant details found.</p>
      )}
    </div>
  );
};

export default AccountantDetails;
