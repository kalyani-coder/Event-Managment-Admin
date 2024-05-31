import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaUser, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import ApexCharts from "apexcharts/dist/apexcharts";
import Header from "./../Sidebar/Header";
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch updated tasks from the API
    fetch("http://localhost:5000/api/executivetask")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));

    // Fetch events data from the API
    fetch("http://localhost:5000/api/enquiry")
      .then((response) => response.json())
      .then((data) => {
        // Filter events with status 'Conform' or 'Hot'
        const filteredEvents = data.filter(
          (event) => event.status === "Conform" || event.status === "Work Not Received"
        );
        setEvents(filteredEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Pie chart data
    const pieData = {
      labels: ["Red", "Blue", "Yellow"],
      series: [300, 50, 100],
    };

    // ApexCharts configuration for the Pie Chart
    const options = {
      chart: {
        type: "pie",
        height: 350,
      },
      labels: pieData.labels,
      series: pieData.series,
      legend: {
        horizontalAlign: "left",
      },
    };

    // Render the Pie Chart
    new ApexCharts(document.querySelector("#pieChart"), options).render();
  }, []);


  const [enquiryCount, setEnquiryCount] = useState(0);
  const [eventCount, setNewEvents] = useState(0)

  const fetchEnquiry = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enquiry');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEnquiryCount(data.length);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/event');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNewEvents(data.length);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };


  const pendingEnquiry = () => {
    try {

    } catch {

    }
  }

  const [pendingEnquiryCount, setPendingEnquiryCount] = useState(0);

  const fetchPendingEnquiry = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enquiry');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const pendingEnquiries = data.filter(enquiry => enquiry.status === 'pending');
      setPendingEnquiryCount(pendingEnquiries.length);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };
  useEffect(() => {
    fetchEnquiry();
    fetchEvents();
    fetchPendingEnquiry();
  }, []);

  return (
    <>
      <Header />

      <div className="w-full  h-screen  flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="row container-dashboard md:h-[80vh] h-[80vh]">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow custom-card">


                  <Link to="/quotation" className="dashboard">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        <FaUser
                          className="icon user-icon mb-2"
                          style={{ fontSize: "2rem" }}
                        />{" "}
                        Enquiry
                      </h5>
                      <p
                        className="card-text mb-0"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {enquiryCount}
                      </p>
                      <p
                        className="card-text text-success"
                        style={{ fontSize: "1.2rem" }}
                      >

                      </p>
                    </div>
                  </Link>

                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow custom-card">



                  <Link to={"/viewevent"} className="dashboard">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        <FaCalendarAlt
                          className="icon calendar-icon mb-2"
                          style={{ fontSize: "2rem" }}
                        />{" "}
                        Events
                      </h5>
                      <p
                        className="card-text mb-0"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {eventCount}
                      </p>
                      <p
                        className="card-text text-success"
                        style={{ fontSize: "1.2rem" }}
                      >

                      </p>
                    </div>
                  </Link>

                </div>
              </div>



              <div className="col-md-4">
                <div className="card shadow custom-card">

                <Link className="dashboard"> 
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <FaShoppingCart className="icon cart-icon mb-2" style={{ fontSize: "2rem" }} />{" "}

                    </h5>
                    <div className="d-flex justify-content-around">
                      <div className="flex-fill text-center">
                        <h4>Pending Enquiries</h4>
                        <p className="card-text mb-0" style={{ fontSize: '1.5rem' }}>
                          {pendingEnquiryCount}
                        </p>
                      </div>
                      {/* <div className="flex-fill text-center">
                        <h4>Pending Events</h4>
                        <p className="card-text mb-0" style={{ fontSize: '1.5rem' }}>
                          123
                        </p>
                      </div> */}
                    </div>
                  </div>

                  </Link>
                </div>
              </div>



            </div>
          </div>

          <div className="col-md-8  ">
            <div className="activity-card overflow-y-auto h-[23.3em] rounded ">
              <h2 className="activity-title font-bold mb-3">Enquiry</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Name</th>
                    <th>Event Venue</th>
                    {/* <th>Contact</th> */}
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td> {/* Serial number */}
                      <td>{event.event_name}</td>
                      <td>{event.event_date}</td>
                      <td>{event.customer_name}</td>
                      <td>{event.event_venue}</td>
                      {/* <td>{event.contact}</td> */}
                      <td className="text-center">
                        <span
                          className={`badge bg-${event.status === "Conform" ? "success" : "danger"
                            }`}
                        >
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4  mt-1">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Pie Chart</h5>
                <div id="pieChart"></div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-8">
            <div className="activity-card">
              <h2 className="activity-title">Updated Task</h2>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <span className={`activity-dot ${task.Status.toLowerCase()}-dot`}>●</span> {task.Task}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
