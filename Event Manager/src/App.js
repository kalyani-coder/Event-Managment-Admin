import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AddAccountant from "./components/AddUser/AddAccountant";
import AddManager from "./components/AddUser/AddManager";
import AddExecutive from "./components/AddUser/AddExecutive";
import AddVendor from "./components/AddUser/AddVendor";
import AccountantDetails from "./components/UsersDetails/AccountantDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
// import EventDetails from "./components/Event/ViewEvent";
import EventMoreDetails from "./components/Event/ViewMoreDetails";
import AddExpense from "./components/Event/AddExpense";
import ExpenseList from "./components/Event/ExpenseList";
import ViewSalary from "./components/UsersDetails/salary/ViewSalary";
import VendorPayment from "./components/VendorPayment/VendorPayment";
import AddInventory from "./components/Inventory/AddInventory";
import ViewInventory from "./components/Inventory/ViewInventory";
import VendorPaymentView from "./components/VendorPayment/ViewVendorPayment";
import ViewVendorPayment from "./components/VendorPayment/VendorPaymentDetails";
import Attendance from "./components/Attendance/Attendance";
import ViewAttendance from "./components/Attendance/ViewAttendence";
import UpdateTaskPage from "./components/UpdateTask/UpdateTask";
import ViewTaskPage from "./components/UpdateTask/ViewTask";
import GodownInventory from "./components/Inventory/Godown/Godown";
import VendorInventory from "./components/Inventory/VendorInventory/VendorInventory";
import Product from "./components/Inventory/Godown/Product";
import NewGodowns from "./components/Inventory/Godown/NewGodowns";
import QuotationForm from "./components/Enquiry/Quotation/MakeQuotation";
import EventReport from "./components/DownloadReport/EventReport";
import VendorPaymentReport from "./components/DownloadReport/VendorPaymentReport";
import ManagerReport from "./components/DownloadReport/ManagerReport";
import EnquiryReport from "./components/DownloadReport/EnquiryReport";
import CreateQuotation from "./components/Enquiry/Quotation/CreateQuotation";
import FollowUpStatus from "./components/FollowupStatus/FollowUpStatus";
import AddNewEvent from "./components/AddNewEvent/AddNewEvent";
import AdvancePaymnetCus from "./components/AddNewEvent/AdvancePaymnetCus";
import AssigntoManager from "./components/AddNewEvent/AssigntoManager";
import Login from "./components/Login/Login";
import CustomerReport from "./components/DownloadReport/CustomerReport";
import PaymentReport from "./components/DownloadReport/PaymentReport";
import CostingForm from "./components/AddNewEvent/CostingForm";
import Header from "./components/Sidebar/Header";
// import "./App.css";
import { Divider } from "@mui/material/Divider";
import Dashboard from "./components/Dashboard/Dashboard";
import Master from "./components/master/Master";
import AdvPaymentManager from "./components/AddNewEvent/AdvPaymentManager";
import ViewAdvPaymentManager from "./components/AddNewEvent/ViewAdvPaymentManager"
import AdvancePaymentCus2 from "./components/AddNewEvent/AdvancePaymentCus2";
import InternalCosting from "./components/InternalCosting/InternalCosting";
import ViewEvent from "./components/AddNewEvent/ViewEvent";

function App() {
  return (
    <>
      <div className="PReadd  overflow-hidden">
        <Router>
          {/*      <Header />
           */}
          <Routes>
            <Route path="/" element={<Login/>} />
          
            <Route path="/dashboard" element={<Dashboard />} />

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
            <Route path="/quotationform/:_id" element={<MakeQuotation />} />
            <Route path="/advancepayment" element={<AdvancePaymentForm />} />
            <Route path="/orderform" element={<OrderForm />} />
            <Route path="/addsalary/" element={<AddSalary />} />
            <Route path="/vendordetails" element={<VendorDetails />} />
            <Route path="/vendor/:_id" element={<VendorDetailPage />} />
            <Route path="/view-more/:_id" element={<ViewVendorPayment />} />
            {/* <Route path="/viewevent" element={<EventDetails />} /> */}
            <Route
              path="/event-more-details/:eventId"
              element={<EventMoreDetails />}
            />
            <Route path="/add-expense/:eventId" element={<AddExpense />} />
            <Route path="/expenses/:eventId" element={<ExpenseList />} />
            <Route path="/viewsalary/" element={<ViewSalary />} />
            <Route path="/vendorpayment" element={<VendorPayment />} />
            <Route path="/viewvendorpayment" element={<VendorPaymentView />} />
            <Route path="/addinventory" element={<AddInventory />} />
            <Route path="/godown" element={<GodownInventory />} />

            <Route path="/viewinventory" element={<ViewInventory />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/viewattendance" element={<ViewAttendance />} />
            <Route path="/updatetask" element={<UpdateTaskPage />} />
            <Route path="/viewtask" element={<ViewTaskPage />} />
            <Route path="/vendorinventory" element={<VendorInventory />} />

            <Route path="/quotationform" element={<QuotationForm />} />
            <Route path="/product" element={<Product />} />
            <Route path="/eventreport" element={<EventReport />} />
            <Route
              path="/vendorpaymentreport"
              element={<VendorPaymentReport />}
            ></Route>
            <Route path="/managerreport" element={<ManagerReport />}></Route>
            <Route path="/Enquiryreport" element={<EnquiryReport />}></Route>
            <Route path="/newgodown" element={<NewGodowns />} />
            <Route path="/createquotation" element={<CreateQuotation />} />
            <Route path="/followupstatus" element={<FollowUpStatus />} />
            <Route path="/addnewevent" element={<AddNewEvent />} />
            <Route path="/advpaymentcus" element={<AdvancePaymnetCus />} />
            <Route path="/assignmanager" element={<AssigntoManager />} />
            <Route path="/customerreport" element={<CustomerReport />} />
            <Route path="/paymentreport" element={<PaymentReport />} />
            <Route path="/costingform" element={<CostingForm />} />
            <Route path="/master" element={<Master />} />
            <Route path="/advpaymentmanager" element={<AdvPaymentManager />} />
            <Route path="/advpaycus" element={<AdvancePaymentCus2 />} />
            <Route path="/viewadvpaymentmanager" element={<ViewAdvPaymentManager />} />
            <Route path="/internalcosting" element={<InternalCosting />} />
            <Route path="/viewevent" element={<ViewEvent />} />

            {/* **************** */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
