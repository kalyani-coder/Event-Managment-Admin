import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Card = (enquiry) => {
  console.log(enquiry)
  return (
    <div className="col-md-4 mb-4" key={enquiry.enquiry._id} >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{enquiry.title}</h5>
          <p className="card-text">
            Event Name: {enquiry.enquiry.event_name || ""}
            <br />
            Event Date: {enquiry.enquiry.event_date}
            <br />
            Number of Estimated Guests: {enquiry.enquiry.guest_quantity}
            <br />
            Event Venue: {enquiry.enquiry.event_venue}
            <br />
            Event Requirement: {enquiry.enquiry.event_requirement}
            <br />
            Customer Name: {enquiry.enquiry.customer_name}
            <br />
            Customer Email: {enquiry.enquiry.email}
            <br />
            Contact Number: {enquiry.enquiry.contact}
            <br />
            Customer Address: {enquiry.enquiry.address}
          </p>
          <Link
            to={{
              pathname: `/quotation/${enquiry._id}`,
              state: {
                customerName: enquiry.enquiry.customer_name,
                eventName: enquiry.enquiry.event_name, ...enquiry,
              },
            }}
            className="btn btn-info"
          >
            Quotation
          </Link>

        </div>
      </div>
    </div>
  )
}

function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      axios.get("https://eventmanagement-admin-hocm.onrender.com/api/enquiry").then((res) => {
        setEnquiries(res.data);
        console.log('response', res)
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
        {filteredEnquiries.map((enquiry) => <Card enquiry={enquiry}></Card>
        )}
      </div>
    </div >
  );
}

export default ViewEnquiry;
