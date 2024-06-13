import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap"; // Import Form from react-bootstrap
import Header from "../../Sidebar/Header";

function YourComponent() {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/api/inventory-stocks"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(`Error in data fetching: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleSelecteChange = async (e) => {
    const selectedName = e.target.value; // Access selected value, not name
    console.log(selectedName);
    try {
      const response = await fetch(
        `http://localhost:8888/api/inventory-stocks/stock/${selectedName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const selectedProducts = data.filter(
        (product) => product.Stock_Name === selectedName
      );
      setSelectedProduct(selectedProducts);
    } catch (error) {
      console.error(`Error fetching selected product: ${error}`);
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2>Godown Inventory</h2>
        <Form.Group controlId="SelectClient">
          <Form.Label>Select Product:</Form.Label>
          <div className="relative">
            <Form.Select
              className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              aria-label="Select Client"
              name="name"
              style={{ width: "50%" }}
              onChange={handleSelecteChange}
            >
              <option>Select Product</option>
              {product.map((product, index) => (
                <option key={index} value={product.Stock_Name}>
                  {product.Stock_Name}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        {selectedProduct && (
          <Table
            striped
            bordered
            hover
            style={{ width: "50%" }}
            className="mt-5"
          >
            <thead>
              <tr>
                <th>StockName</th>
                <th>Price</th>
                <th>Vendor Name</th>
                <th>Stock_Quantity</th>
              </tr>
            </thead>

            <tbody>
              {selectedProduct.map((productData, index) => (
                <tr key={index}>
                  <td>{productData.Stock_Name}</td>
                  <td>{productData.Price}</td>
                  <td>{productData.Vendor_Name}</td>
                  <td>{productData.Stock_Quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default YourComponent;
