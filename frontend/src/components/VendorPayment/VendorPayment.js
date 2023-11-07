import React, { useState } from 'react';
import axios from 'axios';

const VendorPayment = () => {
    const initialFormData = {
        fname: '',
        lname: '',
        event_name: '',
        date: '',
        time: '',
        bankaccount: '',
        salary: '',
        paid_amt: '',
        rem_amt: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await axios.post('https://eventmanagement-admin-hocm.onrender.com/api/vendorpayment', formData);

            // If the request is successful, show a popup and clear the form
            if (response.status === 200) {
                setShowPopup(true);
                setFormData(initialFormData);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleDiscard = () => {
        setFormData(initialFormData); // Reset the form data to initial values
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="container">
            <form className="order p-4 border rounded" onSubmit={handleSubmit}>
                <h2>Vendor Payment</h2><br />
                <div className="form-group">
                    <label htmlFor="fname">First Name<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="fname" placeholder="First Name" onChange={handleChange} value={formData.fname} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="lname" placeholder="Last Name" onChange={handleChange} value={formData.lname} required />
                </div>
                <div className="form-group">
                    <label htmlFor="event_name">Event Name</label>
                    <input className="form-control mb-2" type="text" name="event_name" placeholder="Event Name" onChange={handleChange} value={formData.event_name} />
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input className="form-control" type="date" name="date" onChange={handleChange} value={formData.date} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input className="form-control" type="time" name="time" onChange={handleChange} value={formData.time} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="bankaccount">Bank Account</label>
                    <input className="form-control mb-2" type="text" name="bankaccount" placeholder="Bank Account" onChange={handleChange} value={formData.bankaccount} />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Enter Salary</label>
                    <input className="form-control mb-2" type="text" name="salary" placeholder="Enter Salary" onChange={handleChange} value={formData.salary} />
                </div>
                <div className="form-group">
                    <label htmlFor="paid_amt">Paid Amount</label>
                    <input className="form-control mb-2" type="text" name="paid_amt" placeholder="Paid Amount" onChange={handleChange} value={formData.paid_amt} />
                </div>
                <div className="form-group">
                    <label htmlFor="rem_amt">Remaining Amount</label>
                    <input className="form-control mb-2" type="text" name="rem_amt" placeholder="Remaining Amount" onChange={handleChange} value={formData.rem_amt} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control mb-2" type="text" name="description" placeholder="Description" onChange={handleChange} value={formData.description} />
                </div>
                <button className="btn btn-secondary mr-2 action1-btn" type="button" onClick={handleDiscard}>
                    Discard
                </button>
                <button className="btn btn-primary action-btn" onClick={handleSubmit} type="submit">
                    Save
                </button>
            </form>

            {showPopup && (
                <div className="alert alert-success mt-3">
                    Data saved successfully!
                    <button type="button" className="close" onClick={handlePopupClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default VendorPayment;
