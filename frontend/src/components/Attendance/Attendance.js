import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceBox = ({ attendanceData, whichbox, marker }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(attendanceData.filter((item) => item.present == whichbox));
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
  const [date, setDate] = useState();
  const [attendanceData, setAttendanceData] = useState([]);

  const handleDateChange = (e) => {
    setDate(e);
    setAttendanceData([]);
    axios
      .get(`http://localhost:5000/api/attendance/${e}`)
      .then((res) => {
        res.data.map((item) => {
          setAttendanceData((prev) => {
            return [
              ...prev,
              {
                ...item,
                real: item.present,
              },
            ];
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const marker = ({ index, val }) => {
    setAttendanceData((prevData) =>
      prevData.map((item, i) =>
        item.id === index ? { ...item, present: val } : item
      )
    );
    console.log(index, val, attendanceData);
  };

  const submit = () => {
    axios
      .post(
        `http://localhost:5000/api/bulkattendance/${date}`,
        attendanceData
      )
      .then((res) => {
        // console.log(res);
        handleDateChange(date)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center flex-column"
      style={{ fontFamily: "arial" }}
    >
      <div className="d-flex justify-content-between">
        <h1>Attendance Sheet</h1>
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
            />
            {/* {attendanceData.map((item, index) => {
              if (item.presence)
                return (
                  <label
                    className="d-flex justify-content-space-between align-items-center p-1 px-3 rounded-lg"
                    key={index}
                    style={{
                      background: item.presence ? "#d1cbf7" : "#f8cccc",
                    }}
                  >
                    <p
                      style={{
                        margin: "0px",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
                    >
                      {item.name}
                    </p>
                    <input
                      className="d-none"
                      type="checkbox"
                      checked={item.presence}
                      onChange={() => marker({ index, val: !item.presence })}
                    ></input>
                  </label>
                );
            })} */}
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
