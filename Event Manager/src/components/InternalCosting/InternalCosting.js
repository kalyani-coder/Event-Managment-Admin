import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Sidebar/Header";
import { useLocation } from "react-router-dom";
import { Form, Button, Alert, Modal } from "react-bootstrap";


function InternalCosting() {
    const location = useLocation()
    const { enquiry } = location.state || {}
    console.log("vedant", enquiry)
    const [rows, setRows] = useState([
        {
            id: 1, stockName: '', vendorName: '', qty: 0, unit: '', price: 0, rateperdays: 0, total: 0
        }
    ]);
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

    const [modalShow, setModalShow] = useState(false);
    const [quotationData, setQuotationData] = useState(null);

    const handleViewQuotation = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/quotationinfo/${enquiry._id}`);
            setQuotationData(response.data);
            setModalShow(true);
        } catch (error) {
            console.error('Failed to fetch quotation info:', error);
        }
    };

    const handleClose = () => setModalShow(false);

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


    const [isFirstSubmission, setIsFirstSubmission] = useState(true);
    const [subtotal, setSubtotal] = useState(0);

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        if (field === 'qty' || field === 'price' || field === 'rateperdays') {
            newRows[index].total = newRows[index].qty * newRows[index].price * newRows[index].rateperdays;
        }

        setRows(newRows);
    };


    const calcTotal = () => {
        return rows.reduce((acc, row) => acc + row.total, 0);
    };

    const calcTaxAmount = () => {
        return subtotal * (tax / 100);
    };
    const calcFinalSubtotal = () => {
        return subtotal + transportCharges;
    };

    //   const handleAddRow = () => {
    //     const newRow = { id: rows.length, qty: 0, price: 0, total: 0 };
    //     setRows([...rows, newRow]);
    //   };
    const [stockName, setStockName] = useState('');
    const [stockId, setStockId] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [purchaseQuantity, setPurchaseQuantity] = useState(0);
    const [ratePerDays, setRatePerDays] = useState(0);
    const [days, setDays] = useState(0);
    const [transportCharges, setTransportCharges] = useState(0);




    const resetFormFields = () => {
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
    };


    const handleAddRequirement = async () => {
        const requirements = rows.map(row => ({
            stockName: newSelectedStock,
            stockId: newSelectedStock,  // Assuming stockId is the same as stockName for now
            vendorName: newSelectedVendor,
            vendorId: newSelectedVendor, // Assuming vendorId is the same as vendorName for now
            purchaseQuantity: row.qty,
            rate_per_days: row.price,
            days: row.rateperdays,
            price: row.total
        }));

        const data = {
            requirements,
            customer_Id: enquiry._id,
            customerName: enquiry.customer_name
        };

        try {
            if (isFirstSubmission) {
                const response = await axios.post('http://localhost:5000/api/quotationinfo', data);
                alert('Stock added successfully');
                setIsFirstSubmission(false);
                setSubtotal(subtotal + calcTotal());


            } else {
                const response = await axios.patch(`http://localhost:5000/api/quotationinfo/${enquiry._id}`, data);
                alert('Stock updated successfully');
                setSubtotal(subtotal + calcTotal());
            }
            // Clear inputs after successful submission
            setRows([{
                id: 1, stockName: '', vendorName: '', qty: 0, unit: '', price: 0, rateperdays: 0, total: 0
            }]);
        } catch (error) {
            console.error('Error adding/updating stock', error);
            alert('Error adding/updating stock');
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
                                type="button"
                                className="btn btn-primary pull-left"
                                onClick={handleAddRequirement}
                            >
                                {isFirstSubmission ? 'Add Stock' : 'Add More Stocks'}
                            </button>



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


                                                className="form-control"
                                                placeholder="Enter Transport Type..."
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
                                                onChange={(e) => setTransportCharges(parseFloat(e.target.value) || 0)} // Update transport charges state
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
                                        <td className="text-center">{subtotal}</td>
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
                            <Button variant="primary" onClick={handleViewQuotation}>
                                View
                            </Button>
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

            <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton style={{ marginTop: "30px" }}>
                    <Modal.Title>Quotation Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {quotationData ? (
                        <>
                            <div style={{ marginBottom: "20px" }}>
                                {/* <div><strong>Date:</strong> {currentDate}</div> */}
                                <div><strong>Customer Name:</strong> {enquiry.customer_name}</div>
                                <div><strong>Event Name:</strong> {enquiry.event_name}</div>
                                <div><strong>Event Date:</strong> {enquiry.event_date}</div>
                            </div>
                           
                            <div>
                                <strong>Requirements:</strong>
                                {quotationData.requirements.map((req, index) => (
                                    <div key={req._id} style={{ marginBottom: "10px" }}>
                                        <div><strong>Stock {index + 1}:</strong></div>
                                        <div><strong>Stock Name:</strong> {req.stockName}</div>
                                        <div><strong>Vendor Name:</strong> {req.vendorName}</div>
                                        <div><strong>Purchase Quantity:</strong> {req.purchaseQuantity}</div>
                                        <div><strong>Rate per Days:</strong> {req.rate_per_days}</div>
                                        <div><strong>Days:</strong> {req.days}</div>
                                        <div><strong>Price:</strong> {req.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <strong>Transport:</strong> {quotationData.transport}
                            </div>
                            <div>
                                <strong>Transport Amount:</strong> {quotationData.transport_amount}
                            </div>
                            <div>
                                <strong>Description:</strong> {quotationData.description}
                            </div>
                            <div>
                                <strong>Grand Total:</strong> {quotationData.grand_total}
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <div><strong>Sub Total:</strong> {quotationData.sub_total}</div>
                                <div><strong>CGST:</strong> {quotationData.cgst}</div>
                                <div><strong>SGST:</strong> {quotationData.sgst}</div>
                                <div><strong>Grand Total:</strong> {quotationData.grand_total}</div>
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InternalCosting;











