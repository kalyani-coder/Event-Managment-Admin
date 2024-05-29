import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Master = () => {
  const [vendorName, setVendorName] = useState("");
  const [eventName, setEventName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchVendors();
    fetchEvents();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch("https://node-backend.macj-abuyerschoice.com/api/addvendor");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://node-backend.macj-abuyerschoice.com/api/addeventmaster");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://node-backend.macj-abuyerschoice.com/api/addvendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Vendor_Name: vendorName }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Vendor added successfully.");
        setAlertVariant("success");
        setVendorName("");
        fetchVendors();
      } else {
        setAlertMessage("Failed to add vendor.");
        setAlertVariant("danger");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      setAlertMessage("Failed to add vendor. Please try again later.");
      setAlertVariant("danger");
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
          `https://node-backend.macj-abuyerschoice.com/api/addvendor/${vendorId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAlertMessage("Vendor deleted successfully.");
          setAlertVariant("success");
          fetchVendors();
        } else {
          setAlertMessage("Failed to delete vendor.");
          setAlertVariant("danger");
        }
      } catch (error) {
        console.error("Error deleting vendor:", error);
        setAlertMessage("Failed to delete vendor. Please try again later.");
        setAlertVariant("danger");
      }
    }
  };

  const handleCloseVendorModal = () => {
    setShowVendorModal(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://node-backend.macj-abuyerschoice.com/api/addeventmaster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName }),
      });

      if (response.ok) {
        setAlertMessage("Event added successfully.");
        setAlertVariant("success");
        setEventName("");
        fetchEvents();
      } else {
        setAlertMessage("Failed to add event.");
        setAlertVariant("danger");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      setAlertMessage("Failed to add event. Please try again later.");
      setAlertVariant("danger");
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
          `https://node-backend.macj-abuyerschoice.com/api/addeventmaster/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAlertMessage("Event deleted successfully.");
          setAlertVariant("success");
          fetchEvents();
        } else {
          setAlertMessage("Failed to delete event.");
          setAlertVariant("danger");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        setAlertMessage("Failed to delete event. Please try again later.");
        setAlertVariant("danger");
      }
    }
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[30%] ">
          <h2 className="text-[35px] pl-[1em]">Master</h2>
          {alertMessage && (
            <div>
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </div>
          )}
          <div className="row mb-2">
            <div className="col px-5">
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
        </div>
      </div>
    </>
  );
};

export default Master;
