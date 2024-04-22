import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";

const ViewTaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch task data from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/executivetask");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h1>View Tasks</h1>
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.Task}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {task.Date}
                    <br />
                    <strong>Time:</strong> {task.Time}
                    <br />
                    <strong>Status:</strong> {task.Status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewTaskPage;
