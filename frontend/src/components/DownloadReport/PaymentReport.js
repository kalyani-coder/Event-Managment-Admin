import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";

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
        "https://eventmanagement-admin-hocm.onrender.com/api/staffsalary"
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

      <div className="container mt-5">
        <h2>Payment Report</h2>
        <div className="mb-3">
          <div className="input-group">
            <select
              className="form-select mr-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Type of Salary</option>
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
              <option value="executive">Executive</option>
              {/* Add more options as needed */}
            </select>
            <label style={{ marginRight: "10px" }}>Start Date:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="form-control mr-2"
            />
            <label style={{ marginRight: "10px" }}>End Date:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="form-control mr-2"
            />
            <button className="btn btn-primary" onClick={applyFilter}>
              Apply
            </button>
            <button className="btn btn-danger" onClick={clearFilter}>
              Clear
            </button>
          </div>
        </div>
        <div>Total Payments: {totalPayments}</div>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>
          Export to Excel
        </button>
        <table
          className="table table-hover table-sm border border-dark table-responsive-md"
          style={{ backgroundColor: "white" }}
        >
          <thead className="thead-light">
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
    </>
  );
};

export default PaymentReport;
