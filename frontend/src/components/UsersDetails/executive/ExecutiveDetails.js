import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ExecutiveDetails = () => {
  const [executiveData, setExecutiveData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExecutiveData, setFilteredExecutiveData] = useState([]);

  useEffect(() => {
    // Fetch executive data from the API
    axios
      .get("http://localhost:5000/api/executive")
      .then((response) => {
        setExecutiveData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching executive data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter executiveData based on searchQuery
    const filteredData = executiveData.filter(
      (executive) =>
        (executive.fname && executive.fname.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (executive.lname && executive.lname.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredExecutiveData(filteredData);
  }, [searchQuery, executiveData]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Executive Details</h2>
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

      {filteredExecutiveData.length > 0 ? (
        filteredExecutiveData.map((executive) => (
          <Card
            key={executive.id}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div className="">
                  <Card.Title>{`${executive.fname} ${executive.lname}`}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Contact Number: {executive.contact}
                  </Card.Subtitle>
                  {/* <Card.Text>Address: {executive.address}</Card.Text> */}

                </div>


                <div className="">
                  <Link
                    to={{
                      pathname: `/executive/${executive._id}`,
                    }}
                    className="btn btn-info"
                    state={executive}
                  >
                    Know more
                  </Link>

                </div>

              </div>




            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No executive details found.</p>
      )}
    </div>
  );
};

export default ExecutiveDetails;
