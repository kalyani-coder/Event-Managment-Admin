import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MakeQuotation from "./MakeQuotation";
import { Button } from "react-bootstrap";
import axios from "axios";

function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/api/enquiries").then((res) => {
        setEnquiries(res.data);
        console.log(enquiries);
      });
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) =>
    enquiry.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Enquiries List</h2>
      <div className="mb-3 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Event Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredEnquiries.map((enquiry) => (
          <div className="col-md-4 mb-4" key={enquiry._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{enquiry.title}</h5>
                <p className="card-text">
                  Event Name: {enquiry.eventName}
                  <br />
                  Event Date: {enquiry.eventDate}
                  <br />
                  Number of Guests: {enquiry.numberOfGuests}
                  <br />
                  Event Venue: {enquiry.eventVenue}
                  <br />
                  Event Requirement: {enquiry.eventRequirement}
                  <br />
                  Customer Name: {enquiry.customerName}
                  <br />
                  Customer Email: {enquiry.customerEmail}
                  <br />
                  Contact Number: {enquiry.contactNumber}
                  <br />
                  Customer Address: {enquiry.customerAddress}
                </p>
                {console.log(enquiry)}
                <Link
                  to={{
                    pathname: `/quotation/${enquiry._id}`,
                  }}
                  state={enquiry}
                  className="btn btn-info"
                >
                  Quotation
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewEnquiry;
