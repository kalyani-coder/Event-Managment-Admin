import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ViewInquiryPage = ({ enquiry }) => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://eventmanagement-admin-hocm.onrender.com/api/enquiry"
        );
        const data = await response.json();

        // Sort inquiries based on event date in descending order
        const sortedInquiries = data.sort((a, b) =>
          new Date(b.event_date) - new Date(a.event_date)
        );

        setInquiries(sortedInquiries);
        setFilteredInquiries(sortedInquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleSearch = () => {
    const filtered = inquiries.filter((enquiry) => {
      const eventName = enquiry.event_name
        ? enquiry.event_name.toLowerCase()
        : "";
      const companyName = enquiry.company_name
        ? enquiry.company_name.toLowerCase()
        : "";
      const customerName = enquiry.customer_name
        ? enquiry.customer_name.toLowerCase()
        : "";

      return (
        eventName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        customerName.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredInquiries(filtered);
  };

  const handleDateRangeFilter = () => {
    const filtered = inquiries.filter((enquiry) => {
      const eventDate = new Date(enquiry.event_date);
      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      return (
        (!startDate || eventDate >= startDate) &&
        (!endDate || eventDate <= endDate)
      );
    });

    setFilteredInquiries(filtered);
  };

  const clearFilters = () => {
    setFilteredInquiries(inquiries);
    setSearchTerm("");
    setDateRange({ startDate: "", endDate: "" });
  };

  const openPopup = (enquiry) => {
    setSelectedInquiry(enquiry);
  };

  const closePopup = () => {
    setSelectedInquiry(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap">
        <div>
          <input
            type="text"
            placeholder="Search by Event, Company, or Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '16px',
              width: '300px',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #007BFF',
              backgroundColor: '#007BFF',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Search
          </button>
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '5px' }}>
          <label style={{ marginRight: '10px' }}>Start Date:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
            style={{
              padding: '10px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />
          <label style={{ marginRight: '10px' }}>End Date:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
            style={{
              padding: '10px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />
          <button
            onClick={handleDateRangeFilter}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #28A745',
              backgroundColor: '#28A745',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Filter by Date
          </button>
          <button
            onClick={clearFilters}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #DC3545',
              backgroundColor: '#DC3545',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        {filteredInquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="card"
            style={{
              width: "30%",
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{enquiry.title}</h5>
              <p className="card-text">
                Event Name: {enquiry.event_name || ""}
                <br />
                Event Date:{" "}
                {enquiry.event_date
                  ? format(new Date(enquiry.event_date), "dd/MM/yyyy")
                  : ""}
                <br />
                Customer Name: {enquiry.customer_name}
                <br />
                Contact Number: {enquiry.contact}
              </p>
              <button className="btn btn-outline-primary ml-2" onClick={() => navigate('/quotationform', { state: { enquiry: enquiry } })}>
                Quotation
              </button>
              <button
                className="btn btn-outline-primary ml-2"
                onClick={() => openPopup(enquiry)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedInquiry && (
        <div className="popup">
          <div className="popup-content card">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <div className="card-body">
              <h2 className="card-title">{selectedInquiry.title}</h2>
              <p className="card-text">
                Event Name: {selectedInquiry.event_name || ""}
                <br />
                Event Date:{" "}
                {selectedInquiry.event_date
                  ? format(new Date(selectedInquiry.event_date), "dd/MM/yyyy")
                  : ""}
                <br />
                Number of Estimated Guests: {selectedInquiry.guest_quantity}
                <br />
                Event Venue: {selectedInquiry.event_venue}
                <br />
                Event Requirement: {selectedInquiry.event_requirement}
                <br />
                Customer Name: {selectedInquiry.customer_name}
                <br />
                Customer Email: {selectedInquiry.email}
                <br />
                Contact Number: {selectedInquiry.contact}
                <br />
                Customer Address: {selectedInquiry.address}
              </p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ViewInquiryPage;
