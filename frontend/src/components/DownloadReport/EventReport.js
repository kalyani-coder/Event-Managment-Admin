import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { FaSortAmountDown, FaSortAmountUp, FaFire, FaCheckCircle, FaCog } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterEvents(status);
  };


  

  const fetchEventData = async () => {
    try {
      let url = "http://localhost:5000/api/event";
      if (selectedStatus) {
        url = `http://localhost:5000/api/event/status/${selectedStatus}`;
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
      Company_Name: event.company_name,
      Venue: event.venue,
      Subvenue: event.subvenue,
      Event_Date: event.event_date,
      Guest_Number: event.guest_number,
      QuotationAmount: event.budget,
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

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, [selectedStatus]); // Fetch data when selectedStatus changes

  const fetchData = async () => {
    try {
      let url = 'http://localhost:5000/api/event';
      if (selectedStatus !== 'All') {
        url += `/status/${selectedStatus}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterEvents = (status) => {
    if (status === 'All') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.status === status);
      setFilteredEvents(filtered);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const clearFilters = () => {
    setSelectedStatus('All');
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2>Event Report</h2>
        
        <div className="d-flex justify-content-between mb-3">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Filter by Status
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={() => handleStatusChange('All')}>All</a>
            <a className="dropdown-item" onClick={() => handleStatusChange('Ongoing')}><FaCog /> Ongoing</a>
            <a className="dropdown-item" onClick={() => handleStatusChange('Completed')}><FaCheckCircle /> Completed</a>
            <a className="dropdown-item" onClick={() => handleStatusChange('Hot')}><FaFire /> Hot</a>
          </div>
        </div>
        <button className="btn btn-primary" onClick={clearFilters}>Clear All Filters</button>
      </div>

        <p>Total number of events: {filteredEvents.length}</p>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>
          Export to Excel
        </button>
          
        <table className="table table-hover table-sm border border-dark table-responsive-md" style={{backgroundColor: 'white'}}>
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
