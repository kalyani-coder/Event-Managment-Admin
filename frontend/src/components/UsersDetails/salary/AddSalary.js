import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddSalary = () => {
  const location = useLocation();
  const id = location.state;
  console.log(id);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/staffsalary")
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error("Error", e);
      });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState("");
  const [salaryTaken, setSalaryTaken] = useState("");
  const [advanceTaken, setAdvanceTaken] = useState("");
  const [incentiveAmount, setIncentiveAmount] = useState("");
  const [deductAmount, setDeductAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const salaryData = {
      firstName,
      lastName,
      salaryAmount,
      advanceAmount,
      date,
      time,
      month,
      salaryTaken,
      advanceTaken,
      incentiveAmount,
      deductAmount,
      balanceAmount,
    };
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Salary</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {/* Add the Date and Time fields here */}
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>salary of month </label>
                  <input
                    type="text"
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Salary Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Advance Payment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                  />
                </div>
                {/* More input fields for salary, advance, month */}
                <button className="btn btn-info" type="submit">
                  Add Salary
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Salary Details</h5>
              <div className="form-group">
                <label>Salary Taken</label>
                <input
                  type="text"
                  className="form-control"
                  value={salaryTaken}
                  onChange={(e) => setSalaryTaken(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Advance Taken</label>
                <input
                  type="text"
                  className="form-control"
                  value={advanceTaken}
                  onChange={(e) => setAdvanceTaken(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Incentive Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={incentiveAmount}
                  onChange={(e) => setIncentiveAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Deduct Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={deductAmount}
                  onChange={(e) => setDeductAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Balance Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalary;
