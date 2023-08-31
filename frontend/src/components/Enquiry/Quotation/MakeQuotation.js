import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MakeQuotationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enquiryData = location.state;
  console.log(enquiryData);

  const [quotation, setQuotation] = useState({
    // Initialize the fields you need for the quotation
    ...enquiryData,
    amount: "",
    taxes: "",
    totalAmount: "",
    // ... other fields ...
  });
  console.log(quotation);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      [name]: value,
    }));
  };

  const handleCreateQuotation = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to create the quotation?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      // Send the quotation data to your backend API for processing
      // Example:
      // await axios.post("http://localhost:5000/api/quotations", quotation);
      // Navigate to the appropriate page after successful creation
      navigate("/quotation");
      alert("Quotation Created Successfully!");
    } catch (error) {
      console.error("Error creating quotation:", error);
    }
  };

  const handleCancel = () => {
    navigate("/quotation");
  };

  return (
    <div className="container mt-4">
      <h2>Create Quotation</h2>
      <div className="card">
        <div className="card-body">
          {/* Render input fields for quotation */}
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={quotation.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Taxes:</label>
            <input
              type="text"
              className="form-control"
              name="taxes"
              value={quotation.taxes}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Total Amount:</label>
            <input
              type="text"
              className="form-control"
              name="totalAmount"
              value={quotation.totalAmount}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more input fields for other quotation details */}
          <button className="btn btn-info" onClick={handleCreateQuotation}>
            Create Quotation
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeQuotationPage;
