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
                const initialAttendanceData = data.map(item => ({ id: item.id, status: 'absent' }));
                setAttendanceData(initialAttendanceData);

                setExecutives(data);
            } catch (error) {
                console.error('Error fetching executive data:', error);
            }
        };

        fetchExecutiveData();
    }, []);

    const handleCheckboxChange = (id, status) => {
        // Update the attendanceData state based on checkbox changes
        const updatedAttendanceData = attendanceData.map(item =>
            item.id === id ? { ...item, status } : item
        );

        setAttendanceData(updatedAttendanceData);
    };

    const handleSubmit = async () => {
        // You can send the attendanceData to your server for further processing
        console.log('Attendance Data:', attendanceData);
    };

    return (
        <div className='container mt-5'>
            <h1>Attendance Page</h1>
            <form>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Present</th>
                            <th>Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {executives.map(executive => (
                            <tr key={executive.id}>
                                <td>{executive.fname} {executive.lname}</td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            style={{ width: "50px", height: "30px" }}

                                        />
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            style={{ width: "50px", height: "30px" }}
                                        />
                                    </label>
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
