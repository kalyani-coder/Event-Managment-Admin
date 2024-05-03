import React, { useState } from "react";
import Header from "../../components/Sidebar/Header";

const EventCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newVendor, setNewVendor] = useState("");
  const [newRate, setNewRate] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      // Generate a unique ID for the category (you might want to use a library for this)
      const categoryId = categories.length + 1;

      // Create a new category object
      const newCategoryObject = {
        id: categoryId,
        name: newCategory.trim(),
        vendor: newVendor.trim(),
        rate: newRate.trim(),
      };

      // Update the state with the new category
      setCategories([...categories, newCategoryObject]);

      // Clear the form fields
      setNewCategory("");
      setNewVendor("");
      setNewRate("");
    }
  };

  return (
    <>
      <Header />

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
            <input
              type="text"
              className="form-control"
              value={newVendor}
              onChange={(e) => setNewVendor(e.target.value)}
              placeholder="Enter vendor name"
            />
            <input
              type="text"
              className="form-control"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              placeholder="Enter rate"
            />
            <button className="btn btn-primary" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </div>

        <div>
          <h3>Existing Categories</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Vendor</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.vendor}</td>
                  <td>{category.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventCategoryPage;
