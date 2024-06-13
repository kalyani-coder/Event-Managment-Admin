import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { Form, Button } from "react-bootstrap";

const VendorPayment = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const calculateRemainingAmount = (paidAmt, advancePayment) => {
    const paid = parseInt(paidAmt);
    const advance = parseInt(advancePayment);

    if (isNaN(paid) || isNaN(advance)) {
      return 0;
    }

    return paid - advance;
  };

  const initialFormData = {
    selectedVendor: "",
    selectedEvent: "",
    fname: "",
    event_name: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    bankaccount: "",
    paid_amt: "",
    advance_payment: "",
    rem_amt: 0,
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/addvendor");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchEventsForVendor = async () => {
      try {
        if (formData.selectedVendor) {
          const response = await axios.get(
            `http://localhost:8888/api/event?eventName=${formData.selectedVendor}`
          );
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events for vendor:", error);
      }
    };

    fetchEventsForVendor();
  }, [formData.selectedVendor]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVendorChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedVendor: value,
      selectedEvent: "",
    }));
  };

  const handleEventChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedEvent: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/vendorpayment",
        {
          fname: formData.selectedVendor,
          event_name: formData.selectedEvent,
          date: formData.date,
          time: formData.time,
          bankAccount_Name: formData.bankaccount,
          paid_amt: formData.paid_amt,
          advance_payment: formData.advance_payment,
          rem_amt: formData.rem_amt,
          description: formData.description,
        }
      );

      if (response.status === 200) {
        setShowPopup(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAdvancePaymentChange = (event) => {
    const newAdvancePayment = parseInt(event.target.value);
    if (!isNaN(newAdvancePayment)) {
      setFormData((prevData) => ({
        ...prevData,
        advance_payment: newAdvancePayment,
        rem_amt: calculateRemainingAmount(prevData.paid_amt, newAdvancePayment),
      }));
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full  h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          <Form className=" " onSubmit={handleSubmit}>
            <h2 className="text-[35px]  pl-[1em]">Vendor Payment</h2>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <Form.Group controlId="SelectVendor">
                    <Form.Label>Select Vendor:</Form.Label>
                    <div className="relative">
                      <Form.Select
                        className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label="Select Vendor"
                        name="selectedVendor"
                        onChange={handleVendorChange}
                        value={formData.selectedVendor}
                      >
                        <option>Select Vendor</option>
                        {vendors.map((vendor) => (
                          <option
                            key={vendor.Vendor_Name}
                            value={vendor.Vendor_Name}
                          >
                            {vendor.Vendor_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="selectedEvent">Event Name</label>
                  <select
                    className="form-control mb-2"
                    name="selectedEvent"
                    onChange={handleEventChange}
                    value={formData.selectedEvent}
                    required
                  >
                    <option value="">Select event</option>
                    {events.map((event) => (
                      <option key={event._id} value={event.eventName}>
                        {event.eventName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    className="form-control"
                    type="time"
                    name="time"
                    onChange={handleChange}
                    value={formData.time}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="bankaccount">Bank Account</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="bankaccount"
                    placeholder="Bank Account"
                    onChange={handleChange}
                    value={formData.bankaccount}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="paid_amt">Paid Amount</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="paid_amt"
                    placeholder="Paid Amount"
                    onChange={handleChange}
                    value={formData.paid_amt}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="advance_payment">Advance Payment</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="advance_payment"
                    placeholder="Advance Payment"
                    onChange={handleAdvancePaymentChange}
                    value={formData.advance_payment}
                  />
                </div>
              </div>
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="rem_amt">Pending Amount</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="rem_amt"
                    placeholder="Remaining Amount"
                    value={formData.rem_amt}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Button
                  className="manager-btn ms-1"
                  type="button"
                  onClick={handleDiscard}
                >
                  {" "}
                  Discard
                </Button>

                <Button className="manager-btn ms-3" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </Form>
          {showPopup && (
            <div className="alert alert-success mt-3">
              Data saved successfully!
              <button
                type="button"
                className="close"
                onClick={handlePopupClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorPayment;
