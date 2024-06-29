import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';

import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaFire,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterEvents(status);
  };

  const fetchEventData = async () => {
    try {
      let url = "http://localhost:8888/api/event";
      if (selectedStatus) {
        url = `http://localhost:8888/api/event/status/${selectedStatus}`;
      }
      console.log("Fetching data from:", url);
      const response = await fetch(url);
      const eventData = await response.json();
      console.log("Fetched data:", eventData);
      setEvents(eventData);
      filterEvents(searchQuery, selectedDate, selectedStatus, eventData); // Filter events after fetching
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterEvents(query, selectedDate, selectedStatus);
  };

  const sortEvents = (order, data = null) => {
    const eventsToSort = data || filteredEvents;
    const sorted = [...eventsToSort].sort((a, b) => {
      const valueA = (a.event_date || "").toLowerCase();
      const valueB = (b.event_date || "").toLowerCase();

      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilteredEvents(sorted);
  };

  const exportToExcel = () => {
    const filteredData = filteredEvents.map((event) => ({
      EventName: event.eventName,
      Venue: event.venue,
      Subvenue: event.subvenue,
      Event_Date: event.event_date,
      Guest_Number: event.guest_number,
      QuotationAmount: event.budget,
      status: event.status,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "event_report.xlsx");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterEvents(searchQuery, date, selectedStatus);
  };

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, [selectedStatus]); // Fetch data when selectedStatus changes

  const fetchData = async () => {
    try {
      let url = "http://localhost:8888/api/event";
      if (selectedStatus !== "All") {
        url += `/status/${selectedStatus}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterEvents = (status) => {
    if (status === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.status === status);
      setFilteredEvents(filtered);
    }
  };

  const handleDateRangeFilter = () => {
    const filtered = filteredEvents.filter((event) => {
      const eventDate = new Date(event.event_date);
      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      return (
        (!startDate || eventDate >= startDate) &&
        (!endDate || eventDate <= endDate)
      );
    });

    setFilteredEvents(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const clearFilters = () => {
    setSelectedStatus("All");
    setSearchQuery("");
    setDateRange({ startDate: "", endDate: "" });
    filterEvents("All");
  };
  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%] ">
        <div className="flex">
            <Link to={'/eventreport'}>
              <button className="btn btn-primary mr-4 mb-4">Event Report</button>
            </Link>
            <Link to={'/enquiryreport'}>
              <button className="btn btn-primary mr-3 mb-4">Enquiry Report</button>
            </Link>
            <Link to={'/customerreport'}>
              <button className="btn btn-primary mr-3 mb-4">Customer Report</button>
            </Link>
            <Link to={'/managerreport'}>
              <button className="btn btn-primary mr-3 mb-4">Manager Report</button>
            </Link>
            <Link to={'/paymentreport'}>
              <button className="btn btn-primary mr-3 mb-4">Payment Report</button>
            </Link>
            <Link to={'/vendorpaymentreport'}>
              <button className="btn btn-primary mr-3 mb-4">Vendor Report</button>
            </Link>
            <Link to={'/bankwisereport'}>
            <button className="btn btn-primary mr-3 mb-4">Bankwise Report</button>
            </Link>
            <Link to={'/oustandingpaymentreport'}>
            <button className="btn btn-primary mr-4 mb-4">Outstanding Report </button>
            </Link>
          </div>
          <h2 className="text-[25px] ">Event Report</h2>

          <div className=" flex items-center justify-between w-full  p-2 flex-wrap gap-2">
            {" "}
            <div className="dropdown ">
              <button
                className="custom-button-reports dropdown-toggle mr-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ minWidth: "150px" }}
              >
                Filter by Status
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  className="dropdown-item"
                  onClick={() => handleStatusChange("All")}
                >
                  All
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleStatusChange("Ongoing")}
                >
                  <FaCog /> Ongoing
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleStatusChange("Confirm")}
                >
                  <FaCheckCircle /> Confirm
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleStatusChange("Hot")}
                >
                  <FaFire /> Work Not Received
                </a>
              </div>
            </div>
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
                  minWidth: "150px", // Set a fixed width to ensure consistency with the dropdown button
                }}
              />
            </div>
            <div className="grid md:flex items-center">
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
                  minWidth: "150px", // Set a fixed width to ensure consistency with the dropdown button
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
            </div>
            <div className="">
              <p>Total number of events: {filteredEvents.length}</p>
              <button className="btn btn-primary mb-3 " onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-[60vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Event</th>
                  <th scope="col">Venue</th>
                  <th scope="col">Subvenue</th>
                  <th scope="col" onClick={toggleSortOrder}>
                    Event Date{" "}
                    {sortOrder === "asc" ? (
                      <FaSortAmountDown />
                    ) : (
                      <FaSortAmountUp />
                    )}
                  </th>
                  <th scope="col">Guest Number</th>
                  <th scope="col">Quotation Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.eventName}</td>
                    <td>{event.venue}</td>
                    <td>{event.subvenue}</td>
                    <td>{event.event_date}</td>
                    <td>{event.guest_number}</td>
                    <td>{event.budget}</td>
                    <td>{event.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventReport;
