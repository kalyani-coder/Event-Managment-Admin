import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnquiryReport = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchEnquiryData();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [selectedVenue, selectedDate, searchQuery]); // Re-run filter when filter parameters change

  const fetchEnquiryData = async () => {
    try {
      const response = await fetch(
        "https://eventmanagement-admin-hocm.onrender.com/api/enquiry"
      );
      const enquiryData = await response.json();
      setEnquiries(enquiryData);
      setFilteredEnquiries(enquiryData); // Set filtered data to all data initially
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterEnquiries = () => {
    let filtered = enquiries.filter((enquiry) => {
      return (
        (!selectedVenue || enquiry.event_venue === selectedVenue) &&
        (!selectedDate ||
          new Date(enquiry.event_date).toDateString() ===
            selectedDate.toDateString())
      );
    });
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (enquiry) =>
          enquiry.event_name.toLowerCase().includes(query) ||
          enquiry.event_date.toLowerCase().includes(query) ||
          enquiry.event_requirement.toLowerCase().includes(query) ||
          enquiry.customer_name.toLowerCase().includes(query)
      );
    }
    setFilteredEnquiries(filtered);
  };

  const handleDateRangeFilter = () => {
    const filtered = enquiries.filter((enquiry) => {
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

    setFilteredEnquiries(filtered); // Corrected from setFilteredInquiries
  };

  const clearFilters = () => {
    setSelectedVenue("");
    // setSelectedDate(null);
    setSearchQuery("");
    setDateRange({ startDate: "", endDate: "" }); // Reset startDate and endDate
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredEnquiries);

    const wscols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, "enquiry_report.xlsx");
  };

  const handleVenueFilterChange = (venue) => {
    setSelectedVenue(venue);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const venueOptions = [
    ...new Set(enquiries.map((enquiry) => enquiry.event_venue)),
  ];

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2>Enquiry Report</h2>
        <div className="mb-3 mt-3">
          <div className="input-group-append">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle mr-2"
                type="button"
                id="venueFilterDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FaFilter /> Filter By Venue
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="venueFilterDropdown"
              >
                {venueOptions.map((option, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleVenueFilterChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="input-group">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className="form-control"
              />
              <button className="btn btn-primary ml-2" onClick={clearFilters}>
      Clear Filters
    </button>
            </div> */}
            {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft: '5px', marginTop: '17px' }}> */}
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
                marginLeft: "10px", // Add left margin for spacing between date inputs and buttons
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
            {/* </div> */}
          </div>
        </div>

        <p>Total number of enquiries: {filteredEnquiries.length}</p>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>
          Export to Excel
        </button>
        <table
          className="table table-hover table-sm border border-dark table-responsive-md"
          style={{ backgroundColor: "white" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Event Name</th>
              <th scope="col" onClick={toggleSortOrder}>
                Event Date{" "}
                {sortOrder === "asc" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUp />
                )}
              </th>
              <th scope="col">Guest Quantity</th>
              <th scope="col">Event Venue</th>
              <th scope="col">Event Requirement</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((enquiry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{enquiry.event_name}</td>
                <td>{enquiry.event_date}</td>
                <td>{enquiry.guest_quantity}</td>
                <td>{enquiry.event_venue}</td>
                <td>{enquiry.event_requirement}</td>
                <td>{enquiry.customer_name}</td>
                <td>{enquiry.contact}</td>
                <td>{enquiry.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EnquiryReport;
