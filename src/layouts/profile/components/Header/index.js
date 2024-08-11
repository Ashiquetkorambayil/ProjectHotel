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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import SoftInput from "components/SoftInput";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const admin = JSON.parse(localStorage.getItem("admins",));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [oldPassword, setOldPassword] = useState('');
  const [ newPassword, setNewPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [invalid, setInvalid] = useState('');
  const [invalids, setInvalids] = useState('');
  const {id} = useParams()

  const handleSubmit=async()=>{
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      cPassword: cpassword
    };
    try {
      
      const response = await axios.put(`http://localhost:8800/admin/changepassword/${admin.id}`,data);
      console.log(response);
      if(response.status && response.status ===200 ){
       
        
        setTimeout(()=>{
          setInvalids('password changed successfully');
        },3000)
        window.location.href='/profile'
      }
    }catch(err){
      if(err.response && err.response.status === 403){
        setInvalid(err.response.data.message);
      }else if(err.response && err.response.status === 400){
        setInvalid(err.response.data.message);
      }else{
        console.log(err);
      }
     
    }

  }
  
  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={`http://localhost:8800/${admin.image}`}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {admin.name}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {admin.role}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }} style={{display:"flex", alignItems:"baseline", justifyContent:"end"}}>
            {/* <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="App" icon={<Cube />} />
                <Tab label="Message" icon={<Document />} />
                <Tab label="Settings" icon={<Settings />} />
              </Tabs>
            </AppBar> */}
            <button style={{color:"blue", fontSize:"small", border:"none"}} onClick={handleShow}>change password</button>
          </Grid>
        </Grid>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         
          <SoftInput  value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} style={{width:"100%", margin:"10px"}} type="password" placeholder="Old password"/>
        
        {invalids && (
          <p>{invalids}</p>
        )}
        <SoftInput   value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} style={{width:"100%", margin:"10px"}} type="password" placeholder="New password"/>
        <SoftInput value={cpassword}  onChange={(e)=> setCPassword(e.target.value)} style={{width:"100%", margin:"10px"}} type="password" placeholder="Confirm new password"/>
        
        {invalid && (
          <p>{invalid}</p>
        )

        }
        
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </SoftBox>
  );
}

export default Header;
