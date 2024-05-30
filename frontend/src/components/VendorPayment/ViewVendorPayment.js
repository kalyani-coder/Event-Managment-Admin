import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Button } from "react-bootstrap";

const VendorPaymentView = () => {
  const [vendorPayments, setVendorPayments] = useState([]);

  useEffect(() => {
    const fetchVendorPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vendorpayment"
        );
        setVendorPayments(response.data);
      } catch (error) {
        console.error("Error fetching vendor payments:", error);
      }
    };

    fetchVendorPayments();
  }, []);

  const downloadPDF = () => {
    const doc = new window.jspdf.jsPDF();
    doc.text("Vendor Payment Details", 20, 10);
    doc.autoTable({
      head: [
        [
          "First Name",
          "Date",
          "Salary",
          "Paid Amount",
          "Remaining Amount",
          "Description",
        ],
      ],
      body: vendorPayments.map((payment) => [
        payment.fname,
        payment.date,
        payment.salary,
        payment.paid_amt,
        payment.rem_amt,
        payment.description,
      ]),
    });
    doc.save("vendor_payments.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(vendorPayments);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "vendor_payments.xlsx");
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%] ">
          <h2 className="text-[35px]">Vendor Payment Details</h2>
          <div className="overflow-y-auto h-[70vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
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
          </div>
          <div className="row mb-2">
            <div className="col ">
              <div className="mt-3">
                <Button className="manager-btn ms-1" onClick={downloadPDF}>
                  Download PDF
                </Button>
                <Button className="manager-btn ms-4" onClick={downloadExcel}>
                  Download Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorPaymentView;
