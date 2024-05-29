import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../Sidebar/Header";
import { Form, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

const AdvanceExpense = () => {

  const location = useLocation();
  const { managerId, managerName } = location.state || {};

  console.log('Manager ID:', managerId);
  console.log('Manager Name:', managerName);

  const [formData, setFormData] = useState({
    from_Bank: '',
    to_Employee: '',
    payment_Date: '',
    bank_Account_Number: '',
    managerId: '',
    manager_Name: '',
    amount: ''
  });

  const [managers, setManagers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    // Fetch managers
    axios.get('https://node-backend.macj-abuyerschoice.com/api/addmanager')
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the managers!', error);
      });

    // Fetch banks
    axios.get('https://node-backend.macj-abuyerschoice.com/api/allbanks')
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the banks!', error);
      });
  }, []);

  const handleManagerChange = (e) => {
    const selectedManager = managers.find(manager => manager._id === e.target.value);
    setFormData({
      ...formData,
      managerId: selectedManager._id,
      manager_Name: `${selectedManager.fname} ${selectedManager.lname}`
    });
  };

  const handleBankSelect = (e) => {
    const selectedBank = e.target.value;
    setSelectedBank(selectedBank);
    const bank = banks.find(bank => bank.Bank_Name === selectedBank);
    setAccountNumber(bank ? bank.Account_Number : '');
    setFormData({
      ...formData,
      from_Bank: selectedBank,
      bank_Account_Number: bank ? bank.Account_Number : ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://node-backend.macj-abuyerschoice.com/api/advanceexpence', formData)
      .then(response => {
        console.log(response.data);
        // Handle success - show a success message, redirect, etc.
        alert("Advance Event Expense saved successfully.");
      })
      .catch(error => {
        console.error('There was an error!', error);
        // Handle error - show an error message, etc.
      });
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh]">
          <Form onSubmit={handleSubmit} className="">
            <h2 className="text-[30px] pl-[1em]">Advance Event Expense</h2>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Form.Group controlId="SelectManager">
                    <Form.Label>Select Manager:</Form.Label>
                    <div className="relative">
                      <Form.Select
                        className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label="Select Manager"
                        name="managerId"
                        onChange={handleManagerChange}
                        value={formData.managerId}
                        required
                      >
                        <option value="">Select Manager</option>
                        {managers.map((manager) => (
                          <option key={manager._id} value={manager._id}>
                            {manager.fname} {manager.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <Form.Label htmlFor="payment_Date">Payment Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="payment_Date"
                    onChange={handleChange}
                    value={formData.payment_Date}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Form.Label htmlFor="from_Bank">Select Bank</Form.Label>
                  <Form.Select
                    className="form-control mb-2"
                    name="from_Bank"
                    value={selectedBank}
                    onChange={handleBankSelect}
                    required
                  >
                    <option value="">Select Bank</option>
                    {banks.map((bank) => (
                      <option key={bank._id} value={bank.Bank_Name}>
                        {bank.Bank_Name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              {selectedBank && (
                <div className="col px-5">
                  <div className="form-group">
                    <Form.Label htmlFor="bank_Account_Number">Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_Account_Number"
                      value={accountNumber}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Form.Label htmlFor="amount">Amount</Form.Label>
                  <Form.Control
                    className="form-control mb-2"
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    onChange={handleChange}
                    value={formData.amount}
                    required
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="manager-btn ms-4 mb-3">
              Save
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdvanceExpense;
