import React, { useState } from "react";

const AddInventory = () => {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object with the item data
        const newItem = { name: itemName, quantity: parseInt(quantity) };

        try {
            // Send a POST request to your API endpoint
            const response = await fetch("your-api-endpoint-for-inventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Clear the form fields and show a success message after successful submission
            setItemName("");
            setQuantity("");
            setSuccessMessage("Item added successfully");
            setErrorMessage("");
        } catch (error) {
            console.error("Error adding inventory item:", error);
            setSuccessMessage("");
            setErrorMessage("Error adding item. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Add Inventory Item</h2>
                            {successMessage && (
                                <div className="alert alert-success">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="itemName" className="form-label">
                                        Item Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="itemName"
                                        className="form-control"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">
                                        Quantity:
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Add Item
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInventory;
