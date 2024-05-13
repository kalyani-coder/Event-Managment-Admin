import React, { useState, useEffect } from 'react';
import Header from "../Sidebar/Header";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";


const InternalTransferFromBank = () => {
  const [fromBank, setFromBank] = useState('');
  const [fromAccountNumber, setFromAccountNumber] = useState('');
  const [toBank, setToBank] = useState('');
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [bankNames, setBankNames] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allbanks");
        const data = await response.json();
        setBankNames(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      from_bank: fromBank,
      from_bank_accountNu: fromAccountNumber,
      to_bank: toBank,
      to_bank_accountNu: toAccountNumber,
      amount: parseFloat(amount)
    };

    fetch("http://localhost:5000/api/banktransfer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // setSuccessMessage("Data Saved Successfully!");
      // setShowSuccessAlert(true);
      console.log(data);
      setAmount("");
      setFromBank("");
      setFromAccountNumber("");
      setToBank("");
      setToAccountNumber("");
      window.alert("Data Saved Successfully!");
    })
    .catch(error => console.error('Error:', error));
  };

  const handleFromBankSelect = (event) => {
    const selectedBankName = event.target.value;
    setFromBank(selectedBankName);
    const selectedBankObj = bankNames.find(bank => bank.Bank_Name === selectedBankName);
    if (selectedBankObj) {
      setFromAccountNumber(selectedBankObj.Account_Number);
    } else {
      setFromAccountNumber('');
    }
  };

  const handleToBankSelect = (event) => {
    const selectedBankName = event.target.value;
    setToBank(selectedBankName);
    const selectedBankObj = bankNames.find(bank => bank.Bank_Name === selectedBankName);
    if (selectedBankObj) {
      setToAccountNumber(selectedBankObj.Account_Number);
    } else {
      setToAccountNumber('');
    }
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
            <Link to={'/viewinternaltransfer'}>
              <button className="btn btn-primary mr-4 mb-4">View Transfer</button>
            </Link>
            <h2 className="text-[30px] pl-[1em]">Internal Transfer From Bank</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col px-5">
                  <div className="mb-3">
                    <label className="form-label">From Select Bank:</label>
                    <select
                      className="form-control"
                      value={fromBank}
                      onChange={handleFromBankSelect}
                    >
                      <option value="">Select Bank</option>
                      {bankNames.map((bank) => (
                        <option key={bank._id} value={bank.Bank_Name}>
                          {bank.Bank_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col px-5">
                  <div className="mb-3">
                    <label className="form-label">From Account Number:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={fromAccountNumber}
                      onChange={(event) => setFromAccountNumber(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <div className="mb-3">
                    <label className="form-label">To Select Bank:</label>
                    <select
                      className="form-control"
                      value={toBank}
                      onChange={handleToBankSelect}
                    >
                      <option value="">Select Bank</option>
                      {bankNames.map((bank) => (
                        <option key={bank._id} value={bank.Bank_Name}>
                          {bank.Bank_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col px-5">
                  <div className="mb-3">
                    <label className="form-label">To Account Number:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={toAccountNumber}
                      onChange={(event) => setToAccountNumber(event.target.value)}
                    />
                  </div>
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
