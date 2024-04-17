import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

const AccountantDetails = () => {
  const [accountantData, setAccountantData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAccountantData, setFilteredAccountantData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/accountant")
      .then((response) => {
        setAccountantData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accountant data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = accountantData.filter((accountant) => {
      const fname = accountant.fname || "";
      const lname = accountant.lname || "";
      const contact = accountant.contact || "";
      const address = accountant.address || "";

      return (
        fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredAccountantData(filteredData);
  }, [searchQuery, accountantData]);

  return (

    <>
    <Sidebar />
    <div className="container mt-5">
      <h2 className="mb-4">Accountant Details</h2>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name, last name, phone, or address"
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

              <div className="d-flex align-items-center justify-content-between">
                <div className=""><Card.Title>{`${accountant.fname || ''} ${accountant.lname || ''}`}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Contact Number: {accountant.contact || ''}
                  </Card.Subtitle>
                  {/* <Card.Text>Address: {accountant.address || ''}</Card.Text> */}
                </div>
                <div className=""> <Link
                  to={{
                    pathname: `/accountant/${accountant._id}`,
                  }}
                  className="btn btn-info"
                  state={accountant}
                >
                  View More
                </Link></div>
              </div>


            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No accountant details found.</p>
      )}
    </div>
    </>
  );
};

export default AccountantDetails;
