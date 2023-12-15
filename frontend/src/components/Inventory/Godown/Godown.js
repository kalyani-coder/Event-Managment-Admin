import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';

const GodownInventory = () => {


    const [selectedGodown, setSelectedGodown] = useState(null);
    const [newGodownName, setNewGodownName] = useState('');
    const [newStockName, setNewStockName] = useState('');
    const [newStockCategory, setNewStockCategory] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState('');
    const [newStockPrice, setNewStockPrice] = useState('');
    const [newStockVendor, setNewStockVendor] = useState('');
    const [vendors, setVendors] = useState([]);
    console.log("vedant" , vendors)






    const handleAddVendor = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/addvendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Vendor_Name: newGodownName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Vendor added successfully:', data);
                // Handle any additional logic if needed
            } else {
                console.error('Error adding vendor:', response.statusText);
                // Handle error scenarios
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
            // Handle error scenarios
        }
    };


    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/addvendor');
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

    return (
        <div className="container mt-5">
            <h2>Godown Inventory</h2>

            <div className="d-flex justify-content-between">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {vendors.map((vendor) => (
                            <li key={vendor._id}>
                                <a className="dropdown-item" href="#" onClick={() => setSelectedGodown(vendor)}>
                                    {vendor.Vendor_Name}
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
                            placeholder="Category"
                        // value={newStockCategory}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Stock Name"
                        // value={newStockName}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Stock Quantity"
                        // value={newStockQuantity}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Stock Price"
                        // value={newStockPrice}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Vendor Name"

                        />
                    </div>
                </div>
                <button className="btn btn-primary mt-2" >
                    Add Stock
                </button>
            </div>

            {selectedGodown && (
                <div>
                    <h3>{selectedGodown.name}</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Vendor</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedGodown.stocks.map((stock) => (
                                <tr key={stock.id}>
                                    <td>{stock.category}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.quantity}</td>
                                    <td>{stock.price}</td>
                                    <td>{stock.vendor}</td>
                                    <td>
                                        <Button variant="success">
                                            +
                                        </Button>{' '}
                                        <Button variant="danger">
                                            -
                                        </Button>
                                    </td>
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
