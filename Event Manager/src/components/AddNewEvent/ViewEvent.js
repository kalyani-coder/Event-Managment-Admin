import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from "../Sidebar/Header";

const ViewEvent = () => {
 
  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center main-container-for-Addaccount">
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
        
          <div className="filter-container">
            <input type="text" placeholder="Search Order" />
            <input type="date" />
            <input type="date" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[30px]">View Events</h2>
          </div>
          <div className="table-responsive md:w-full overflow-y-auto md:h-[60vh] h-[50vh] md:mt-0">
            <table className="table">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Action</th>
                  <th scope="col">Internal Costing</th>
                  <th scope="col">Quotation</th>
                </tr>
              </thead>
              <tbody style={{ background: "white", borderRadius: "10px" }}>
                
              </tbody>
            </table>
          </div>
          <div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEvent;
