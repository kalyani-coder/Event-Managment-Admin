import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "../../Sidebar/Header";
import "./ViewEnquiry.css";
import axios from "axios";

const ViewInquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQutation, setShowQutationModal] = useState(false);
  const [quotationData, setQuotationData] = useState(null);
  const [editedQuotationData, setEditedQuotationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve manager ID from localStorage
        const managerId = localStorage.getItem("managerId");
        // console.log("ManagerID", managerId);

        // Fetch inquiries based on manager ID
        const response = await fetch(
          `http://localhost:8888/api/enquiry/${managerId}`
        );
        const data = await response.json();

        // Sort inquiries based on event date in descending order
        const sortedInquiries = data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );

        setInquiries(sortedInquiries);
        setFilteredInquiries(sortedInquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchQuotationData = async () => {
  //     if (selectedInquiry) {
  //       console.log(
  //         "Fetching",
  //         `http://localhost:8888/api/quotationinfo/customer/${selectedInquiry._id}`
  //       );
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8888/api/quotationinfo/customer/${selectedInquiry._id}`
  //         );
  //         setQuotationData(response.data);
  //         console.log("Fetched Quotation Data:", response.data);
  //       } catch (error) {
  //         console.error("Error fetching quotation data:", error);
  //       }
  //     }
  //   };

  //   fetchQuotationData();
  // }, [selectedInquiry]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterData();
  };

  const handleStartDateChange = (event) => {
    setDateRange({ ...dateRange, startDate: event.target.value });
    filterData();
  };

  const handleEndDateChange = (event) => {
    setDateRange({ ...dateRange, endDate: event.target.value });
    filterData();
  };

  const filterData = () => {
    let filtered = inquiries.filter((enquiry) => {
      const eventName = enquiry.event_name
        ? enquiry.event_name.toLowerCase()
        : "";
      const companyName = enquiry.company_name
        ? enquiry.company_name.toLowerCase()
        : "";
      const customerName = enquiry.customer_name
        ? enquiry.customer_name.toLowerCase()
        : "";

      return (
        eventName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        customerName.includes(searchTerm.toLowerCase())
      );
    });

    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((enquiry) => {
        const eventDate = new Date(enquiry.event_date);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    setFilteredInquiries(filtered);
  };

  const clearFilters = () => {
    setFilteredInquiries(inquiries);
    setSearchTerm("");
    setDateRange({ startDate: "", endDate: "" });
  };

  const openPopup = (enquiry) => {
    setSelectedInquiry(enquiry);
    setShowModal(true);
  };

  const openPopupQutation = async (enquiry) => {
    console.log("enquiry", enquiry);
    if (!enquiry || !enquiry._id) {
      console.error("Invalid enquiry object:", enquiry);
      return;
    }

    setSelectedInquiry(enquiry);

    try {
      const response = await axios.get(
        `http://localhost:8888/api/quotationinfo/customer/${enquiry._id}`
      );
      setQuotationData(response.data);
      // console.log("Fetched Quotation Data:", response.data);
    } catch (error) {
      console.error("Error fetching quotation data:", error);
    }

    try {
      const response = await axios.get(
        `http://localhost:8888/api/customerquotationinfo/customer/${enquiry._id}`
      );
      setEditedQuotationData(response.data);
      console.log("Fetched Quotation Data:", response.data);
    } catch (error) {
      console.error("Error fetching quotation data:", error);
    }
    setShowQutationModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
    setSelectedInquiry(null);
    setShowQutationModal(false);
  };
  const stockId = "666832617bac8483195abbc8";
  const url = `http://localhost:8888/api/customerquotationinfo/stock/${stockId}`;

  axios
    .get(url)
    .then((response) => {
      console.log("Fetched Stock Data:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching stock data:", error);
    });

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="flex">
            <Link to={"/quotation"}>
              <button className="btn btn-primary mr-4 mb-4">
                View Enquiry
              </button>
            </Link>
            <Link to={"/followupstatus"}>
              <button className="btn btn-primary mr-4 mb-4">
                FollowUp Status
              </button>
            </Link>
            <Link to={"/addnewevent"}>
              <button className="btn btn-primary mr-4 mb-4">Add Event</button>
            </Link>
          </div>
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search Event or customer"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <label>Start Date:</label>{" "}
            <input
              type="date"
              value={dateRange.startDate}
              onChange={handleStartDateChange}
            />
            <label>End Date:</label>{" "}
            <input
              type="date"
              value={dateRange.endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[30px]">View Enquiry</h2>
          </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0 ">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Action</th>
                  <th scope="col">Internal Costing</th>
                  <th scope="col"> Quotation</th>
                  <th scope="col">View Quotation</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {filteredInquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.event_name}</td>
                    <td>
                      {enquiry.event_date
                        ? format(new Date(enquiry.event_date), "dd/MM/yyyy")
                        : ""}
                    </td>
                    <td>{enquiry.customer_name}</td>
                    <td>{enquiry.contact}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => openPopup(enquiry)}
                      >
                        View More
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate("/internalcosting", {
                            state: { enquiry: enquiry },
                          })
                        }
                      >
                        Internal Costing
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate("/quotationform", {
                            state: { enquiry: enquiry },
                          })
                        }
                      >
                        Quotation
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary ml-4"
                        onClick={() => openPopupQutation(enquiry)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {selectedInquiry && (
              <Modal
                show={showModal}
                onHide={closePopup}
                dialogClassName="modal-dialog-centered modal-dialog-responsive "
              >
                <Modal.Header closeButton>
                  <Modal.Title>Inquiry Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedInquiry && (
                    <div>
                      <h2>{selectedInquiry.title}</h2>
                      <p style={{ lineHeight: "35px" }}>
                        Event Name: {selectedInquiry.event_name || ""}
                        <br />
                        Event Date:{" "}
                        {selectedInquiry.event_date
                          ? format(
                              new Date(selectedInquiry.event_date),
                              "dd/MM/yyyy"
                            )
                          : ""}
                        <br />
                        Number of Estimated Guests:{" "}
                        {selectedInquiry.guest_quantity}
                        <br />
                        Event Venue: {selectedInquiry.event_venue}
                        <br />
                        {/* Event Requirement: {selectedInquiry.event_requirement} */}
                        {/* <br /> */}
                        Customer Name: {selectedInquiry.customer_name}
                        <br />
                        Customer Email: {selectedInquiry.email}
                        <br />
                        Contact Number: {selectedInquiry.contact}
                        <br />
                        Customer Address: {selectedInquiry.address}
                      </p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closePopup}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
          <div style={{ backgroundColor: "white" }}>
            {quotationData && (
              <Modal
                show={showQutation}
                onHide={closePopup}
                dialogClassName="modal-dialog-centered modal-dialog-responsive "
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title>Quotations</Modal.Title> */}
                </Modal.Header>
                <div style={{ display: "flex" }}>
                  <div>
                    <Modal.Body style={{ overflowY: "auto" }}>
                      {quotationData && selectedInquiry ? (
                        <div className="card">
                          <div className="card-body">
                            <div style={{ marginBottom: "20px" }}>
                              <div>
                                <strong>Client Name:</strong>{" "}
                                {selectedInquiry.customer_name}
                              </div>
                              <div>
                                <strong>Address:</strong>{" "}
                                {selectedInquiry.address}
                              </div>
                              <div>
                                <strong>Date:</strong>{" "}
                                {selectedInquiry.event_date}
                              </div>
                              <div>
                                <strong>Venue:</strong>{" "}
                                {selectedInquiry.event_venue}
                              </div>
                              <div>
                                <strong>State:</strong> {selectedInquiry.state}
                              </div>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Sr.No.</th>
                                    <th>Perticular</th>
                                    {/* <th>Description</th> */}
                                    <th>Per</th>
                                    <th>Unit</th>
                                    <th>Rate</th>
                                    <th>Days</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {quotationData.requirements.map(
                                    (req, index) => (
                                      <tr key={req._id}>
                                        <td>{index + 1}</td>
                                        <td>{req.stockName}</td>
                                        {/* <td>{req.description}</td> */}
                                        <td>{req.purchaseQuantity}</td>
                                        <td>{req.unit}</td>
                                        <td>{req.rate_per_days}</td>
                                        <td>{req.days}</td>
                                        <td>{req.price} Rs</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div>
                              <strong>Transport:</strong>{" "}
                              {quotationData.transport}
                            </div>
                            <div>
                              <strong>Transport Amount:</strong>{" "}
                              {quotationData.transport_amount}
                            </div>
                            <div>
                              <strong>Description:</strong>{" "}
                              {quotationData.description}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                              <div>
                                <strong>Sub Total:</strong>{" "}
                                {quotationData
                                  ? quotationData.sub_total
                                  : "Loading..."}
                              </div>
                              {selectedInquiry.state === "Maharashtra" ? (
                                <>
                                  <div>
                                    <strong> CGST:</strong> 9 %
                                  </div>
                                  <div>
                                    <strong> SGST:</strong> 9 %
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <strong> IGST:</strong> 18 %
                                </div>
                              )}
                              <div>
                                <strong>Grand Total:</strong>{" "}
                                {quotationData.grand_total}
                              </div>
                              <div>
                                <strong>Total Amount:</strong>{" "}
                                {quotationData.Total_Amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </Modal.Body>
                  </div>
                  <div>
                    <Modal.Body style={{ overflowY: "auto" }}>
                      {editedQuotationData && selectedInquiry ? (
                        <div className="card">
                          <div className="card-body">
                            <div style={{ marginBottom: "20px" }}>
                              <div>
                                <strong>Client Name:</strong>{" "}
                                {selectedInquiry.customer_name}
                              </div>
                              <div>
                                <strong>Address:</strong>{" "}
                                {selectedInquiry.address}
                              </div>
                              <div>
                                <strong>Date:</strong>{" "}
                                {selectedInquiry.event_date}
                              </div>
                              <div>
                                <strong>Venue:</strong>{" "}
                                {selectedInquiry.event_venue}
                              </div>
                              <div>
                                <strong>State:</strong> {selectedInquiry.state}
                              </div>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Sr.No.</th>
                                    <th>Perticular</th>
                                    {/* <th>Description</th> */}
                                    <th>Per</th>
                                    <th>Unit</th>
                                    <th>Rate</th>
                                    <th>Days</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {quotationData.requirements.map(
                                    (req, index) => (
                                      <tr key={req._id}>
                                        <td>{index + 1}</td>
                                        <td>{req.stockName}</td>
                                        {/* <td>{req.description}</td> */}
                                        <td>{req.purchaseQuantity}</td>
                                        <td>{req.unit}</td>
                                        <td>{req.rate_per_days}</td>
                                        <td>{req.days}</td>
                                        <td>{req.price} Rs</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div>
                              <strong>Transport:</strong>{" "}
                              {editedQuotationData.transport}
                            </div>
                            <div>
                              <strong>Transport Amount:</strong>{" "}
                              {editedQuotationData.transport_amount}
                            </div>
                            <div>
                              <strong>Description:</strong>{" "}
                              {editedQuotationData.description}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                              <div>
                                <strong>Sub Total:</strong>{" "}
                                {quotationData
                                  ? editedQuotationData.sub_total
                                  : "Loading..."}
                              </div>
                              {selectedInquiry.state === "Maharashtra" ? (
                                <>
                                  <div>
                                    <strong> CGST:</strong> 9 %
                                  </div>
                                  <div>
                                    <strong> SGST:</strong> 9 %
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <strong> IGST:</strong> 18 %
                                </div>
                              )}
                              <div>
                                <strong>Grand Total:</strong>{" "}
                                {editedQuotationData.grand_total}
                              </div>
                              <div>
                                <strong>Total Amount:</strong>{" "}
                                {editedQuotationData.Total_Amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </Modal.Body>
                  </div>
                </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closePopup}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInquiryPage;
