import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit } from "react-icons/fa";
import "./ViewVendorPay.css";
const VendorPaymentView = () => {
  const [vendorPayments, setVendorPayments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainPayment, setRemainPayment] = useState("");

  useEffect(() => {
    fetchVendorPayments();
  }, []);

  const fetchVendorPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8888/api/vendorpayment"
      );
      setVendorPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendor payments:", error);
      setError("Failed to fetch vendor payments. Please try again later.");
      setLoading(false);
    }
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedPayment(null);
    setRemainPayment("");
  };

  const handlePayAmount = (e) => {
    setRemainPayment(e.target.value);
  };

  const handlePay = async () => {
    if (!selectedPayment || remainPayment === "") return;

    try {
      setLoading(true);

      // Calculate the new total payment amount
      const newTotalPayment = parseFloat(selectedPayment.total_pay_amount || 0) + parseFloat(remainPayment);

      // Calculate the new remaining amount
      const newRemainingAmount = selectedPayment.rem_amt - parseFloat(remainPayment);

      // Make sure the new total payment does not exceed the remaining amount
      if (newRemainingAmount < 0) {
        alert("Total payment amount cannot be greater than remaining amount.");
        setLoading(false);
        return;
      }

      // Determine the new status
      const newStatus = newRemainingAmount === 0 ? "Payment Done" : "Payment Pending";

      const response = await axios.patch(
        `http://localhost:8888/api/vendorpayment/update/${selectedPayment._id}`,
        { total_pay_amount: newTotalPayment, rem_amt: newRemainingAmount, status: newStatus }
      );

      // Handle success response (if needed)
      console.log("Payment updated successfully:", response.data);

      // Refresh payments data or update specific payment in local state
      fetchVendorPayments();

      setLoading(false);
      setShowPopup(false);
      setRemainPayment("");

    } catch (error) {
      console.error("Error updating payment:", error);
      setLoading(false);
      // Handle error scenario
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const data = vendorPayments.map(payment => ({
      "First Name": payment.fname,
      "Date": payment.date,
      "Amount": payment.paid_amt,
      "Remaining Amount": payment.rem_amt,
      "Description": payment.description,
      "Status": payment.status // Include status in PDF
    }));

    doc.autoTable({
      head: [["First Name", "Date", "Amount", "Remaining Amount", "Description", "Status"]],
      body: data,
      theme: "grid",
      startY: 20
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
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="flex">
            <Link to="/vendorpayment">
              <button className="btn btn-primary mr-4 mb-4">
                Add Vendor Payment
              </button>
            </Link>
            <Link to="/viewvendorpayment">
              <button className="btn btn-primary mr-4 mb-4">
                View Vendor Payment Details
              </button>
            </Link>
          </div>
          <h2 className="text-[30px]">Vendor Payment Details</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-y-auto h-[70vh] md:mt-0 w-full">
              <table className="table table-bordered bg-white">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th>First Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Remaining Amount</th>
                    <th>Description</th>
                    <th>Status</th>
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
                      <td style={{ color: payment.rem_amt > 0 ? "red" : "green" }}>
                        {payment.rem_amt > 0 ? "Payment Pending" : "Payment Done"}
                      </td>
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
          )}
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

          <Modal show={showPopup} onHide={handleCancel} className="model-payment-vendor">
            <Modal.Header closeButton>
              <Modal.Title>Edit Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedPayment ? selectedPayment.date : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPayRemainingAmt">
                  <Form.Label>Remaining Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPayment ? selectedPayment.rem_amt : ""}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formPayRemainingAmt">
                  <Form.Label>Pay Remaining Amount</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={handlePayAmount}
                    value={remainPayment}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePay}
                disabled={loading || !selectedPayment || remainPayment === ""}
              >
                {loading ? "Processing..." : "Pay"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default VendorPaymentView;
