import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
import axios from "axios";
import myImage from "./logo.png";

function QuotationForm() {
  const unitOptions = ["sqft", "number", "kg", "meter", "liter", "other"];
  const location = useLocation();
  const data = location.state || {};
  const enquiry = data || {};
  useEffect(() => {
    console.log("Enquiry data:", enquiry);
  }, [enquiry]);
  const eventName = enquiry.event_name || "";

  const [sections, setSections] = useState([
    {
      srNumber: 1,
      title: "",
      particular: "",
      description: "",
      entity: "",
      unit: "",
      rate: "",
      days: "",
      amount: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let newValue = value;

    if (["quantity", "rate", "days"].includes(name)) {
      if (!isNaN(value) || value === "") {
        const list = [...sections];
        list[index][name] = value;

        if (
          !isNaN(list[index].quantity) &&
          !isNaN(list[index].rate) &&
          !isNaN(list[index].days)
        ) {
          newValue = (
            list[index].quantity *
            list[index].rate *
            list[index].days
          ).toString();
          list[index].amount = newValue;
        }

        setSections(list);
      }
    } else {
      const list = [...sections];
      list[index][name] = value;

      // Special handling for 'unit' field to prevent clearing
      if (name === 'unit' && value.trim() === '') {
        // Do not update the state for an empty 'unit' field
      } else {
        setSections(list);
      }
    }
  };


  const handleAddSection = () => {
    const newSRNumber = sections.length + 1;
    setSections([
      ...sections,
      {
        srNumber: newSRNumber,
        title: "",
        particular: "",
        description: "",
        entity: "",
        unit: "",
        rate: "",
        days: "",
        amount: "",
      },
    ]);
  };

  const handleSave = async () => {
    try {
      // Send a POST request to the API endpoint with the sections data
      await axios.post("http://localhost:5000/api/quotation", {
        sections,
      });

      alert("Quotation saved successfully!");
    } catch (error) {
      console.error("Error saving quotation:", error);
      alert("Error saving quotation. Please try again.");
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text(`Quotation Form of ${enquiry.event_name || ""}`, 10, 10);

    // Print Customer Data
    const customerData = [
      ["Customer Name", enquiry.customer_name || "-"],
      ["Customer Address", enquiry.address || "-"],
      ["Event Date", enquiry.event_date || "-"],
      ["Event Venue", enquiry.event_venue || "-"],
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

    const customerTableX = 30;
    const customerTableY = 40;

    const companyTableX = 105;
    const companyTableY = 40;

    const pageWidth = doc.internal.pageSize.width;
    const customerTableWidth = (pageWidth - companyTableX) / 2 - 10;

    doc.autoTable({
      body: customerData,
      startY: customerTableY,
      theme: "grid",
      margin: { right: companyData },
    });

    const imageWidth = 40;
    const imageHeight = 30;
    const imageX = 120;
    const imageY = 10;
    doc.addImage(myImage, "PNG", imageX, imageY, imageWidth, imageHeight);

    doc.autoTable({
      body: companyData,
      startY: companyTableY,
      theme: "grid",
      margin: { left: companyTableX },
    });

    // Print Sections Data
    const tableData = sections.map((section, index) => [
      section.srNumber,
      section.title,
      section.particular,
      section.description,
      section.entity,
      section.unit,
      section.rate,
      section.days,
      section.amount,
    ]);

    doc.autoTable({
      head: [
        [
          "SR Number",
          "Title of Section",
          "Particular",
          "Description",
          "Entity",
          "Unit",
          "Rate",
          "Days",
          "Amount",
        ],
      ],
      body: tableData,
      startY: 110,
    });

    doc.save(`${enquiry.customer_name || "Customer"}-Quotation.pdf`);
    alert("PDF file generated");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Quotation Form of {eventName}</h1>

      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div className="form-group">
            <label htmlFor={`title${index}`}>
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id={`title${index}`}
              name="title"
              value={section.title}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`particular${index}`}>
              Particular:
            </label>
            <input
              type="text"
              className="form-control"
              id={`particular${index}`}
              name="particular"
              value={section.particular}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`description${index}`}>
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id={`description${index}`}
              name="description"
              value={section.description}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="entity" style={{ display: "flex" }}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <div className="form-group ">
                  <label htmlFor={`entity${index}`}>
                    Entity:
                  </label>
                  <select
                    className="form-control"
                    id={`entity${index}`}
                    name="entity"
                    value={section.entity}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Entity</option>
                    <option value="stage">Stage</option>
                    <option value="ac">AC</option>
                    <option value="fan">Fan</option>
                    <option value="chair">Chair</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>
                  Unit:<span style={{ color: "red" }}></span>
                </label>
                <div style={{ position: 'relative' }}>
                  {/* <input
                    className="form-control"
                    // id={`unit${index}`}
                    value={section.unit}
                    name="unit"
                    type="text"
                    placeholder="Enter value"
                    style={{ paddingRight: '50px' }}
                  /> */}
                  <input
                    className="form-control"
                    value={section.unit || ''}
                    name="unit"
                    type="text"
                    placeholder="Enter value"
                    style={{ paddingRight: '50px' }}
                    onChange={(e) => handleChange(e, index)}
                  />

                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`rate${index}`}>
                  Quantity:
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={section.quantity}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`rate${index}`}>
                  Rate:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`rate${index}`}
                  name="rate"
                  value={section.rate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`days${index}`}>
                  Days:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`days${index}`}
                  name="days"
                  value={section.days}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`amount${index}`}>
              Amount:
            </label>
            <input
              type="text"
              className="form-control"
              id={`amount${index}`}
              name="amount"
              value={section.amount}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleAddSection}>
        Add Section
      </button>
      <button className="btn btn-success mx-2" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-success mx-2" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
}

export default QuotationForm;
