import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Master = () => {
  const [vendorName, setVendorName] = useState("");
  const [eventName, setEventName] = useState("");
  const [bankName, setBankName] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchVendors();
    fetchEvents();
    fetchBanks();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addvendor");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addeventmaster");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allbanks");
      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/addvendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Vendor_Name: vendorName }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Vendor added successfully.");
        
        setVendorName("");
        fetchVendors();
      } else {
        alert("Failed to add vendor.");
        
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("Failed to add vendor. Please try again later.");
      
    }
  };

  const handleViewVendors = () => {
    setShowVendorModal(true);
  };

  const handleDeleteVendor = async (vendorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/addvendor/${vendorId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Vendor deleted successfully.");
          
          fetchVendors();
        } else {
          alert("Failed to delete vendor.");
          
        }
      } catch (error) {
        console.error("Error deleting vendor:", error);
        alert("Failed to delete vendor. Please try again later.");
        
      }
    }
  };

  const handleCloseVendorModal = () => {
    setShowVendorModal(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/addeventmaster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName }),
      });

      if (response.ok) {
        alert("Event added successfully.");
        
        setEventName("");
        fetchEvents();
      } else {
        alert("Failed to add event.");
        
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again later.");
      
    }
  };

  const handleViewEvents = () => {
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/addeventmaster/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Event deleted successfully.");
          
          fetchEvents();
        } else {
          alert("Failed to delete event.");
          
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again later.");
        
      }
    }
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/allbanks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Bank_Name: bankName }),
      });

      if (response.ok) {
        alert("Bank added successfully.");
        
        setBankName("");
        fetchBanks();
      } else {
        alert("Failed to add bank.");
        
      }
    } catch (error) {
      console.error("Error adding bank:", error);
      alert("Failed to add bank. Please try again later.");
      
    }
  };

  const handleViewBanks = () => {
    setShowBankModal(true);
  };

  const handleDeleteBank = async (bankId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bank?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/allbanks/${bankId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Bank deleted successfully.");
          
          fetchBanks();
        } else {
          alert("Failed to delete bank.");
          
        }
      } catch (error) {
        console.error("Error deleting bank:", error);
        alert("Failed to delete bank. Please try again later.");
        
      }
    }
  };

  const handleCloseBankModal = () => {
    setShowBankModal(false);
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[30%]">
          <h2 className="text-[35px] pl-[1em]">Master</h2>
        
          <div className="row mb-2">
            <div className="col px-5">
              <Form>
                <Form.Group controlId="addvendor">
                  <div className="relative">
                    <label htmlFor="date">Add Vendors:</label>
                    <Form.Control
                      type="text"
                      placeholder="Add Vendor"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" mt-3 grid gap-2 md:flex">
                    <Button
                      className="manager-btn ms-1"
                      type="submit"
                      variant="info"
                      onClick={handleVendorSubmit}
                    >
                      Add Vendor
                    </Button>
                    <Button
                      className="manager-btn ms-1"
                      type="button"
                      variant="info"
                      onClick={handleViewVendors}
                    >
                      View Vendors
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <Modal show={showVendorModal} onHide={handleCloseVendorModal}>
            <Modal.Header closeButton style={{ marginTop: "30px" }}>
              <Modal.Title>Vendors List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Vendors Name</div>
                <div>Action</div>
              </div>
              {vendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div style={{ lineHeight: "45px" }}>{vendor.Vendor_Name}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteVendor(vendor._id)}
                    />
                  </div>
                </div>
              ))}
            </Modal.Body>
          </Modal>
          <div className="row mb-2">
            <div className="col px-5">
              <Form>
                <Form.Group controlId="event">
                  <div className="relative">
                    <label htmlFor="date">Add Events Name:</label>

                    <Form.Control
                      placeholder="Add Event Name Here..."
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" mt-3 grid gap-2 md:flex">
                    <Button
                      className="manager-btn ms-1"
                      type="submit"
                      variant="info"
                      onClick={handleEventSubmit}
                    >
                      Add Event
                    </Button>
                    <Button
                      className="manager-btn ms-1"
                      type="button"
                      variant="info"
                      onClick={handleViewEvents}
                    >
                      View Events
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <Modal show={showEventModal} onHide={handleCloseEventModal}>
            <Modal.Header closeButton style={{ marginTop: "30px" }}>
              <Modal.Title>Events List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Event Name</div>
                <div>Action</div>
              </div>
              {events.map((event) => (
                <div
                  key={event._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div style={{ lineHeight: "45px" }}>{event.eventName}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteEvent(event._id)}
                    />
                  </div>
                </div>
              ))}
            </Modal.Body>
          </Modal>

          <div className="row mb-2">
            <div className="col px-5">
              <Form>
                <Form.Group controlId="bank">
                  <div className="relative">
                    <label htmlFor="date">Add Banks Name:</label>
                    <Form.Control
                      placeholder="Add Bank Name Here..."
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" mt-3 grid gap-2 md:flex">
                    <Button
                      className="manager-btn ms-1"
                      type="submit"
                      variant="info"
                      onClick={handleBankSubmit}
                    >
                      Add Bank
                    </Button>
                    <Button
                      className="manager-btn ms-1"
                      type="button"
                      variant="info"
                      onClick={handleViewBanks}
                    >
                      View Banks
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <Modal show={showBankModal} onHide={handleCloseBankModal}>
            <Modal.Header closeButton style={{ marginTop: "30px" }}>
              <Modal.Title>Bank List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Bank Name</div>
                <div>Action</div>
              </div>
              {banks.map((bank) => (
                <div
                  key={bank._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div style={{ lineHeight: "45px" }}>{bank.Bank_Name}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteBank(bank._id)}
                    />
                  </div>
                </div>
              ))}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Master;
