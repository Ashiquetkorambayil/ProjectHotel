/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import image1 from 'assets/images/curved-images/curved-6.jpg'

function Tables() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello");
        const response = await axios.get(`http://localhost:8800/admin/getbranchadminbyid/${id}`);
        setData(response.data);
        console.log(response, "response");
        console.log(response.data, "response.data");

        console.log("response data", response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Button
                onClick={goback}
                variant="contained"
                disableElevation
                style={{ backgroundColor: "black" }}
              >
                {" "}
                <MdOutlineArrowBackIos style={{ color: "white" }} />
              </Button>
            </SoftBox>
            <SoftBox style={{display:'flex', alignItems:"center", justifyContent:'center'}}>
                {data && (
                    <softBox
                    style={{
                      backgroundColor: "#edf0f2",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      width: "500px",
                      textAlign: "center",
                      marginBottom:'2%',
                      boxShadow: " 6px 1px 6px 5px  #9E9E9E"
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      className="cover-image"
                      src={image1}
                      alt="Cover Image"
                    />
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginTop: "-50px",
                        border: "4px solid #fff",
                      }}
                      className="profile-image"
                      src={`http://localhost:8800/public/images/${data.image}`}
                      alt="Profile Image"
                    />
                    <softBox className="profile-details">
                      <SoftBox className="profile-name">{data.name}</SoftBox>
                      <SoftBox className="fw-light">{data.role}</SoftBox>
                      <p
                      style={{textAlign:'justify',padding:'5px', fontSize:'15px'}} 
                      className="px-3">
                        {data.description}
                      </p>
                    </softBox>
                  </softBox>
                )}
              
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
