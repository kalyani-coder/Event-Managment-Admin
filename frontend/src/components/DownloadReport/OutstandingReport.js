import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import { Link } from "react-router-dom";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaFire,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";

const OutstandingReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const enquiryResponse = await fetch('http://localhost:5000/api/enquiry');
        const enquiryData = await enquiryResponse.json();

        const quotationResponse = await fetch('http://localhost:5000/api/quotationinfo');
        const quotationData = await quotationResponse.json();

        const report = generateReport(enquiryData, quotationData);
        setReportData(report);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReportData();
  }, []);

  const generateReport = (enquiryData, quotationData) => {
    const report = [];

    enquiryData.forEach(enquiry => {
      const { customer_Id, customerName, event_name, event_date } = enquiry;

      quotationData.forEach(quotation => {
        if (quotation.eventId === enquiry.eventId) {
          quotation.requirements.forEach(requirement => {
            const { stockName, vendorName, purchaseQuantity, rate_per_days, days, price } = requirement;

            report.push({
              customer_Id,
              customerName,
              event_name,
              event_date,
              stockName,
              vendorName,
              purchaseQuantity,
              rate_per_days,
              days,
              price
            });
          });
        }
      });
    });

    return report;
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount overflow-y-auto">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <div className="flex">
            <Link to={'/eventreport'}>
              <button className="btn btn-primary mr-4 mb-4">Event Report</button>
            </Link>
            <Link to={'/enquiryreport'}>
              <button className="btn btn-primary mr-4 mb-4">Enquiry Report</button>
            </Link>
            <Link to={'/customerreport'}>
              <button className="btn btn-primary mr-4 mb-4">Customer Report</button>
            </Link>
            <Link to={'/managerreport'}>
              <button className="btn btn-primary mr-4 mb-4">Manager Report</button>
            </Link>
            <Link to={'/paymentreport'}>
              <button className="btn btn-primary mr-4 mb-4">Payment Report</button>
            </Link>
            <Link to={'/vendorpaymentreport'}>
              <button className="btn btn-primary mr-4 mb-4">Vendor Report</button>
            </Link>
            <Link to={'/bankwisereport'}>
              <button className="btn btn-primary mr-4 mb-4">Bankwise Report</button>
            </Link>
            <Link to={'/oustandingpaymentreport'}>
              <button className="btn btn-primary mr-4 mb-4">Outstanding Report</button>
            </Link>
          </div>
          <h2 className="text-[30px]">Outstanding Payment Report</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Stock Name</th>
                <th>Vendor Name</th>
                <th>Purchase Quantity</th>
                <th>Rate per Day</th>
                <th>Days</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index}>
                  <td>{data.customer_Id}</td>
                  <td>{data.customerName}</td>
                  <td>{data.event_name}</td>
                  <td>{data.event_date}</td>
                  <td>{data.stockName}</td>
                  <td>{data.vendorName}</td>
                  <td>{data.purchaseQuantity}</td>
                  <td>{data.rate_per_days}</td>
                  <td>{data.days}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OutstandingReport;
