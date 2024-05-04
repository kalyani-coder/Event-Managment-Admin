import React, { useState, useEffect,  } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import Header from "../../Sidebar/Header";
import "./ViewEnquiry.css";

const ViewInquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve login ID from localStorage
        const loginId = localStorage.getItem('loginId');

        // Fetch inquiries based on login ID
        const response = await fetch(`http://localhost:5000/api/enquiry/${loginId}`);
        const data = await response.json();

        // Sort inquiries based on event date in descending order
        const sortedInquiries = data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
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
      const eventName = enquiry.event_name ? enquiry.event_name.toLowerCase() : "";
      const companyName = enquiry.company_name ? enquiry.company_name.toLowerCase() : "";
      const customerName = enquiry.customer_name ? enquiry.customer_name.toLowerCase() : "";

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
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
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
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  return (
    <>
  <Header />
  <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
    <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
    <div className="flex">
          <Link to={'/quotation'}>
          <button className="btn btn-primary mr-4 mb-4">View Enquiry</button>
          </Link>
          <Link to={'/createquotation'}>
          <button className="btn btn-primary mr-4 mb-4">Proposal</button>
          </Link>
          <Link to={'/followupstatus'}>
          <button className="btn btn-primary mr-4 mb-4">FollowUp Status</button>
          </Link>
          <Link to={'/addnewevent'}>
          <button className="btn btn-primary mr-4 mb-4">Add Event</button>
          </Link>
        </div>
      <div className="flex justify-between items-center mb-4">
     
        <h2 className="text-[30px]">View Enquiry</h2>
       
      </div>
      {/* <div className="d-flex flex-wrap align-items-center">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search by Event, Company, or Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "8px 16px",
              borderRadius: "0 5px 5px 0",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <div className="flex items-center justify-between w-full p-2 flex-wrap gap-2">
          <div className="grid md:flex items-center">
            <label className="mr-1">Start Date:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              style={{
                padding: "10px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          <div className="grid md:flex items-center">
            <label className="mr-1">End Date:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              style={{
                padding: "10px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          <div>
            <button
              onClick={handleDateRangeFilter}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #28A745",
                backgroundColor: "#28A745",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                marginLeft: "10px",
              }}
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #DC3545",
                backgroundColor: "#DC3545",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                marginLeft: "10px",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div> */}

      <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0 ">
        <table className="table">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Event Date</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ background: "white", borderRadius: "10px" }}>
            {filteredInquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td>{enquiry.event_name}</td>
                <td>
                  {enquiry.event_date
                    ? format(new Date(enquiry.event_date), "dd/MM/yyyy")
                    : ""}
                </td>
                <td>{enquiry.customer_name}</td>
                <td>{enquiry.contact}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => openPopup(enquiry)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedInquiry && (
          <Modal
            show={showModal}
            onHide={closePopup}
            dialogClassName="modal-dialog-centered modal-dialog-responsive "
          >
            <Modal.Header closeButton>
              <Modal.Title>Inquiry Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedInquiry && (
                <div>
                  <h2>{selectedInquiry.title}</h2>
                  <p style={{ lineHeight: "35px" }}>
                    Event Name: {selectedInquiry.event_name || ""}
                    <br />
                    Event Date:{" "}
                    {selectedInquiry.event_date
                      ? format(
                          new Date(selectedInquiry.event_date),
                          "dd/MM/yyyy"
                        )
                      : ""}
                    <br />
                    Number of Estimated Guests:{" "}
                    {selectedInquiry.guest_quantity}
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
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closePopup}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  </div>
</>

  );
};

export default ViewInquiryPage;
