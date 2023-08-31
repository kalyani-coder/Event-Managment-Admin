import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ManagerDetails = () => {
  const [managerData, setManagerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredManagerData, setFilteredManagerData] = useState([]);

  useEffect(() => {
    // Fetch manager data from the API
    axios
      .get("http://localhost:5000/api/managers")
      .then((response) => {
        setManagerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manager data:", error);
      });
  }, []);
  useEffect(() => {
    // Filter managerData based on searchQuery
    const filteredData = managerData.filter(
      (manager) =>
        manager.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manager.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredManagerData(filteredData);
  }, [searchQuery, managerData]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manager Details</h2>
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

      {filteredManagerData.length > 0 ? (
        filteredManagerData.map((manager) => (
          <Card
            key={manager.id}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Card.Body>
              <Card.Title>{`${manager.firstName} ${manager.lastName}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {manager.managerPhone}
              </Card.Subtitle>
              <Card.Text>Address: {manager.managerAddress}</Card.Text>
              <Link
                to={{
                  pathname: `/manager/${manager._id}`,
                }}
                state={manager} 
                className="btn btn-info"
              >
                View more{" "}
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-centre">No manager details found.</p>
      )}
    </div>
  );
};

export default ManagerDetails;
