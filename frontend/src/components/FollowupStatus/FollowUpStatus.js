import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "../Sidebar/Header";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../Enquiry/Quotation/ViewEnquiry.css";

const FollowUpStatus = ({ enquiry }) => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/enquiry");
        const data = await response.json();

        // Sort inquiries based on event date in descending order
        const sortedInquiries = data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );
        if (sortedInquiries.length > 0) {
          // Set the ID of the first Enquiry in the sorted list
          setEnquiryId(sortedInquiries[0]._id);
        }

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

  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleShowModal = (enquiryId) => {
    setEnquiryId(enquiryId);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleStatusChange = (event) => setSelectedStatus(event.target.value);

  const handleStatusUpdate = () => {
    console.log("Selected Status:", selectedStatus);
    handleCloseModal();
  };

  const [enquiryId, setEnquiryId] = useState("");

  const [hotInputValue, setHotInputValue] = useState("");
  const handleHotInputChange = (event) => {
    setHotInputValue(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      if (!enquiryId) {
        console.error("No Enquiry ID available");
        return;
      }

      let requestBody = { status: selectedStatus };

      // If 'Hot' is selected, include hotInputValue in the request body
      if (selectedStatus === "Hot") {
        requestBody.hot_input_value = hotInputValue;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/enquiry/${enquiryId}`,
        requestBody
      );

      console.log("Status updated successfully:", response.data);

      // Set success message and show alert
      alert("Status updated successfully!");
      setShowModal(false); // Hide the popup/modal
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "text-yellow";
      case "Hot":
        return "text-red";
      case "Conform":
        return "text-green";
      default:
        return ""; // default color
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="d-flex flex-wrap align-items-center">
          <div style={{ width: "80%", position: "relative" }}>
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              marginLeft: "5px",
              marginTop: "17px",
            }}
          >
            <label style={{ marginRight: "10px" }}>Start Date:</label>
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
            <label style={{ marginRight: "10px" }}>End Date:</label>
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
                marginLeft: "10px", // Add left margin for spacing between buttons
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Event Date</th>
              <th scope="col"> Name</th>
              <th scope="col"> Number</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody style={{ background: "white", borderRadius: "10px" }}>
            {filteredInquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td>{enquiry.event_name || ""}</td>
                <td>
                  {enquiry.event_date
                    ? format(new Date(enquiry.event_date), "dd/MM/yyyy")
                    : ""}
                </td>
                <td>{enquiry.customer_name}</td>
                <td>{enquiry.contact}</td>
                <td className={`fw-bold ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleShowModal(enquiry._id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusOptions"
                id="statusOngoing"
                value="Ongoing"
                checked={selectedStatus === "Ongoing"}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" htmlFor="statusOngoing">
                Ongoing
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusOptions"
                id="statusHot"
                value="Hot"
                checked={selectedStatus === "Hot"}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" htmlFor="statusHot">
                Hot
              </label>
              {selectedStatus === "Hot" && (
                <input
                  type="text"
                  value={hotInputValue}
                  onChange={handleHotInputChange}
                  placeholder="Enter here..."
                  style={{
                    padding: "8px",
                    marginTop: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusOptions"
                id="statusConform"
                value="Conform"
                checked={selectedStatus === "Conform"}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" htmlFor="statusConform">
                Conform
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <button
              className="btn btn-primary ml-2"
              onClick={handleUpdateStatus}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default FollowUpStatus;
