import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

const AttendanceBox = ({ attendanceData, whichbox, marker, date }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(attendanceData.filter((item) => item.present === whichbox));
  }, [attendanceData, whichbox]);

  return (
    <div className="shadow-md rounded-md border">
      {filteredData.map((item, index) => (
        <label
          key={index}
          className="d-flex justify-content-space-between align-items-center m-0 p-1 px-3 "
          style={
            item.present === item.real
              ? {
                background: index % 2 ? "#e6e6e6" : "#f0f5f1",
                cursor: "pointer",
              }
              : {
                cursor: "pointer",
                background: item.present
                  ? index % 2
                    ? "#e3f6ff"
                    : "#c9eeff"
                  : index % 2
                    ? "#ffe3ed"
                    : "#ffc9cd",
              }
          }
        >
          <p
            style={{
              margin: "0px",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            {item.name}
          </p>
          <input
            className="d-none"
            type="button"
            onClick={() => marker({ index: item.id, val: !whichbox })}
          ></input>
        </label>
      ))}
    </div>
  );
};

const AttendancePage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    handleDateChange(date);
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setAttendanceData([]);
    axios
      .get(`http://localhost:5000/api/attendance/${selectedDate}`)
      .then((res) => {
        res.data.map((item) => {
          setAttendanceData((prev) => [
            ...prev,
            { ...item, real: item.present },
          ]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const marker = ({ index, val }) => {
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === index ? { ...item, present: val } : item
      )
    );
  };

  const submit = () => {
    axios
      .post(`http://localhost:5000/api/bulkattendance/${date}`, attendanceData)
      .then(() => {
        handleDateChange(date);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const exportToExcel = () => {
    const sheetData = attendanceData.map(({ id, name, present }) => ({
      Date: date,
      Name: name,
      Status: present ? 'Present' : 'Absent',
    }));
  
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceSheet');
    XLSX.writeFile(wb, `AttendanceSheet_${date}.xlsx`);
  };
  return (
    <div className="container mt-5 d-flex justify-content-center flex-column">
      <div className="d-flex justify-content-between">
        <h1>Attendance Sheet</h1>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div
        className="mt-3"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          background: "white",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <input
          type="date"
          placeholder={date}
          onChange={(e) => {
            e.preventDefault();
            const [year, month, day] = e.target.value.split("-");
            handleDateChange(`${day}-${month}-${year}`);
          }}
          style={{
            outline: "none",
            border: "none",
            background: "white",
            color: "black",
          }}
          className="p-2 mx-0 mb-2 rounded-lg"
        ></input>
        <div className="row p-0 m-0">
          <div className="col-sm-12 col-md-6 my-2 p-0 pt-3 p-1">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Absent
            </p>
            <AttendanceBox
              attendanceData={attendanceData}
              whichbox={false}
              marker={marker}
              date={date}
            />
          </div>
          <div className="col-sm-12 col-md-6 my-2 pt-3 p-1">
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Present
            </p>
            <AttendanceBox
              attendanceData={attendanceData}
              whichbox={true}
              marker={marker}
              date={date}
            />
          </div>
        </div>
      </div>
      <input
        type="button"
        className="rounded-lg outline-none border-0 p-2"
        value={"Apply Changes"}
        onClick={submit}
        style={{ width: "fit-content", marginTop: "1rem", background: "white" }}
      ></input>
    </div>
  );
};

export default AttendancePage;
