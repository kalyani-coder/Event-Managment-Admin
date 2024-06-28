import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Link } from 'react-router-dom';
import {
  FaFilter,
} from "react-icons/fa";
import Header from "../Sidebar/Header";
import "react-datepicker/dist/react-datepicker.css";

const BankwiseReport = () => {
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [selectedFromBank, setSelectedFromBank] = useState("");
  const [selectedToBank, setSelectedToBank] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetchTransferData();
  }, []);

  const fetchTransferData = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/banktransfer");
      const transferData = await response.json();
      setTransfers(transferData);
      setFilteredTransfers(transferData);
    } catch (error) {
      console.error("Error fetching transfer data:", error);
    }
  };

  const handleDateRangeFilter = () => {
    let filtered = transfers.filter((transfer) => {
      const transferDate = new Date(transfer.date);
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      return (
        (!startDate || transferDate >= startDate) &&
        (!endDate || transferDate <= endDate) &&
        ((!selectedFromBank || transfer.from_bank === selectedFromBank) &&
        (!selectedToBank || transfer.to_bank === selectedToBank))
      );
    });

    setFilteredTransfers(filtered);
  };

  const clearFilters = () => {
    setSelectedFromBank("");
    setSelectedToBank("");
    setDateRange({ startDate: "", endDate: "" });
    setFilteredTransfers(transfers);
  };

  const exportToExcel = () => {
    // Map the data to include only the required fields with proper headings
    const mappedData = filteredTransfers.map((transfer) => ({
      "From Bank": transfer.from_bank,
      "From Account": transfer.from_bank_accountNu,
      "To Bank": transfer.to_bank,
      "To Account": transfer.to_bank_accountNu,
      "Amount": transfer.amount,
      "Date": new Date(transfer.date).toLocaleDateString(), // Format the date
    }));
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(mappedData);
  
    // Set column widths
    const wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
    ];
    ws["!cols"] = wscols;
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Bank Transfers");
  
    // Write the workbook to a file
    XLSX.writeFile(wb, "bank_transfer_report.xlsx");
  };

  const handleFromBankFilterChange = (bank) => {
    setSelectedFromBank(bank);
    filterTransfers(bank, selectedToBank);
  };

  const handleToBankFilterChange = (bank) => {
    setSelectedToBank(bank);
    filterTransfers(selectedFromBank, bank);
  };

  const filterTransfers = (fromBank, toBank) => {
    let filtered = transfers.filter((transfer) => {
      return (!fromBank || transfer.from_bank === fromBank) &&
             (!toBank || transfer.to_bank === toBank);
    });
    setFilteredTransfers(filtered);
  };

  const bankOptions = [
    ...new Set(transfers.map((transfer) => transfer.from_bank).concat(transfers.map((transfer) => transfer.to_bank))),
  ];

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
          <h2 className="text-[30px]">Bankwise Report</h2>
          <div className="flex items-center justify-between w-full p-2 flex-wrap gap-2">
            <div className="dropdown">
              <button className="custom-button-reports dropdown-toggle mr-2 flex items-center content-center justify-center gap-1" type="button" id="fromBankFilterDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FaFilter /> Filter By From Bank
              </button>
              <div className="dropdown-menu" aria-labelledby="fromBankFilterDropdown">
                {bankOptions.map((option, index) => (
                  <button key={index} className="dropdown-item" onClick={() => handleFromBankFilterChange(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button className="custom-button-reports dropdown-toggle mr-2 flex items-center content-center justify-center gap-1" type="button" id="toBankFilterDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FaFilter /> Filter By To Bank
              </button>
              <div className="dropdown-menu" aria-labelledby="toBankFilterDropdown">
                {bankOptions.map((option, index) => (
                  <button key={index} className="dropdown-item" onClick={() => handleToBankFilterChange(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:flex items-center">
              <label style={{ marginRight: "10px" }}>Start Date:</label>
              <input type="date" value={dateRange.startDate} onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })} style={{ padding: "10px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" }} />
            </div>
            <div className="grid md:flex items-center">
              <label style={{ marginRight: "10px" }}>End Date:</label>
              <input type="date" value={dateRange.endDate} onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })} style={{ padding: "10px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" }} />
            </div>
            <div>
              <button onClick={handleDateRangeFilter} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #28A745", backgroundColor: "#28A745", color: "#fff", cursor: "pointer", fontSize: "16px", marginLeft: "10px" }}>
                Apply
              </button>
              <button onClick={clearFilters} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #DC3545", backgroundColor: "#DC3545", color: "#fff", cursor: "pointer", fontSize: "16px", marginLeft: "10px" }}>
                Clear
              </button>
            </div>
            <div>
              <p>Total number of transfers: {filteredTransfers.length}</p>
              <button className="btn btn-primary mb-3" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>
          <div className="overflow-y-auto h-[60vh] md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead>
                <tr>
                  <th>From Bank</th>
                  <th>From Account</th>
                  <th>To Bank</th>
                  <th>To Account</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransfers.map((transfer, index) => (
                  <tr key={index}>
                    <td>{transfer.from_bank}</td>
                    <td>{transfer.from_bank_accountNu}</td>
                    <td>{transfer.to_bank}</td>
                    <td>{transfer.to_bank_accountNu}</td>
                    <td>{transfer.amount}</td>
                    <td>{transfer.date}</td>
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

export default BankwiseReport;
