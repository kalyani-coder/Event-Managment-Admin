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

        // Send a PUT request to update the quantity for the specific item
        fetch(`http://localhost:5000/api/inventorystock/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: newQuantity }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the item's quantity in the state
                setInventoryItems((prevState) =>
                    prevState.map((item) =>
                        item._id === itemId ? { ...item, quantity: data.quantity } : item
                    )
                );
                setUpdatedQuantity({}); // Clear the updated quantity
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
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.addstocks}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
        </div>
    );
};

export default ViewInventory;
