import React, { useState, useEffect } from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';

const GodownInventory = () => {
    const [godowns, setGodowns] = useState([
        { id: 1, name: 'Godown 1', stocks: [] },
        { id: 2, name: 'Godown 2', stocks: [] },
        { id: 3, name: 'Godown 3', stocks: [] },
    ]);

    const [selectedGodown, setSelectedGodown] = useState(null);
    const [newGodownName, setNewGodownName] = useState('');
    const [newStockName, setNewStockName] = useState('');
    const [newStockCategory, setNewStockCategory] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState('');
    const [newStockPrice, setNewStockPrice] = useState('');
    const [newStockVendor, setNewStockVendor] = useState('');
    const [existingProducts, setExistingProducts] = useState([]);
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/vendors');
            const data = await response.json();
            setVendors(data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleGodownChange = (godown) => {
        setSelectedGodown(godown);
    };

    const handleAddGodown = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/addvendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newGodownName }),
            });

            if (response.ok) {
                const data = await response.json();
                setVendors([...vendors, data]);
                setNewGodownName('');
            } else {
                console.error('Error adding vendor:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
        }
    };

    const handleAddStock = () => {
        if (selectedGodown) {
            const newStock = {
                id: Date.now(),
                name: newStockName,
                category: newStockCategory,
                quantity: parseInt(newStockQuantity),
                price: parseFloat(newStockPrice),
                vendor: newStockVendor || selectedGodown.name,
            };

            const isDuplicate = selectedGodown.stocks.some(
                (stock) =>
                    stock.category.toLowerCase() === newStockCategory.toLowerCase() &&
                    stock.name.toLowerCase() === newStockName.toLowerCase()
            );

            if (isDuplicate) {
                alert('Product already exists in this godown!');
            } else {
                setExistingProducts([...existingProducts, { category: newStockCategory, name: newStockName }]);

                const updatedGodowns = godowns.map((godown) =>
                    godown.id === selectedGodown.id ? { ...godown, stocks: [...godown.stocks, newStock] } : godown
                );

                setGodowns(updatedGodowns);
                setNewStockName('');
                setNewStockCategory('');
                setNewStockQuantity('');
                setNewStockPrice('');
                setNewStockVendor('');
            }
        }
    };

    const handleIncreaseStock = (stockId) => {
        if (selectedGodown) {
            const updatedGodowns = godowns.map((godown) =>
                godown.id === selectedGodown.id
                    ? {
                        ...godown,
                        stocks: godown.stocks.map((stock) =>
                            stock.id === stockId ? { ...stock, quantity: stock.quantity + 1 } : stock
                        ),
                    }
                    : godown
            );
            setGodowns(updatedGodowns);
        }
    };

    const handleDecreaseStock = (stockId) => {
        if (selectedGodown) {
            const updatedGodowns = godowns.map((godown) =>
                godown.id === selectedGodown.id
                    ? {
                        ...godown,
                        stocks: godown.stocks.map((stock) =>
                            stock.id === stockId && stock.quantity > 0
                                ? { ...stock, quantity: stock.quantity - 1 }
                                : stock
                        ),
                    }
                    : godown
            );
            setGodowns(updatedGodowns);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Godown Inventory</h2>

            <div className="d-flex justify-content-between">
                <div className="mb-3">
                    <label className="form-label">Select Vendor:</label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {selectedGodown ? selectedGodown.name : 'Select Vendor'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {godowns.map((godown) => (
                                <Dropdown.Item key={godown.id} onClick={() => handleGodownChange(godown)}>
                                    {godown.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
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
                            <button className="btn btn-success" onClick={handleAddGodown}>
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
                            value={newStockCategory}
                            onChange={(e) => setNewStockCategory(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Stock Name"
                            value={newStockName}
                            onChange={(e) => setNewStockName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Stock Quantity"
                            value={newStockQuantity}
                            onChange={(e) => setNewStockQuantity(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Stock Price"
                            value={newStockPrice}
                            onChange={(e) => setNewStockPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Vendor Name"
                            value={newStockVendor || (selectedGodown ? selectedGodown.name : '')}
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
                                        <Button variant="success" onClick={() => handleIncreaseStock(stock.id)}>
                                            +
                                        </Button>{' '}
                                        <Button variant="danger" onClick={() => handleDecreaseStock(stock.id)}>
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
