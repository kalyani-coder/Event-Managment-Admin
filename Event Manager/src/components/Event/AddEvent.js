import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Sidebar/Header";

function AddEvent() {
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  // State variables for form fields
  const [eventName, setEventName] = useState("");
  const [fname, setfname] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [event_type, setevent_type] = useState("Family Function");
  const [venue, setvenue] = useState("");
  const [subvenue, setsubvenue] = useState("");
  const [guest_number, setguest_number] = useState("");
  const [budget, setbudget] = useState("");
  const [event_date, setevent_date] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  // State for the search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // State for the selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  // Fetch customer names when the component mounts or when the search query changes
  useEffect(() => {
    const fetchCustomerNames = async () => {
      try {
        const response = await axios.get(
          `https://node-backend.macj-abuyerschoice.com/api/enquiry?customer_name=${searchQuery}`
        );

        // Extract customer details from the response
        const customers = response.data;
        setSearchResults(customers);
      } catch (error) {
        console.error("Error fetching customer names:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchCustomerNames();
    }

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    setCurrentDateTime(formattedDate);
  }, [searchQuery]);

  // Function to handle customer selection
  const handleCustomerSelect = (event) => {
    // Get the selected customer from the event
    const selectedCustomerId = event.target.value;
    const selectedCustomer = searchResults.find(
      (customer) => customer._id === selectedCustomerId
    );

    // Set the selected customer
    setSelectedCustomer(selectedCustomer);

    // Automatically fill in the form fields with the customer details
    setEventName(selectedCustomer?.event_name || "");
    setfname(selectedCustomer?.customer_name || "");
    // setcompany_name(selectedCustomer?.company_name || "");
    setemail(selectedCustomer?.email || "");
    setcontact(selectedCustomer?.contact || "");
    setevent_type(selectedCustomer?.event_type || "Family Function");
    setvenue(selectedCustomer?.event_venue || "");
    setsubvenue(selectedCustomer?.subvenue || "");
    setguest_number(selectedCustomer?.guest_quantity || "");
    // setbudget(selectedCustomer?.budget || "");
    setevent_date(selectedCustomer?.event_date || "");
    setCurrentTime(selectedCustomer?.currentTime || "");
  };

  // Function to handle saving the event data
  const handleSave = async () => {
    // Form data to be sent to the API
    const eventData = {
      eventName,
      fname,
      company_name,
      email,
      contact,
      event_type,
      venue,
      subvenue,
      guest_number,
      budget,
      event_date: getCurrentDate(),
      currentTime: getCurrentTime(),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        "https://node-backend.macj-abuyerschoice.com/api/event",
        eventData
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Event data posted successfully!");

        // If you want to navigate to another page after posting data, you can do it here.
        // For example:
        navigate("/advancepayment", { state: eventData });
      } else {
        console.error("Failed to post event data.");
      }
    } catch (error) {
      console.error("Error posting event data:", error);
    }

    // If a customer is selected, you can use the selectedCustomer data as needed
    if (selectedCustomer) {
      console.log("Selected Customer:", selectedCustomer);
    }

    navigate("/advancepayment", { state: eventData });
  };

  // JSX for the component
  return (
    <>
      <Header />
      <div
        className="w-full  h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] ">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card-body mt-5">
                <h2 className="text-[35px]">Create Event</h2>
                {/* Form fields */}
                <div className="form-group">
                  <label htmlFor="eventName">Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    id="eventName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fname">
                    Full Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                    required
                    id="fname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company_name">Company Name</label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Company Name"
                    value={company_name}
                    onChange={(e) => setcompany_name(e.target.value)}
                    id="company_name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">
                    Contact Number<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control "
                    placeholder="Enter Contact Number"
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                    required
                    id="contact"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="event_type">Event Type</label>
                  <select
                    value={event_type}
                    onChange={(e) => setevent_type(e.target.value)}
                    className="form-control"
                    id="event_type"
                  >
                    <option value="Family Function">Family Function</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="venue">Venue</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setvenue(e.target.value)}
                    className="form-control"
                    placeholder="Venue"
                    id="venue"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subvenue">Sub Venue</label>
                  <input
                    type="text"
                    value={subvenue}
                    onChange={(e) => setsubvenue(e.target.value)}
                    className="form-control"
                    placeholder="Sub Venue"
                    id="subvenue"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guest_number">
                    Estimate Number of Guests
                  </label>
                  <input
                    type="number"
                    value={guest_number}
                    onChange={(e) => setguest_number(e.target.value)}
                    className="form-control"
                    placeholder="Estimate Number of Guests"
                    id="guest_number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setbudget(e.target.value)}
                    className="form-control"
                    placeholder="Budget"
                    id="budget"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="event_date">Event Date</label>
                  <input
                    type="date"
                    value={event_date}
                    onChange={(e) => setevent_date(e.target.value)}
                    className="form-control"
                    placeholder="Event Date"
                    id="event_date"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentTime">Time</label>
                  <input
                    type="time"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(e.target.value)}
                    className="form-control"
                    placeholder="Time"
                    id="currentTime"
                  />
                </div>
                {/* Search box for customer names */}
                <div className="form-group">
                  <label htmlFor="customerNameSearch">
                    Search Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter customer name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="customerNameSearch"
                  />
                </div>

                {/* Dropdown for matching customer names */}
                <div className="form-group">
                  <label htmlFor="customerNameSelect">Select Customer</label>
                  <select
                    className="form-control"
                    id="customerNameSelect"
                    value={selectedCustomer?.id || ""}
                    onChange={handleCustomerSelect}
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {searchResults.map((customer) => (
                      <option key={customer.id} value={customer._id}>
                        {customer.customer_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons for saving and navigating */}
                <div className="d-flex justify-content-start">
                  <button
                    id="btn"
                    className="btn btn-info"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    id="btn"
                    className="btn btn-info mx-5"
                    onClick={handleSave}
                  >
                    Fill Advance Payment Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEvent;
