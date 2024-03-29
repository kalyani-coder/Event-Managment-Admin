import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../../Sidebar/Sidebar"
import "./NewGodown.css"



const NewGodowns = () => {
    const [vendorName, setVendorName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/addvendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Vendor_Name: vendorName })
            });

            if (response.ok) {
                setAlertMessage('Vendor added successfully.');
                setAlertVariant('success');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
            } else {
                setAlertMessage('Failed to add vendor.');
                setAlertVariant('danger');
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
            setAlertMessage('Failed to add vendor. Please try again later.');
            setAlertVariant('danger');
        }
    };

    const handleChange = (event) => {
        setVendorName(event.target.value);
    };


    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/addvendor');
                if (response.ok) {
                    const data = await response.json();
                    setVendors(data);
                } else {
                    console.error('Failed to fetch vendors');
                }
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []);



    const [selectedVendor, setSelectedVendor] = useState('');
    const [vendors, setVendors] = useState([]);

    const [formData, setFormData] = useState({
        Category: '',
        Stock_Name: '',
        Stock_Quantity: '',
        Price: '',
        Vendor_Id: '',
        Vendor_Name: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVendorChange = (event) => {
        setSelectedVendor(event.target.value);
        const selectedVendorData = vendors.find(vendor => vendor.Vendor_Name === event.target.value);
        if (selectedVendorData) {
            setFormData({
                ...formData,
                Vendor_Id: selectedVendorData._id,
                Vendor_Name: selectedVendorData.Vendor_Name
            });
        }
    };

    const handleSubmitformData = async (event) => {
        event.preventDefault();

        if (!selectedVendor) {
            setAlertMessage('Please select a vendor.');
            setAlertVariant('danger');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/inventory-stocks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setAlertMessage('Stock added successfully.');
                setAlertVariant('success');
                setTimeout(() => {
                    setAlertMessage('');
                }, 4000);
            } else {
                setAlertMessage('Failed to add stock.');
                setAlertVariant('danger');
            }
        } catch (error) {
            console.error('Error adding stock:', error);
            setAlertMessage('Failed to add stock. Please try again later.');
            setAlertVariant('danger');
        }
    };


    const [showModal, setShowModal] = useState(false);

    const handleViewVendors = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [selectedVendorId, setSelectedVendorId] = useState(null);

    const handleDeleteVendor = async (vendorId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/addvendor/${vendorId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAlertMessage('Vendor deleted successfully.');
                setAlertVariant('success');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                setSelectedVendorId(null)
            } else {
                setAlertMessage('Failed to delete vendor. Please try again later.');
                setAlertVariant('danger');
            }
        } catch (error) {
            console.error('Error deleting vendor:', error);
        }
    };
    const handleTrashIconClick = (vendorId) => {
        setSelectedVendorId(vendorId);
        const confirmation = window.confirm('Are you sure you want to delete this vendor?');
        if (confirmation) {
            handleDeleteVendor(vendorId);
        }
    };

    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory-stocks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(`Error in data fetching: ${error}`);
            }
        };

        fetchData();

    }, []);

    const handleSelecteChange = async (e) => {
        const selectedName = e.target.value;
        console.log(selectedName);
        try {
            const response = await fetch(`http://localhost:5000/api/inventory-stocks/stock/${selectedName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const selectedProducts = data.filter(product => product.Stock_Name === selectedName);
            setSelectedProduct(selectedProducts);
        } catch (error) {
            console.error(`Error fetching selected product: ${error}`);
        }
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [editProductData, setEditProductData] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const [newQuantity, setNewQuantity] = useState(editProductData?.Stock_Quantity || '');

    const handleQuantityChange = (e) => {
        setNewQuantity(e.target.value);
    };


    const handleEditProduct = (productData) => {
        setEditProductData(productData);
        setNewPrice(productData.Price);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            // Calculate the updated quantity by adding the new quantity to the existing quantity
            const updatedQuantity = editProductData.Stock_Quantity + parseInt(newQuantity);

            // Create the updated product object with new price and calculated quantity
            const updatedProduct = {
                ...editProductData,
                Price: newPrice,
                Stock_Quantity: updatedQuantity
            };

            // Perform PATCH request to update the price and quantity
            const response = await fetch(`http://localhost:5000/api/inventory-stocks/${updatedProduct._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                window.alert('Price and quantity updated successfully');
                // TODO: Update your selectedProduct list or fetch it again from the server
            } else {
                window.alert('Failed to update price and quantity');
            }

            setShowEditModal(false);
            setEditProductData(null);
            setNewPrice('');
            setNewQuantity('');
        } catch (error) {
            console.error('Error updating price and quantity:', error);
            window.alert('Error updating price and quantity');
        }
    };


    const handleCloseEdit = () => {
        setShowEditModal(false);
        setEditProductData(null);
        setNewPrice('');
    };

    const [eventName, setEventName] = useState('')

    const handleEventChange = (event) => {
        setEventName(event.target.value)
    }

    
    const handleSaveEventName = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/addeventmaster", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ eventName: eventName })
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData.message);
                setAlertMessage(responseData.message);
                setAlertVariant('success');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
            } else {
                console.error(responseData.message);
                setAlertMessage(responseData.message);
                setAlertVariant('danger');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
            }
        } catch (e) {
            console.error(`Error posting event: ${e}`);
        }
    }



    return (

        <>

            <Sidebar />
            <div className='responsive-godown'>

                <div className="container">
                    <h4>Godown</h4>

                    <Form onSubmit={handleSubmit}>
                        {alertMessage && (
                            <div style={{ width: '50%' }}>
                                <Alert variant={alertVariant}>{alertMessage}</Alert>
                            </div>
                        )}
                        
                        <Form.Group controlId="addvendor">
                            <Form.Label>Add Vendor:</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Add Vendor"
                                    style={{ width: '50%' }}
                                    value={vendorName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex">
                                <Button className="mt-3" type="submit" variant="info">Add Vendor</Button>
                                <div style={{ width: '10px' }}></div>
                                <Button className="mt-3" type="submit" variant="info" onClick={handleViewVendors}>View Vendor</Button>
                            </div>
                        </Form.Group>
                    </Form>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vendors List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>Vendors Name</div>
                                <div>Action</div>
                            </div>
                            {vendors.map(vendor => (
                                <div key={vendor._id} className="d-flex justify-content-between align-items-center">
                                    <div style={{ lineHeight: "45px" }}>{vendor.Vendor_Name}</div>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="ml-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleTrashIconClick(vendor._id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Modal.Body>
                    </Modal>

                    <hr />

                    <h4>Add Stocks</h4>
                    <Form onSubmit={handleSubmitformData}>

                        <Form.Group controlId="Category">
                            <Form.Label>Product Category:</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Product Category"
                                    style={{ width: '50%' }}
                                    name="Category"
                                    value={formData.Category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Stock_Name">
                            <Form.Label>Product Category:</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Stock Name"
                                    style={{ width: '50%' }}
                                    name="Stock_Name"
                                    value={formData.Stock_Name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Stock_Quantity">
                            <Form.Label>Quantity:</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type="number"
                                    placeholder="Add Quantity"
                                    name="Stock_Quantity"
                                    style={{ width: '50%' }}
                                    value={formData.Stock_Quantity}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Price">
                            <Form.Label>Price/Quantity:</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type="number"
                                    placeholder="Price/Quantity"
                                    name="Price"
                                    style={{ width: '50%' }}
                                    value={formData.Price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </Form.Group>

                        <Form.Group controlId="SelectVendor">
                            <Form.Label>View Vendors : <span className='text-danger'>*</span></Form.Label>
                            <div className="relative">
                                <Form.Select
                                    className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                                    aria-label="Select Vendor"
                                    name="vendor"
                                    style={{ width: '50%' }}
                                    value={selectedVendor}
                                    onChange={handleVendorChange}
                                    required
                                >
                                    <option value="">Select Vendor</option>
                                    {vendors.map(vendor => (
                                        <option key={vendor._id} value={vendor.Vendor_Name}>
                                            {vendor.Vendor_Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Button className="mt-3" type="submit" variant="info">Add Stock</Button>
                    </Form><hr />


                    <div className="inventory">
                        <h4 className='mt-3'>Godown Inventory By Product</h4>
                        <Form.Group controlId="SelectClient">
                            <Form.Label>Select Product:</Form.Label>
                            <div className="relative">
                                <Form.Select
                                    className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                                    aria-label="Select Client"
                                    name="name"
                                    style={{ width: '50%', marginBottom: '70px' }}
                                    onChange={handleSelecteChange}
                                >
                                    <option>Select Product</option>
                                    {product.map((product, index) => (
                                        <option key={index} value={product.Stock_Name}>{product.Stock_Name}</option>
                                    ))}
                                </Form.Select>

                            </div>
                        </Form.Group>

                        {selectedProduct && (
                            <Table striped bordered hover
                                style={{ width: "50%" }}
                                className="mt-2"
                            >

                                <thead>
                                    <tr>
                                        <th>StockName</th>
                                        <th>Price</th>
                                        <th>Vendor Name</th>
                                        <th>Stock_Quantity</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {selectedProduct.map((productData, index) => (
                                        <tr key={index}>
                                            <td>{productData.Stock_Name}</td>
                                            <td>{productData.Price}</td>
                                            <td>{productData.Vendor_Name}</td>
                                            <td>{productData.Stock_Quantity}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    className="ml-2"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEditProduct(productData)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {editProductData && (
                                    <Modal show={showEditModal} onHide={handleCloseEdit}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Price</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div>
                                                <label htmlFor="newPrice">Price:</label>
                                                <input
                                                    id="newPrice"
                                                    type="number"
                                                    value={newPrice}
                                                    onChange={(e) => setNewPrice(e.target.value)}
                                                    placeholder="Enter new price"
                                                    style={{ borderRadius: "7px" }}
                                                />
                                            </div>
                                            <div>
                                                {editProductData && (
                                                    <div>
                                                        <label htmlFor="stockQuantity">Stock Quantity:</label>
                                                        <input
                                                            id="stockQuantity"
                                                            type="number"
                                                            value={newQuantity}
                                                            onChange={handleQuantityChange}
                                                            style={{ borderRadius: "7px" }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseEdit}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={handleSaveEdit}>
                                                Save
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                )}

                            </Table>
                        )}

                    </div><hr />



                    {/* Add events from here  */}
                    <Form onSubmit={handleSaveEventName}>
                        <Form.Group controlId="event">
                            <h5>Add Events Name:</h5>
                            <div className="relative">
                                <Form.Control
                                    type="text"
                                    value={eventName}
                                    onChange={handleEventChange}
                                    placeholder="Add Event Name Here..."
                                    style={{ width: '50%' }}
                                    name="event"
                                    required
                                />
                            </div>
                            <Button className="mt-3" type="submit" variant="info">Add Event</Button>
                        </Form.Group>
                    </Form>


                </div>

            </div>


        </>
    )
}

export default NewGodowns