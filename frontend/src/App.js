import React from "react";
import "./App.css";
import AddAccountant from "./components/AddUser/AddAccountant";
import AddManager from "./components/AddUser/AddManager";
import AddExecutive from "./components/AddUser/AddExecutive";
import AddVendor from "./components/AddUser/AddVendor";
import AccountantDetails from "./components/UsersDetails/AccountantDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewInternalTransfer from "./components/InternalTransfer/ViewInternalTransfer";
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
import Dashboard from "./components/Dashboard/Dashboard";
import Master from "./components/master/Master";
import AdvPaymentManager from "./components/AddNewEvent/AdvPaymentManager";
import ViewAdvPaymentManager from "./components/AddNewEvent/ViewAdvPaymentManager";
import InternalTrasferBank from "./components/InternalTransfer/InternalTrasferBank";
import LandingPage from "./components/LandingPage/LandingPage";
import EventDetails from "./components/Event/ViewEvent";
import BankwiseReport from "./components/DownloadReport/BankwiseReport";
import OutstandingReport from "./components/DownloadReport/OutstandingReport";
import AdvanceExpense from './components/Expense/AdvanceExpense';
import ViewExpense from "./components/Expense/ViewExpense";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoute";
import NewLandingPage from "./components/NewLandingPage/LandingPage/LandingPage";
import Navbar from "./components/NewLandingPage/Navbar/Navbar";
import LoginPopUp from "./components/NewLandingPage/LoginPopUp/LoginPopUp";
import Footer from "./components/NewLandingPage/Footer/Footer";
import About from "./components/NewLandingPage/About/About"
import Contact from "./components/NewLandingPage/Contact/Contact"
import Blogs from "./components/NewLandingPage/Blogs/Blogs"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <>
      <div className="">
        <Router>
          <Routes>






            {/* Landing Page routeing  */}
            {/* <Route path="/" element={<NewLandingPage />} /> */}
            <Route path="/" element={<PublicRoute element={<NewLandingPage />} restrictedPath="/dashboard" />}  />
            <Route path="/navbar" element={<PublicRoute element={<Navbar />} restrictedPath="/dashboard" />}  />
            <Route path="/loginpopup" element={<PublicRoute element={<LoginPopUp />} restrictedPath="/dashboard" />}  />
            <Route path="/about" element={<PublicRoute element={<About />} restrictedPath="/dashboard" />}  />
            <Route path="/contact" element={<PublicRoute element={<Contact />} restrictedPath="/dashboard" />}  />
            <Route path="/blogs" element={<PublicRoute element={<Blogs />} restrictedPath="/dashboard" />}  />
            <Route path="/footer" element={<PublicRoute element={<Footer />} restrictedPath="/dashboard" />}  />
            <Route path="/resetpass" element={<PublicRoute element={<ForgotPassword />} restrictedPath="/dashboard" />}  />





            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path='/login' element={<PublicRoute element={<Login />} restrictedPath="/dashboard" />}  />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/addmanager" element={<ProtectedRoute element={<AddManager />} />} />
            <Route path="/addaccountant" element={<ProtectedRoute element={<AddAccountant />} />} />
            <Route path="/addvendor" element={<ProtectedRoute element={<AddVendor />} />} />
            <Route path="/addexecutive" element={<ProtectedRoute element={<AddExecutive />} />} />
            <Route path="/accountantdetails" element={<ProtectedRoute element={<AccountantDetails />} />} />
            <Route path="/managerdetails" element={<ProtectedRoute element={<ManagerDetails />} />} />
            <Route path="/executicedetails" element={<ProtectedRoute element={<ExecutiveDetails />} />} />
            <Route path="/executive/:_id" element={<ProtectedRoute element={<ExecutiveDetailPage />} />} />
            <Route path="/addenquiry" element={<ProtectedRoute element={<Enquiry />} />} />
            <Route path="/addevent" element={<ProtectedRoute element={<AddEvent />} />} />
            <Route path="/manager/:_id" element={<ProtectedRoute element={<ManagerDetailPage />} />} />
            <Route path="/accountant/:_id" element={<ProtectedRoute element={<AccountantDetailPage />} />} />
            <Route path="/quotation" element={<ProtectedRoute element={<ViewEnquiry />} />} />
            <Route path="/quotationform/:_id" element={<ProtectedRoute element={<MakeQuotation />} />} />
            <Route path="/advancepayment" element={<ProtectedRoute element={<AdvancePaymentForm />} />} />
            <Route path="/orderform" element={<ProtectedRoute element={<OrderForm />} />} />
            <Route path="/addsalary/" element={<ProtectedRoute element={<AddSalary />} />} />
            <Route path="/vendordetails" element={<ProtectedRoute element={<VendorDetails />} />} />
            <Route path="/vendor/:_id" element={<VendorDetailPage />} />
            <Route path="/view-more/:_id" element={<ProtectedRoute element={<ViewVendorPayment />} />} />
            <Route path="/viewevent" element={<ProtectedRoute element={<EventDetails />} />} />
            <Route
              path="/event-more-details/:eventId"
              element={<ProtectedRoute element={<EventMoreDetails />} />}
            />
            <Route path="/add-expense/:eventId" element={<ProtectedRoute element={<AddExpense />} />} />
            <Route path="/expenses/:eventId" element={<ProtectedRoute element={<ExpenseList />} />} />
            <Route path="/viewsalary/" element={<ProtectedRoute element={<ViewSalary />} />} />
            <Route path="/vendorpayment" element={<ProtectedRoute element={<VendorPayment />} />} />
            <Route path="/viewvendorpayment" element={<ProtectedRoute element={<VendorPaymentView />} />} />
            <Route path="/addinventory" element={<ProtectedRoute element={<AddInventory />} />} />
            <Route path="/godown" element={<ProtectedRoute element={<GodownInventory />} />} />
            <Route path="/viewinventory" element={<ProtectedRoute element={<ViewInventory />} />} />
            <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
            <Route path="/viewattendance" element={<ProtectedRoute element={<ViewAttendance />} />} />
            <Route path="/updatetask" element={<ProtectedRoute element={<UpdateTaskPage />} />} />
            <Route path="/viewtask" element={<ProtectedRoute element={<ViewTaskPage />} />} />
            <Route path="/vendorinventory" element={<ProtectedRoute element={<VendorInventory />} />} />
            <Route path="/quotationform" element={<ProtectedRoute element={<QuotationForm />} />} />
            <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
            <Route path="/eventreport" element={<ProtectedRoute element={<EventReport />} />} />
            <Route
              path="/vendorpaymentreport"
              element={<ProtectedRoute element={<VendorPaymentReport />} />}
            ></Route>
            <Route path="/managerreport" element={<ProtectedRoute element={<ManagerReport />} />}></Route>
            <Route path="/Enquiryreport" element={<ProtectedRoute element={<EnquiryReport />} />}></Route>
            <Route path="/newgodown" element={<ProtectedRoute element={<NewGodowns />} />} />
            <Route path="/createquotation" element={<ProtectedRoute element={<CreateQuotation />} />} />
            <Route path="/followupstatus" element={<ProtectedRoute element={<FollowUpStatus />} />} />
            <Route path="/addnewevent" element={<ProtectedRoute element={<AddNewEvent />} />} />
            <Route path="/advpaymentcus" element={<ProtectedRoute element={<AdvancePaymnetCus />} />} />
            <Route path="/assignmanager" element={<ProtectedRoute element={<AssigntoManager />} />} />
            <Route path="/customerreport" element={<ProtectedRoute element={<CustomerReport />} />} />
            <Route path="/paymentreport" element={<PaymentReport />} />
            <Route path="/costingform" element={<ProtectedRoute element={<CostingForm />} />} />
            <Route path="/master" element={<ProtectedRoute element={<Master />} />} />
            <Route path="/advpaymentmanager" element={<ProtectedRoute element={<AdvPaymentManager />} />} />
            <Route path="/viewadvpaymentmanager" element={<ProtectedRoute element={<ViewAdvPaymentManager />} />} />
            <Route path="/internaltransferfrombank" element={<ProtectedRoute element={<InternalTrasferBank />} />} />
            <Route path="/viewinternaltransfer" element={<ProtectedRoute element={<ViewInternalTransfer />} />} />
            <Route path="/bankwisereport" element={<ProtectedRoute element={<BankwiseReport />} />} />
            <Route path="/oustandingpaymentreport" element={<ProtectedRoute element={<OutstandingReport />} />} />
            <Route path="/advanceexpense" element={<ProtectedRoute element={<AdvanceExpense />} />} />
            <Route path="/viewexpense" element={<ProtectedRoute element={<ViewExpense />} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
