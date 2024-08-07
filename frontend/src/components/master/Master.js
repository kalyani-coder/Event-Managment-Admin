import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Master = () => {
  const [vendorName, setVendorName] = useState("");
  const [eventName, setEventName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [venue, setVenue] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [banks, setBanks] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchVendors();
    fetchEvents();
    fetchBanks();
    fetchVenues();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/addvendor");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/addeventmaster");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/allbanks");
      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/venue");
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8888/api/addvendor", {
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
  const handleClose = () => {
    setShowVendorModal(false)
    setShowBankModal(false)
    setShowVenueModal(false)
    setShowEventModal(false)
  }

  const handleDeleteVendor = async (vendorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8888/api/addvendor/${vendorId}`,
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
      const response = await fetch("http://localhost:8888/api/addeventmaster", {
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
          `http://localhost:8888/api/addeventmaster/${eventId}`,
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

    if (!accountNumber || isNaN(accountNumber)) {
      alert("Please enter a valid account number.");
      return;
    }

    if (accountNumber.length > 17) {
      alert("Account number should be up to 17 digits.");
      return;
    }

    if (banks.some((bank) => bank.Account_Number === accountNumber)) {
      alert(
        "Account number already exists. Please enter a unique account number."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/api/allbanks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Bank_Name: bankName,
          Account_Number: accountNumber,
        }),
      });

      if (response.ok) {
        alert("Bank added successfully.");
        setBankName("");
        setAccountNumber("");
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
          `http://localhost:8888/api/allbanks/${bankId}`,
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

  const handleVenueSubmit = async (e) => {
    e.preventDefault();

    // Check if the venue name already exists
    if (venues.some((v) => v.venue === venue)) {
      alert("Venue name already exists. Please enter a unique venue name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/api/venue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ venue }),
      });

      if (response.ok) {
        alert("Venue added successfully.");
        setVenue("");
        fetchVenues();
      } else {
        alert("Failed to add venue.");
      }
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue. Please try again later.");
    }
  };
  const handleViewVenues = () => {
    setShowVenueModal(true);
  };

  const handleCloseVenueModal = () => {
    setShowVenueModal(false);
  };

  const handleDeleteVenue = async (venueId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8888/api/venue/${venueId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Venue deleted successfully.");
          fetchVenues();
        } else {
          alert("Failed to delete venue.");
        }
      } catch (error) {
        console.error("Error deleting venue:", error);
        alert("Failed to delete venue. Please try again later.");
      }
    }
  };
  const handleAlphaInputChange = (setter) => (event) => {
    const { value } = event.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setter(value);
    }
  };

  const handleNumericInputChange = (setter, maxLength) => (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setter(value);
    }
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
                      onChange={handleAlphaInputChange(setVendorName)}
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
          <Modal show={showVendorModal} onHide={handleCloseVendorModal} className="top-[10%]">
            <Modal.Header>
             
              <button className="header-close-button-popup" onClick={handleClose}>x</button>
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
                      onChange={handleAlphaInputChange(setEventName)}
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
          <Modal show={showEventModal} onHide={handleCloseEventModal} 
          className="top-[10%]">
            <Modal.Header>
              {" "}
              <button className="header-close-button-popup"onClick={handleClose}>x</button>
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
                      onChange={handleAlphaInputChange(setBankName)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="date">Add Account Number:</label>
                    <Form.Control
                      placeholder="Add Account Number Here..."
                      value={accountNumber}
                      onChange={handleNumericInputChange(setAccountNumber, 18)}
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
          <Modal
            show={showBankModal}
            onHide={handleCloseBankModal}
           
            className="top-[10%]"
          >
            <Modal.Header>
              {" "}
              <button className="header-close-button-popup"onClick={handleClose}>x</button>
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

          <div className="row mb-2">
            <div className="col px-5">
              <Form>
                <Form.Group controlId="venue">
                  <div className="relative">
                    <label htmlFor="date">Add Venue Name:</label>
                    <Form.Control
                      placeholder="Add Venue Name Here..."
                      value={venue}
                      onChange={handleAlphaInputChange(setVenue)}
                      required
                    />
                  </div>
                  <div className=" mt-3 grid gap-2 md:flex">
                    <Button
                      className="manager-btn ms-1"
                      type="submit"
                      variant="info"
                      onClick={handleVenueSubmit}
                    >
                      Add Venue
                    </Button>
                    <Button
                      className="manager-btn ms-1"
                      type="button"
                      variant="info"
                      onClick={handleViewVenues}
                    >
                      View Venues
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <Modal show={showVenueModal} 
          className="top-[10%]">
            <Modal.Header>
              {" "}
              <button className="header-close-button-popup"onClick={handleClose}>x</button>
              <Modal.Title>Venue List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Venue Name</div>
                <div>Action</div>
              </div>
              {venues.map((venue) => (
                <div
                  key={venue._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div style={{ lineHeight: "45px" }}>{venue.venue}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteVenue(venue._id)}
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
