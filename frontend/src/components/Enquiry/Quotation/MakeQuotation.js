import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams, useLocation } from "react-router-dom";
import myImage from "./logo.png";

function QuotationForm() {
  const unitOptions = ["sqft", "number", "kg", "meter", "liter", "other"];
  const _id = useParams();
  const location = useLocation();

  const data = location.state;
  console.log(_id);

  // Removed the second declaration of sections
  const [sections, setSections] = useState([
    {
      srNumber: 1,
      title: "",
      particular: "",
      description: "",
      per: "",
      unit: "",
      rate: "",
      days: "",
      amount: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validate input to allow only numeric values for "Per," "Rate," and "Days"
    if (["per", "rate", "days"].includes(name)) {
      if (!isNaN(value) || value === "") {
        const list = [...sections];
        list[index][name] = value;
        newValue = value;

        // Calculate the amount if all three fields have valid numeric values
        if (
          !isNaN(list[index].per) &&
          !isNaN(list[index].rate) &&
          !isNaN(list[index].days)
        ) {
          newValue = (
            list[index].per *
            list[index].rate *
            list[index].days
          ).toString();
          list[index].amount = newValue;
        }

        setSections(list);
      }
    } else if (name === "unit") {
      const list = [...sections];
      list[index][name] = value;
      newValue = value;
      setSections(list);
    } else {
      const list = [...sections];
      list[index][name] = value;
      newValue = value;
      setSections(list);
    }

    // Update the input value
    e.target.value = newValue;
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
        per: "",
        unit: "",
        rate: "",
        days: "",
        amount: "",
      },
    ]);
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text(`Quotation Form of ${data.eventName}`, 10, 10);

    // Add customer information table
    const customerData = [
      ["Customer Name", data.customerName],
      ["Customer Address", data.customerAddress],
      ["Event Date", data.eventDate],
      ["Event Venue", data.eventVenue],
    ];

    // Add company information table
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

    // Set the position for the company information table
    const companyTableX = 105; // Half of the page width
    const companyTableY = 40;

    // Calculate the width of the customer information table (half of the page width)
    const pageWidth = doc.internal.pageSize.width;
    // Calculate the width of the customer information table (less than half of the page width)
    const customerTableWidth = (pageWidth - companyTableX) / 2 - 10; // Adjust the width as needed
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

    const tableData = sections.map((section, index) => [
      section.srNumber,
      section.title,
      section.particular,
      section.description,
      section.per,
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
          "Per",
          "Unit",
          "Rate",
          "Days",
          "Amount",
        ],
      ],
      body: tableData,
      startY: 110,
    });

    doc.save(`${data.customerName}-Quotation.pdf`);
    alert("PDF file generated");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Quotation Form of {data.customerName}</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div className="form-group">
            <label htmlFor={`title${index}`}>
              Title:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id={`title${index}`}
              name="title"
              value={section.title}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`particular${index}`}>
              Particular:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id={`particular${index}`}
              name="particular"
              value={section.particular}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`description${index}`}>
              Description:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id={`description${index}`}
              name="description"
              value={section.description}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
          <div className="entity" style={{ display: "flex" }}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <div className="form-group ">
                  <label htmlFor={`entity${index}`}>
                    Entity:<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    id={`entity${index}`}
                    name="entity"
                    value={section.entity}
                    onChange={(e) => handleChange(e, index)}
                    required
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
                <label htmlFor={`unit${index}`}>
                  Unit:<span style={{ color: "red" }}></span>
                </label>
                <input
                  className="form-control"
                  id={`unit${index}`} // Ensure this ID is unique for each section
                  name="unit" // Ensure the name is "unit"
                  // Make sure you're binding the correct state value
                  value={"sqft"}
                  required
                />


              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`rate${index}`}>
                  Quantity:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"

                  name="rate"


                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`rate${index}`}>
                  Rate:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`rate${index}`}
                  name="rate"
                  value={section.rate}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor={`days${index}`}>
                  Days:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`days${index}`}
                  name="days"
                  value={section.days}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`amount${index}`}>
              Amount:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id={`amount${index}`}
              name="amount"
              // disabled
              value={section.amount}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleAddSection}>
        Add Section
      </button>
      <button className="btn btn-success mx-5" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
}

export default QuotationForm;
