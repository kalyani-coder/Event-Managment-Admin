import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './Godown.css'


const GodownInventory = () => {
    const [newGodownName, setNewGodownName] = useState('');
    const [vendors, setVendors] = useState([]);
    const [selectedGodown, setSelectedGodown] = useState({}); // Provide a default value

    const [newStockCategory, setNewStockCategory] = useState('');
    const [newStockName, setNewStockName] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState('');
    const [newStockPrice, setNewStockPrice] = useState('');
    const [selectedVendorStocks, setSelectedVendorStocks] = useState([]);

    const [editedQuantity, setEditedQuantity] = useState(null);
    const [isEditingQuantity, setIsEditingQuantity] = useState(false);
    const [selectedStockId, setSelectedStockId] = useState(null);


    const [editedPrice, setEditedPrice] = useState(null);
    const [isEditingPrice, setIsEditingPrice] = useState(false);


    const handleAddVendor = async () => {
        try {
            const response = await fetch('https://eventmanagement-admin-hocm.onrender.com/api/addvendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Vendor_Name: newGodownName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Vendor added successfully:', data);
                alert('Vendor Added Successfully');
                // Handle any additional logic if needed
            } else {
                console.error('Error adding vendor:', response.statusText);
                alert('Server Error Vendor not added');
                // Handle error scenarios
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
            // Handle error scenarios
        }
    };


    const handleAddStock = async () => {
        try {
            // Check if the new stock name already exists in the selectedVendorStocks array
            const stockExists = selectedVendorStocks.some(stock => stock.Stock_Name === newStockName);

            if (stockExists) {
                alert('Stock with the same name already exists for the selected vendor');
                return; // Exit the function if the stock already exists for the selected vendor
            }

            const response = await fetch('https://eventmanagement-admin-hocm.onrender.com/api/inventory-stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Category: newStockCategory,
                    Stock_Name: newStockName,
                    Stock_Quantity: newStockQuantity,
                    Price: newStockPrice,
                    Vendor_Id: selectedGodown ? selectedGodown._id : '',
                    Vendor_Name: selectedGodown ? selectedGodown.Vendor_Name : '',
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Stock added successfully:', data);
                alert('Stock Added Successfully');
                // Handle any additional logic if needed
            } else {
                console.error('Error adding stock:', response.statusText);
                alert('Server Error Stock not added');
                // Handle error scenarios
            }
        } catch (error) {
            console.error('Error adding stock:', error);
            // Handle error scenarios
        }
    };

    const fetchVendorStocks = async (vendorId) => {
        try {
            const response = await fetch(`https://eventmanagement-admin-hocm.onrender.com/api/inventory-stocks/vendor/${vendorId}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedVendorStocks(data);
            } else {
                console.error('Error fetching vendor stocks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching vendor stocks:', error);
        }
    };


    useEffect(() => {
        // Fetch vendors when the component mounts
        const fetchVendors = async () => {
            try {
                const response = await fetch('https://eventmanagement-admin-hocm.onrender.com/api/addvendor');
                if (response.ok) {
                    const data = await response.json();
                    setVendors(data);
                } else {
                    console.error('Error fetching vendors:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []);

    useEffect(() => {
        // Fetch vendor stocks when a vendor is selected or when the component mounts
        if (selectedGodown._id) {
            fetchVendorStocks(selectedGodown._id);
        }
    }, [selectedGodown._id]);

    const handleEditQuantity = (stockId, currentQuantity) => {
        // Toggle editing mode
        setIsEditingQuantity(!isEditingQuantity);

        // If entering editing mode, set the current quantity for editing
        if (!isEditingQuantity) {
            setEditedQuantity(currentQuantity);
            setSelectedStockId(stockId);
        } else {
            // If exiting editing mode, reset edited quantity and selected stock
            setEditedQuantity(null);
            setSelectedStockId(null);
        }
    };

    const handleConfirmEditQuantity = async () => {
        try {
            // Update the API with the new quantity
            await fetch(`https://eventmanagement-admin-hocm.onrender.com/api/inventory-stocks/${selectedStockId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Stock_Quantity: editedQuantity,
                }),
            });

            // After successfully updating the API, exit editing mode
            setIsEditingQuantity(false);
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error updating quantity
        }
    };

    const handleEditPrice = (stockId, currentPrice) => {
        // Toggle editing mode for price
        setIsEditingPrice(!isEditingPrice);

        // If entering editing mode, set the current price for editing
        if (!isEditingPrice) {
            setEditedPrice(currentPrice);
            setSelectedStockId(stockId);

            // If the quantity is currently being edited, exit its editing mode
            if (isEditingQuantity) {
                setIsEditingQuantity(false);
            }
        } else {
            // If exiting editing mode, reset edited price and selected stock
            setEditedPrice(null);
            setSelectedStockId(null);
        }
    };

    const handleConfirmEditPrice = async () => {
        try {
            // Update the API with the new price
            await fetch(`https://eventmanagement-admin-hocm.onrender.com/api/inventory-stocks/${selectedStockId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Price: editedPrice,
                }),
            });

            // After successfully updating the API, exit editing mode for price
            setIsEditingPrice(false);
        } catch (error) {
            console.error('Error updating price:', error);
            // Handle error updating price
        }
    };


    return (
        <div className="container mt-5">
            <h2>Godown Inventory</h2>

            <div className="d-flex justify-content-between">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {vendors.map((vendor) => (
                            <li key={vendor._id}>
                                <a className="dropdown-item" onClick={() => setSelectedGodown(vendor)}>
                                    <span>{vendor.Vendor_Name}</span><br></br>
                                    <FontAwesomeIcon icon={faTrash} className="delete-icon text-danger" style={{ cursor: "pointer" }} />

                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Add New Vendor</h3>
                    <div className="d-flex gap-3">
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Add Vendors'
                                value={newGodownName}
                                onChange={(e) => setNewGodownName(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="btn btn-success" onClick={handleAddVendor}>
                                Add Vendor
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h4>Add Stock</h4>
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product Category"
                            value={newStockCategory}
                            onChange={(e) => setNewStockCategory(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Item Name"
                            value={newStockName}
                            onChange={(e) => setNewStockName(e.target.value)}
                        />

                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Quantity"
                            value={newStockQuantity}
                            onChange={(e) => setNewStockQuantity(e.target.value)}
                        />

                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Price/quantity"
                            value={newStockPrice}
                            onChange={(e) => setNewStockPrice(e.target.value)}
                        />

                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Vendor Name"
                            value={selectedGodown ? selectedGodown.Vendor_Name : ''}
                            readOnly
                        />
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={handleAddStock}>
                    Add Stock
                </button>
            </div>


            {selectedGodown && (
                <div>
                    <h3>{selectedGodown.Vendor_Name}</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Vendor</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedVendorStocks.map((stock) => (
                                <tr key={stock._id} className='godown-td'>
                                    <td className='text-dark'>{stock.Category}</td>
                                    <td>{stock.Stock_Name}</td>
                                    <td>
                                        {isEditingQuantity && selectedStockId === stock._id ? (
                                            <>
                                                <input
                                                    type="number"
                                                    value={editedQuantity}
                                                    onChange={(e) => setEditedQuantity(e.target.value)}
                                                />
                                                <FontAwesomeIcon className="edit-correct-icon" icon={faCheck} onClick={handleConfirmEditQuantity} />
                                                <FontAwesomeIcon className="edit-wrong-icon" icon={faTimes} onClick={() => setIsEditingQuantity(false)} />
                                            </>
                                        ) : (
                                            <>
                                                {stock.Stock_Quantity}
                                                <FontAwesomeIcon className="edit-icon" icon={faEdit} onClick={() => handleEditQuantity(stock._id, stock.Stock_Quantity)} />
                                            </>
                                        )}
                                    </td>

                                    <td>
                                        {isEditingPrice && selectedStockId === stock._id ? (
                                            <>
                                                <input
                                                    type="number"
                                                    value={editedPrice}
                                                    onChange={(e) => setEditedPrice(e.target.value)}
                                                />
                                                <FontAwesomeIcon className="edit-correct-icon" icon={faCheck} onClick={handleConfirmEditPrice} />
                                                <FontAwesomeIcon className="edit-wrong-icon" icon={faTimes} onClick={() => setIsEditingPrice(false)} />
                                            </>
                                        ) : (
                                            <>
                                                {stock.Price}
                                                <FontAwesomeIcon className="edit-icon" icon={faEdit} onClick={() => handleEditPrice(stock._id, stock.Price)} />
                                            </>
                                        )}
                                    </td>




                                    <td>{stock.Vendor_Name}</td>
                                    {/* Add actions buttons as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default GodownInventory;
