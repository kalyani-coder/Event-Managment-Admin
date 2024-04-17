import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar"
import { Form, Button } from "react-bootstrap";


function AdvancePaymnetCus() {

    const navigate = useNavigate('')
    const [cusName, setCusName] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');

    const [totalAmount, setTotalAmount] = useState(null);
    const [advancePayment, setAdvancePayment] = useState(null);
    const [remainingAmount, setRemainingAmount] = useState(null);

    const [selectedCustomerDetails, setSelectedCustomerDetails] = useState({});

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/event');
                setCusName(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleCustomerSelect = (e) => {
        setSelectedCustomer(e.target.value);

        const customerDetails = cusName.find((item) => item.fname === e.target.value);
        if (customerDetails) {
            setSelectedCustomerDetails(customerDetails);
        } else {
            setSelectedCustomerDetails({});
        }
    };


    const handleTotalAmountChange = (event) => {
        setTotalAmount(parseFloat(event.target.value));
        updateRemainingAmount(parseFloat(event.target.value), advancePayment);
    };
    const handleAdvancePaymentChange = (event) => {
        const newAdvancePayment = parseFloat(event.target.value);
        if (newAdvancePayment >= 0 && newAdvancePayment <= totalAmount) {
            setAdvancePayment(newAdvancePayment);
            updateRemainingAmount(totalAmount, newAdvancePayment);
        } else if (newAdvancePayment > totalAmount) {
            // Reset advance payment to total amount if it exceeds total amount
            setAdvancePayment(totalAmount);
            updateRemainingAmount(totalAmount, totalAmount);
        } else {
            // Reset advance payment to 0 if negative value is entered
            setAdvancePayment(0);
            updateRemainingAmount(totalAmount, 0);
        }
    };


    const updateRemainingAmount = (total, advance) => {
        const remaining = (total !== null && advance !== null) ? total - advance : null;
        setRemainingAmount(remaining !== null && remaining >= 0 ? remaining : null);
    };

    const [paymentMethod, setPaymentMethod] = useState('');
    const [utrNumber, setUtrNumber] = useState('');
    const [submittedTo, setSubmittedTo] = useState('');
    const [chequeNumber, setChequeNumber] = useState('');
    const [transaction, setTransaction] =useState('')

    const[cash, setCash] = useState('')

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;


    const handleSave = () => {
        const data = {
            client_name: selectedCustomer,
            event_name: selectedCustomerDetails.eventName,
            contact : selectedCustomerDetails.contact,
            event_Type : selectedCustomerDetails.event_Type,
            guest_number : selectedCustomerDetails.guest_number,
            venue : selectedCustomerDetails.venue,
            event_date : selectedCustomerDetails.event_date,
            amount: totalAmount,
            adv_payment: advancePayment,
            rem_payment: remainingAmount,
            payment_date: formattedDate,
            payment_time: currentTime,
            payment_method: paymentMethod,
            ...(paymentMethod === 'cheque' && {
                cheque_number: chequeNumber,
                whome_to_submit: submittedTo,
                utrno_rtgs_id: utrNumber
            }),
            ...(paymentMethod === 'cash' && {
                cash_whome_to_submit: cash,
            }),
            ...(paymentMethod === 'netbanking' && {
                transaction_id: transaction,
            })
        };
    
        axios.post('http://localhost:5000/api/advpayment', data)
            .then(response => {
                console.log('Data saved successfully:', response.data);
                alert("Advance payment successfull")
                navigate('/assignmanager')
            })
            .catch(error => {
                console.error('Error saving data:', error);
                // Optionally, handle error or display error message to the user
            });
    };

    
    return (
        <>
            <Sidebar />
            <div className="container mt-5">


            <h2 className="mb-4">Advance Payment Form</h2>
            <Form.Group controlId="SelectCustomer">
                <Form.Label>Select Customers:</Form.Label>
                <div className="relative">
                    <Form.Select
                        className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label="Select Customer"
                        name="customer"
                        onChange={handleCustomerSelect}
                    >
                        <option>Select Customer</option>
                        {cusName.map((cus) => (
                            <option key={cus._id} value={cus.fname}>
                                {cus.fname}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </Form.Group>

            <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.eventName || ""}
                    readOnly
                />
            </div>
       
            <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.contact || ""}
                    readOnly
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Event Type</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.event_type || ""}
                    readOnly
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Guest Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.guest_number || ""}
                    readOnly
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Venue</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.venue || ""}
                    readOnly
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedCustomerDetails.event_date || ""}
                    readOnly
                />
            </div>


                {/* <Form.Group controlId="SelectEvent">
                    <Form.Label>Events:</Form.Label>
                    <div className="relative">
                        <Form.Select
                            className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                            aria-label="Select Event"
                            name="event"
                            value={selectedEvent}
                            disabled={!selectedCustomer}
                        >
                            <option>{selectedEvent || 'Event Name'}</option>
                        </Form.Select>
                    </div>
                </Form.Group> */}

                <div className="mb-3">
                    <label className="form-label">Total Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={totalAmount}
                        onChange={handleTotalAmountChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Advance Payment:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={advancePayment}
                        onChange={handleAdvancePaymentChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Remaining Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={remainingAmount}
                        readOnly
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Payment Method:</label>
                    <select
                        className="form-control"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="cheque">Cheque</option>
                        <option value="cash">Cash</option>
                        <option value="netbanking">Net Banking</option>
                    </select>
                </div>


                {paymentMethod === 'cheque' && (
                    <>
                        <div className="mb-3">

                            <div className="mb-3">
                                <label className="form-label">Cheque Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={chequeNumber}
                                    onChange={(e) => setChequeNumber(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Name to Whom Submitted cheque:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={submittedTo}
                                    onChange={(e) => setSubmittedTo(e.target.value)}
                                />
                            </div>

                            <label className="form-label">UTR Number / RTGS ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={utrNumber}
                                onChange={(e) => setUtrNumber(e.target.value)}
                            />
                        </div>


                    </>
                )}

                {paymentMethod === 'cash' && (
                    <>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Name to Whom Submitted cheque:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={cash}
                                    onChange={(e) => setCash(e.target.value)}
                                />
                            </div>
                        </div>


                    </>
                )}

                 {paymentMethod === 'netbanking' && (
                    <>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Transaction Id:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={transaction}
                                    onChange={(e) => setTransaction(e.target.value)}
                                />
                            </div>
                        </div>


                    </>
                )}



                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Transaction Details</h5>
                        <div className="mb-3">
                            <label className="form-label">Date of Transaction:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={currentDate.toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Time of Transaction:</label>
                            <input
                                type="time"
                                className="form-control"
                                value={currentTime}
                                readOnly
                            />
                        </div>
                    </div>
                </div>


                <button className="btn btn-success mx-2 mt-3" onClick={handleSave}>
                    Save & Assign To Manager
                </button>


            </div>
        </>
    );
}

export default AdvancePaymnetCus;
