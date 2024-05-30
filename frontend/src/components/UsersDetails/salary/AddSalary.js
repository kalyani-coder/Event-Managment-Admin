import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Header from "../../Sidebar/Header";

const AddSalary = () => {
  const location = useLocation();
  const managerDetails = location.state;

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [salary, setsalary] = useState("");
  const [adv_payment, setadv_payment] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());
  const [month, setMonth] = useState("");
  const [salaryTaken, setSalaryTaken] = useState("");
  const [adv_taken, setadv_taken] = useState("");
  const [incentive, setincentive] = useState("");
  const [deduct_amount, setdeduct_amount] = useState("");
  const [balance_amount, setBalanceAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [managerOptions, setManagerOptions] = useState([]);
  const [accountantOptions, setAccountantOptions] = useState([]);
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [salaryType, setSalaryType] = useState("");

  useEffect(() => {
    if (managerDetails) {
      setfname(managerDetails.fname);
      setlname(managerDetails.lname);
    }
  }, [managerDetails]);

  useEffect(() => {
    fetch("http://localhost:5000/api/managerdetails")
      .then((response) => response.json())
      .then((data) => setManagerOptions(data));

    fetch("http://localhost:5000/api/accountant")
      .then((response) => response.json())
      .then((data) => setAccountantOptions(data));

    fetch("http://localhost:5000/api/executive")
      .then((response) => response.json())
      .then((data) => setExecutiveOptions(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const salaryData = {
      // fname,
      // lname,

      type_Of_Salary: selectedOption,
      salary_person_name: salaryType,
      salary,
      adv_payment,
      date,
      time,
      month,
      salaryTaken,
      adv_taken,
      incentive,
      deduct_amount,
      balance_amount,
    };

    axios
      .post("http://localhost:5000/api/staffsalary", salaryData)
      .then((response) => {
        console.log("Salary added successfully:", response.data);
        alert("Salary Added Successfully");
      })
      .catch((error) => {
        console.error("Error adding salary:", error);
      });
  };
  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] w-full">
          {" "}
          <form className="" onSubmit={handleSubmit}>
          <div className="flex">
            <Link to={'/addsalary'}>
              <button className="btn btn-primary mr-4 mb-4">Add Salary</button>
            </Link>
            <Link to={'/viewsalary'}>
              <button className="btn btn-primary mr-4 mb-4">View Salary</button>
            </Link>
          </div>
            <h2 className="text-[30px] pl-5">Add Salary</h2>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="typeOfSalary">Add Salary</label>
                  <select
                    className="form-control"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="manager">Manager</option>
                    <option value="accountant">Accountant</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="salaryType">Select Salary Type</label>
                  <select
                    className="form-control"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    {selectedOption === "manager" &&
                      managerOptions.map((manager) => (
                        <option key={manager._id} value={manager.fname}>
                          {manager.fname}
                        </option>
                      ))}
                    {selectedOption === "accountant" &&
                      accountantOptions.map((accountant) => (
                        <option key={accountant._id} value={accountant.fname}>
                          {accountant.fname}
                        </option>
                      ))}
                    {selectedOption === "executive" &&
                      executiveOptions.map((executive) => (
                        <option key={executive._id} value={executive.fname}>
                          {executive.fname}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* <div className="form-group">
                  <label htmlFor="lname">Last Name<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                    required
                  />
                </div> */}
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="month">Salary of Month</label>
                  <input
                    type="text"
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="salary">Salary Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="adv_payment">Advance Payment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adv_payment}
                    onChange={(e) => setadv_payment(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <button className="manager-btn ms-1" type="submit">
                  Add Salary
                </button>
              </div>
            </div>
          </form>
          <div>
            <h5 className="text-[35px] pl-5 ">Salary Details</h5>
            {/* <div className="form-group">
                <label htmlFor="salaryTaken">Salary Taken</label>
                <input
                  type="text"
                  className="form-control"
                  value={salaryTaken}
                  onChange={(e) => setSalaryTaken(e.target.value)}

                />
              </div> */}
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="adv_taken">Advance Taken</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adv_taken}
                    onChange={(e) => setadv_taken(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="incentive">Incentive Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={incentive}
                    onChange={(e) => setincentive(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="deduct_amount">Deduct Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={deduct_amount}
                    onChange={(e) => setdeduct_amount(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="balance_amount">Balance Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={balance_amount}
                    onChange={(e) => setBalanceAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSalary;
