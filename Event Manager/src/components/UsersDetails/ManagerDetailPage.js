import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";

const ManagerDetailPage = () => {
  const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();

  const [manager, setManager] = useState(null);

  useEffect(() => {
    if (location.state) {
      console.log(location.state); // Log the data to see its structure
      setManager(location.state);
    }
  }, [location.state]);

  const handleEdit = () => {
    console.log("function is coming ");
  };

  const handleSalary = () => {
    navigate("/addsalary", { state: manager });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${manager?.fname} data?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8888/api/addmanager/${_id}`)
        .then(() => {
          console.log("Manager data deleted successfully");
          navigate("/managerdetails");
        })
        .catch((error) => {
          console.error("Error deleting manager data:", error);
        });
    }
  };

  if (!manager) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[50%]  min-w-3 px-3 ml-3  ">
          <h2 className="text-[35px]">
            {manager.fname} {manager.lname} Details
          </h2>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{`${manager.fname} ${manager.lname}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Contact Number: {manager.contact}
              </Card.Subtitle>
              <Card.Text>Address: {manager.address}</Card.Text>
              <Card.Text>Email: {manager.email}</Card.Text>
              <Card.Text>City: {manager.city}</Card.Text>
              <Card.Text>State: {manager?.state}</Card.Text>
              <div className="my-3">
                <hr />
                <h6 className="mb-3">Bank details:</h6>
                <Card.Text>
                  Account Holder Name: {manager.holder_name}
                </Card.Text>
                <Card.Text>Account Number: {manager.account_number}</Card.Text>
                <Card.Text>IFSC Code: {manager.IFSC_code}</Card.Text>
                <Card.Text>Bank Name: {manager.bank_name}</Card.Text>
                <Card.Text>Branch Name: {manager.branch_name}</Card.Text>
                <hr />
              </div>
              <div className="my-3 grid gap-1 md:flex">
                <Button variant="info" onClick={handleEdit}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button variant="info" className="mx-1" onClick={handleSalary}>
                  Add Salary
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManagerDetailPage;
