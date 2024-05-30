import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Sidebar/Header";
import { Link} from 'react-router-dom';

const ViewSalary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalaryData, setFilteredSalaryData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/staffsalary")
      .then((response) => {
        setSalaryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salary data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter salaryData based on search query
    const filteredData = salaryData.filter((item) => {
      const fullName = `${item.fname} ${item.lname}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });

    setFilteredSalaryData(filteredData);
  }, [searchQuery, salaryData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%] ">
          {" "}
          <div className="flex">
            <Link to={'/addsalary'}>
              <button className="btn btn-primary mr-4 mb-4">Add Salary</button>
            </Link>
            <Link to={'/viewsalary'}>
              <button className="btn btn-primary mr-4 mb-4">View Salary</button>
            </Link>
          </div>
          <h2 className="text-[30px]">View Salary</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-y-auto h-[70vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                {" "}
                <tr>
                  {/* <th className="text-center">Staff ID</th> */}
                  <th className="text-center">First Name</th>
                  <th className="text-center">Last Name</th>
                  <th className="text-center">Salary</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Month</th>
                  <th className="text-center">Advance Payment</th>
                  <th className="text-center">Remaining Payment</th>
                  <th className="text-center">Incentive</th>
                  <th className="text-center">Deduct Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaryData.map((item) => (
                  <tr key={item.staff_id}>
                    {/* <td className="text-center">{item.staff_id}</td> */}
                    <td className="text-center">{item.fname}</td>
                    <td className="text-center">{item.lname}</td>
                    <td className="text-center">{item.salary}</td>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">{item.month}</td>
                    <td className="text-center">{item.adv_payment}</td>
                    <td className="text-center">{item.rem_payment}</td>
                    <td className="text-center">{item.incentive}</td>
                    <td className="text-center">{item.deduct_amount}</td>
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

export default ViewSalary;
