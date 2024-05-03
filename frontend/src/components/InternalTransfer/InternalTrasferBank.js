import React, { useState, useEffect } from 'react';
import Header from "../Sidebar/Header";
import { Alert } from "react-bootstrap";

const InternalTransferFromBank = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [managerOptions, setManagerOptions] = useState([]);
  const [accountantOptions, setAccountantOptions] = useState([]);
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
  }, []); // Empty dependency array to run only once when component mounts

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: selectedOption,
      name: salaryType,
      Id: "test", // You may adjust this value as per your requirement
      bankName: bankName,
      amount: parseFloat(amount) // Convert amount to float
    };

    // POST request to the API endpoint
    fetch("http://localhost:5000/api/banktransper", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setSuccessMessage("Data Saved Successfully!");
      setShowSuccessAlert(true);
      console.log(data);
      // Reset amount and bankName after successful submission
      
    setAmount("");
    setBankName("");
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <div>
          {showSuccessAlert && (
            <Alert
              variant="success"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              {successMessage}
            </Alert>
          )}
            <h2 className="text-[35px] pl-[1em]">Internal Transfer From Bank</h2>
            <form onSubmit={handleSubmit}>
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
              <div className="row mb-2">
                <div className="col px-5">
                  <div className="form-group">
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col px-5">
                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <button className="manager-btn ms-1" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalTransferFromBank;
