import React, { useState, useEffect } from 'react';

const UpdateTaskPage = () => {
    const getCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    };

    // Initial task data
    const initialTask = {
        Task: '',
        Date: getCurrentDate(),
        Time: getCurrentTime(),
        Status: 'Pending',
        Manager: '', // New field for manager selection
    };

    // State to hold the task data
    const [task, setTask] = useState(initialTask);
    // State to manage the display of the success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // State to hold the manager details
    const [managers, setManagers] = useState([]);
    // State to track if manager details are being fetched
    const [loadingManagers, setLoadingManagers] = useState(true);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the API endpoint
            const response = await fetch('http://localhost:5000/api/executivetask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send all task data to the API
                body: JSON.stringify(task),
            });

            if (response.ok) {
                console.log('Task successfully updated.');
                // Reset the form
                document.getElementById('updateTaskForm').reset();
                // Show the success message
                setShowSuccessMessage(true);
                // Hide the success message after 3 seconds (adjust as needed)
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            } else {
                console.error('Failed to update task.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Fetch manager details when the component mounts
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await fetch('https://eventmanagement-admin-hocm.onrender.com/api/managerdetails');
                const data = await response.json();
                setManagers(data);
                setLoadingManagers(false);
            } catch (error) {
                console.error('Error fetching manager details:', error);
                setLoadingManagers(false);
            }
        };

        fetchManagers();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Update Task</h1>
            <form onSubmit={handleSubmit} id="updateTaskForm">
                <div className="mb-3">
                    <label htmlFor="Task" className="form-label">
                        Task
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="Task"
                        name="Task"
                        value={task.Task}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Date" className="form-label">
                        Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="Date"
                        value={task.Date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                        Time
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        name="Time"
                        value={task.Time}
                        onChange={handleInputChange}
                    />
                </div>
          
                <div className="mb-3">
                    <label htmlFor="manager" className="form-label">
                        Manager
                    </label>
                    <select
                        className="form-select"
                        id="manager"
                        name="Manager"
                        value={task.Manager}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Select a manager</option>
                        {loadingManagers ? (
                            <option value="" disabled>Loading managers...</option>
                        ) : (
                            managers.map((manager) => (
                                <option key={manager.id} value={manager.id}>
                                    {manager.fname} {manager.lname}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Task
                </button>
            </form>
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Task successfully updated!
                </div>
            )}
        </div>
    );
};

export default UpdateTaskPage;
