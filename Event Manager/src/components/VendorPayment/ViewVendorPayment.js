import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";
import myImage from "../VendorPayment/logo.png"; // Ensure the image path is correct

const VendorPaymentView = () => {
  const [vendorPayments, setVendorPayments] = useState([]);
  const [enquiry, setEnquiry] = useState({
    customer_name: "John Doe",
    address: "123 Main St, Anytown, USA",
    event_date: "2023-01-01",
    event_venue: "Community Hall"
  });

  useEffect(() => {
    const fetchVendorPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/vendorpayment"
        );
        setVendorPayments(response.data);
      } catch (error) {
        console.error("Error fetching vendor payments:", error);
      }
    };

    fetchVendorPayments();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add customer and company details
    const customerData = [
      // ["Vendor Name", enquiry.customer_name || "-"],
      // ["Customer Address", enquiry.address || "-"],
      // ["Event Date", enquiry.event_date || "-"],
      // ["Event Venue", enquiry.event_venue || "-"],
    ];

    const companyData = [
      ["Company Name", "Tutons Events LLP"],
      [
        "Company Address",
        "Office No.6, Sai Heritage, Baner-Mahalunge Road, Baner, Pune 411045",
      ],
      ["Company Phone", "9225522123 / 9226061234"],
      ["Company Email", "tutonsevents@gmail.com"],
    ];

    const customerTableX = 10;
    const customerTableY = 40;

    const companyTableX = 105;
    const companyTableY = 40;

    const pageWidth = doc.internal.pageSize.width;
    const customerTableWidth = pageWidth * 0.3;
    const rightMargin = pageWidth - customerTableX - customerTableWidth;

    doc.autoTable({
      body: customerData,
      startY: customerTableY,
      theme: "grid",
      margin: { right: rightMargin, left: customerTableX },
    });

    const imageWidth = 40;
    const imageHeight = 30;
    const imageX = 120;
    const imageY = 10;

    // Add a title for the vendor payment details table
    doc.text("Vendor Payment Details", 20, doc.autoTable.previous.finalY + 20);

    // Ensure the image is loaded correctly
    const image = new Image();
    image.src = myImage;
    image.onload = () => {
      doc.addImage(image, "PNG", imageX, imageY, imageWidth, imageHeight);

      // Add company details table
      doc.autoTable({
        body: companyData,
        startY: companyTableY,
        theme: "grid",
        margin: { left: companyTableX },
      });

      // Add vendor payment details table
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 30,
        head: [
          [
            "First Name",
            "Date",
            "Paid Amount",
            "Remaining Amount",
            "Description",
          ],
        ],
        body: vendorPayments.map((payment) => [
          payment.fname,
          payment.date,
          payment.paid_amt,
          payment.rem_amt,
          payment.description,
        ]),
      });

      doc.save("vendor_payments.pdf");
    };

    image.onerror = () => {
      console.error("Failed to load image.");
    };
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
          <div className="flex">
            <Link to={'/vendorpayment'}>
              <button className="btn btn-primary mr-4 mb-4">Add Vendor Payment</button>
            </Link>
            <Link to={'/viewvendorpayment'}>
              <button className="btn btn-primary mr-4 mb-4">View Vendor Payment Details</button>
            </Link>
          </div>
          <h2 className="text-[30px]">Vendor Payment Details</h2>
          <div className="overflow-y-auto h-[70vh] md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th>First Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Remaining Amount</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.fname}</td>
                    <td>{payment.date}</td>
                    <td>{payment.paid_amt}</td>
                    <td>{payment.rem_amt}</td>
                    <td>{payment.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mb-2">
            <div className="col">
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
