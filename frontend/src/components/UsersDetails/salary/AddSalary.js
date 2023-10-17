import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddSalary = () => {
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const salaryData = {
      fname,
      lname,
      salary,
      adv_payment,
      date,
      time,
      month,
      salaryTaken,
      advanceTaken,
      incentive,
      deduct_amount,
      balanceAmount,
    };

    axios
      .post("https://eventmanagement-admin-hocm.onrender.com/api/staffsalary", salaryData)
      .then((response) => {
        console.log("Salary added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding salary:", error);
      });
  };

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [salary, setsalary] = useState("");
  const [adv_payment, setadv_payment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState("");
  const [salaryTaken, setSalaryTaken] = useState("");
  const [advanceTaken, setAdvanceTaken] = useState("");
  const [incentive, setincentive] = useState("");
  const [deduct_amount, setdeduct_amount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Salary</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">First Name<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="month">Salary of Month<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary Amount<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adv_payment">Advance Payment<span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={adv_payment}
                    onChange={(e) => setadv_payment(e.target.value)}
                    required
                  />
                </div>
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
                <label htmlFor="salaryTaken">Salary Taken<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={salaryTaken}
                  onChange={(e) => setSalaryTaken(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="advanceTaken">Advance Taken<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={advanceTaken}
                  onChange={(e) => setAdvanceTaken(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="incentive">Incentive Amount<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={incentive}
                  onChange={(e) => setincentive(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="deduct_amount">Deduct Amount<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={deduct_amount}
                  onChange={(e) => setdeduct_amount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="balanceAmount">Balance Amount<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  required
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
