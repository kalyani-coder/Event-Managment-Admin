import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link} from 'react-router-dom';

const PaymentReport = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const fetchSalaryData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/staffsalary"
      );
      const salaryData = await response.json();
      setSalaryData(salaryData);
      setFilteredData(salaryData); // Initially display all data
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    const wscols = [
      { wch: 10 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");
    XLSX.writeFile(wb, "salary_report.xlsx");
  };

  const applyFilter = () => {
    let filtered = salaryData;

    if (filterType !== "") {
      filtered = filtered.filter(
        (entry) => entry.type_Of_Salary === filterType
      );
    }

    if (dateRange.startDate !== "" && dateRange.endDate !== "") {
      filtered = filtered.filter((entry) => {
        return (
          entry.date >= dateRange.startDate && entry.date <= dateRange.endDate
        );
      });
    }

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    setFilterType("");
    setDateRange({ startDate: "", endDate: "" });
    setFilteredData(salaryData); // Reset filtered data to show all data
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
          <h2 className="text-[30px] ">Payment Report</h2>
          <div className=" flex items-center justify-between w-full  p-2 flex-wrap gap-2">
            {" "}
            <div className="dropdown ">
              <button
                className="btn btn-primary dropdown-toggle mr-2"
                onChange={(e) => setFilterType(e.target.value)}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ minWidth: "150px" }}
              >
                Filter
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item">Type of Salary</a>
                <a className="dropdown-item">Manager</a>
                <a className="dropdown-item">Accountant</a>
                <a className="dropdown-item">Executive</a>
              </div>
            </div>
            {/* <select
                className="form-select mr-2"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Type of Salary</option>
                <option value="manager">Manager</option>
                <option value="accountant">Accountant</option>
                <option value="executive">Executive</option>
              </select> */}
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
                  // Set a fixed width to ensure consistency with the dropdown button
                }}
              />
            </div>
            <div className=" grid md:flex mt-1 gap-1">
              <button className="btn btn-primary" onClick={applyFilter}>
                Apply
              </button>
              <button className="btn btn-danger" onClick={clearFilter}>
                Clear
              </button>
            </div>
            <div>
              <p>Total Payments: {totalPayments}</p>
              <button className="btn btn-primary mb-3" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>
          <div className="overflow-y-auto h-[60vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Person Name</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Date</th>
                  <th scope="col">Month</th>
                  <th scope="col">Advance Payment</th>
                  <th scope="col">Incentive</th>
                  <th scope="col">Deduct Amount</th>
                  <th scope="col">Advance Taken</th>
                  <th scope="col">Balance Amount</th>
                  <th scope="col">Type of Salary</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.salary_person_name}</td>
                    <td>{entry.salary}</td>
                    <td>{entry.date}</td>
                    <td>{entry.month}</td>
                    <td>{entry.adv_payment}</td>
                    <td>{entry.incentive}</td>
                    <td>{entry.deduct_amount}</td>
                    <td>{entry.adv_taken}</td>
                    <td>{entry.balance_amount}</td>
                    <td>{entry.type_Of_Salary}</td>
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

export default PaymentReport;
