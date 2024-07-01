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
  const [salary, setSalary] = useState("");
  const [adv_payment, setAdvPayment] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());
  const [month, setMonth] = useState("");
  const [salaryTaken, setSalaryTaken] = useState("");
  const [adv_taken, setAdvTaken] = useState("");
  const [incentive, setIncentive] = useState("");
  const [deduct_amount, setDeductAmount] = useState("");
  const [balance_amount, setBalanceAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [managerOptions, setManagerOptions] = useState([]);
  const [accountantOptions, setAccountantOptions] = useState([]);
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [salaryType, setSalaryType] = useState("");

  const [errors, setErrors] = useState({
    selectedOption: false,
    salaryType: false,
    salary: false,
    adv_payment: false,
  });

  useEffect(() => {
    if (managerDetails) {
      setfname(managerDetails.fname);
      setlname(managerDetails.lname);
    }
  }, [managerDetails]);

  useEffect(() => {
    fetch("http://localhost:8888/api/managerdetails")
      .then((response) => response.json())
      .then((data) => setManagerOptions(data));

    fetch("http://localhost:8888/api/accountant")
      .then((response) => response.json())
      .then((data) => setAccountantOptions(data));

    fetch("http://localhost:8888/api/executive")
      .then((response) => response.json())
      .then((data) => setExecutiveOptions(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      selectedOption: false,
      salaryType: false,
      salary: false,
      adv_payment: false,
    });

    // Check for mandatory fields
    let formValid = true;

    if (!selectedOption) {
      setErrors((prevErrors) => ({ ...prevErrors, selectedOption: true }));
      formValid = false;
    }

    if (!salaryType) {
      setErrors((prevErrors) => ({ ...prevErrors, salaryType: true }));
      formValid = false;
    }

    if (!salary || parseFloat(salary) < 0) {
      setErrors((prevErrors) => ({ ...prevErrors, salary: true }));
      formValid = false;
    }

    if (!adv_payment || parseFloat(adv_payment) < 0) {
      setErrors((prevErrors) => ({ ...prevErrors, adv_payment: true }));
      formValid = false;
    }

    if (parseFloat(adv_payment) > parseFloat(salary)) {
      setErrors((prevErrors) => ({ ...prevErrors, adv_payment: true }));
      alert("Advance payment cannot be greater than salary amount");
      formValid = false;
    }

    if (!formValid) {
      return;
    }

    const salaryData = {
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
      .post("http://localhost:8888/api/staffsalary", salaryData)
      .then((response) => {
        console.log("Salary added successfully:", response.data);
        alert("Salary Added Successfully");

        // Clear form fields after successful submission
        setSalary("");
        setAdvPayment("");
        setDate(getCurrentDate());
        setTime(getCurrentTime());
        setMonth("");
        setSalaryTaken("");
        setAdvTaken("");
        setIncentive("");
        setDeductAmount("");
        setBalanceAmount("");
        setSelectedOption("");
        setSalaryType("");
      })
      .catch((error) => {
        console.error("Error adding salary:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] w-full">
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
                <div className={`form-group ${errors.selectedOption ? 'has-error' : ''}`}>
                  <label htmlFor="typeOfSalary">Add Salary Type <span style={{ color: "red" }}>*</span></label>
                  <select
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="manager">Manager</option>
                    <option value="accountant">Accountant</option>
                    <option value="executive">Executive</option>
                  </select>
                  {errors.selectedOption && <span className="error-message" style={{ color: "red" }}>This field is required</span>}
                </div>
              </div>

              <div className="col px-5">
                <div className={`form-group ${errors.salaryType ? 'has-error' : ''}`}>
                  <label htmlFor="salaryType">Select Name <span style={{ color: "red" }}>*</span></label>
                  <select
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
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
                  {errors.salaryType && <span className="error-message" style={{ color: "red" }}>This field is required</span>}
                </div>
              </div>
            </div>

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
                <div className={`form-group ${errors.salary ? 'has-error' : ''}`}>
                  <label htmlFor="salary">Salary Amount <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="number"
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  {errors.salary && <span className="error-message" style={{ color: "red" }}>Salary amount cannot be negative</span>}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <div className={`form-group ${errors.adv_payment ? 'has-error' : ''}`}>
                  <label htmlFor="adv_payment">Advance Payment <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="number"
                    className={`form-control ${errors.adv_payment ? 'is-invalid' : ''}`}
                    value={adv_payment}
                    onChange={(e) => setAdvPayment(e.target.value)}
                  />
                  {errors.adv_payment && <span className="error-message" style={{ color: "red" }}>Advance payment cannot be negative or greater than salary amount</span>}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="salaryTaken">Advance Taken</label>
                  <input
                    type="number"
                    className="form-control"
                    value={adv_taken}
                    onChange={(e) => setAdvTaken(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="incentive">Incentive</label>
                  <input
                    type="number"
                    className="form-control"
                    value={incentive}
                    onChange={(e) => setIncentive(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="deduct_amount">Deduction Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={deduct_amount}
                    onChange={(e) => setDeductAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="balance_amount">Balance Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={balance_amount}
                    onChange={(e) => setBalanceAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Salary
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSalary;
