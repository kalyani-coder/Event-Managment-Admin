import React, { useState, useEffect } from "react";

const ViewInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch inventory data from your API here
        fetch("your-api-endpoint-for-inventory")
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

    return (
        <div className="container mt-5">
            <h2>View Inventory</h2>
            {loading ? (
                <p>Loading inventory data...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity in Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewInventory;
