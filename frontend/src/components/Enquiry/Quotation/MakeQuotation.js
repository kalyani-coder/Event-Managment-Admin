import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
import axios from "axios";
import myImage from "./logo.png";
import Header from "../../Sidebar/Header";

function QuotationForm() {
  const [vendorNames, setVendorNames] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendorPrices, setVendorPrices] = useState({});
  const [selectedStockPrice, setSelectedStockPrice] = useState(null);
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedStockInfo, setSelectedStockInfo] = useState(null);
  const [selectedVendorName, setSelectedVendorName] = useState("");

  const [stockList, setStockList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const unitOptions = ["sqft", "number", "kg", "meter", "liter", "other"];

  const location = useLocation();

  const { enquiry } = location.state || {};

  // new

  useEffect(() => {
    // Fetch the list of vendors from the first API
    fetch("http://localhost:5000/api/addvendor")
      .then((response) => response.json())
      .then((data) => setVendorList(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  useEffect(() => {
    // Fetch the stock list based on the selected vendor
    if (selectedVendor) {
      fetch(
        `http://localhost:5000/api/inventory-stocks/vendor/${selectedVendor}`
      )
        .then((response) => response.json())
        .then((data) => setStockList(data))
        .catch((error) => console.error("Error fetching stock list:", error));
    }
  }, [selectedVendor]);

  const handleVendorChange = (e) => {
    const selectedVendorId = e.target.value;
    const selectedVendor = vendorList.find(
      (vendor) => vendor._id === selectedVendorId
    );

    setSelectedVendor(selectedVendorId);
    setSelectedVendorName(selectedVendor ? selectedVendor.Vendor_Name : "");

    // Reset selected stock and price when the vendor changes
    setSelectedStock("");
    setSelectedStockPrice(null);
  };

  const handleStockChange = (e) => {
    const selectedStock = e.target.value;
    setSelectedStock(selectedStock);

    // Find the selected stock in the stock list and set its price
    const selectedStockInfo = stockList.find(
      (stock) => stock.Stock_Name === selectedStock
    );
    if (selectedStockInfo) {
      setSelectedStockPrice(selectedStockInfo.Price);
    } else {
      setSelectedStockPrice(null); // Reset if the selected stock is not found
    }
  };

  useEffect(() => {
    if (selectedVendor && selectedStock) {
      // Find the selected stock in the stock list
      const stockInfo = stockList.find(
        (stock) => stock.Stock_Name === selectedStock
      );
      if (stockInfo) {
        setSelectedStockInfo(stockInfo);
      }
    }
  }, [selectedVendor, selectedStock, stockList]);

  const handleUpdateQuantity = async (index) => {
    try {
      // Ensure that both the vendor and stock are selected
      if (!selectedVendor || !selectedStockInfo) {
        alert("Please select a vendor and stock before updating quantity.");
        return;
      }

      // Get the vendor and stock IDs
      const vendorId = selectedVendor;
      const stockName = selectedStock;

      // Prepare the data for the PATCH request
      const updatedQuantity = sections[index].quantity;

      // Send a PATCH request to update stock quantity
      await axios.patch(
        `http://localhost:5000/api/inventory-stocks/vendor/${vendorId}/stock/${stockName}`,
        {
          quantity: updatedQuantity,
        }
      );

      alert("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Error updating quantity. Please try again.");
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
      transport: "",
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
    const newSections = [...sections];

    // Update the corresponding field in the section
    newSections[index] = {
      ...newSections[index],
      [name]: value,
    };

    // Calculate the amount if both "Rate/Days" and "Days" fields are filled
    if (name === "days") {
      const ratePerDays = parseFloat(newSelectedStockPriceValue);
      const days = parseFloat(value);
      if (!isNaN(ratePerDays) && !isNaN(days)) {
        newSections[index].amount = (ratePerDays * days).toFixed(2);
      } else {
        newSections[index].amount = "";
      }
    }

    // Update the state with the modified sections
    setSections(newSections);
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
      section.unit,
      section.rateper_Days,
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

  // new
  const [stockNames, setStockNames] = useState([]);
  const [newSelectedStock, setNewSelectedStock] = useState("");
  const [newSelectedStockQuantityValue, setNewSelectedStockQuantityValue] =
    useState("");
  const [newSelectedStockPriceValue, setNewSelectedStockPriceValue] =
    useState("");
  const [newstocksData, setNewStocksData] = useState([]);
  const [newselectedVendor, setNewSelectedVendor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory-stocks")
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((stock) => stock.Stock_Name);
        setStockNames(names);
        setNewStocksData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const newhandleStockChange = (e) => {
    const selectedStockName = e.target.value;
    setNewSelectedStock(selectedStockName);

    // Filter vendors associated with the selected stock
    const selectedStockData = newstocksData.find(
      (stock) => stock.Stock_Name === selectedStockName
    );
    if (selectedStockData) {
      const vendors = newstocksData
        .filter((stock) => stock.Stock_Name === selectedStockName)
        .map((stock) => stock.Vendor_Name);
      setVendorNames(vendors);
    } else {
      setVendorNames([]);
    }
  };

  const newhandleVendorChange = (e) => {
    const selectedVendorName = e.target.value;
    setNewSelectedVendor(selectedVendorName);

    // Find the selected vendor's data
    const selectedVendorData = newstocksData.find(
      (stock) =>
        stock.Vendor_Name === selectedVendorName &&
        stock.Stock_Name === newSelectedStock
    );
    if (selectedVendorData) {
      setNewSelectedStockQuantityValue(selectedVendorData.Stock_Quantity);
      setNewSelectedStockPriceValue(selectedVendorData.Price);
    } else {
      setNewSelectedStockQuantityValue("");
      setNewSelectedStockPriceValue("");
    }
  };

  const [updateQuantity, setUpdateQuantity] = useState("");

  const handleNewUpdateQuantity = async (e) => {
    e.preventDefault();
    try {
      const vendorId = document.getElementById("vendorName").value;
      const quantity = document.getElementById("updateQuantity").value;

      // Send PATCH request to update stock quantity
      const response = await fetch(
        `http://localhost:5000/api/inventory-stocks/vendor/${vendorId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update stock quantity");
      }

      // Optionally, you can handle the response here
      const data = await response.json();
      console.log("Stock quantity updated successfully:", data);
      alert("Stock quantity updated successfully:", data);

      // Clear input field after successful update
    } catch (error) {
      console.error("Error updating stock quantity:", error);
      // Handle error as needed
    }
  };
  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:w-[50%] ">
          <h1 className="text-[35px] pl-[1em]">
            Quotation Form Of
            <span className="text-dark fs-1"> {enquiry.customer_name}</span>
          </h1>

          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <div className="form-row">
                <div className="entity"></div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <label htmlFor="quantity">Select Stockname </label>
                  <select
                    className="form-control"
                    id="stockName"
                    onChange={newhandleStockChange}
                  >
                    <option value="">Select Stock</option>
                    {stockNames.map((stockName) => (
                      <option key={stockName} value={stockName}>
                        {stockName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col px-5">
                  <label htmlFor="vendorName">Vendor Names </label>
                  <select
                    className="form-control"
                    id="vendorName"
                    onChange={newhandleVendorChange}
                  >
                    <option value="">Select Vendor</option>
                    {vendorNames.map((vendor) => (
                      <option key={vendor} value={vendor}>
                        {vendor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <label htmlFor="price">Rate/Days </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={newSelectedStockPriceValue}
                    readOnly
                  />
                </div>
                <div className="col px-5">
                  <label htmlFor="quantity">Quantity </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    value={newSelectedStockQuantityValue}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <label>
                    Unit:<span style={{ color: "red" }}></span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="form-control"
                      value={section.unit || ""}
                      name="unit"
                      type="text"
                      placeholder="Enter value"
                      style={{ paddingRight: "50px" }}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col px-5">
                  <label htmlFor="updateQuantity">Update Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="updateQuantity"
                    value={updateQuantity}
                    onChange={(e) => setUpdateQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row-md-3 mt-3 ">
                <button
                  className="manager-btn ms-4"
                  onClick={handleNewUpdateQuantity}
                >
                  Update Quantity
                </button>
                <button className="manager-btn ms-4">Add Stocks</button>
              </div>


              
              <div className="row mb-2">
                <div className="col px-5">
                  <div className="form-group">
                    <label htmlFor={`days${index}`}>Days:</label>
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
                </div>
                <div className="col px-5">
                 

                  <div className="form-group">
                    <label htmlFor={`transport${index}`}>Transport:</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`transport${index}`}
                      name="transport"
                      value={section.transport}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col px-5">
                  <div className="form-group">
                    <label htmlFor={`description${index}`}>Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`description${index}`}
                      name="description"
                      value={section.description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col px-5">
                  <div className="form-group">
                    <label htmlFor={`amount${index}`}>Amount:</label>
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
              </div>
            </div>
          ))}

          {/* <button className="manager-btn ms-4" onClick={handleAddSection}>
            Add Item
          </button> */}
          {/* <button className="manager-btn ms-4" onClick={handleSave}>
            View & Save
          </button> */}
          <button className="manager-btn ms-4" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </>
  );
}

export default QuotationForm;
