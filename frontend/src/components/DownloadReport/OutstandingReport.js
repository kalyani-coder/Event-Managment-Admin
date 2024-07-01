import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link } from "react-router-dom";

const OutstandingReport = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendorFilter, setVendorFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const enquiryResponse = await fetch('http://localhost:8888/api/enquiry');
        const enquiryData = await enquiryResponse.json();

        const quotationResponse = await fetch('http://localhost:8888/api/quotationinfo');
        const quotationData = await quotationResponse.json();

        const report = generateReport(enquiryData, quotationData);
        setReportData(report);
        setFilteredData(report);
        setVendors([...new Set(report.map(item => item.vendorName))]);
        setEvents([...new Set(report.map(item => item.event_name))]);
        setCustomers([...new Set(report.map(item => item.customer_name))]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReportData();
  }, []);

  const generateReport = (enquiryData, quotationData) => {
    const report = [];

    enquiryData.forEach(enquiry => {
      const { customer_Id, customer_name, event_name, event_date } = enquiry;

      quotationData.forEach(quotation => {
        if (quotation.eventId === enquiry.eventId) {
          quotation.requirements.forEach(requirement => {
            const { stockName, vendorName, purchaseQuantity, rate_per_days, days, price } = requirement;

            report.push({
              customer_Id,
              customer_name,
              event_name,
              event_date,
              stockName,
              vendorName,
              purchaseQuantity,
              rate_per_days,
              days,
              price
            });
          });
        }
      });
    });

    return report;
  };

  const handleFilterChange = () => {
    let filtered = reportData;

    if (vendorFilter) {
      filtered = filtered.filter(item => item.vendorName === vendorFilter);
    }

    if (eventFilter) {
      filtered = filtered.filter(item => item.event_name === eventFilter);
    }

    if (customerFilter) {
      filtered = filtered.filter(item => item.customer_name === customerFilter);
    }

    if (dateRange.startDate) {
      filtered = filtered.filter(item => new Date(item.event_date) >= new Date(dateRange.startDate));
    }

    if (dateRange.endDate) {
      filtered = filtered.filter(item => new Date(item.event_date) <= new Date(dateRange.endDate));
    }

    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const exportData = filteredData.map((data) => ({
      "Customer Name": data.customer_name,
      "Event Name": data.event_name,
      "Event Date": data.event_date,
      "Stock Name": data.stockName,
      "Vendor Name": data.vendorName,
      "Purchase Quantity": data.purchaseQuantity,
      "Rate per Day": data.rate_per_days,
      "Days": data.days,
      "Price": data.price,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Outstanding Report");
    XLSX.writeFile(wb, "outstanding_report.xlsx");
  };

  useEffect(() => {
    handleFilterChange();
  }, [vendorFilter, eventFilter, customerFilter, dateRange]);

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
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
          <h2 className="text-[25px] ">Outstanding Report</h2>
          <div className="flex items-center justify-between w-full p-2 flex-wrap gap-2">
            <div className="dropdown">
              <button
                className="custom-button-reports dropdown-toggle"
                type="button"
                id="vendorDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filter By Vendor
              </button>
              <div className="dropdown-menu" aria-labelledby="vendorDropdown">
                <button className="dropdown-item" onClick={() => setVendorFilter("")}>
                  All Vendors
                </button>
                {vendors.map((vendor, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => setVendorFilter(vendor)}
                  >
                    {vendor}
                  </button>
                ))}
              </div>
            </div>

            <div className="dropdown">
              <button
                className="custom-button-reports dropdown-toggle"
                type="button"
                id="eventDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filter By Event
              </button>
              <div className="dropdown-menu" aria-labelledby="eventDropdown">
                <button className="dropdown-item" onClick={() => setEventFilter("")}>
                  All Events
                </button>
                {events.map((event, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => setEventFilter(event)}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <div className="dropdown">
              <button
                className="custom-button-reports dropdown-toggle"
                type="button"
                id="customerDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filter By Customer
              </button>
              <div className="dropdown-menu" aria-labelledby="customerDropdown">
                <button className="dropdown-item" onClick={() => setCustomerFilter("")}>
                  All Customers
                </button>
                {customers.map((customer, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => setCustomerFilter(customer)}
                  >
                    {customer}
                  </button>
                ))}
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
                }}
              />
            </div>

            <div className="grid md:flex mt-1 gap-1">
              <button
                onClick={handleFilterChange}
                className="btn btn-success"
              >
                Apply
              </button>
              <button className="btn btn-danger" onClick={() => {
                setVendorFilter("");
                setEventFilter("");
                setCustomerFilter("");
                setDateRange({ startDate: "", endDate: "" });
                setFilteredData(reportData);
              }}>
                Clear
              </button>
            </div>
          </div>

          <div>
            <p>Total number of payments: {filteredData.length}</p>
            <button className="btn btn-primary mb-3" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>

          <div className="overflow-y-auto h-[50vh] md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th>Customer Name</th>
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Stock Name</th>
                  <th>Vendor Name</th>
                  <th>Purchase Quantity</th>
                  <th>Rate per Day</th>
                  <th>Days</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.customer_name}</td>
                    <td>{data.event_name}</td>
                    <td>{data.event_date}</td>
                    <td>{data.stockName}</td>
                    <td>{data.vendorName}</td>
                    <td>{data.purchaseQuantity}</td>
                    <td>{data.rate_per_days}</td>
                    <td>{data.days}</td>
                    <td>{data.price}</td>
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

export default OutstandingReport;
