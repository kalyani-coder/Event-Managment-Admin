import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Sidebar/Header";
import { useLocation } from "react-router-dom";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import myImage from "../Quotation/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getRequest, urlVariables } from "../../../axiosClient";

function QuotationForm() {
  const fetchInventoryStocks = async () => {
    try {
      const response = await getRequest(urlVariables.inventory_stocks, {
        stockId: "6668320f7bac8483195abbb9",
      });
      console.log("axios response", response.data);
    } catch (error) {
      console.error("Error fetching inventory stocks", error);
    }
  };

  useEffect(() => {
    fetchInventoryStocks();
  }, []);

  const location = useLocation();
  const { enquiry } = location.state || {};
  const [rows, setRows] = useState([
    {
      id: 1,
      stockName: "",
      vendorName: "",
      qty: 0,
      unit: "",
      price: 0,
      rateperdays: 0,
      total: 0,
    },
  ]);

  const [descriptionValue, setDescriptionValue] = useState("");
  const managerName = localStorage.getItem("managerName") || "Unknown";
  const [stockNames, setStockNames] = useState([]);
  const [stockid, setStockid] = useState([]);
  const [vendorNames, setVendorNames] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [newSelectedStock, setNewSelectedStock] = useState("");
  const [newSelectedVendor, setNewSelectedVendor] = useState("");
  const [newSelectedStockQuantityValue, setNewSelectedStockQuantityValue] =
    useState("");
  const [newSelectedStockPriceValue, setNewSelectedStockPriceValue] =
    useState("");
  const [ids, setIds] = useState([]);
  const [subAmount, setsubAmount] = useState(0);
  // Define tax state
  const [tax, setTax] = useState(0);

  // Define CGST and SGST states
  const [cgstChecked, setCgstChecked] = useState(false);
  const [sgstChecked, setSgstChecked] = useState(false);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);

  const [igstChecked, setIgstChecked] = useState(false);

  const [transportCharges, setTransportCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const [transport, setTransport] = useState("");
  const [grandTotal, setGrandTotal] = useState(null);
  const [state, setState] = useState("Maharashtra");

  const [newSelectedStockId, setNewSelectedStockId] = useState("");
  const [newSelectedVendorId, setNewSelectedVendorId] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [quotationData, setQuotationData] = useState({ requirements: [] });
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [ratePerDays, setRatePerDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [requirements, setRequirements] = useState([]);
  const [isFirstSubmission, setIsFirstSubmission] = useState(true);
  console.log("enquiry", enquiry._id);
  // Fetch added posts
  const fetchQuotationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/customerquotationinfo/customer/${enquiry._id}`
      );
      setQuotationData(response.data);
    } catch (error) {
      console.error("Error fetching quotation data", error);
    }
  };
  useEffect(() => {
    fetchQuotationData();
  }, []);

  // Calculate Total Amount
  useEffect(() => {
    const Total = ratePerDays * price * qty;
    setTotal(Total);
  }, [price, ratePerDays, qty]);

  //Fetching stock details
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/inventory-stocks")
      .then((response) => {
        const data = response.data;
        const names = data.map((stock) => stock.Stock_Name);

        const id = data.map((stock) => stock._id);

        setStockNames(names);
        setStocksData(data);
        setStockid(id);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // getting vendorname and stock name
  const newhandleStockChange = (e) => {
    const selectedStockId = e.target.value;
    // console.log("selectedStockId", selectedStockId);

    const selectedStock = stocksData.find(
      (stock) => stock._id === selectedStockId
    );
    // console.log("selectedStock", selectedStock);
    // console.log("selectedStock.Stock_Name", selectedStock.Stock_Name);

    setNewSelectedStock(selectedStock.Stock_Name);

    // Assuming the value contains the ID of the selected stock
    setNewSelectedStockId(selectedStock._id);
    console.log("stockid ", selectedStock._id);
    setNewSelectedVendorId(selectedStock.Vendor_Id);
    console.log("vendorid", selectedStock.Vendor_Id);

    const vendors = stocksData
      .filter((stock) => stock._id === selectedStockId)
      .map((stock) => stock.Vendor_Name);
    setVendorNames(vendors);

    // Reset selected vendor and quantities when stock changes
    setNewSelectedVendor("");
    setNewSelectedStockQuantityValue("");
    setNewSelectedStockPriceValue("");
  };

  const newhandleVendorChange = (e) => {
    const selectedVendorName = e.target.value;
    console.log("selectedVendorName", selectedVendorName);
    setNewSelectedVendor(selectedVendorName);

    const selectedVendorData = stocksData.find(
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

    // Fetch Stock Quantity and Price based on selected vendor
  };
  // handling values entered
  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRatePerDaysChange = (e) => {
    setRatePerDays(e.target.value);
  };
  //Active Button
  const isButtonActive = () => {
    // Check if all required fields have data
    return (
      newSelectedStockId !== "" &&
      newSelectedVendor !== "" &&
      qty !== 0 &&
      unit !== "" &&
      price !== 0 &&
      ratePerDays !== 0 &&
      total !== 0
    );
  };

 

  const handleAddRequirement = async () => {
    const data = {
      customer_Id: enquiry._id,
      customerName: enquiry.customer_name,
      requirements: [
        {
          stockId: newSelectedStockId,
          stockName: stocksData.find((stock) => stock._id === newSelectedStockId)?.Stock_Name,
          vendorName: newSelectedVendor,
          vendorId: newSelectedVendorId,
          purchaseQuantity: qty,
          rate_per_days: price,
          unit,
          days: ratePerDays,
          price: total,
        },
      ],
    };
  
    try {
      if (ids.includes(enquiry._id)) {
        // If enquiry._id exists in ids, send a PATCH request
        await axios.patch(`http://localhost:8888/api/customerquotationinfo/${enquiry._id}`, data);
      } else {
        // If enquiry._id does not exist in ids, send a POST request
        await axios.post("http://localhost:8888/api/customerquotationinfo", data);
        alert("Stock added successfully");
      }
  
      // Reset form fields
      setNewSelectedStockId("");
      setNewSelectedVendor("");
      setNewSelectedVendorId("");
      setQty(0);
      setUnit("");
      setPrice(0);
      setRatePerDays(0);
      setTotal(0);
  
      // Fetch the updated data after adding/updating the stock
      await fetchQuotationData();
    } catch (error) {
      console.error("Error adding/updating stock", error);
      alert("Error adding/updating stock");
    }
  };


  useEffect(() => {
    const newIds = quotationData.requirements.map((item) => item._id);
    const amount = quotationData.requirements.reduce(
      (total, item) => total + item.price,
      0
    );
    setsubAmount(amount);
  }, [quotationData]);

  useEffect(() => {
    const apiUrl = "http://localhost:8888/api/customerquotationinfo";

    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming response.data is an array of objects containing `_id` fields
        const extractedIds = response.data.map((item) => item.customer_Id);
        setIds(extractedIds);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [quotationData]); // Empty dependency array ensures useEffect runs only once on component mount
  //Delete the stock
  const handleDelete = async (id) => {
    const customerId = quotationData.customer_Id;
    // console.log("customerId", customerId);
    // console.log("id", id);
    try {
      await axios.delete(
        `http://localhost:8888/api/customerquotationinfo/customer/${customerId}/requirements/${id}`
      );
      setQuotationData((prevState) => ({
        ...prevState,
        requirements: prevState.requirements.filter((item) => item._id !== id),
      }));
      alert("Stock Deleted successfully");
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  //calculate grandtotal
  useEffect(() => {
    if (quotationData) {
      calculateGrandTotal();
    }
  }, [quotationData, cgstChecked, sgstChecked, igstChecked, transportCharges]);

  const calculateGrandTotal = () => {
    if (quotationData) {
      let total = subAmount;
      let cgst = 0;
      let sgst = 0;
      let igst = 0;

      if (cgstChecked) {
        cgst = (total * 9) / 100;
        setCgst(cgst);
      }
      if (sgstChecked) {
        sgst = (total * 9) / 100;
        setSgst(sgst);
      }
      if (igstChecked) {
        igst = (total * 18) / 100;
        setIgst(igst);
      }

      const grandTotal = total + cgst + sgst;
      setGrandTotal(grandTotal);
      calculateTotalAmount(grandTotal);
    }
  };

  useEffect(() => {
    calculateGrandTotal();
    // calculateTotalAmount();
  }, [subAmount]);

  const calculateTotalAmount = (grandTotal) => {
    const total = grandTotal + Number(transportCharges);
    setTotalAmount(total);
  };

  const handleCgstChange = () => {
    setCgstChecked(!cgstChecked);
    setCgst(!cgst);
  };

  const handleSgstChange = () => {
    setSgstChecked(!sgstChecked);
    setSgst(!sgst);
  };
  const handleIgstChange = () => {
    setIgstChecked(!igstChecked);
    setIgst(!igst);
  };

  const handleTransportChargesChange = (e) => {
    setTransportCharges(e.target.value);
  };

  const handleTransportCharge = (e) => {
    setTransport(e.target.value);
  };

  const convertAmountToWords = (amount) => {
    const singleDigits = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const placeValues = ["", "Thousand", "Million", "Billion"];

    const toWords = (num) => {
      if (num === 0) return "Zero";

      let result = "";
      let place = 0;

      while (num > 0) {
        let chunk = num % 1000;
        if (chunk) {
          result = `${processChunk(chunk)}${
            placeValues[place]
          } ${result}`.trim();
        }
        num = Math.floor(num / 1000);
        place++;
      }

      return result.trim();
    };

    const processChunk = (num) => {
      let str = "";

      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;

      if (hundreds) {
        str += `${singleDigits[hundreds]} Hundred `;
      }

      if (remainder) {
        if (remainder < 10) {
          str += singleDigits[remainder];
        } else if (remainder >= 11 && remainder <= 19) {
          str += teens[remainder - 10];
        } else {
          const tensDigit = Math.floor(remainder / 10);
          const onesDigit = remainder % 10;
          str += `${tens[tensDigit]} ${singleDigits[onesDigit]}`;
        }
      }

      return str.trim() + " ";
    };

    // Round down to remove decimal part
    const integerPart = Math.floor(amount);
    return toWords(integerPart);
  };

  //print pdf
  const handlePrint = () => {
    const doc = new jsPDF();
  
    // Get system date
    const today = new Date();
    const formattedDate = today.toLocaleDateString(); // Format date as needed
  
   
    
    // Add Date and Serial Number
    doc.setFontSize(10);
    doc.text(`Date: ${formattedDate}`, 10, 32); // Adjust Y position as needed
  
 // Add Quotation Serial Number
 const quotationNumber = quotationData.quotation_Number || "N/A"; // Ensure this field is present in your data
 doc.text(`Quotation No: ${quotationNumber}`, 10, 37); // Adjust Y position as needed

    const customerData = [
      ["Customer Name", enquiry.customer_name || "-"],
      ["Customer Address", enquiry.address || "-"],
      ["Event Date", enquiry.event_date || "-"],
      ["Event Venue", enquiry.event_venue || "-"],
      ["State", enquiry.state || "-"],
      
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

    const customerTableX = 10;
    const customerTableY = 40;

    const companyTableX = 105;
    const companyTableY = 40;

    const pageWidth = doc.internal.pageSize.width;
    const customerTableWidth = pageWidth * 0.3;
    const rightMargin = pageWidth - customerTableX - customerTableWidth;

    doc.autoTable({
      body: customerData,
      startY: customerTableY,
      theme: "grid",
      margin: { right: rightMargin, left: customerTableX },
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

    // Print Quotation Details
    if (quotationData) {
      const tableData = quotationData.requirements.map((req, index) => [
        index + 1,
        req.stockName,
        descriptionValue,
        req.purchaseQuantity,
        req.unit,
        req.rate_per_days,
        req.days,

        `${req.price} Rs`,
      ]);

      const roundedGrandTotal =
        grandTotal !== null ? Math.round(grandTotal) : "-";
      const roundedTotalAmount =
        totalAmount !== null ? Math.round(totalAmount) : "-";

      tableData.push([
        "",
        "",
        "",
        "",
        "",
        "",
        "SubTotal",
        `${subAmount || "-"} Rs`,
      ]);

      if (enquiry.state === "Maharashtra") {
        tableData.push(
          ["", "", "", "", "", "", "CGST", `${quotationData.cgst || "9%"}`],
          ["", "", "", "", "", "", "SGST", `${quotationData.sgst || "9%"}`]
        );
      } else {
        tableData.push([
          "",
          "",
          "",
          "",
          "",
          "",
          "IGST",
          `${quotationData.igst || "18%"}`,
        ]);
      }

      tableData.push(
        ["", "", "", "", "", "", "Grand Total", `${roundedGrandTotal} Rs`],
        ["", "", "", "", "", "", "Total Amount", `${roundedTotalAmount} Rs`],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "Amounts In Words",
          `${convertAmountToWords(totalAmount) || "-"}`,
        ]
      );

      doc.autoTable({
        head: [
          [
            "Sr.No.",
            "Particular",
            "Description",
            "Per",
            "Unit",
            "Rate",
            "Days",
            "Amount",
          ],
        ],
        body: tableData,
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 90,
        theme: "grid",
      });

      const finalY = doc.lastAutoTable.finalY + 10;

      // Print Transport Type and Transport Charges as text
      doc.setFontSize(10);
      doc.text(`Transport Type: ${transport}`, 10, finalY + 5); // Adjust Y position as needed
      doc.text(`Transport Charges: ${transportCharges} Rs`, 10, finalY + 10); // Adjust Y position as needed

      // Print Terms and Conditions
      doc.setFontSize(12);
      doc.text("Terms & Conditions", 10, finalY + 30); // Adjust Y position as needed
      doc.setFontSize(10);

      // Define the terms and conditions
      const terms = [
        "1. The confirmation of the artist depends on first-come-first-serve basis in terms of booking amounts.",
        "2. Amount once paid are non-refundable with any other date or event.",
        "3. 100% Guarantee cannot be given on technical equipment.",
        "4. There would be use of Artificial Flowers unless mentioned separately.",
        '5. All Cheques / DD to be paid favoring "Tutons Events LLP".',
        "6. All necessary Permissions/Clearances required for the event & work at the Site/Venue",
        "7. Payment: 50% Before the event & 50% after delivery, within 30 Days.",
        "8. The above Quote is valid for 60 Days from the date of Quote.",
        "9. 18% GST is applicable on Total Billing.",
      ];

      let termY = finalY + 40;
      terms.forEach((term) => {
        doc.text(term, 10, termY);
        termY += 6;
      });

      const createdByY = termY + 20;
      doc.setFontSize(10);
      doc.text(`Created by: ${managerName}`, 10, createdByY);

      doc.save(`${enquiry.customer_name || "Customer"}-Quotation.pdf`);
      alert("PDF file generated");
    } else {
      alert("Quotation details are not available.");
    }
  };




  const handleViewQuotation = () => {
    setModalShow(true);
  };
  const handleClose = () => setModalShow(false);
  const handlePatchQuotation = async () => {
    if (!quotationData) {
      return;
    }

    const customerId = quotationData.customer_Id;
    const dataToUpdate = {
      transport: transport,
      transport_amount: transportCharges,
      description: descriptionValue,
      grand_total: grandTotal,
      sub_total: subAmount,
      cgst: cgstChecked ? "9%" : "",
      sgst: sgstChecked ? "9%" : "",
      Total_Amount: totalAmount,
      event_name: enquiry.event_name,
      event_date: enquiry.event_date,
      state: enquiry.state,
    };

    try {
      const response = await axios.patch(
        `http://localhost:8888/api//customersavedquotation/${customerId}`,
        dataToUpdate
      );
      // Log the data to ensure it's fetched correctly
      alert(" Quotation Saved successfully");
      // Handle successful response
    } catch (error) {
      console.error("Error patching data:", error);
      // Handle error response
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full  h-screen
        flex items-center justify-center  overflow-y-auto"
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <h2 className="text-[35px]">
            Quotation Form {enquiry.customer_name}
          </h2>
          <div className="row clearfix">
            <div className="col-md-12 mt-6">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "15%" }}>
                      {" "}
                      Select Stockname{" "}
                    </th>
                    <th className="text-center" style={{ width: "15%" }}>
                      {" "}
                      Select Vendorname{" "}
                    </th>
                    <th className="text-center" style={{ width: "10%" }}>
                      {" "}
                      Qty{" "}
                    </th>
                    <th className="text-center" style={{ width: "5%" }}>
                      {" "}
                      Unit{" "}
                    </th>
                    <th className="text-center" style={{ width: "5%" }}>
                      {" "}
                      Rate{" "}
                    </th>
                    <th className="text-center" style={{ width: "5%" }}>
                      {" "}
                      Days{" "}
                    </th>
                    <th className="text-center" style={{ width: "15%" }}>
                      {" "}
                      Amount{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "15%" }}>
                      <select
                        className="form-control"
                        id="stockName"
                        onChange={newhandleStockChange}
                        value={newSelectedStockId} // Ensure selected value is managed
                      >
                        <option value="">Select Stock</option>
                        {stocksData.map((stock) => (
                          <option key={stock._id} value={stock._id}>
                            {stock.Stock_Name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ width: "10%" }}>
                      <select
                        className="form-control"
                        id="vendorName"
                        onChange={newhandleVendorChange}
                        value={newSelectedVendor}
                      >
                        <option value="">Select Vendor</option>
                        {vendorNames.map((vendor) => (
                          <option key={vendor} value={vendor}>
                            {vendor}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ width: "15%" }}>
                      <input
                        type="number"
                        className="form-control qty"
                        step="0"
                        min="0"
                        value={qty}
                        onChange={handleQtyChange}
                      />
                      {/* <div style={{ color: "green" }}>
                        Avai Qty: {newSelectedStockQuantityValue}
                      </div> */}
                    </td>

                    <td style={{ width: "15%" }}>
                      <input
                        type="text"
                        className="form-control unit"
                        placeholder="Enter Unit"
                        step="0"
                        min="0"
                        value={unit}
                        onChange={handleUnitChange}
                      />
                    </td>
                    <td style={{ width: "10%" }}>
                      <input
                        type="number"
                        className="form-control price"
                        step="0"
                        min="0"
                        value={price}
                        onChange={handlePriceChange}
                      />
                      {/* <div style={{ color: "green" }}>
                        Price: {newSelectedStockPriceValue}
                      </div> */}
                    </td>
                    <td style={{ width: "10%" }}>
                      <input
                        type="number"
                        className="form-control rateperdays"
                        step="0"
                        min="0"
                        value={ratePerDays}
                        onChange={handleRatePerDaysChange}
                      />
                    </td>

                    <td style={{ width: "10%" }}>
                      <input
                        type="number"
                        className="form-control total"
                        step="0"
                        min="0"
                        value={total}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                onClick={handleAddRequirement}
                disabled={!isButtonActive()}
              >
                Add Stock
              </button>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Perticular</th>
                        {/* <th>Description</th> */}
                        <th>Per</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Days</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.requirements.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.stockName}</td>
                          <td>{item.purchaseQuantity}</td>
                          <td>{item.unit}</td>
                          <td>{item.rate_per_days}</td>
                          <td>{item.days}</td>
                          <td>{item.price}</td>
                          <td>
                            {/* Add any action buttons or links here */}
                            <button
                              className="btn btn-danger mr-2"
                              onClick={() => handleDelete(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bootstrap Modal for Editing Requirement */}
          </div>

          <div className="row clearfix" style={{ marginTop: "20px" }}>
            <div className="col-md-6">
              <table
                className="table table-bordered table-hover"
                id="tab_logic_total"
              >
                <tbody>
                  <tr>
                    <th className="text-center">Transport Type</th>
                    <td className="text-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Transport Type..."
                        onChange={handleTransportCharge}
                        value={transport}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">Transport Charges</th>
                    <td className="text-center">
                      <input
                        type="number"
                        className="form-control"
                        value={transportCharges}
                        onChange={handleTransportChargesChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">Description</th>
                    <td className="text-center">
                      <input
                        type="text"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        className="form-control"
                        placeholder="Description"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4">
              <table
                className="table table-bordered table-hover"
                id="tab_logic_total"
              >
                <tbody>
                  <tr>
                    <th className="text-center">Sub Total</th>
                    <td className="text-center">{subAmount}</td>
                  </tr>
                  <tr>
                    <th className="text-center">
                      {enquiry.state === "Maharashtra" ? (
                        <>
                          <label>
                            <input
                              type="checkbox"
                              onChange={handleCgstChange}
                            />
                            CGST 9 %
                          </label>
                          <br />
                          <label>
                            <input
                              type="checkbox"
                              onChange={handleSgstChange}
                            />
                            SGST 9 %
                          </label>
                        </>
                      ) : (
                        <label>
                          <input type="checkbox" onChange={handleIgstChange} />
                          IGST 18 %
                        </label>
                      )}
                    </th>
                    <td className="text-center border-hidden">
                      {cgst || sgst ? (
                        <>
                          {cgst}
                          <br className="gap-[50px]" />

                          {sgst}
                        </>
                      ) : (
                        <>{igst}</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center"> Total GST</th>
                    <td className="text-center">{cgst + sgst}</td>
                  </tr>
                  <tr>
                    <th className="text-center">Grand Total</th>
                    <td className="text-center">{grandTotal}</td>
                  </tr>
                  <tr>
                    <th className="text-center">Total Amount</th>
                    <td className="text-center">{totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row clearfix" style={{ marginTop: "20px" }}>
            <div className="col-md-12">
              <Button variant="primary" onClick={handleViewQuotation}>
                View
              </Button>
              <button className="btn btn-success ml-2" onClick={handlePrint}>
                Print
              </button>
              <button
                className="btn btn-primary ml-2"
                onClick={handlePatchQuotation}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalShow} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{ marginTop: "30px" }}>
          <Modal.Title>Quotation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          {quotationData ? (
            <div className="card">
              <div className="card-body">
                <div style={{ marginBottom: "20px" }}>
                  <div>
                    <strong>Client Name:</strong> {enquiry.customer_name}
                  </div>
                  <div>
                    <strong>Address:</strong> {enquiry.address}
                  </div>
                  <div>
                    <strong>Date:</strong> {enquiry.event_date}
                  </div>
                  <div>
                    <strong>Venue:</strong> {enquiry.event_venue}
                  </div>
                  <div>
                    <strong>State:</strong> {enquiry.state}
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Perticular</th>
                        {/* <th>Description</th> */}
                        <th>Per</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Days</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.requirements.map((req, index) => (
                        <tr key={req._id}>
                          <td>{index + 1}</td>
                          <td>{req.stockName}</td>
                          {/* <td>{req.description}</td> */}
                          <td>{req.purchaseQuantity}</td>
                          <td>{req.unit}</td>
                          <td>{req.rate_per_days}</td>
                          <td>{req.days}</td>
                          <td>{req.price} Rs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <strong>Transport:</strong> {transport}
                </div>
                <div>
                  <strong>Transport Amount:</strong> {transportCharges}
                </div>
                <div>
                  <strong>Description:</strong> {descriptionValue}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div>
                    <strong>Sub Total:</strong>
                    {subAmount}
                  </div>
                  {enquiry.state === "Maharashtra" ? (
                    <>
                      <div>
                        <strong> CGST:</strong> {cgstChecked ? "9%" : ""}
                      </div>
                      <div>
                        <strong> SGST:</strong> {sgstChecked ? "9%" : ""}
                      </div>
                    </>
                  ) : (
                    <div>
                      <strong> IGST:</strong> 18 %
                    </div>
                  )}
                  <div>
                    <strong>Grand Total:</strong> {grandTotal}
                  </div>
                  <div>
                    <strong>Total Amount:</strong> {totalAmount}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handlePatchQuotation}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default QuotationForm;
