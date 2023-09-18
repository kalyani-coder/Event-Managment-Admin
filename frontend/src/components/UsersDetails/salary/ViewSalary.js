import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewSalary = () => {
    // Define state variables to store salary data
    const [salaryData, setSalaryData] = useState([]);

    useEffect(() => {
        // Fetch salary data from your API endpoint
        axios
            .get("http://localhost:5000/api/staffsalary")
            .then((response) => {
                // Set the fetched data to the state variable
                setSalaryData(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching salary data:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h5 className="mb-3">View Salary</h5>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">Staff ID</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Salary</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Month</th>
                        <th className="text-center">Advance Payment</th>
                        <th className="text-center">Remaining Payment</th>
                        <th className="text-center">Incentive</th>
                        <th className="text-center">Deduct Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {salaryData.map((item) => (
                        <tr key={item.staff_id}>
                            <td className="text-center">{item.staff_id}</td>
                            <td className="text-center">{item.fname}</td>
                            <td className="text-center">{item.lname}</td>
                            <td className="text-center">{item.salary}</td>
                            <td className="text-center">{item.date}</td>
                            <td className="text-center">{item.month}</td>
                            <td className="text-center">{item.adv_payment}</td>
                            <td className="text-center">{item.rem_payment}</td>
                            <td className="text-center">{item.incentive}</td>
                            <td className="text-center">{item.deduct_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
};

export default ViewSalary;
