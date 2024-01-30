import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddSalary = () => {
  const location = useLocation();
  const managerDetails = location.state;
  const id = location.state;
  console.log(id);

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [salary, setsalary] = useState("");
  const [adv_payment, setadv_payment] = useState("");
  const [date, setDate] = useState(getCurrentDate()); // Set initial value to the current date
  const [time, setTime] = useState(getCurrentTime()); // Set initial value to the current time
  const [month, setMonth] = useState("");
  const [salaryTaken, setSalaryTaken] = useState("");
  const [advanceTaken, setAdvanceTaken] = useState("");
  const [incentive, setincentive] = useState("");
  const [deduct_amount, setdeduct_amount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");

  useEffect(() => {
    if (managerDetails) {
      setfname(managerDetails.fname);
      setlname(managerDetails.lname);
      // ... (set other fields)
    }
  }, [managerDetails]);

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
        console.log("Salary added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding salary:", error);
      });
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
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="month">Salary of Month</label>
                  <input
                    type="text"
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}

                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}

                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adv_payment">Advance Payment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adv_payment}
                    onChange={(e) => setadv_payment(e.target.value)}

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
                <label htmlFor="salaryTaken">Salary Taken</label>
                <input
                  type="text"
                  className="form-control"
                  value={salaryTaken}
                  onChange={(e) => setSalaryTaken(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="advanceTaken">Advance Taken</label>
                <input
                  type="text"
                  className="form-control"
                  value={advanceTaken}
                  onChange={(e) => setAdvanceTaken(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="incentive">Incentive Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={incentive}
                  onChange={(e) => setincentive(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="deduct_amount">Deduct Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={deduct_amount}
                  onChange={(e) => setdeduct_amount(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="balanceAmount">Balance Amount</label>
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
}

export default AddSalary;
