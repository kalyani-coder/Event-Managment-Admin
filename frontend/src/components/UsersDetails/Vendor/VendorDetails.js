import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Sidebar/Header";

const VendorDetails = () => {
  const [vendorData, setVendorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendorData, setFilteredVendorData] = useState([]);

  useEffect(() => {
    // Fetch vendor data from the API
    axios
      .get("https://node-backend.macj-abuyerschoice.com/api/vendor")
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
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
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
            <Link to={'/vendordetails'}>
              <button className="btn btn-primary mr-4 mb-4"> Vendor Details</button>
            </Link>
          </div>
          <h2 className="text-[30px]">Vendor Details</h2>
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
          <div className="row row-cols-1 row-cols-md-3 overflow-y-auto h-[70vh]  md:mt-0 w-full">
            {filteredVendorData.length > 0 ? (
              filteredVendorData.map((vendor) => (
                <div className="col mb-4">
                  <Card key={vendor._id} style={{ width: "100%" }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <Card.Title>{vendor.company_name}</Card.Title>
                          <Card.Subtitle className="text-muted">
                            Contact Person Name: {vendor.contact_person_name}
                          </Card.Subtitle>
                          <Card.Text>Contact: {vendor.contact}</Card.Text>
                          {/* <Card.Text>Email: {vendor.gmail}</Card.Text> */}
                        </div>
                        <div className="">
                          <Link
                            to={{
                              pathname: `/vendor/${vendor._id}`,
                            }}
                            state={vendor}
                            className="btn btn-info"
                          >
                            View more{" "}
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No vendor details found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
