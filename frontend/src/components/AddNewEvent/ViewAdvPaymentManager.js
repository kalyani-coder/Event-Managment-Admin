import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";
import { format } from "date-fns";
import "./AdvPaymentManager.css";
import { Link} from 'react-router-dom';

const ViewAdvPaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    axios
      .get("https://node-backend.macj-abuyerschoice.com/api/advpaymanager")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  }, []);

  const openPopup = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = payments.filter(payment => 
      (payment.manager_Name && payment.manager_Name.toLowerCase().includes(searchTermLower)) 
      // (payment.EventName && payment.EventName.toLowerCase().includes(searchTermLower)) ||
      // (payment.Date && payment.Date.toString().toLowerCase().includes(searchTermLower)) ||
      // (payment.description && payment.description.toLowerCase().includes(searchTermLower))
    );
    setPayments(filtered);
  };

  const handleDateRangeFilter = () => {
    // Define your date range filter logic here
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDateRange({ startDate: "", endDate: "" });
    // Refetch original payments data
    axios
      .get("https://node-backend.macj-abuyerschoice.com/api/advpaymanager")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  };
  
  const filteredPayments = payments.filter((payment) =>
    payment.manager_Name &&
    payment.manager_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
        <div className="flex">
            <Link to={'/advpaymentmanager'}>
              <button className="btn btn-primary mr-4 mb-4">Advance Payment Manager</button>
            </Link>
            <Link to={'/viewadvpaymentmanager'}>
              <button className="btn btn-primary mr-4 mb-4">View Advance Payment Manager</button>
            </Link>
            
          </div>
          <h2 className="text-[30px]">Advance Payment Manager Details</h2>
          <div className="d-flex flex-wrap align-items-center">
            <div className="w-full relative mb-3">
              <input
                type="text"
                placeholder="Search by Manager Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "8px 16px",
                  borderRadius: "0 5px 5px 0",
                  border: "1px solid #ccc",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="table-responsive w-[105%] md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0 ">
            <table className="table">
              <thead className=" sticky top-0 bg-white">
                <tr>
                  <th scope="col">Manager Name</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {filteredPayments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{payment.manager_Name}</td>
                    <td>{payment.EventName}</td>
                    <td>{formatDate(payment.Date)}</td>
                    <td>{payment.Bank_Name}</td>
                    <td>{payment.description}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => openPopup(payment)}
                      >
                        View More
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for payment details */}
          {selectedPayment && (
            <Modal
              show={showModal}
              onHide={closePopup}
              dialogClassName="modal-dialog-centered modal-dialog-responsive"
            >
              <Modal.Header closeButton>
                <Modal.Title>Payment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h2>{selectedPayment.EventName}</h2>
                  <p style={{ lineHeight: "35px" }}>
                    Manager Name: {selectedPayment.manager_Name}
                    <br />
                    Event Name: {selectedPayment.EventName || ""}
                    <br />
                    Date: {formatDate(selectedPayment.Date)}
                    <br />
                    Time: {selectedPayment.Time}
                    <br />
                    Bank Name: {selectedPayment.Bank_Name}
                    <br />
                    Paid Amount: {selectedPayment.paid_Amount}
                    <br />
                    Pending Amount: {selectedPayment.Pending_Amount}
                    <br />
                    Description: {selectedPayment.description}
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closePopup}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

// Function to format date
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

export default ViewAdvPaymentManager;
