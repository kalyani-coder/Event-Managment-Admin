import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Sidebar/Header";

const ViewVendorPayment = () => {
  const { vendorId } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(
        `https://your-api-url.com/api/vendors/${vendorId}`
      );
      setVendorDetails(response.data);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, [vendorId]);

  const handleEdit = () => {
    // Redirect to the edit page, you should create an EditVendorPayment component
    navigate(`/edit-vendor/${vendorId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://your-api-url.com/api/vendors/${vendorId}`);
      // Redirect to the vendors list page after successful deletion
      navigate("/vendors");
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  if (loading) {
    // Loading state or handle the case where details are not available
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]">
          <h2 className="text-[35px]">Vendor Payment Details</h2>

          {vendorDetails && (
            <Card bg="info" text="white" className="mt-3 p-3">
              <Card.Title>
                {vendorDetails.fname},{vendorDetails.lname}
              </Card.Title>
              {/* <Card.Subtitle className="mb-2">
                        Contact Person: {vendorDetails.contact_person_name}
                    </Card.Subtitle> */}

              <Card.Body>
                <Card.Text>
                  <strong>Event Name:</strong> {vendorDetails.event_name}
                </Card.Text>

                <Card.Text>
                  <strong>Date:</strong> {vendorDetails.date}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {vendorDetails.time}
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {vendorDetails.description},
                </Card.Text>
                <Card.Text>
                  <strong>Ssalary:</strong> {vendorDetails.salary}
                </Card.Text>
                <Card.Text>
                  <strong>Payment:</strong> {vendorDetails.paid_amt}
                </Card.Text>
                <Card.Text>
                  <strong>Reamaining Amount:</strong> {vendorDetails.rem_amt}
                </Card.Text>

                {vendorDetails.profilePicture && (
                  <Card.Img
                    src={vendorDetails.profilePicture}
                    alt="Profile"
                    className="mb-3"
                  />
                )}

                <Button variant="light" className="mr-2" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewVendorPayment;
