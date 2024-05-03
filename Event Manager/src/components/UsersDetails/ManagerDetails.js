import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";

const ManagerDetails = () => {
  const [managerData, setManagerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredManagerData, setFilteredManagerData] = useState([]);

  useEffect(() => {
    // Fetch manager data from the API
    axios
      .get("http://localhost:5000/api/addmanager")
      .then((response) => {
        setManagerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manager data:", error);
      });
  }, []);
  useEffect(() => {
    if (managerData.length > 0) {
      const filteredData = managerData.filter((manager) => {
        if (manager.fname && manager.lname) {
          if (
            manager.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            manager.lname.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return manager;
          }
        }
      });
      setFilteredManagerData(filteredData);
    }
  }, [searchQuery, managerData]);

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div>
            <h2 className="text-[35px]">Manager Details</h2>
            <div className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by first name or last name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 overflow-y-auto h-[70vh]  md:mt-0 w-full">
            {" "}
            {/* Bootstrap grid with 3 columns */}
            {filteredManagerData.length > 0 ? (
              filteredManagerData.map((manager) => (
                <div className="col mb-4">
                  {" "}
                  {/* Each card takes one column */}
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="">
                          <Card.Title>{`${manager.fname} ${manager.lname}`}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Contact Number: {manager.contact}
                          </Card.Subtitle>
                        </div>
                        <div className="">
                          <Link
                            to={{ pathname: `/manager/${manager._id}` }}
                            state={manager}
                            className="btn btn-info"
                          >
                            View more
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-centre">No manager details found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDetails;
