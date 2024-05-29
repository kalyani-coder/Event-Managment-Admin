import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaUser, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import ApexCharts from "apexcharts/dist/apexcharts";
import Header from "./../Sidebar/Header";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch updated tasks from the API
    fetch("https://node-backend.macj-abuyerschoice.com/api/executivetask")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));

    // Fetch events data from the API
    fetch("https://node-backend.macj-abuyerschoice.com/api/enquiry")
      .then((response) => response.json())
      .then((data) => {
        // Filter events with status 'Conform' or 'Hot'
        const filteredEvents = data.filter(
          (event) => event.status === "Conform" || event.status === "Hot"
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

  return (
    <>
      <Header />

      <div className="w-full  h-screen  flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="row container-dashboard md:h-[80vh] h-[80vh]">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow custom-card">
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <FaUser
                        className="icon user-icon mb-2"
                        style={{ fontSize: "2rem" }}
                      />{" "}
                      Enquiry | Today
                    </h5>
                    <p
                      className="card-text mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      145
                    </p>
                    <p
                      className="card-text text-success"
                      style={{ fontSize: "1.2rem" }}
                    >
                      12% increase
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow custom-card">
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <FaCalendarAlt
                        className="icon calendar-icon mb-2"
                        style={{ fontSize: "2rem" }}
                      />{" "}
                      Events | Today
                    </h5>
                    <p
                      className="card-text mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      145
                    </p>
                    <p
                      className="card-text text-success"
                      style={{ fontSize: "1.2rem" }}
                    >
                      12% increase
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow custom-card">
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <FaShoppingCart
                        className="icon cart-icon mb-2"
                        style={{ fontSize: "2rem" }}
                      />{" "}
                      Order | Today
                    </h5>
                    <p
                      className="card-text mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      145
                    </p>
                    <p
                      className="card-text text-success"
                      style={{ fontSize: "1.2rem" }}
                    >
                      12% increase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8  ">
            <div className="activity-card overflow-y-auto h-[23.3em] rounded ">
              <h2 className="activity-title font-bold ">Enquiry</h2>
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
                          className={`badge bg-${
                            event.status === "Conform" ? "success" : "danger"
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
