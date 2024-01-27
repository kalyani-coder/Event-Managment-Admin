import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
import axios from "axios";
import myImage from "./logo.png";

function QuotationForm() {
  const [vendorNames, setVendorNames] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [vendorPrices, setVendorPrices] = useState({});
  const [selectedStockPrice, setSelectedStockPrice] = useState(null);
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedStockInfo, setSelectedStockInfo] = useState(null);
const [selectedVendorName, setSelectedVendorName] = useState('');





  // const [selectedVendor, setSelectedVendor] = useState('');
  const [stockList, setStockList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const unitOptions = ["sqft", "number", "kg", "meter", "liter", "other"];
  // const location = useLocation();
  // const data = location.state || {};
  // const enquiry = data || {};
  const location = useLocation();

  // const enquiry = data.enquiry || {}; 
  const { enquiry } = location.state || {};

  // new 

  useEffect(() => {
    // Fetch the list of vendors from the first API
    fetch('https://eventmanagement-admin-hocm.onrender.com/api/addvendor')
      .then((response) => response.json())
      .then((data) => setVendorList(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

  useEffect(() => {
    // Fetch the stock list based on the selected vendor
    if (selectedVendor) {
      fetch(`https://eventmanagement-admin-hocm.onrender.com/api/inventory-stocks/vendor/${selectedVendor}`)
        .then((response) => response.json())
        .then((data) => setStockList(data))
        .catch((error) => console.error('Error fetching stock list:', error));
    }
  }, [selectedVendor]);

  // const handleVendorChange = (e) => {
  //   const selectedVendor = e.target.value;
  //   setSelectedVendor(selectedVendor);
  //   // Reset selected stock and price when the vendor changes
  //   setSelectedStock('');
  //   setSelectedStockPrice(null);
  // };

  const handleVendorChange = (e) => {
    const selectedVendorId = e.target.value;
    const selectedVendor = vendorList.find(vendor => vendor._id === selectedVendorId);
    
    setSelectedVendor(selectedVendorId);
    setSelectedVendorName(selectedVendor ? selectedVendor.Vendor_Name : '');
    
    // Reset selected stock and price when the vendor changes
    setSelectedStock('');
    setSelectedStockPrice(null);
  };
  

  const handleStockChange = (e) => {
    const selectedStock = e.target.value;
    setSelectedStock(selectedStock);

    // Find the selected stock in the stock list and set its price
    const selectedStockInfo = stockList.find(stock => stock.Stock_Name === selectedStock);
    if (selectedStockInfo) {
      setSelectedStockPrice(selectedStockInfo.Price);
    } else {
      setSelectedStockPrice(null); // Reset if the selected stock is not found
    }
  };

  useEffect(() => {
    if (selectedVendor && selectedStock) {
      // Find the selected stock in the stock list
      const stockInfo = stockList.find(stock => stock.Stock_Name === selectedStock);
      if (stockInfo) {
        setSelectedStockInfo(stockInfo);
      }
    }
  }, [selectedVendor, selectedStock, stockList]);

  const handleUpdateQuantity = async (index) => {
    try {
      // Ensure that both the vendor and stock are selected
      if (!selectedVendor || !selectedStockInfo) {
        alert('Please select a vendor and stock before updating quantity.');
        return;
      }
  
      // Get the vendor and stock IDs
      const vendorId = selectedVendor;
      const stockName = selectedStock;
  
      // Prepare the data for the PATCH request
      const updatedQuantity = sections[index].quantity;
  
      // Send a PATCH request to update stock quantity
      await axios.patch(`http://localhost:5000/api/inventory-stocks/vendor/${vendorId}/stock/${stockName}`, {
        quantity: updatedQuantity,
      });
  
      // Optionally, you can fetch updated stock information and update the state
      // For simplicity, you can re-fetch the entire stock list or update only the specific stock in the state
  
      // Display a success message or update the UI as needed
      alert('Quantity updated successfully!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity. Please try again.');
    }
  };
  

  // old code start here 
  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("Enquiry data:", enquiry);
  }, [location.state, enquiry]);
  // const eventName = enquiry.event_name || "";

  const [sections, setSections] = useState([
    {
      srNumber: 1,
      title: "",
      particular: "",
      description: "",
      entity: "",
      unit: "",
      rate: "",
      days: "",
      amount: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index] = {
        ...updatedSections[index],
        [name]: value,
      };
  
      // Calculate total amount
      const quantity = parseFloat(updatedSections[index].quantity) || 0;
      const ratePerDay = selectedStockInfo ? parseFloat(selectedStockInfo.Price) || 0 : 0;
      const totalDays = parseFloat(updatedSections[index].days) || 0;
      updatedSections[index].amount = (quantity * ratePerDay * totalDays).toFixed(2);
  
      return updatedSections;
    });
  };
  

  const handleAddSection = () => {
    const newSRNumber = sections.length + 1;
    setSections([
      ...sections,
      {
        srNumber: newSRNumber,
        title: "",
        particular: "",
        description: "",
        entity: "",
        unit: "",
        rate: "",
        days: "",
        amount: "",
      },
    ]);
  };

  const handleSave = async () => {
    try {
      
      // Prepare the data in the required format
      const quatationInfoData = sections.map((section) => ({
        title: section.title,
        particular: section.particular,
        description: section.description,
        vendor_Name: selectedVendorName, // Assuming you want to associate all sections with the selected vendor
        vendor_Stock: selectedStock,
        unit: section.unit,
        quantity: parseFloat(section.quantity),
        rateper_Days: parseFloat(selectedStockPrice),
        days: parseFloat(section.days),
        amount: section.amount,
      }));

      // Send a POST request to the new API endpoint with the quatationInfoData
      await axios.post("https://eventmanagement-admin-hocm.onrender.com/api/quatationinfo", {
        quatationInfoData,
      });

      alert("Quotation saved successfully!");
    } catch (error) {
      console.error("Error saving quotation:", error);
      alert("Error saving quotation. Please try again.");
    }
  };


  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text(`Quotation Form of ${enquiry.customer_name || ""}`, 10, 10);

    // Print Customer Data
    const customerData = [
      ["Customer Name", enquiry.customer_name || "-"],
      ["Customer Address", enquiry.address || "-"],
      ["Event Date", enquiry.event_date || "-"],
      ["Event Venue", enquiry.event_venue || "-"],
    ];

    const companyData = [
      ["Company Name", "Tutons Events LLP"],
      [
        "Company Address",
        "Office No.6, Sai Heritage, Baner-Mahalunge Road, Baner, Pune 411045",
      ],
      ["Company Phone", "9225522123 / 9226061234"],
      ["Company Email", "tutonsevents@gmail.com"],
    ];

    const customerTableX = 30;
    const customerTableY = 40;

    const companyTableX = 105;
    const companyTableY = 40;

    const pageWidth = doc.internal.pageSize.width;
    const customerTableWidth = (pageWidth - companyTableX) / 2 - 10;

    doc.autoTable({
      body: customerData,
      startY: customerTableY,
      theme: "grid",
      margin: { right: companyData },
    });

    const imageWidth = 40;
    const imageHeight = 30;
    const imageX = 120;
    const imageY = 10;
    doc.addImage(myImage, "PNG", imageX, imageY, imageWidth, imageHeight);

    doc.autoTable({
      body: companyData,
      startY: companyTableY,
      theme: "grid",
      margin: { left: companyTableX },
    });

    // Print Sections Data
    const tableData = sections.map((section, index) => [
      section.srNumber,
      section.title,
      section.particular,
      section.description,
      section.entity,
      section.unit,
      section.rate,
      section.days,
      section.amount,
    ]);

    doc.autoTable({
      head: [
        [
          "SR Number",
          "Title of Section",
          "Particular",
          "Description",
          "Entity",
          "Unit",
          "Rate",
          "Days",
          "Amount",
        ],
      ],
      body: tableData,
      startY: 110,
    });

    doc.save(`${enquiry.customer_name || "Customer"}-Quotation.pdf`);
    alert("PDF file generated");
  };

  return (
    <div className="container mt-5">
      {/* <h1 className="mb-4">Quotation Form of {eventName}</h1> */}

      {/* <h1 className="mb-4">Quotation Form Of {enquiry.customer_name}</h1> */}
      <h1 className="mb-4">Quotation Form Of<span className="text-dark"> {enquiry.customer_name}</span></h1>




      {sections.map((section, index) => (
        <div key={index} className="mb-4">

          <div className="form-row">
          <div className="entity" style={{ display: "flex" }}>

            {/* select vendors droupdown  */}
            <div className="form-group col-md-3">
              <div className="form-group">
                <label htmlFor={`entity${index}`}>
                  Select Vendor:
                </label>
                <select
                  className="form-control"
                  name="entity"
                  value={selectedVendor}
                  onChange={handleVendorChange}
                >
                  <option value="">Select Vendor</option>
                  {vendorList.map((vendor) => (
                    <option key={vendor._id} value={vendor._id}>
                      {vendor.Vendor_Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>



          

              <div className="form-group col-md-3">
                <div className="form-group">
                  <label htmlFor={`stock${index}`}>
                    Select Stock:
                  </label>
                  <select
                    className="form-control"
                    name="stock"
                    value={selectedStock}
                    onChange={handleStockChange}
                  >
                    <option value="">Select Stock</option>
                    {stockList.map((stock) => (
                      <option key={stock._id} value={stock.Stock_Name}>
                        {stock.Stock_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              <div className="form-group col-md-3">
                <label>
                  Unit:<span style={{ color: "red" }}></span>
                </label>
                <div style={{ position: 'relative' }}>
                  {/* <input
                    className="form-control"
                    // id={`unit${index}`}
                    value={section.unit}
                    name="unit"
                    type="text"
                    placeholder="Enter value"
                    style={{ paddingRight: '50px' }}
                  /> */}
                  <input
                    className="form-control"
                    value={section.unit || ''}
                    name="unit"
                    type="text"
                    placeholder="Enter value"
                    style={{ paddingRight: '50px' }}
                    onChange={(e) => handleChange(e, index)}
                  />

                </div>
              </div>

              <div className="form-group col-md-3">
  <label htmlFor={`rate${index}`}>
    Quantity:
  </label>
  <div className="input-group">
    <input
      type="number"
      placeholder="Add Quantity"
      className="form-control"
      name="quantity"
      value={sections[index].quantity}
      onChange={(e) => handleChange(e, index)}
    />
    <div className="input-group-append">
      <button
        className="btn btn-danger fw-bold"
        type="button"
        onClick={() => handleUpdateQuantity(index)}
      >
        Update
      </button>
    </div>
  </div>
  {selectedStockInfo && (
    <p>Remaining Quantity: {selectedStockInfo.Stock_Quantity - sections[index].quantity}</p>
  )}
</div>

             

              </div>
            
          </div>




          <div className="form-group">

          <div className="form-group col-md-3">
                <label htmlFor={`rate${index}`}>
                  Rate/Days:
                </label>
                <input
                  type="text"
                  placeholder="Rate/days"
                  className="form-control"
                  id={`rate${index}`}
                  name="rate"
                  value={selectedStockPrice !== null ? selectedStockPrice : ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>


              <div className="form-group col-md-3">
                <label htmlFor={`days${index}`}>
                  Days:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total days"
                  id={`days${index}`}
                  name="days"
                  value={sections[index].days}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
         



            <label htmlFor={`title${index}`}>
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id={`title${index}`}
              name="title"
              value={section.title}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`particular${index}`}>
              Particular:
            </label>
            <input
              type="text"
              className="form-control"
              id={`particular${index}`}
              name="particular"
              value={section.particular}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`description${index}`}>
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id={`description${index}`}
              name="description"
              value={section.description}
              onChange={(e) => handleChange(e, index)}
            />
          </div>


          <div className="form-group">
            <label htmlFor={`amount${index}`}>
              Amount:
            </label>
            <input
              type="text"
              placeholder="Total Amount"
              className="form-control"
              id={`amount${index}`}
              name="amount"
              value={sections[index].amount}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleAddSection}>
        Add Section
      </button>
      <button className="btn btn-success mx-2" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-success mx-2" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
}

export default QuotationForm;
