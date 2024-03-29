import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { FaSortAmountDown, FaSortAmountUp, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventReport = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order is ascending
  const [caseSensitive, setCaseSensitive] = useState(false); // Default case sensitivity is false
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await fetch(
        "https://eventmanagement-admin-hocm.onrender.com/api/event"
      );
      const eventData = await response.json();
      setEvents(eventData);
      setFilteredEvents(eventData); // Initially, display all events
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterEvents(e.target.value, selectedDate);
  };

  const toggleCaseSensitive = () => {
    // setCaseSensitive(!caseSensitive);
    filterEvents(searchQuery, selectedDate);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortEvents(newSortOrder);
  };

  const filterEvents = (query, date) => {
    const filtered = events.filter((event) => {
      const eventName = event && event.eventName ? (caseSensitive ? event.eventName : event.eventName.toLowerCase()) : "";
      const companyName = event && event.company_name ? (caseSensitive ? event.company_name : event.company_name.toLowerCase()) : "";
      const venue = event && event.venue ? (caseSensitive ? event.venue : event.venue.toLowerCase()) : "";
      const eventDate = event && event.event_date ? (caseSensitive ? event.event_date : event.event_date.toLowerCase()) : "";
  
      // Check if event_date is defined before trying to use it
      const dateMatch = !date || (eventDate && eventDate.includes(date.toISOString().slice(0, 10)));
  
      return (
        eventName.includes(query) ||
        companyName.includes(query) ||
        venue.includes(query) ||
        dateMatch
      );
    });
  
    sortEvents(sortOrder, filtered);
  };
  
  

  const sortEvents = (order, data = null) => {
    const eventsToSort = data || filteredEvents;
    const sorted = [...eventsToSort].sort((a, b) => {
      const valueA = a.event_date.toLowerCase();
      const valueB = b.event_date.toLowerCase();

      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilteredEvents(sorted);
  };

  const exportToExcel = () => {
    const filteredData = filteredEvents.map((event) => {
      return {
        EventName: event.eventName,
        Company_Name: event.company_name,
        Venue: event.venue,
        Subvenue: event.subvenue,
        Event_Date: event.event_date,
        Guest_Number: event.guest_number,
        QuotaionAmount: event.budget
      };
    });

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
    filterEvents(searchQuery, date);
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2>Event Report</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search Company Name, Event Name, Venue"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ width: "35%", float: "left" }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary mr-2"
              type="button"
              onClick={handleSearchInputChange}
            >
              <FaSearch /> Search
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              className="form-control mr-2"
            />
            {/* <button
              className="btn btn-primary mr-2"
              type="button"
              onClick={toggleSortOrder}
            >
              {sortOrder === "asc" ? (
                <>
                  <FaSortAmountDown /> Sort Ascending To Date
                </>
              ) : (
                <>
                  <FaSortAmountUp /> Sort Descending To Date
                </>
              )}
            </button> */}
            {/* <button
              className="btn btn-secondary"
              type="button"
              onClick={toggleCaseSensitive}
            >
              {`Case ${caseSensitive ? "Sensitive" : "Insensitive"}`}
            </button> */}
          </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EventReport;
