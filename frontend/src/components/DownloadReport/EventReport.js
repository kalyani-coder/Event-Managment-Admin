import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const EventReport = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterEvents(e.target.value);
  };

  // Function to filter events based on search query
  const filterEvents = (query) => {
    const filtered = events.filter((event) => {
      return (
        event.eventName.toLowerCase().includes(query.toLowerCase()) ||
        event.fname.toLowerCase().includes(query.toLowerCase()) ||
        event.company_name.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase()) ||
        event.event_date.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredEvents(filtered);
  };

  const exportToExcel = () => {
    // Create a new array with only the required fields
    const filteredData = filteredEvents.map(event => {
        return {
            EventName: event.eventName,
            Fname: event.fname,
            Company_Name: event.company_name,
            Email: event.email,
            Contact: event.contact,
            Event_Type: event.event_type,
            Venue: event.venue,
            Subvenue: event.subvenue,
            Guest_Number: event.guest_number,
            QuotaionAmount: event.budget,
            event_date: event.event_date
        };
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Set column widths
    const wscols = [
        { wch: 15 }, // eventName
        { wch: 15 }, // fname
        { wch: 15 }, // company_name
        { wch: 15 }, // email
        { wch: 12 }, // contact
        { wch: 15 }, // event_type
        { wch: 15 }, // venue
        { wch: 12 }, // subvenue
        { wch: 12 }, // guest_number
        { wch: 15 }, // budget
        { wch: 15 }  // event_date
    ];
    ws['!cols'] = wscols;

    // Append the worksheet to the workbook and save
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "event_report.xlsx");
};

  return (
    <div className="container mt-5">
      <h2>Event Report</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mr-2" // Added margin to the right
          placeholder="Search Company Name, Event Name, Venue, Date"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{"width":"35%", float:"left"}}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={filterEvents}
          >
            Search
          </button>
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
            <th scope="col">Company</th>
            <th scope="col">Event</th>
            <th scope="col">Venue</th>
            <th scope="col">Subvenue</th>
            <th scope="col">Event Date</th>
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
  );
};

export default EventReport;
