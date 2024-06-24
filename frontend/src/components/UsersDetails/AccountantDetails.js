import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";

const AccountantDetails = () => {
  const [accountantData, setAccountantData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/accountant")
      .then((response) => {
        setAccountantData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accountant data:", error);
      });
  }, []);

  const filteredAccountantData = accountantData.filter((accountant) => {
    const fname = accountant.fname ? accountant.fname.toString() : "";
    const lname = accountant.lname ? accountant.lname.toString() : "";
    const contact = accountant.contact ? accountant.contact.toString() : "";
    const address = accountant.address ? accountant.address.toString() : "";

    return (
      fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="flex">
            <Link to={'/managerdetails'}>
              <button className="btn btn-primary mr-4 mb-4">Manager Details</button>
            </Link>
            <Link to={'/accountantdetails'}>
              <button className="btn btn-primary mr-4 mb-4">Accountant Details</button>
            </Link>
            <Link to={'/executicedetails'}>
              <button className="btn btn-primary mr-4 mb-4">Executive Details</button>
            </Link>
            {/* <Link to={'/vendordetails'}>
              <button className="btn btn-primary mr-4 mb-4">Vendor Details</button>
            </Link> */}
          </div>
          <h2 className="text-[30px]">Accountant Details</h2>
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
          <div className="row row-cols-1 row-cols-md-3 overflow-y-auto h-[70vh] md:mt-0 w-full">
            {filteredAccountantData.length > 0 ? (
              filteredAccountantData.map((accountant) => (
                <div className="col mb-4" key={accountant._id}>
                  <Card style={{ width: "100%", marginBottom: "20px" }}>
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Card.Title>{`${accountant.fname || ""} ${accountant.lname || ""}`}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Contact Number: {accountant.contact || ""}
                          </Card.Subtitle>
                          {/* <Card.Text>Address: {accountant.address || ''}</Card.Text> */}
                        </div>
                        <div>
                          <Link
                            to={`/accountant/${accountant._id}`}
                            className="btn btn-info"
                            state={accountant}
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No accountant details found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantDetails;
