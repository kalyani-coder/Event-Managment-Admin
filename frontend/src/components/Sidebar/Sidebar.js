// Sidebar.js

import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faAddressBook,
  faCalendar,
  faMoneyBill,
  faHandHoldingUsd,
  faMoneyCheck,
  faClipboardList,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showToggleButton = windowWidth < 988;

  return (
    <div>
      {showToggleButton && (
        <button
          onClick={toggleSidebar}
          className="btn btn-info"
          style={{ marginTop: 15, marginLeft: 15 }}
        >
          Open Sidebar
        </button>
      )}

      <header>
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebar collapse bg-white ${isSidebarOpen ? "show" : ""}`}
        >
          <div className="position-sticky">
            {isSidebarOpen && showToggleButton && (
              <button className="ml-2 btn btn-info" onClick={closeSidebar}>
                Close Sidebar
              </button>
            )}
            <div className="list-group list-group-flush mx-3 mt-4">
              <ul className="list-unstyled components">
                <li className="active">
                  <a
                    href="#AddUserSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      style={{ marginRight: "10px", color: "#9b59b6" }}
                      size="lg" // Larger icon size
                    />
                    <span className="icon-text">Add Users</span>
                  </a>
                  <ul className="collapse list-unstyled" id="AddUserSubMenu">
                    <li>
                      <Link to={"/addmanager"}>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                          size="lg"
                        />
                        <span className="icon-text">Add Manager</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/addaccountant"}>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                          size="lg"
                        />
                        <span className="icon-text">Add Accountant</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/addexecutive"}>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                          size="lg"
                        />
                        <span className="icon-text">Add Executive</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/addvendor"}>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                          size="lg"
                        />
                        <span className="icon-text">Add Vendor</span>
                      </Link>
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
                    <FontAwesomeIcon icon={faAddressBook}
                      style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg" />
                    User Details
                  </a>
                  <ul className="collapse list-unstyled" id="ViewDetailsSubMenu">
                    <li>
                      <Link to={"/managerdetails"}>
                        <FontAwesomeIcon icon={faAddressBook}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Manager Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/accountantdetails"}>
                        <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Accountant Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/executicedetails"}>
                        <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Executive Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/vendordetails"}>
                        <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Vendor Details
                      </Link>
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
                    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg" />
                    Event management
                  </a>
                  <ul className="collapse list-unstyled" id="EventSubMenu">
                    <li>
                      <Link to={"/addenquiry"}>
                        <FontAwesomeIcon icon={faCalendar}
                          style={{ marginRight: "10px", color: "#fff" }}
                        />
                        Add Enquiry
                      </Link>
                    </li>
                    <li>
                      <Link to={"/quotation"}>
                        <FontAwesomeIcon icon={faClipboardList}
                          style={{ marginRight: "10px", color: "#fff" }} />
                        View Enquiry
                      </Link>
                    </li>
                    <li>
                      <Link to={"/quotation"}>
                        <FontAwesomeIcon icon={faMoneyCheck}
                          style={{ marginRight: "10px", color: "#fff" }} />
                        Make Quotation
                      </Link>
                    </li>
                    <li>
                      <Link to={"/addevent"}>
                        <FontAwesomeIcon icon={faCalendar}
                          style={{ marginRight: "10px", color: "#fff" }} />
                        Create Event
                      </Link>
                    </li>
                    <li>
                      <Link to={"/viewevent"}>
                        <FontAwesomeIcon icon={faCalendar}
                          style={{ marginRight: "10px", color: "#fff" }}
                        />
                        View Event
                      </Link>
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
                    <FontAwesomeIcon icon={faHandHoldingUsd}
                      style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg" />
                    Vendor Payment
                  </a>
                  <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                      <Link to={"/vendorpayment"}>
                        <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Add Vendor Payment
                      </Link>
                    </li>
                    <li>
                      <Link to={"/viewvendorpayment"}>
                        <FontAwesomeIcon icon={faMoneyBill}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        View Vendor Payment Details
                      </Link>
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
                    <FontAwesomeIcon icon={faMoneyCheck}
                      style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg"
                    />
                    Salary
                  </a>
                  <ul className="collapse list-unstyled" id="SalarySubMenu">
                    <li>
                      <Link to={"/addsalary"}>
                        <FontAwesomeIcon icon={faMoneyCheck}
                          style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Add Salary
                      </Link>
                    </li>
                    <li>
                      <Link to={"/viewsalary"}>
                        <FontAwesomeIcon icon={faMoneyCheck} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        View Salary
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="active">
                  <a
                    href="#InventorySubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg" />
                    Inventory Stock
                  </a>
                  <ul className="collapse list-unstyled" id="InventorySubMenu">
                    <li>
                      <Link to={"/addinventory"}>
                        <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        Add Inventory
                      </Link>
                    </li>
                    <li>
                      <Link to={"/viewinventory"}>
                        <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: "10px", color: "#fff" }} // Change color
                        />
                        View Inventory
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: "10px", color: "#9b59b6" }} // Change color
                      size="lg" />
                    Download Report
                  </a>
                </li>
                {/* Add similar customization for other menu items */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
