import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Header from "../Sidebar/Header";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./FollowUpStatus.css";

const FollowUpStatus = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [enquiryId, setEnquiryId] = useState("");
  const [hotInputValue, setHotInputValue] = useState("");
  const [checkBoxValues, setCheckBoxValues] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerId = localStorage.getItem("managerId");
        if (!managerId) {
          console.error("Manager ID not found");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/enquiry/${managerId}`);
        const data = response.data;

        const sortedInquiries = data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );
        if (sortedInquiries.length > 0) {
          setEnquiryId(sortedInquiries[0]._id);
        }

        setInquiries(sortedInquiries);
        setFilteredInquiries(sortedInquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckBoxChange = (event) => {
    const { id, checked } = event.target;
    setCheckBoxValues((prevCheckBoxValues) => ({
      ...prevCheckBoxValues,
      [id]: checked
    }));
  };

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
      const eventName = enquiry.event_name ? enquiry.event_name.toLowerCase() : "";
      const companyName = enquiry.company_name ? enquiry.company_name.toLowerCase() : "";
      const customerName = enquiry.customer_name ? enquiry.customer_name.toLowerCase() : "";

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

  const handleShowModal = (enquiryId) => {
    setEnquiryId(enquiryId);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleStatusChange = (event) => setSelectedStatus(event.target.value);

  const handleHotInputChange = (event) => {
    setHotInputValue(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      if (!enquiryId) {
        console.error("No Enquiry ID available");
        return;
      }
  
      let requestBody = { status: selectedStatus };
  
      if (selectedStatus === "Hot") {
        requestBody.hot_input_value = hotInputValue;
        requestBody.checkbox_values = checkBoxValues;
      }
  
      const response = await axios.patch(
        `http://localhost:5000/api/enquiry/${enquiryId}`,
        requestBody
      );
  
      console.log("Status updated successfully:", response.data);
  
      alert("Status updated successfully!");
  
      if (selectedStatus === "Confirm") {
        // Navigate only if the selected status is "Confirm"
        navigate('/advpaymentcus');
      }
  
      setShowModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "text-yellow";
      case "Hot":
        return "text-red";
      case "Confirm":
        return "text-green";
      default:
        return ""; // default color
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
       
        <div className="flex">
          <Link to={'/quotation'}>
          <button className="btn btn-primary mr-4 mb-4">View Enquiry</button>
          </Link>
          <Link to={'/followupstatus'}>
          <button className="btn btn-primary mr-4 mb-4">FollowUp Status</button>
          </Link>
          <Link to={'/addnewevent'}>
          <button className="btn btn-primary mr-4 mb-4">Add Event</button>
          </Link>
        </div>
        <div className="filter-container">
          <input type="text" placeholder="Search Order" value={searchTerm} onChange={handleSearchInputChange} />
          <input type="date" value={dateRange.startDate} onChange={handleStartDateChange} />
          <input type="date" value={dateRange.endDate} onChange={handleEndDateChange} />
        </div>
          <h2 className="text-[30px]">Follow Up Status</h2>
          <div className="table-responsive w-[105%] md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0 ">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col"> Name</th>
                  <th scope="col"> Number</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                  
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                {filteredInquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.event_name || ""}</td>
                    <td>
                      {enquiry.event_date
                        ? format(new Date(enquiry.event_date), "dd/MM/yyyy")
                        : ""}
                    </td>
                    <td>{enquiry.customer_name}</td>
                    <td>{enquiry.contact}</td>
                    <td className={`fw-bold ${getStatusColor(enquiry.status)}`}>
                      {enquiry.status}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleShowModal(enquiry._id)}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              dialogClassName="modal-dialog-centered modal-dialog-responsive"
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="statusOptions"
                    id="statusOngoing"
                    value="Ongoing"
                    checked={selectedStatus === "Ongoing"}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="statusOngoing">
                    Ongoing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="statusOptions"
                    id="statusHot"
                    value="Hot"
                    checked={selectedStatus === "Hot"}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="statusHot">
                    Work Not Received
                  </label>
                  {selectedStatus === "Hot" && (
                    <>
                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkbox1"
                          checked={checkBoxValues.checkbox1}
                          onChange={handleCheckBoxChange}
                        />
                        <label className="form-check-label" htmlFor="checkbox1">
                          No Follow-Up
                        </label>
                      </div>

                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkbox2"
                          checked={checkBoxValues.checkbox2}
                          onChange={handleCheckBoxChange}
                        />
                        <label className="form-check-label" htmlFor="checkbox2">
                          High Budget
                        </label>
                      </div>

                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkbox3"
                          checked={checkBoxValues.checkbox3}
                          onChange={handleCheckBoxChange}
                        />
                        <label className="form-check-label" htmlFor="checkbox3">
                          Checkbox 3
                        </label>
                      </div>

                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkbox4"
                          checked={checkBoxValues.checkbox4}
                          onChange={handleCheckBoxChange}
                        />
                        <label className="form-check-label" htmlFor="checkbox4">
                          Checkbox 4
                        </label>
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="hotInput">Other:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotInput"
                          placeholder="Enter other hot option"
                          value={hotInputValue}
                          onChange={handleHotInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="statusOptions"
                    id="statusConfirm"
                    value="Confirm"
                    checked={selectedStatus === "Confirm"}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="statusConfirm">
                    Confirm
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={handleUpdateStatus}
                >
                  Save
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowUpStatus;
