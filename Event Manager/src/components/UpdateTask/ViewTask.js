import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Link } from 'react-router-dom';

const ViewTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    // Fetch task data from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/managertask/manager/${managerId}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [managerId]);

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount  overflow-y-auto ">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-[80%] min-w-8 mx-4 ">
          <div className="flex">
            
            <Link to={'/viewtask'}>
              <button className="btn btn-primary mr-4 mb-4">View Update Tasks</button>
            </Link>
          </div>
          <h1 className="text-[30px]">View Tasks</h1>
          <div className="overflow-y-auto h-[70vh]  md:mt-0 w-full row">
            {tasks.map((task) => (
              <div key={task._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.task}</h5>
                    <p className="card-text">
                      <strong>Updated task:</strong> {task.manager_Name}
                      <br />
                      <strong>Date:</strong> {task.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTaskPage;
