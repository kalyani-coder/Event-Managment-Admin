import React, { useState, useEffect } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Sidebar/Header";
import "./NewGodown.css";

const NewGodowns = () => {
  const [formData, setFormData] = useState({
    Category: "",
    Stock_Name: "",
    Stock_Quantity: "",
    Price: "",
    Vendor_Id: "",
    Vendor_Name: "",
  });

  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/api/inventory-stocks"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(`Error in data fetching: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/addvendor");
        if (response.ok) {
          const data = await response.json();
          setVendors(data);
        } else {
          console.error("Failed to fetch vendors");
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
    const selectedVendorData = vendors.find(
      (vendor) => vendor.Vendor_Name === event.target.value
    );
    if (selectedVendorData) {
      setFormData({
        ...formData,
        Vendor_Id: selectedVendorData._id,
        Vendor_Name: selectedVendorData.Vendor_Name,
      });
    }
  };

  const handleSelecteChange = async (e) => {
    const selectedName = e.target.value;
    console.log(selectedName);
    try {
      const response = await fetch(
        `http://localhost:8888/api/inventory-stocks/stock/${selectedName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const selectedProducts = data.filter(
        (product) => product.Stock_Name === selectedName
      );
      setSelectedProduct(selectedProducts);
    } catch (error) {
      console.error(`Error fetching selected product: ${error}`);
    }
  };

  const isValidForm = () => {
    const newErrors = {};

    // Validate Product Category
    if (!formData.Category) {
      newErrors.Category = "Category name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.Category)) {
      newErrors.Category = "Category should contain only alphabets";
    }

    // Validate Stock Name
    if (!formData.Stock_Name) {
      newErrors.Stock_Name = "Stock name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.Stock_Name)) {
      newErrors.Stock_Name = "Stock name should contain only alphabets";
    }

    // Validate Quantity
    if (!formData.Stock_Quantity) {
      newErrors.Stock_Quantity = "Quantity is required";
    } else if (!/^[1-9][0-9]*$/.test(formData.Stock_Quantity)) {
      newErrors.Stock_Quantity = "Quantity should be a positive integer";
    }

    // Validate Price/Quantity
    if (!formData.Price) {
      newErrors.Price = "Price/quantity is required";
    } else if (!/^[1-9][0-9]*$/.test(formData.Price)) {
      newErrors.Price = "Price/quantity should be a positive integer";
    }

    // Validate Vendor
    if (!selectedVendor) {
      newErrors.Vendor_Name = "Vendor is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitformData = async (event) => {
    event.preventDefault();

    if (!isValidForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/api/inventory-stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert("Stock added successfully.");
        console.log("Stock added successfully.");
        // Reset formData and selectedVendor
        setFormData({
          Category: "",
          Stock_Name: "",
          Stock_Quantity: "",
          Price: "",
          Vendor_Id: "",
          Vendor_Name: "",
        });
        setSelectedVendor(""); // Clear selected vendor
      } else {
        window.alert("Failed to add stock.");
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      window.alert("Failed to add stock. Please try again later.");
    }
  };

  const handleEditProduct = (productData) => {
    setEditProductData(productData);
    setNewPrice(productData.Price);
    setNewQuantity(productData.Stock_Quantity.toString());
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Calculate the updated quantity by adding the new quantity to the existing quantity
      const updatedQuantity =
        editProductData.Stock_Quantity + parseInt(newQuantity);

      // Create the updated product object with new price and calculated quantity
      const updatedProduct = {
        ...editProductData,
        Price: newPrice,
        Stock_Quantity: updatedQuantity,
      };

      // Perform PATCH request to update the price and quantity
      const response = await fetch(
        `http://localhost:8888/api/inventory-stocks/${updatedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        window.alert("Price and quantity updated successfully");
        // TODO: Update your selectedProduct list or fetch it again from the server
      } else {
        window.alert("Failed to update price and quantity");
      }

      setShowEditModal(false);
      setEditProductData(null);
      setNewPrice("");
      setNewQuantity("");
    } catch (error) {
      console.error("Error updating price and quantity:", error);
      window.alert("Error updating price and quantity");
    }
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditProductData(null);
    setNewPrice("");
    setNewQuantity("");
  };
  

  return (
    <>
      <Header />

      {/* <div className='responsive-godown'> */}
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        {" "}
        <div className="md:h-[80vh] h-[80vh] md:w-[50%]">
          
          <h4 className="text-[30px] pl-[1em]">Add Stocks</h4>
          <Form onSubmit={handleSubmitformData}>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="Category">
                  <Form.Label>Product Category:<span className="text-danger">*</span></Form.Label>
                  <div className="relative">
                    <Form.Control
                      type="text"
                      placeholder="Product Category"
                      name="Category"
                      value={formData.Category}
                    onChange={handleInputChange}
                    isInvalid={!!errors.Category}
                      
                    />
                     <Form.Control.Feedback type="invalid">
                                 {errors.Category} {/* Display error message if Category is invalid */}
                           </Form.Control.Feedback>
                     
                  </div>
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="Stock_Name">
                  <Form.Label>Stock Name:<span className="text-danger">*</span></Form.Label>
                  <div className="relative">
                    <Form.Control
                      type="text"
                      placeholder="Stock Name"
                      name="Stock_Name"
                      value={formData.Stock_Name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.Stock_Name}
                       />
                       <Form.Control.Feedback type="invalid">
                        {errors.Stock_Name} {/* Display error message if Stock_Name is invalid */}
                         </Form.Control.Feedback>
                     
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="Stock_Quantity">
                  <Form.Label>Quantity:<span className="text-danger">*</span></Form.Label>
                  <div className="relative">
                    <Form.Control
                      type="number"
                      placeholder="Add Quantity"
                      name="Stock_Quantity"
                      value={formData.Stock_Quantity}
                    onChange={handleInputChange}
                    isInvalid={!!errors.Stock_Quantity}
                      
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.Stock_Quantity} {/* Display error message if Stock_Quantity is invalid */}
                   </Form.Control.Feedback>
                     
                  </div>
                </Form.Group>
              </div>
              <div className="col px-5">
                <Form.Group controlId="Price">
                  <Form.Label>Price/Quantity:<span className="text-danger">*</span></Form.Label>
                  <div className="relative">
                    <Form.Control
                      type="number"
                      placeholder="Price/Quantity"
                      name="Price"
                      value={formData.Price}
                    onChange={handleInputChange}
                    isInvalid={!!errors.Price}
                    />
                       <Form.Control.Feedback type="invalid">
    {errors.Price} {/* Display error message if Price is invalid */}
  </Form.Control.Feedback>

                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col px-5">
                <Form.Group controlId="SelectVendor">
                  <Form.Label>
                    View Vendors : <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="relative">
                    <Form.Select
                      className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                      aria-label="Select Vendor"
                      name="vendor"
                      value={selectedVendor}
                    onChange={handleVendorChange}
                    isInvalid={!!errors.Vendor_Name}
                    >
                     
                      <option value="">Select Vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor._id} value={vendor.Vendor_Name}>
                          {vendor.Vendor_Name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                     {errors.Vendor_Name} {/* Display error message if Vendor_Name is invalid */}
                     </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="col py-2">
              <Button type="submit" variant="info" className="manager-btn ms-4">
                Add Stock
              </Button>
            </div>
          </Form>
          <hr />

          <div className="inventory">
            <h4 className="mt-3 text-[30px] pl-[1em]">
              Godown Inventory By Product
            </h4>
            <div className="col px-5">
              <div className="form-group">
                <Form.Group controlId="SelectClient">
                  <Form.Label>Select Product:</Form.Label>
                  <div className="relative">
                    <Form.Select
                      className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-2xl  focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
                      aria-label="Select Client"
                      name="name"
                      style={{ marginBottom: "70px" }}
                      onChange={handleSelecteChange}
                    >
                      <option>Select Product</option>
                      {product.map((product, index) => (
                        <option key={index} value={product.Stock_Name}>
                          {product.Stock_Name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>
            </div>
            {selectedProduct && (
              <Table
                striped
                bordered
                hover
                style={{ width: "100%" }}
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
                  <Modal show={showEditModal} onHide={handleCloseEdit} className="model-container-godowns">
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
                            <label htmlFor="stockQuantity">
                              Stock Quantity:
                            </label>
                            <input
                              id="stockQuantity"
                              type="number"
                              value={newQuantity}
                              onChange={(e) => setNewQuantity(e.target.value)}
                              style={{ borderRadius: "7px" }}
                            />
                          </div>
                        )}
                      </div>
                    </Modal.Body>

                    <Modal.Footer>
                    <button
        className="button-godown button-cancel"
        onClick={handleCloseEdit}
      >
        Cancel
      </button>
      <button
        className="button-godown button-save"
        onClick={handleSaveEdit}
      >
        Save
      </button>
                    </Modal.Footer>
                  </Modal>
                )}
              </Table>
            )}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default NewGodowns;