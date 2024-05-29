// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import myImage from "./logo.png";
// import Header from "../../Sidebar/Header";

// function QuotationForm() {
//   const [rows, setRows] = useState([{ id: 0, qty: 0, price: 0, total: 0 }]);
//   const [tax, setTax] = useState(0);
//   const [cgstChecked, setCgstChecked] = useState(false);
//   const [sgstChecked, setSgstChecked] = useState(false);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);
//   const Stock_Quantity = 100;
//   const [TransportTypeValue, setTransportTypeValue] = useState("");
//   const [transportValue, setTransportValue] = useState("");
//   const [descriptionValue, setDescriptionValue] = useState("");
//   const [vendorData, setVendorData] = useState([]);
//   const [stockData, setStockData] = useState([]);
//   const [vendorList, setVendorList] = useState([]);
// const [selectedVendor, setSelectedVendor] = useState("");
// const [selectedVendorName, setSelectedVendorName] = useState("");
// const [selectedStock, setSelectedStock] = useState("");
// const [selectedStockPrice, setSelectedStockPrice] = useState(null);
// const [stockList, setStockList] = useState([]);

//   // 
//   // Fetch data for stock names and vendor names
// useEffect(() => {
//   // Fetch stock data
//   axios.get("https://node-backend.macj-abuyerschoice.com/api/inventory-stocks")
//     .then(response => {
//       setStockData(response.data);
//     })
//     .catch(error => {
//       console.error("Error fetching stock data:", error);
//     });

//   // Fetch vendor data
//   axios.get("https://node-backend.macj-abuyerschoice.com/api/addvendor")
//     .then(response => {
//       setVendorData(response.data);
//     })
//     .catch(error => {
//       console.error("Error fetching vendor data:", error);
//     });
// }, []);
  
//   // 

//   const handleChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
  
//     if (field === "stock") {
//       const selectedStockName = value.Stock_Name;
//       // Fetch vendor data
//       axios
//         .get("https://node-backend.macj-abuyerschoice.com/api/addvendor")
//         .then((response) => {
//           const vendorData = response.data;
//           // Fetch stock data
//           axios
//             .get("https://node-backend.macj-abuyerschoice.com/api/inventory-stocks")
//             .then((response) => {
//               const stockData = response.data;
//               // Filter stock data based on the selected stock name
//               const selectedStock = stockData.find(stock => stock.Stock_Name === selectedStockName);
//               if (selectedStock) {
//                 // Find the vendor for the selected stock
//                 const selectedVendor = vendorData.find(vendor => vendor.Vendor_Id === selectedStock.Vendor_Id);
//                 if (selectedVendor) {
//                   // Update the vendor data for the specific row
//                   updatedRows[index]["vendor"] = selectedVendor;
//                   // Update the state with the updated rows
//                   setRows(updatedRows);
//                 } else {
//                   console.error("Vendor not found for the selected stock.");
//                 }
//               } else {
//                 console.error("Selected stock not found.");
//               }
//             })
//             .catch((error) => {
//               console.error("Error fetching stock data:", error);
//             });
//         })
//         .catch((error) => {
//           console.error("Error fetching vendor data:", error);
//         });
//     } else if (field === "vendor") {
//       // For other fields, update the state with the updated rows directly
//       setRows(updatedRows);
//     }
//   };
  
  

//   const handleAddRow = () => {
//     const newRow = { id: rows.length, qty: 0, price: 0, total: 0 };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = () => {
//     if (rows.length > 1) {
//       setRows(rows.slice(0, -1));
//     }
//   };

//   const calcTotal = () => {
//     return rows.reduce((acc, row) => acc + row.total, 0);
//   };

//   const calcTaxAmount = () => {
//     return calcTotal() * (tax / 100);
//   };

//   const calcGrandTotal = () => {
//     return calcTotal() + calcTaxAmount();
//   };

//   return (
//     <>
//       <Header />
//       <div
//         className="w-full  h-screen
//         flex items-center justify-center  overflow-y-auto"
//       >
//         <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
//           <h2 className="text-[35px]">Quotation Form</h2>
//           <div className="row clearfix">
//             <div className="col-md-12 mt-6">
//               <table
//                 className="table table-bordered table-hover"
//                 id="tab_logic"
//               >
//                 <thead>
//                   <tr>
//                     <th className="text-center" style={{ width: "15%" }}>
//                       {" "}
//                       Select Stockname{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "15%" }}>
//                       {" "}
//                       Select Vendorname{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "10%" }}>
//                       {" "}
//                       Qty{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "5%" }}>
//                       {" "}
//                       Unit{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "5%" }}>
//                       {" "}
//                       Rate{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "5%" }}>
//                       {" "}
//                       Days{" "}
//                     </th>
//                     <th className="text-center" style={{ width: "10%" }}>
//                       {" "}
//                       Amount{" "}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {rows.map((row, index) => (
//   <tr key={row.id}>
//     <td style={{ width: "15%" }}>
//       <select
//         className="form-control"
//         value={row.stock} // Set the selected value
//         onChange={(e) =>
//           handleChange(
//             index,
//             "stock",
//             JSON.parse(e.target.value)
//           )
//         }
//       >
//         <option value="">Select Stock Name</option>
//         {stockData.map((stock) => (
//           <option
//             key={stock.Stock_Id}
//             value={JSON.stringify(stock)}
//           >
//             {stock.Stock_Name}
//           </option>
//         ))}
//       </select>
//     </td>
//     <td style={{ width: "10%" }}>
//       <select
//         className="form-control"
//         value={row.vendor} // Set the selected value
//         onChange={(e) =>
//           handleChange(
//             index,
//             "vendor",
//             JSON.parse(e.target.value)
//           )
//         }
//       >
//         <option value="">Select Vendor Name</option>
//         {vendorData.map((vendor) => (
//           <option
//             key={vendor.Vendor_Id}
//             value={JSON.stringify(vendor)}
//           >
//             {vendor.Vendor_Name}
//           </option>
//         ))}
//       </select>
//     </td>
//                       <td style={{ width: "15%" }}>
//                         <input
//                           type="number"
//                           value={row.unit}
//                           onChange={(e) =>
//                             handleChange(
//                               index,
//                               "unit",
//                               parseInt(e.target.value)
//                             )
//                           }
//                           className="form-control unit"
//                           step="0"
//                           min="0"
//                         />
//                       </td>

