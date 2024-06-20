import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
import myImage from "../VendorPayment/logo.png"; // Ensure the image path is correct

const VendorPaymentView = () => {
  const [vendorPayments, setVendorPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPayment, setEditPayment] = useState({
    _id: "",
    fname: "",
    date: "",
    paid_amt: "",
    rem_amt: "",
    description: "",
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

  const handleEdit = (payment) => {
    setEditPayment(payment);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setEditPayment({ ...editPayment, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:8888/api/vendorpayment/${editPayment._id}`,
        editPayment
      );
      setShowModal(false);
      setVendorPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === editPayment._id ? editPayment : payment
        )
      );
    } catch (error) {
      console.error("Error updating vendor payment:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const customerData = [];

    const companyData = [];

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
    const imageX = 155;
    const imageY = 2;

    doc.text("Vendor Payment Details", 15, doc.autoTable.previous.finalY + 2);

    const image = new Image();
    image.src = myImage;
    image.onload = () => {
      doc.addImage(image, "PNG", imageX, imageY, imageWidth, imageHeight);

      doc.autoTable({
        body: companyData,
        startY: companyTableY,
        theme: "grid",
        margin: { left: companyTableX },
      });

      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
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
                    <td>
                      <FaEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(payment)}
                      />
                    </td>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editPayment.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPaidAmount">
              <Form.Label>Paid Amount</Form.Label>
              <Form.Control
                type="number"
                name="paid_amt"
                value={editPayment.paid_amt}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRemAmount">
              <Form.Label>Remaining Amount</Form.Label>
              <Form.Control
                type="number"
                name="rem_amt"
                value={editPayment.rem_amt}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editPayment.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VendorPaymentView;
