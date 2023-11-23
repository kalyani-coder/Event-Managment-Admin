// import React, { useState, useEffect } from "react";

// const AddInventory = () => {
//     const [addstocks, setAddStock] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [inventoryData, setInventoryData] = useState([]);

//     useEffect(() => {
//         // Fetch inventory data from your API and update the inventoryData state
//         // Example API call:
//         fetch("https://eventmanagement-admin-hocm.onrender.com/api/inventorystock")
//             .then((response) => response.json())
//             .then((data) => setInventoryData(data))
//             .catch((error) => console.error("Error fetching inventory data:", error));
//     }, []);

//     const isItemNameExists = () => {
//         return inventoryData.some((item) => item.addstocks === addstocks);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if the item already exists in inventory
//         if (isItemNameExists()) {
//             // If the item exists, show a confirmation dialog
//             const confirmUpdate = window.confirm(
//                 `Stock item with name "${addstocks}" already exists. Do you want to update the quantity?`
//             );

//             if (confirmUpdate) {
//                 // Update the quantity
//                 const existingItem = inventoryData.find((item) => item.addstocks === addstocks);
//                 const updatedQuantity = existingItem.quantity + parseInt(quantity);

//                 try {
//                     // Send a PUT request to update the existing item
//                     const response = await fetch(
//                         `https://eventmanagement-admin-hocm.onrender.com/api/inventorystock/${existingItem._id}`,
//                         {
//                             method: "PATCH",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({ quantity: updatedQuantity }),
//                         }
//                     );

//                     if (!response.ok) {
//                         throw new Error("Network response was not ok");
//                     }

//                     // Clear the form fields and show a success message after successful update
//                     setAddStock("");
//                     setQuantity("");
//                     setSuccessMessage("Item updated successfully");
//                     setErrorMessage("");
//                 } catch (error) {
//                     console.error("Error updating inventory item:", error);
//                     setSuccessMessage("");
//                     setErrorMessage("Error updating item. Please try again.");
//                 }
//             }
//         } else {
//             // If the item does not exist, create a new entry
//             const values = {
//                 addstocks: addstocks,
//                 quantity: parseInt(quantity),
//             };

//             try {
//                 // Send a POST request to create a new entry
//                 const response = await fetch("https://eventmanagement-admin-hocm.onrender.com/api/inventorystock", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(values),
//                 });

//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }

//                 // Clear the form fields and show a success message after successful creation
//                 setAddStock("");
//                 setQuantity("");
//                 setSuccessMessage("Item added successfully");
//                 setErrorMessage("");
//             } catch (error) {
//                 console.error("Error adding inventory item:", error);
//                 setSuccessMessage("");
//                 setErrorMessage("Error adding item. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
//                             <h2>Add Inventory Item</h2>
//                             {successMessage && (
//                                 <div className="alert alert-success">{successMessage}</div>
//                             )}
//                             {errorMessage && (
//                                 <div className="alert alert-danger">{errorMessage}</div>
//                             )}
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label htmlFor="itemName" className="form-label">
//                                         Item Name:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="itemName"
//                                         className="form-control"
//                                         value={addstocks}
//                                         onChange={(e) => setAddStock(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="quantity" className="form-label">
//                                         Quantity:
//                                     </label>
//                                     <input
//                                         type="number"
//                                         id="quantity"
//                                         className="form-control"
//                                         value={quantity}
//                                         onChange={(e) => setQuantity(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">
//                                     Add Item
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddInventory;




import React, { useState } from 'react';
// import './EventCategoryPage.css'; // Import CSS file for additional styling

const EventCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Event Category</h2>

            <div className="mb-3">
                <label className="form-label">Category Name:</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                    />
                    <button className="btn btn-primary" onClick={handleAddCategory}>
                        Add Category
                    </button>
                </div>
            </div>

            <div>
                <h3>Existing Categories</h3>
                <ol className="list-group">
                    {categories.map((category, index) => (
                        <li key={index} className="list-group-item">
                            {category}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default EventCategoryPage;

