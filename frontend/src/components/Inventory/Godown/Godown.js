import React, { useState } from 'react';

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

    const handleGodownChange = (godown) => {
        setSelectedGodown(godown);
    };

    const handleAddGodown = () => {
        const newGodown = {
            id: godowns.length + 1,
            name: newGodownName,
            stocks: [],
        };
        setGodowns([...godowns, newGodown]);
        setNewGodownName('');
    };

    const handleAddStock = () => {
        if (selectedGodown) {
            const newStock = {
                id: Date.now(),
                name: newStockName,
                category: newStockCategory,
                quantity: parseInt(newStockQuantity),
            };

            const updatedGodowns = godowns.map((godown) =>
                godown.id === selectedGodown.id
                    ? { ...godown, stocks: [...godown.stocks, newStock] }
                    : godown
            );
            setGodowns(updatedGodowns);
            setNewStockName('');
            setNewStockCategory('');
            setNewStockQuantity('');
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
                    <label className="form-label">Select Godown:</label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {selectedGodown ? selectedGodown.name : 'Select Godown'}
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
                    <h3>Add New Godown</h3>
                    <div className='d-flex gap-3'>

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
                                Add Godown
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
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Stock Quantity"
                            value={newStockQuantity}
                            onChange={(e) => setNewStockQuantity(e.target.value)}
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedGodown.stocks.map((stock) => (
                                <tr key={stock.id}>
                                    <td>{stock.category}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.quantity}</td>
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
