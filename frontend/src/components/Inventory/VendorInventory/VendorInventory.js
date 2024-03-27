import React, { useState, useEffect } from 'react';
import Sidebar from "../../Sidebar/Sidebar"

const VendorInventory = () => {
    const [vendors, setVendors] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [vendorCategory, setVendorCategory] = useState('');
    const [vendorPrice, setVendorPrice] = useState('');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        if (selectedVendor) {
            fetchProducts(selectedVendor);
        }
    }, [selectedVendor]);

    const fetchVendors = async () => {
        // Placeholder function for fetching vendors (replace with actual API call)
        try {
            const response = await fetch('your-api-endpoint-for-vendors');
            const data = await response.json();
            setVendors(data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const fetchProducts = async (vendorId) => {
        // Placeholder function for fetching products for a vendor
        try {
            const response = await fetch(`your-api-endpoint-for-products?vendorId=${vendorId}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addVendor = async () => {
        // Placeholder function for adding a vendor (replace with actual API call)
        try {
            const response = await fetch('your-api-endpoint-for-vendors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: vendorName,
                    category: vendorCategory,
                    price: vendorPrice,
                }),
            });

            const data = await response.json();

            // Clear the form
            setVendorName('');
            setVendorCategory('');
            setVendorPrice('');

            // Refresh the vendor list
            fetchVendors();

            // Select the newly added vendor
            setSelectedVendor(data.id);
        } catch (error) {
            console.error('Error adding vendor:', error);
        }
    };

    return (
        <>
        <Sidebar />
        <div className='ml-5 container'>
            <h2>Add Vendor</h2>
            <label>
                Vendor Name:
                <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
            </label>
            <br />
            <label>
                Vendor Category:
                <input type="text" value={vendorCategory} onChange={(e) => setVendorCategory(e.target.value)} />
            </label>
            <br />
            <label>
                Vendor Price:
                <input type="number" value={vendorPrice} onChange={(e) => setVendorPrice(e.target.value)} />
            </label>
            <br />
            <button onClick={addVendor}>Add Vendor</button>

            <h2>Vendor List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Category</th>
                        <th>Vendor Price</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.id} onClick={() => setSelectedVendor(vendor.id)}>
                            <td>{vendor.name}</td>
                            <td>{vendor.category}</td>
                            <td>{vendor.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedVendor && (
                <div>
                    <h2>Products for {selectedVendor}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
};

export default VendorInventory;
