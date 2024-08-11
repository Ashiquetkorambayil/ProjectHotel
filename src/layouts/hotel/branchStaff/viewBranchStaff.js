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
import image1 from "assets/images/curved-images/curved-6.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Button } from "@mui/material";

// Data

function Tables() {
    const navigate = useNavigate()
  const [getBranchStaff, setGetBranchStaff] = useState([]);
  const [getOperation, setGetOperation] = useState([]);
  const [getRole, setGetRole] = useState([]);
  const {id} = useParams();
  const goback = ()=> navigate(-1)
    
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/admin/getbranchstaffbyid/${id}`);
        setGetBranchStaff(response.data);
        console.log("API response:", response.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get("http://localhost:8800/admin/getoperations");

        setGetOperation(response.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get("http://localhost:8800/admin/getrole");
        console.log(response.data);
        setGetRole(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ backgroundColor: "black" }}>
          <Button variant="contained" disableElevation style={{ backgroundColor: "white" , width:'3%', position:'relative', left:'12%', marginTop:'1%'}} onClick={goback} >
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "black" }} />
                </Button>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
           
     {getBranchStaff && (
         <softBox
      className='my-5'
         style={{
           backgroundColor: "#edf0f2",
           borderRadius: "8px",
           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
           overflow: "hidden",
           width: "500px",
           textAlign: "center",
          
           boxShadow: " 6px 1px 6px 5px  #9E9E9E",
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
        src={`http://localhost:8800/${getBranchStaff.image}`}
           alt="Profile Image"
         />
         <softBox className="profile-details">
           <SoftBox className="profile-name">{getBranchStaff.name}</SoftBox>
           <SoftBox className="fw-light"></SoftBox>
          
            <p
             style={{ textAlign: "justify", padding: "5px", fontSize: "15px" }}
             className="px-3"
           > Phone number:- {getBranchStaff.phone}</p>
            <p
             style={{ textAlign: "justify", padding: "5px", fontSize: "15px" }}
             className="px-3"
           > Email ID:- {getBranchStaff.email}</p>
            <p
             style={{ textAlign: "justify", padding: "5px", fontSize: "15px" }}
             className="px-3"
           >Role:- {getRole.find((item )=> item._id === getBranchStaff.role)?.role}</p>
            <p
             style={{ textAlign: "justify", padding: "5px", fontSize: "15px" }}
             className="px-3"
           > Department:- {getOperation.find((item )=> item._id === getBranchStaff.operations)?.operations}</p>
           
         </softBox>
       </softBox>
     )}  
 
             
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tables;
