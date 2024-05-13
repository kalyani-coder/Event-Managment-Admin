import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { useLocation } from "react-router-dom";

function InternalCosting() {
    const location = useLocation()
    const { enquiry } = location.state || {}
    const [rows, setRows] = useState([{ id: null, qty: null, unit: null, price: null, total: null }]);
    const [TransportTypeValue, setTransportTypeValue] = useState("");
    const [transportValue, setTransportValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");

    const [stockNames, setStockNames] = useState([]);
    const [vendorNames, setVendorNames] = useState([]);
    const [newstocksData, setNewStocksData] = useState([]);
    const [newSelectedStock, setNewSelectedStock] = useState("");
    const [newSelectedVendor, setNewSelectedVendor] = useState("");
    const [newSelectedStockQuantityValue, setNewSelectedStockQuantityValue] =
        useState("");
    const [newSelectedStockPriceValue, setNewSelectedStockPriceValue] =
        useState("");
    const [selectedStockQuantity, setSelectedStockQuantity] = useState(0);

    // Define tax state
    const [tax, setTax] = useState(0);

    // Define CGST and SGST states
    const [cgstChecked, setCgstChecked] = useState(false);
    const [sgstChecked, setSgstChecked] = useState(false);
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);

      const [newSelectedStockId, setNewSelectedStockId] = useState("");
    const [newSelectedVendorId, setNewSelectedVendorId] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/inventory-stocks")
            .then((response) => {
                const data = response.data;
                const names = data.map((stock) => stock.Stock_Name);
                setStockNames(names);
                setNewStocksData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const newhandleStockChange = (e) => {
        const selectedStockName = e.target.value;
        setNewSelectedStock(selectedStockName);

        const selectedStockId = e.target.value; // Assuming the value contains the ID of the selected stock
        setNewSelectedStockId(selectedStockId);

        const vendors = newstocksData
            .filter((stock) => stock.Stock_Name === selectedStockName)
            .map((stock) => stock.Vendor_Name);
        setVendorNames(vendors);

        // Reset selected vendor and quantities when stock changes
        setNewSelectedVendor("");
        setNewSelectedStockQuantityValue("");
        setNewSelectedStockPriceValue("");
    };

    const newhandleVendorChange = async (e) => {
        const selectedVendorName = e.target.value;
        setNewSelectedVendor(selectedVendorName);

        const selectedVendorId = e.target.value; // Assuming the value contains the ID of the selected vendor
        setNewSelectedVendorId(selectedVendorId); 

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

        // Fetch Stock Quantity and Price based on selected vendor
        try {
            const response = await axios.get(
                `http://localhost:5000/api/stock-details?vendor=${selectedVendorName}&stock=${newSelectedStock}`
            );
            const { Stock_Quantity, Price } = response.data;
            setNewSelectedStockQuantityValue(Stock_Quantity);
            setNewSelectedStockPriceValue(Price);
        } catch (error) {
            console.error("Error fetching stock details:", error);
        }
    };

    // Inside handleChange function
    // const handleChange = (index, field, value) => {
    //   const newRows = [...rows];
    //   newRows[index][field] = value;
    //   if (field === "qty" || field === "price" || field === "rateperdays") {
    //     newRows[index].total = newRows[index].qty * newRows[index].price * newRows[index].rateperdays;
    //   }
    //   setRows(newRows);
    // };


    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        // Update stockName and vendorName fields when the user selects a stock and vendor
        if (field === "stockName" || field === "vendorName") {
            newRows[index][field] = value; // Update the selected stock or vendor name
        }

        if (field === "qty" || field === "price" || field === "rateperdays") {
            newRows[index].total = newRows[index].qty * newRows[index].price * newRows[index].rateperdays;
        }

        setRows(newRows);
    };




    const calcTotal = () => {
        return rows.reduce((acc, row) => acc + row.total, 0);
    };

    const calcTaxAmount = () => {
        return calcTotal() * (tax / 100);
    };

    //   const handleAddRow = () => {
    //     const newRow = { id: rows.length, qty: 0, price: 0, total: 0 };
    //     setRows([...rows, newRow]);
    //   };

    const addStock = () => {
        // Construct the data object to post
        const requirementsData = rows.map(row => ({
            stockName: newSelectedStock,
            stockId: newSelectedStockId, // Use the selected stock ID from the state
            vendorName: newSelectedVendor,
            vendorId: newSelectedVendorId, // Use the selected vendor ID from the state
            purchaseQuantity: row.qty,
            unit: row.unit,
            price: row.total,
            rate_per_days: row.price,
            days: row.rateperdays,
        }));
    
        const { enquiry } = location.state || {};
        const customerId = enquiry ? enquiry._id : undefined;
        const customerName = enquiry ? enquiry.customer_name : undefined;
      
        const data = {
          requirements: requirementsData,
          customer_Id: customerId,
          customerName: customerName
        };
    
        // Make a POST request to your API endpoint
        axios.post("http://localhost:5000/api/quatationinfo", data)
            .then(response => {
                // Handle success response if needed
                alert("Stock added successfully:", response.data);
                
                // Reset form fields
                setRows([{ id: null, qty: null, unit: null, price: null, total: null }]);
                setTransportTypeValue("");
                setTransportValue("");
                setDescriptionValue("");
                setNewSelectedStock("");
                setNewSelectedStockId("");
                setNewSelectedVendor("");
                setNewSelectedVendorId("");
                setCgstChecked(false);
                setSgstChecked(false);
                setCgst(0);
                setSgst(0);
            })
            .catch(error => {
                // Handle error response if needed
                console.error("Error adding stock:", error);
            });
    };
    
    

    return (
        <>
            <Header />
            <div
                className="w-full  h-screen
        flex items-center justify-center  overflow-y-auto"
            >
                <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
                    <h2 className="text-[35px]">Quotation Form {enquiry.customer_name}</h2>
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
                                    {rows.map((row, index) => (
                                        <tr key={row.id}>
                                            <td style={{ width: "15%" }}>
                                                <select
                                                    className="form-control"
                                                    id="stockName"
                                                    onChange={newhandleStockChange}
                                                    value={newSelectedStock} // Ensure selected value is managed
                                                >
                                                    <option value="">Select Stock</option>
                                                    {stockNames.map((stockName) => (
                                                        <option key={stockName} value={stockName}>
                                                            {stockName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td style={{ width: "10%" }}>
                                                <select
                                                    className="form-control"
                                                    id="vendorName"
                                                    onChange={newhandleVendorChange}
                                                    value={newSelectedVendor} // Ensure selected value is managed
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
                                                    value={row.qty}
                                                    onChange={(e) =>
                                                        handleChange(index, "qty", parseInt(e.target.value))
                                                    }
                                                    className="form-control qty"
                                                    step="0"
                                                    min="0"
                                                />
                                                <div style={{ color: "green" }}>
                                                    Avai Qty: {newSelectedStockQuantityValue}
                                                </div>
                                            </td>

                                            <td style={{ width: "15%" }}>
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "unit",
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="form-control unit"
                                                    placeholder="Enter Unit"
                                                    step="0"
                                                    min="0"
                                                />
                                            </td>
                                            <td style={{ width: "10%" }}>
                                                <input
                                                    type="number"
                                                    value={row.price}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "price",
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="form-control price"
                                                    step="0"
                                                    min="0"
                                                />
                                                <div style={{ color: "green" }}>
                                                    Price: {newSelectedStockPriceValue}
                                                </div>
                                            </td>
                                            <td style={{ width: "10%" }}>
                                                <input
                                                    type="number"
                                                    value={row.rateperdays}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "rateperdays",
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="form-control rateperdays"
                                                    step="0"
                                                    min="0"
                                                />
                                            </td>
                                            <td style={{ width: "10%" }}>
                                                <input
                                                    type="number"
                                                    value={row.total}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "total",
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="form-control total"
                                                    step="0"
                                                    min="0"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-md-12">
                            <button
                                onClick={addStock}
                                className="btn btn-primary pull-left"
                            >
                                Add Stock
                            </button>
                            {/* <button
                onClick={handleDeleteRow}
                className="pull-right btn btn-default"
              >
                Delete Row
              </button> */}
                        </div>
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
                                                value={TransportTypeValue}
                                                onChange={(e) =>
                                                    setTransportTypeValue(parseInt(e.target.value))
                                                }
                                                className="form-control"
                                                placeholder="Enter Transport"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Transport Charges</th>
                                        <td className="text-center">
                                            <input
                                                type="number"
                                                value={transportValue}
                                                onChange={(e) => setTransportValue(e.target.value)}
                                                className="form-control"
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
                                        <td className="text-center">{calcTotal()}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">GST</th>
                                        <td className="text-center">
                                            <input
                                                type="checkbox"
                                                id="cgstCheckbox"
                                                checked={cgstChecked}
                                                onChange={(e) => setCgstChecked(e.target.checked)}
                                            />
                                            <label htmlFor="cgstCheckbox">CGST</label>

                                            <input
                                                type="checkbox"
                                                id="sgstCheckbox"
                                                checked={sgstChecked}
                                                onChange={(e) => setSgstChecked(e.target.checked)}
                                                style={{ marginLeft: "10px" }}
                                            />
                                            <label htmlFor="sgstCheckbox">SGST</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">CGST</th>
                                        <td className="text-center">
                                            {cgstChecked && (
                                                <input
                                                    type="number"
                                                    value={cgst}
                                                    onChange={(e) => setCgst(parseInt(e.target.value))}
                                                    className="form-control"
                                                    placeholder="0"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">SGST</th>
                                        <td className="text-center">
                                            {sgstChecked && (
                                                <input
                                                    type="number"
                                                    value={sgst}
                                                    onChange={(e) => setSgst(parseInt(e.target.value))}
                                                    className="form-control"
                                                    placeholder="0"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Total Amount</th>
                                        <td className="text-center">{calcTaxAmount()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row clearfix" style={{ marginTop: "20px" }}>
                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    // Logic to view the quotation
                                }}
                            >
                                View & Save
                            </button>
                            <button
                                className="btn btn-success ml-2"
                                onClick={() => {
                                    // Logic to save and print the quotation
                                }}
                            >
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InternalCosting;
