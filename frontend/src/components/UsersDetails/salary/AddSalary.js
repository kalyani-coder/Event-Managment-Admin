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
      .post("http://localhost:5000/api/staffsalary", salaryData)
      .then((response) => {
        // Handle success, you can redirect or show a success message here
        console.log("Salary added successfully:", response.data);
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
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
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
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
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Advance Payment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adv_payment}
                    onChange={(e) => setadv_payment(e.target.value)}
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
                  value={incentive}
                  onChange={(e) => setincentive(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Deduct Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={deduct_amount}
                  onChange={(e) => setdeduct_amount(e.target.value)}
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
