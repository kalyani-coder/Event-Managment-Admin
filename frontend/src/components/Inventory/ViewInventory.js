import React, { useState, useEffect } from "react";

const ViewInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedQuantity, setUpdatedQuantity] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch inventory data from your API here
    fetch("https://eventmanagement-admin-hocm.onrender.com/api/inventorystock")
      .then((response) => response.json())
      .then((data) => {
        setInventoryItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdateQuantity = (itemName, changeType, itemID) => {
    const updatedItem = inventoryItems.find(
      (item) => item.addstocks === itemName
    );
    const newQuantity = updatedQuantity[itemName];

    if (!newQuantity || isNaN(newQuantity)) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    const updatedQuantityValue =
      changeType === "increase"
        ? updatedItem.quantity + parseInt(newQuantity)
        : updatedItem.quantity - parseInt(newQuantity);

    if (changeType === "decrease") {
      if (newQuantity > updatedItem.quantity) {
        alert("Quantity cannot be less than 0");
        return;
      }
    }

    fetch(
      `https://eventmanagement-admin-hocm.onrender.com/api/inventorystock/${itemName}/${changeType === "increase" ? "+" : changeType === "decrease" ? "-" : ""
      }${newQuantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: updatedQuantityValue }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setInventoryItems((prevState) =>
          prevState.map((item) =>
            item.addstocks === itemName
              ? { ...item, quantity: data.quantity }
              : item
          )
        );
        setUpdatedQuantity((prevUpdatedQuantity) => {
          const updated = { ...prevUpdatedQuantity };
          delete updated[itemName];
          return updated;
        });
        setSuccessMessage("Quantity updated successfully.");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        setSuccessMessage("");
        setErrorMessage("Error updating quantity. Please try again.");
      });
  };

  const handleInputChange = (itemId, value) => {
    setUpdatedQuantity({ ...updatedQuantity, [itemId]: value });
  };

  // if()

  return (
    <div className="container mt-5">
      <h2>View Inventory</h2>
      {loading ? (
        <p>Loading inventory data...</p>
      ) : (
        <table className="table table-hover table-sm border border-secondary">
          <thead className="thead-light">
            <tr>
              <th>Item Name</th>
              <th>Quantity in Stock</th>
              <th>Update Stock</th>
              <th>Increase</th>
              <th>Decrease</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.addstocks}>
                <td>{item.addstocks}</td>
                <td>{item.quantity}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Quantity"
                    value={updatedQuantity[item.addstocks] || ""}
                    onChange={(e) =>
                      handleInputChange(item.addstocks, e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.addstocks, "increase", item._id)
                    }
                  >
                    Increase
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.addstocks, "decrease", item._id)
                    }
                  >
                    Decrease
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default ViewInventory;
