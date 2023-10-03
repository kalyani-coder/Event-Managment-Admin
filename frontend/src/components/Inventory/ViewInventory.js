import React, { useState, useEffect } from "react";

const ViewInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedQuantity, setUpdatedQuantity] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Fetch inventory data from your API here
        fetch("http://localhost:5000/api/inventorystock")
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

    const handleUpdateQuantity = (itemId) => {
        const updatedItem = inventoryItems.find((item) => item._id === itemId);
        const newQuantity = updatedQuantity[itemId];

        if (!newQuantity || isNaN(newQuantity)) {
            setErrorMessage("Please enter a valid quantity.");
            return;
        }

        const updatedQuantityValue = updatedItem.quantity + parseInt(newQuantity, 10);

        fetch(`http://localhost:5000/api/inventorystock/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: updatedQuantityValue }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setInventoryItems((prevState) =>
                    prevState.map((item) =>
                        item._id === itemId ? { ...item, quantity: data.quantity } : item
                    )
                );
                // Do not clear the entire updatedQuantity state
                setUpdatedQuantity((prevUpdatedQuantity) => {
                    const updated = { ...prevUpdatedQuantity };
                    delete updated[itemId];
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

    const handleDeleteItem = (itemId) => {
        const updatedItem = inventoryItems.find((item) => item._id === itemId);
        const newQuantity = updatedQuantity[itemId];

        if (!newQuantity || isNaN(newQuantity) || newQuantity > updatedItem.quantity) {
            setErrorMessage("Invalid quantity to delete.");
            return;
        }

        const updatedQuantityValue = updatedItem.quantity - parseInt(newQuantity, 10);
        const finalQuantity = Math.max(updatedQuantityValue, 0);

        fetch(`http://localhost:5000/api/inventorystock/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: finalQuantity }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setInventoryItems((prevState) =>
                    prevState.map((item) =>
                        item._id === itemId ? { ...item, quantity: data.quantity } : item
                    )
                );
                // Do not clear the entire updatedQuantity state
                setUpdatedQuantity((prevUpdatedQuantity) => {
                    const updated = { ...prevUpdatedQuantity };
                    delete updated[itemId];
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

    return (
        <div className="container mt-5">
            <h2>View Inventory</h2>
            {loading ? (
                <p>Loading inventory data...</p>
            ) : (
                <table className="table table-hover table-sm  border border-secondary ">
                    <thead className="thead-light">
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity in Stock</th>
                            <th>Update Stock</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.addstocks}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Quantity"
                                        value={updatedQuantity[item._id] || ""}
                                        onChange={(e) => handleInputChange(item._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateQuantity(item._id)}>Update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
    );
};

export default ViewInventory;