//                       <td style={{ width: "15%" }}>
//                         <input
//                           type="number"
//                           value={row.rate}
//                           onChange={(e) =>
//                             handleChange(
//                               index,
//                               "rate",
//                               parseInt(e.target.value)
//                             )
//                           }
//                           className="form-control rate"
//                           step="0"
//                           min="0"
//                         />
//                         <div style={{ color: "green" }}>
//                           Price: {Stock_Quantity}
//                         </div>
//                       </td>
//                       <td style={{ width: "15%" }}>
//                         <input
//                           type="number"
//                           value={row.days}
//                           onChange={(e) =>
//                             handleChange(
//                               index,
//                               "days",
//                               parseInt(e.target.value)
//                             )
//                           }
//                           className="form-control days"
//                           step="0"
//                           min="0"
//                         />
//                       </td>
//                       <td style={{ width: "10%" }}>
//                         <input
//                           type="number"
//                           value={row.total}
//                           onChange={(e) =>
//                             handleChange(
//                               index,
//                               "total",
//                               parseInt(e.target.value)
//                             )
//                           }
//                           className="form-control total"
//                           step="0"
//                           min="0"
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {/* <div className="row clearfix">
//             <div className="col-md-12">
//               <button
//                 onClick={handleAddRow}
//                 className="btn btn-default pull-left"
//               >
//                 Add Row
//               </button>
//               <button
//                 onClick={handleDeleteRow}
//                 className="pull-right btn btn-default"
//               >
//                 Delete Row
//               </button>
//             </div>
//           </div> */}
//           <div className="row clearfix" style={{ marginTop: "20px" }}>
//             <div className="col-md-6">
//               <table
//                 className="table table-bordered table-hover"
//                 id="tab_logic_total"
//               >
//                 <tbody>
//                   <tr>
//                     <th className="text-center">Transport Type</th>
//                     <td className="text-center">
//                       <input
//                         type="number"
//                         value={TransportTypeValue}
//                         onChange={(e) =>
//                           setTransportTypeValue(parseInt(e.target.value))
//                         }
//                         className="form-control"
//                         placeholder="Enter Transport"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">Transport Charges</th>
//                     <td className="text-center">
//                       <input
//                         type="number"
//                         value={transportValue}
//                         onChange={(e) => setTransportValue(e.target.value)}
//                         className="form-control"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">Description</th>
//                     <td className="text-center">
//                       <input
//                         type="text"
//                         value={descriptionValue}
//                         onChange={(e) => setDescriptionValue(e.target.value)}
//                         className="form-control"
//                         placeholder="Description"
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="col-md-2"></div>
//             <div className="col-md-4">
//               <table
//                 className="table table-bordered table-hover"
//                 id="tab_logic_total"
//               >
//                 <tbody>
//                   <tr>
//                     <th className="text-center">Sub Total</th>
//                     <td className="text-center">{calcTotal()}</td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">GST</th>
//                     <td className="text-center">
//                       <input
//                         type="checkbox"
//                         id="cgstCheckbox"
//                         checked={cgstChecked}
//                         onChange={(e) => setCgstChecked(e.target.checked)}
//                       />
//                       <label htmlFor="cgstCheckbox">CGST</label>

//                       <input
//                         type="checkbox"
//                         id="sgstCheckbox"
//                         checked={sgstChecked}
//                         onChange={(e) => setSgstChecked(e.target.checked)}
//                         style={{ marginLeft: "10px" }}
//                       />
//                       <label htmlFor="sgstCheckbox">SGST</label>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">CGST</th>
//                     <td className="text-center">
//                       {cgstChecked && (
//                         <input
//                           type="number"
//                           value={cgst}
//                           onChange={(e) => setCgst(parseInt(e.target.value))}
//                           className="form-control"
//                           placeholder="0"
//                         />
//                       )}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">SGST</th>
//                     <td className="text-center">
//                       {sgstChecked && (
//                         <input
//                           type="number"
//                           value={sgst}
//                           onChange={(e) => setSgst(parseInt(e.target.value))}
//                           className="form-control"
//                           placeholder="0"
//                         />
//                       )}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-center">Total Amount</th>
//                     <td className="text-center">{calcTaxAmount()}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="row clearfix" style={{ marginTop: "20px" }}>
//             <div className="col-md-12">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => {
//                   // Logic to view the quotation
//                 }}
//               >
//                 View & Save
//               </button>
//               <button
//                 className="btn btn-success ml-2"
//                 onClick={() => {
//                   // Logic to save and print the quotation
//                 }}
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default QuotationForm;
