import React, { useState } from 'react';

const VendorPayment = () => {
    const initialFormData = {
        firstname: '',
        lastname: '',
        eventname: '',
        date: '',
        time: '',
        bankaccount: '',
        entersalary: '',
        paidamount: '',
        remainingamount: '',
        note: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data:', formData);
    };

    const handleDiscard = () => {
        setFormData(initialFormData); // Reset the form data to initial values
    };

    return (
        <div className="container">
            <form className="order p-4 border rounded" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} required />
                </div>
                <div className="form-group">
                    <label htmlFor="eventname">Event Name:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="eventname" placeholder="Event Name" onChange={handleChange} value={formData.eventname} required />
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="date">Date:<span style={{ color: "red" }}>*</span></label>
                            <input className="form-control" type="date" name="date" onChange={handleChange} value={formData.date} required />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="time">Time:<span style={{ color: "red" }}>*</span></label>
                            <input className="form-control" type="time" name="time" onChange={handleChange} value={formData.time} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="entersalary">Enter Salary:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="entersalary" placeholder="Enter Salary" onChange={handleChange} value={formData.entersalary} required />
                </div>
                <div className="form-group">
                    <label htmlFor="paidamount">Paid Amount:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="paidamount" placeholder="Paid Amount" onChange={handleChange} value={formData.paidamount} required />
                </div>
                <div className="form-group">
                    <label htmlFor="remainingamount">Remaining Amount:<span style={{ color: "red" }}>*</span></label>
                    <input className="form-control mb-2" type="text" name="remainingamount" placeholder="Remaining Amount" onChange={handleChange} value={formData.remainingamount} required />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <input className="form-control mb-2" type="text" name="note" placeholder="Note" onChange={handleChange} value={formData.note} />
                </div>
                <button className="btn btn-secondary mr-2 action1-btn" type="button" onClick={handleDiscard}>
                    Discard
                </button>
                <button className="btn btn-primary action-btn" onClick={handleSubmit} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default VendorPayment;
