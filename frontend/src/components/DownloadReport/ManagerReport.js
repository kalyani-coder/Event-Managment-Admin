import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';

const ManagerReport = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/managerdetails");
      const eventData = await response.json();
      setEvents(eventData);
      setFilteredEvents(eventData); // Initially, display all events
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterEvents(value);
  };

  // Function to filter events based on search query
  const filterEvents = (query) => {
    const filtered = events.filter((event) => {
      return (
        event.fname.toLowerCase().includes(query.toLowerCase()) ||
        event.lname.toLowerCase().includes(query.toLowerCase()) ||
        event.address.toLowerCase().includes(query.toLowerCase()) ||
        event.city.toLowerCase().includes(query.toLowerCase()) ||
        event.state.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredEvents(filtered);
  };

  const exportToExcel = () => {
    // Create a new array with only the required fields
    const filteredData = filteredEvents.map((event) => {
      return {
        FirstName: event.fname,
        LastName: event.lname,
        Email: event.email,
        Contact: event.contact,
        Address: event.address,
        City: event.city,
        // State: event.state,
        // HolderName: event.holder_name,
        // AccountNumber: event.account_number,
        // IFSCCode: event.IFSC_code,
        // BankName: event.bank_name,
        // BranchName: event.branch_name
      };
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Set column widths
    const wscols = [
      { wch: 15 }, // fname
      { wch: 15 }, // lname
      { wch: 30 }, // email
      { wch: 15 }, // contact
      { wch: 30 }, // address
      { wch: 15 }, // city
      { wch: 15 }, // state
      { wch: 20 }, // holder_name
      { wch: 20 }, // account_number
      { wch: 15 }, // IFSC_code
      { wch: 30 }, // bank_name
      { wch: 20 }, // branch_name
    ];
    ws["!cols"] = wscols;

    // Append the worksheet to the workbook and save
    XLSX.utils.book_append_sheet(wb, ws, "Managers");
    XLSX.writeFile(wb, "manager_report.xlsx");
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
          <h2 className="text-[25px] ">Manager Report</h2>
          <div className="mb-2  align-items-center grid md:flex gap-1">
            <input
              type="text"
              className="form-control reports mr-2" // Added margin to the right
              placeholder="Search by First Name, Last Name, Address, City, State"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div className="input-group-append">
              <button
                className="custom-button-reports"
                type="button"
                onClick={() => filterEvents(searchQuery)}
              >
                Search
              </button>
            </div>
            
            <p className="para-report ml-20">Total number of managers: {filteredEvents.length}</p>
          <button className="btn btn-primary mb-2 ml-14" onClick={exportToExcel}>
            Export to Excel
          </button>
          </div>
         
          <div className="overflow-y-auto h-[60vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                 
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.fname}</td>
                    <td>{event.lname}</td>
                    <td>{event.email}</td>
                    <td>{event.contact}</td>
                    <td>{event.address}</td>
                    <td>{event.city}</td>
                    <td>{event.state}</td>
                    {/* <td>{event.holder_name}</td>
              <td>{event.account_number}</td>
              <td>{event.IFSC_code}</td>
              <td>{event.bank_name}</td>
              <td>{event.branch_name}</td> */}
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

export default ManagerReport;
