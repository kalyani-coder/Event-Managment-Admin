import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Sidebar from "../Sidebar/Sidebar"

const VendorPaymentView = () => {
    const [vendorPayments, setVendorPayments] = useState([]);

    useEffect(() => {
        const fetchVendorPayments = async () => {
            try {
                const response = await axios.get('https://eventmanagement-admin-hocm.onrender.com/api/vendorpayment');
                setVendorPayments(response.data);
            } catch (error) {
                console.error('Error fetching vendor payments:', error);
            }
        };

        fetchVendorPayments();
    }, []);

    const downloadPDF = () => {
        const doc = new window.jspdf.jsPDF();
        doc.text('Vendor Payment Details', 20, 10);
        doc.autoTable({
            head: [['First Name', 'Date', 'Salary', 'Paid Amount', 'Remaining Amount', 'Description']],
            body: vendorPayments.map(payment => [payment.fname, payment.date, payment.salary, payment.paid_amt, payment.rem_amt, payment.description]),
        });
        doc.save('vendor_payments.pdf');
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(vendorPayments);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(data, 'vendor_payments.xlsx');
    };

    return (
        <>
        <Sidebar />
        <div className="container mt-5">
            <h2>Vendor Payment Details</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Date</th>
                        <th>Salary</th>
                        <th>Paid Amount</th>
                        <th>Remaining Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {vendorPayments.map((payment) => (
                        <tr key={payment._id}>
                            <td>{payment.fname}</td>
                            <td>{payment.date}</td>
                            <td>{payment.salary}</td>
                            <td>{payment.paid_amt}</td>
                            <td>{payment.rem_amt}</td>
                            <td>{payment.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-3">
                <button className="btn btn-primary" onClick={downloadPDF}>
                    Download PDF
                </button>
                <button className="btn btn-success ml-2" onClick={downloadExcel}>
                    Download Excel
                </button>
            </div>
        </div>
        </>
    );
};

export default VendorPaymentView;
