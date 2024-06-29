import React, { useState, useEffect } from "react";
import Header from "../Sidebar/Header";
import { Link } from 'react-router-dom';

const UpdateTaskPage = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Fetch managers from the API
    fetch("http://localhost:8888/api/addmanager")
      .then(response => response.json())
      .then(data => setManagers(data))
      .catch(error => console.error('Error fetching managers:', error));
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();

    // Find selected manager details
    const manager = managers.find(mgr => mgr._id === selectedManager);

    // Prepare data to be sent
    const taskData = {
      manager_Id: manager._id,
      manager_Name: `${manager.fname} ${manager.lname}`,
      task: task,
      date: date,
      time: time
    };

    // Post data to the API
    fetch("http://localhost:8888/api/managertask", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
      alert("Task Updated Successfully")
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 md:w-96 min-w-8 mx-4">
          <div className="flex">
            <Link to={'/updatetask'}>
              <button className="btn btn-primary mr-4 mb-4">Update Task</button>
            </Link>
            <Link to={'/viewtask'}>
              <button className="btn btn-primary mr-4 mb-4">View Update Tasks</button>
            </Link>
          </div>
          <h1 className="text-[30px]">Update Task</h1>
          <form onSubmit={handleSubmit} id="updateTaskForm">
            <div className="mb-3">
              <label htmlFor="Task" className="form-label">Task</label>
              <input
                type="text"
                className="form-control"
                id="Task"
                name="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                id="time"
                name="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="manager" className="form-label">Manager</label>
              <select
                className="form-select rounded-2xl"
                id="manager"
                name="Manager"
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
              >
                <option value="" disabled>Select a manager</option>
                {managers.map((manager) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.fname} {manager.lname}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="manager-btn ms-1">Update Task</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskPage;
