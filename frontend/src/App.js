import Sidebar from "./components/Sidebar/Sidebar";
import AddAccountant from "./components/AddUser/AddAccountant";
import AddManager from "./components/AddUser/AddManager";
import AddExecutive from "./components/AddUser/AddExecutive";
import AddVendor from "./components/AddUser/AddVendor";
import AccountantDetails from "./components/UsersDetails/AccountantDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import ManagerDetails from "./components/UsersDetails/ManagerDetails";
import Enquiry from "./components/Enquiry/Enquiry";
import AddEvent from "./components/Event/AddEvent";
import ManagerDetailPage from "./components/UsersDetails/ManagerDetailPage";
import ViewEnquiry from "./components/Enquiry/Quotation/ViewEnquiry";
import MakeQuotation from "./components/Enquiry/Quotation/MakeQuotation";
import AdvancePaymentForm from "./components/Event/AdvancePayment";
import OrderForm from "./components/Event/orderForm";
import AddSalary from "./components/UsersDetails/salary/AddSalary";
import AccountantDetailPage from "./components/UsersDetails/AccountantDetailPage";
import ExecutiveDetails from "./components/UsersDetails/executive/ExecutiveDetails";
import ExecutiveDetailPage from "./components/UsersDetails/executive/ExecutiveDetailPage";
import VendorDetails from "./components/UsersDetails/Vendor/VendorDetails";
import VendorDetailPage from "./components/UsersDetails/Vendor/VendorDetailsPage";
import EventDetails from "./components/Event/ViewEvent";
import EventMoreDetails from "./components/Event/ViewMoreDetails";
import AddExpense from "./components/Event/AddExpense";
import ExpenseList from "./components/Event/ExpenseList";
import ViewSalary from "./components/UsersDetails/salary/ViewSalary";
import VendorPayment from "./components/VendorPayment/VendorPayment";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AddManager />} />
          <Route path="/addmanager" element={<AddManager />} />
          <Route path="/addaccountant" element={<AddAccountant />} />
          <Route path="/addvendor" element={<AddVendor />} />
          <Route path="/addexecutive" element={<AddExecutive />} />
          <Route path="/accountantdetails" element={<AccountantDetails />} />

          <Route path="/managerdetails" element={<ManagerDetails />} />
          <Route path="/executicedetails" element={<ExecutiveDetails />} />
          <Route path="/executive/:_id" element={<ExecutiveDetailPage />} />
          <Route path="/addenquiry" element={<Enquiry />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/manager/:_id" element={<ManagerDetailPage />} />
          <Route path="/accountant/:_id" element={<AccountantDetailPage />} />
          <Route path="/quotation" element={<ViewEnquiry />} />
          <Route path="//quotation/:id" element={<MakeQuotation />} />
          <Route path="/advancepayment" element={<AdvancePaymentForm />} />
          <Route path="/orderform" element={<OrderForm />} />
          <Route path="/addsalary" element={<AddSalary />} />
          <Route path="/vendordetails" element={<VendorDetails />} />
          <Route path="/vendor/:_id" element={<VendorDetailPage />} />
          <Route path="/viewevent" element={<EventDetails />} />
          <Route path="/event-more-details" element={<EventMoreDetails />} />
          <Route path="/add-expense/:eventId" element={<AddExpense />} />
          <Route path="/expenses/:eventId" element={<ExpenseList />} />
          <Route path="/viewsalary" element={<ViewSalary />} />
          <Route path="/vendorpayment" element={<VendorPayment />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
