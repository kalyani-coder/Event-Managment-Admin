import React, { useState, useEffect } from 'react';
import Header from "../Sidebar/Header";
import { format } from 'date-fns';
import './internalTransfer.css';
const ViewInternalTransfer = () => {
  const [internalTransfers, setInternalTransfers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchInternalTransfers();
  }, []);

  const fetchInternalTransfers = async () => {
    try {
      const response = await fetch("https://node-backend.macj-abuyerschoice.com/api/banktransfer");
      const data = await response.json();
      setInternalTransfers(data);
    } catch (error) {
      console.error("Error fetching internal transfers:", error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterByDate = () => {
    // Filter internal transfers based on start date and end date
    const filteredTransfers = internalTransfers.filter((transfer) => {
      const transferDate = new Date(transfer.date);
      return transferDate >= new Date(startDate) && transferDate <= new Date(endDate);
    });
    return filteredTransfers;
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <h2 className="text-[30px]">View Internal Transfer</h2>
          {/* Date filter inputs */}
          <div className="filter-container">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
            <button onClick={() => setInternalTransfers(filterByDate)}>Apply Filter</button>
          </div>
          {/* Internal transfer table */}
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0 ">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">From Bank</th>
                  <th scope="col"> Account No.</th>
                  <th scope="col">To Bank</th>
                  <th scope="col">Account No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {internalTransfers.map((transfer) => (
                  <tr key={transfer._id}>
                    <td>{transfer.from_bank}</td>
                    <td>{transfer.from_bank_accountNu}</td>
                    <td>{transfer.to_bank}</td>
                    <td>{transfer.to_bank_accountNu}</td>
                    <td>{transfer.amount}</td>
                    <td>{transfer.date}</td>
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

export default ViewInternalTransfer;

