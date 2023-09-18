import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
        <>



            <div className="container">
                {/* <Link to="/">
      
      <button>Order</button>
      </Link> */}



                <form className="order p-4 border rounded" onSubmit={handleSubmit}>
                    <input className="form-control mb-2" type="text" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
                    <input className="form-control mb-2" type="text" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
                    <input className="form-control mb-2" type="text" name="eventname" placeholder="Event Name" onChange={handleChange} value={formData.eventname} />
                    <div className="row mb-2">
                        <div className="col">
                            <input className="form-control" type="date" name="date" onChange={handleChange} value={formData.date} />
                        </div>
                        <div className="col">
                            <input className="form-control" type="time" name="time" onChange={handleChange} value={formData.time} />
                        </div>
                    </div>

                    <input className="form-control mb-2" type="text" name="entersalary" placeholder="Enter Salary" onChange={handleChange} value={formData.entersalary} />
                    <input className="form-control mb-2" type="text" name="paidamount" placeholder="Paid Amount" onChange={handleChange} value={formData.paidamount} />
                    <input className="form-control mb-2" type="text" name="remainingamount" placeholder="Remaining Amount" onChange={handleChange} value={formData.remainingamount} />
                    <input className="form-control mb-2" type="text" name="note" placeholder="Note" onChange={handleChange} value={formData.note} />
                    <button className="btn btn-secondary mr-2 action1-btn" type="button" onClick={handleDiscard}>
                        Discard
                    </button>
                    <button className="btn btn-primary action-btn" onClick={handleSubmit} type="submit">
                        Save
                    </button>
                </form>
            </div>
            );



        </>
    )
}

export default VendorPayment
