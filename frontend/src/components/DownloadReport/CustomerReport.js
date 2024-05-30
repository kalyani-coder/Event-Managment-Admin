import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';

const CustomerReport = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/advpayment"
      );
      const eventData = await response.json();
      setEvents(eventData);
      setFilteredEvents(eventData); // Initially, display all events
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    filterEventsByCustomer(e.target.value);
  };

  const applyFilter = () => {
    filterEventsByCustomer(selectedCustomer);
  };

  const clearFilter = () => {
    setSelectedCustomer("");
    setFilteredEvents(events);
  };

  const filterEventsByCustomer = (customer) => {
    if (customer === "") {
      // If no customer selected, show all events
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.client_name === customer);
      setFilteredEvents(filtered);
    }
  };

  const exportToExcel = () => {
    // Create a new array with only the required fields
    const filteredData = filteredEvents.map((event) => {
      return {
        ClientName: event.client_name,
        EventName: event.event_name,
        Amount: event.amount,
        AdvancePayment: event.adv_payment,
        RemainingPayment: event.rem_payment,
        PaymentDate: event.payment_date,
        PaymentTime: event.payment_time,
        PaymentMethod: event.payment_method,
        ChequeNumber: event.cheque_number,
        WhomToSubmit: event.whome_to_submit,
        UTRNumberRTGSID: event.utrno_rtgs_id,
        Contact: event.contact,
        GuestNumber: event.guest_number,
        Venue: event.venue,
        EventDate: event.event_date,
      };
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Set column widths
    const wscols = [
      { wch: 20 }, // client_name
      { wch: 20 }, // event_name
      { wch: 15 }, // amount
      { wch: 20 }, // adv_payment
      { wch: 20 }, // rem_payment
      { wch: 20 }, // payment_date
      { wch: 20 }, // payment_time
      { wch: 20 }, // payment_method
      { wch: 20 }, // cheque_number
      { wch: 20 }, // whome_to_submit
      { wch: 20 }, // utrno_rtgs_id
      { wch: 20 }, // contact
      { wch: 20 }, // guest_number
      { wch: 20 }, // venue
      { wch: 20 }, // event_date
    ];
    ws["!cols"] = wscols;

    // Append the worksheet to the workbook and save
    XLSX.utils.book_append_sheet(wb, ws, "CustomerReport");
    XLSX.writeFile(wb, "customer_report.xlsx");
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
          <h2 className="text-[30px] ">Customer Wise Report</h2>
          <div className="mb-3  align-items-center grid md:flex gap-2">
            <select
              className="form-control mr-2"
              onChange={handleCustomerChange}
              value={selectedCustomer}
            >
              <option value="">Select Customer</option>
              {events.map((event, index) => (
                <option key={index} value={event.client_name}>
                  {event.client_name}
                </option>
              ))}
            </select>
            <button className="btn btn-success mr-2" onClick={applyFilter}>
              Apply
            </button>
            <button className="btn btn-danger" onClick={clearFilter}>
              Clear
            </button>
          </div>

          <p>
            Total number of reports for {selectedCustomer}:{" "}
            {filteredEvents.length}
          </p>
          <button className="btn btn-primary mb-3" onClick={exportToExcel}>
            Export to Excel
          </button>
          <div className="overflow-y-auto h-[60vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Client Name</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Advance Payment</th>
                  <th scope="col">Remaining Payment</th>
                  <th scope="col">Payment Date</th>
                  {/* <th scope="col">Payment Time</th> */}
                  <th scope="col">Payment Method</th>
                  {/* <th scope="col">Cheque Number</th>
              <th scope="col">Whom To Submit</th>
              <th scope="col">UTR Number/RTGS ID</th> */}
                  <th scope="col">Contact</th>
                  <th scope="col">Guest Number</th>
                  <th scope="col">Venue</th>
                  <th scope="col">Event Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.client_name}</td>
                    <td>{event.event_name}</td>
                    <td>{event.amount}</td>
                    <td>{event.adv_payment}</td>
                    <td>{event.rem_payment}</td>
                    <td>{event.payment_date}</td>
                    {/* <td>{event.payment_time}</td> */}
                    <td>{event.payment_method}</td>
                    {/* <td>{event.cheque_number}</td>
                <td>{event.whome_to_submit}</td>
                <td>{event.utrno_rtgs_id}</td> */}
                    <td>{event.contact}</td>
                    <td>{event.guest_number}</td>
                    <td>{event.venue}</td>
                    <td>{event.event_date}</td>
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

export default CustomerReport;
