import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Sidebar/Header";

function QuotationForm() {
  const [rows, setRows] = useState([{ id: 0, qty: 0, price: 0, total: 0 }]);
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

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    newRows[index].total = newRows[index].qty * newRows[index].price;
    setRows(newRows);
  };

  const calcTotal = () => {
    return rows.reduce((acc, row) => acc + row.total, 0);
  };

  const calcTaxAmount = () => {
    return calcTotal() * (tax / 100);
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length, qty: 0, price: 0, total: 0 };
    setRows([...rows, newRow]);
  };

  return (
    <>
      <Header />
      <div
        className="w-full  h-screen
        flex items-center justify-center  overflow-y-auto"
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <h2 className="text-[35px]">Quotation Form</h2>
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
                          value={row.unit}
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
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          value={row.days}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "days",
                              parseInt(e.target.value)
                            )
                          }
                          className="form-control days"
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
                onClick={handleAddRow}
                className="btn btn-default pull-left"
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

export default QuotationForm;
