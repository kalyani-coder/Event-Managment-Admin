import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/api/enquiry").then((res) => {
        setEnquiries(res.data);
      });
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) =>
    (enquiry.event_name || "").toLowerCase().includes(searchTerm.toLowerCase())
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
                  Event Name: {enquiry.event_name || ""}
                  <br />
                  Event Date: {enquiry.event_date}
                  <br />
                  Number of Estimated Guests: {enquiry.guest_quantity}
                  <br />
                  Event Venue: {enquiry.event_venue}
                  <br />
                  Event Requirement: {enquiry.event_requirement}
                  <br />
                  Customer Name: {enquiry.customer_name}
                  <br />
                  Customer Email: {enquiry.email}
                  <br />
                  Contact Number: {enquiry.contact}
                  <br />
                  Customer Address: {enquiry.address}
                </p>
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
