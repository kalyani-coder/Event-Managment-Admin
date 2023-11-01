import React, { useState, useEffect } from 'react';

const AttendancePage = () => {
    const [executives, setExecutives] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        // Fetch executive data when the component mounts
        const fetchExecutiveData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/executive');
                const data = await response.json();

                // Initialize attendanceData with default values
                const initialAttendanceData = data.map(item => ({ name: `${item.fname} ${item.lname}`, id: item.id, present: '' }));
                setAttendanceData(initialAttendanceData);

                setExecutives(data);
            } catch (error) {
                console.error('Error fetching executive data:', error);
            }
        };

        fetchExecutiveData();
    }, []);

    const handleStatusChange = (id, status) => {
        // Update the attendanceData array based on dropdown selection
        setAttendanceData((prevAttendanceData) =>
            prevAttendanceData.map((item) =>
                item.id === id ? { ...item, present: status } : item
            )
        );
    };

    console.log('Updated Attendance Data:', attendanceData);

    const handleSubmit = async () => {
        try {
            // Create a new FormData instance
            const formData = new FormData();

            // Append data to FormData
            attendanceData.forEach(({ date, name, id, present }) => {
                formData.append('name', name);
                formData.append('date', date);
                formData.append('id', id);
                formData.append('present', present);
            });
            console.log("all data" , formData)
            
            
            
            
            // Append additional fields if needed
            formData.append('date', 'your_date_value'); // Example: You can replace 'your_date_value' with the actual date value
            // Make a POST request to the API endpoint
            const response = await fetch('http://localhost:5000/api/attendance/:date/:id/:true', {
                method: 'POST',
                body: formData,
            });
            console.log('Response:', response);
           
            // const responseData = await response.json();
            // console.log('Response Data:', responseData);
            if (response.ok) {
                console.log('Attendance data successfully submitted.');
                // You can perform additional actions here if needed
            } else {
                console.error('Failed to submit attendance data.');
            }
        } catch (error) {
            console.error('Error submitting attendance data:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-between'>
                <h1>Attendance Page</h1>
                <div></div>
                <div>
                    <input type='date' placeholder='Date'></input>
                </div>
            </div>
            <form>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {executives.map((executive) => (
                            <tr key={executive.id}>
                                <td>{executive.fname} {executive.lname}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleStatusChange(executive.id, e.target.value)}
                                        value={attendanceData.find(item => item.id === executive.id)?.present || ""}
                                    >
                                        <option value="" disabled>Select status</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AttendancePage;
