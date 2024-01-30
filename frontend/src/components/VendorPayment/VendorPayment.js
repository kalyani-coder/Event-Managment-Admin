import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorPayment = () => {
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

    const initialFormData = {
        fname: '',
        lname: '',
        event_name: '',
        date: getCurrentDate(), // Set initial date to the current date
        time: getCurrentTime(), // Set initial time to the current time
        bankaccount: '',
        salary: '',
        paid_amt: '',
        rem_amt: '',
        description: '',
        selectedVendor: '', // Add a new field for selected vendor
    };

    const [formData, setFormData] = useState(initialFormData);
    const [vendors, setVendors] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Fetch the list of vendors when the component mounts
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vendor');
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []); // Empty dependency array to run the effect only once

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVendorChange = async (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            selectedVendor: value,
        }));

        // Fetch vendor details based on the selected vendor
        try {
            const response = await axios.get(`http://localhost:5000/api/vendor?company_name=${value}`);
            const vendorDetails = response.data[0]; // Assuming there's only one vendor with the given company_name
            setFormData((prevData) => ({
                ...prevData,
                fname: vendorDetails.contact_person_name,
                // Add other fields as needed based on the vendor details
            }));
        } catch (error) {
            console.error('Error fetching vendor details:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await axios.post('http://localhost:5000/api/vendorpayment', formData);

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
            <form className="order p-4 " onSubmit={handleSubmit}>
                <h2>Vendor Payment</h2>
                <div className="form-group">
                    <label htmlFor="selectedVendor">Select Vendor</label>
                    <select
                        className="form-control mb-2"
                        name="selectedVendor"
                        onChange={handleVendorChange}
                        value={formData.selectedVendor}
                        required
                    >
                        <option value="">Select a vendor</option>
                        {vendors.map((vendor) => (
                            <option key={vendor.company_name} value={vendor.company_name}>
                                {vendor.company_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fname">Name<span style={{ color: 'red' }}>*</span></label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="fname"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={`${formData.fname} ${formData.lname}`}
                        required
                    />
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
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
};

export default VendorPayment;
