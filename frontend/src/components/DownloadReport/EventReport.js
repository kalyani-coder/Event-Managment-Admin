import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { FaSortAmountDown, FaSortAmountUp, FaFire, FaCheckCircle, FaCog } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventReport = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [caseSensitive, setCaseSensitive] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); 

  useEffect(() => {
    fetchEventData();
  }, [selectedStatus, selectedDate]); // Trigger fetchEventData when selectedStatus or selectedDate changes

  const fetchEventData = async () => {
    try {
      let url = "https://eventmanagement-admin-hocm.onrender.com/api/event"; 
      if (selectedStatus) {
        url = `http://localhost:5000/api/event/status/${selectedStatus}`;
      }
      const response = await fetch(url);
      const eventData = await response.json();
      setEvents(eventData);
      setFilteredEvents(eventData); 
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterEvents(query, selectedDate, selectedStatus);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortEvents(newSortOrder);
  };

  const filterEvents = (query, date, status) => {
    const filtered = events.filter((event) => {
      const eventName = event.eventName || "";
      const companyName = event.company_name || "";
      const venue = event.venue || "";
      const eventDate = event.event_date || "";
      const eventStatus = event.status || ""; 

      const dateMatch = !date || (eventDate && eventDate.includes(date.toISOString().slice(0, 10)));

      const normalizedQuery = caseSensitive ? query : query.toLowerCase();

      return (
        eventName.toLowerCase().includes(normalizedQuery) ||
        companyName.toLowerCase().includes(normalizedQuery) ||
        venue.toLowerCase().includes(normalizedQuery) ||
        dateMatch ||
        (status && eventStatus === status) 
      );
    });

    sortEvents(sortOrder, filtered);
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
      Company_Name: event.company_name,
      Venue: event.venue,
      Subvenue: event.subvenue,
      Event_Date: event.event_date,
      Guest_Number: event.guest_number,
      QuotaionAmount: event.budget,
      status: event.status
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
      { wch: 15 }
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "event_report.xlsx");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterEvents(searchQuery, date, selectedStatus);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Fetch data when status changes
    fetchEventData();
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2>Event Report</h2>
        <div className="mb-3">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter by Status
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => handleStatusChange("")}>All</a>
              <a className="dropdown-item" onClick={() => handleStatusChange("hot")}><FaFire /> Hot</a>
              <a className="dropdown-item" onClick={() => handleStatusChange("completed")}><FaCheckCircle /> Completed</a>
              <a className="dropdown-item" onClick={() => handleStatusChange("ongoing")}><FaCog /> Ongoing</a>
            </div>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
            className="form-control mr-2"
          />
        </div>
        <p>Total number of events: {filteredEvents.length}</p>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>
          Export to Excel
        </button>
        <table className="table table-hover table-sm border border-secondary">
          <thead className="thead-light">
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Company Name</th>
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
                <td>{event.company_name}</td>
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
    </>
  );
};

export default EventReport;
