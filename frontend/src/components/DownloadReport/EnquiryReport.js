import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { FaSortAmountDown, FaSortAmountUp, FaFilter, FaCalendarAlt, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnquiryReport = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedVenue, setSelectedVenue] = useState("");
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
      return (!selectedVenue || enquiry.event_venue === selectedVenue) &&
             (!selectedDate || new Date(enquiry.event_date).toDateString() === selectedDate.toDateString());
    });
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(enquiry =>
        enquiry.event_name.toLowerCase().includes(query) ||
        enquiry.event_date.toLowerCase().includes(query) ||
        enquiry.event_requirement.toLowerCase().includes(query) ||
        enquiry.customer_name.toLowerCase().includes(query)
      );
    }
    setFilteredEnquiries(filtered);
  };

  const clearFilters = () => {
    setSelectedVenue("");
    setSelectedDate(null);
    setSearchQuery("");
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

  const venueOptions = [...new Set(enquiries.map((enquiry) => enquiry.event_venue))];

  return (
    <>
      <Sidebar />
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
              <div className="dropdown-menu" aria-labelledby="venueFilterDropdown">
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
            <div className="input-group">
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
            </div>
            
          </div>
        </div>
        <p>Total number of enquiries: {filteredEnquiries.length}</p>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>
          Export to Excel
        </button>
        <table className="table table-hover table-sm border border-dark table-responsive-md" style={{backgroundColor: 'white'}}>
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
