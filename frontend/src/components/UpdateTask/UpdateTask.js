import React, { useState } from 'react';

const UpdateTaskPage = () => {
    // Initial task data
    const initialTask = {
        Task: '',
        Date: '',
        Time: '',
        Status: 'Pending',
    };

    // State to hold the task data
    const [task, setTask] = useState(initialTask);
    // State to manage the display of the success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        className="form-select"
                        id="status"
                        name="Status"
                        value={task.Status}
                        onChange={handleInputChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
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
