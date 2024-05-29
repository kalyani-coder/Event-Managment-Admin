import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../Sidebar/Header";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

const ExpenseForm = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [searchQuery, setSearchQuery] = useState({ fname: "", event_date: "" });
  const [expenseDate, setExpenseDate] = useState("");
  const [particular, setParticular] = useState("");
  const [amount, setAmount] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [managerId, setManagerId] = useState("");
  const [managerName, setManagerName] = useState("");


  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  console.log("vvv", eventDate) 


  useEffect(() => {
    // Fetch clients from the API
    axios.get('https://node-backend.macj-abuyerschoice.com/api/event')
      .then(response => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching the clients', error);
        setAlertMessage('Error fetching the clients');
        setAlertVariant('danger');
      });
  }, []);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setSearchQuery(prevState => ({
      ...prevState,
      [name]: value.toLowerCase()
    }));
  };

  useEffect(() => {
    const filtered = clients.filter(client => 
      (client.fname && client.fname.toLowerCase().includes(searchQuery.fname)) &&
      (client.event_date && client.event_date.includes(searchQuery.event_date))
    );
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

 const handleClientChange = (event) => {
  const clientName = event.target.value;
  setSelectedClient(clientName);

  const selectedClientData = clients.find(client => client.fname === clientName);
  if (selectedClientData) {
    setClientContact(selectedClientData.contact || ""); // Assuming 'contact' is the field name in the client data
    setManagerId(selectedClientData.managerId || ""); // Assuming 'managerId' is the field name in the client data
    setManagerName(selectedClientData.managerName || ""); // Assuming 'managerName' is the field name in the client data
    setEventName(selectedClientData.eventName || ""); // Assuming 'eventName' is the field name in the client data
    setEventDate(selectedClientData.event_date || ""); // Assuming 'event_date' is the field name in the client data
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!expenseDate || !particular || !amount || !selectedClient) {
      setAlertMessage('Please fill all the required fields');
      setAlertVariant('danger');
      return;
    }

    const managerId = localStorage.getItem("managerId")
    const expenseData = {
      expence_date: expenseDate,
      prticular: particular,
      amount: parseFloat(amount),
      client_Name: selectedClient,
      client_contact: clientContact,
      managerId: managerId,
      manager_Name: managerName,
      event_name: eventName,
      event_Date: eventDate

    };

    console.log("Submitting expense data:", expenseData); // Log the data being submitted

    axios.post('https://node-backend.macj-abuyerschoice.com/api/expence', expenseData)
      .then(response => {
        alert('Expense saved successfully');
        setAlertVariant('success');
      })
      .catch(error => {
        console.error('Error saving the expense', error);
        alert('Error saving the expense');
        setAlertVariant('danger');
      });
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] ">
        <Form onSubmit={handleSubmit}>
        <div className="flex">
          <Link to={'/expenseform'}>
          <button className="btn btn-primary mr-4 mb-4">Add Expense Form</button>
          </Link>
          <Link to={'/viewexpensedetails'}>
          <button className="btn btn-primary mr-4 mb-4">View Expense Details</button>
          </Link>
         
          </div>
          <h2 className="text-[30px] pl-[1em]">Expense Form</h2>
          {alertMessage && (
            <div>
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </div>
          )}
            <div className="row mb-2">
              <div className="col px-5">
                <div className="mb-3">
                  <label className="form-label">Select Client</label>
                  <div className="relative">
                  <select
                    className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                    value={selectedClient}
                    onChange={handleClientChange}
                  >
                    <option value="">Select Client</option>
                    {filteredClients.map(client => (
                      <option key={client.id} value={client.fname}>
                        {client.fname}
                      </option>
                    ))}
                  </select>
                  </div>
                </div>
              </div>
              <div className="col px-5">
                <div className="mb-3">
                  <label className="form-label">Expense Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="mb-3">
                  <label className="form-label">Particular Type</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Particular Type"
                    value={particular}
                    onChange={(e) => setParticular(e.target.value)}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="manager-btn ms-4 mb-3">
              Save & Send to Admin
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
