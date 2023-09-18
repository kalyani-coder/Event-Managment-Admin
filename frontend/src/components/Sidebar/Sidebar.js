import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar on mobile devices
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // State to store the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width state when the window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Show the toggle button on mobile devices (window width below 768 pixels)
  const showToggleButton = windowWidth < 988;

  return (
    <div>
      {/* Toggle button for mobile */}
      {showToggleButton && (
        <button
          onClick={toggleSidebar}
          className="btn btn-info"
          style={{ marginTop: 15, marginLeft: 15 }}
        >
          {" "}
          Open Sidebar
        </button>
      )}

      {/* Main Navigation */}
      <header>
        {/* Sidebar */}
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebar collapse bg-white ${isSidebarOpen ? "show" : "" // Show the sidebar if isSidebarOpen is true
            }`}
        >
          {/* Close button for mobile */}

          <div className="position-sticky">
            {isSidebarOpen && showToggleButton && (
              <button className="ml-2 btn btn-info" onClick={closeSidebar}>
                Close Sidebar
              </button>
            )}
            <div className="list-group list-group-flush mx-3 mt-4">
              {/* Collapse 1 */}

              <ul className="list-unstyled components">
                <li className="active">
                  <a
                    href="#AddUserSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Add Users
                  </a>
                  <ul className="collapse list-unstyled" id="AddUserSubMenu">
                    <li>
                      <Link to={"/addmanager"}>Add Manager</Link>
                    </li>
                    <li>
                      <Link to={"/addaccountant"}>Add Accountant</Link>
                    </li>
                    <li>
                      <Link to={"/addexecutive"}>Add Executive</Link>
                    </li>
                    <li>
                      <Link to={"/addvendor"}>Add Vendor</Link>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <a
                    href="#ViewDetailsSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    User Details
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="ViewDetailsSubMenu"
                  >
                    <li>
                      <Link to={"/managerdetails"}>Manager Details</Link>
                    </li>
                    <li>
                      <Link to={"/accountantdetails"}>Accountant Details</Link>
                    </li>

                    <li>
                      <Link to={"/executicedetails"}> Executive Details</Link>
                    </li>

                    <li>
                      <Link to={"/vendordetails"}> Vendor Details</Link>
                    </li>
                  </ul>
                </li>

                <li className="active">
                  <a
                    href="#EventSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Event management
                  </a>
                  <ul className="collapse list-unstyled" id="EventSubMenu">
                    <li>
                      <Link to={"/addenquiry"}>Add Enquiry</Link>
                    </li>
                    <li>
                      <Link to={"/quotation"}>Make Quotation</Link>
                    </li>
                    <li>
                      <Link to={"/addevent"}> Create Event</Link>
                    </li>
                    <li>
                      <Link to={"/viewevent"}> View Event</Link>
                    </li>
                  </ul>
                </li>

                <li className="active">
                  <a
                    href="#pageSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Vendor Payment
                  </a>
                  <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                      <a href="#">Add Vendor Payment</a>
                    </li>
                    <li>
                      <a href="#">View Vendor Payment Details</a>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <a
                    href="#SalarySubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Salary
                  </a>
                  <ul className="collapse list-unstyled" id="SalarySubMenu">
                    <li>
                      <Link to={"/addsalary"}>Add Salary</Link>
                    </li>
                    <li>
                      <Link to={"/viewsalary"}>View Salary</Link></li>

                  </ul>
                </li>
                <li>
                  <a href="#">Download Report</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
