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

// react-routers components
import { Link, useParams } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { useCallback, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from "axios";

import data from "layouts/dashboard/components/Projects/data";
import { WindowSharp } from "@mui/icons-material";

function ProfileInfoCard({ title, description, info, social, action }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;
  const [show , setShow]= useState(false);
  // const {id} = useParams()
  const admin = JSON.parse(localStorage.getItem("admins"));

  const [data, setData]= useState({
    name:"",
    phone:"",
    email:"",
    country:"",
    description:""
  })


  const handleClose = () => {
    setShow(false);
  }

 
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={label} display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <SoftBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </SoftBox>
  ));

  const fetch = useCallback(async()=>{
    try{
      const response = await axios.get(`http://localhost:8800/admin/getadminedit/${admin.id}`)
      const data = await response.data;
      setData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        country:data.country,
        description:data.description
      })
      console.log(setData);
    }catch(err){
      console.log(err)
    }
  },[admin.id])

  useEffect(()=>{
    fetch();
  },[fetch])

  const handleUpdate = async()=>{
    const updateData = {
      name:data.name,
      phone:data.phone,
      email:data.email,
      country:data.country,
      description:data.description
    }
    try{
      const response = await axios.put(`http://localhost:8800/admin/putprofile/${admin.id}`,updateData)
      if (response.status == 200){
        const admin= response.data.userProfile;
        localStorage.setItem("admins", JSON.stringify(admin))
      }
      window.location.href="/profile"
    }catch(err){
      console.log(err);
    }
  }

  const Onchangeupdate = (e)=>{
    const {name, value} = e.target;
    setData((prevState)=>({
      ...prevState,
      [name]:value,
    }));
   }

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon onClick={() => setShow(true)}>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
          {renderItems}
          <SoftBox display="flex" py={1} pr={2}>
            {/* <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </SoftTypography> */}
            {renderSocial}
          </SoftBox>
        </SoftBox>
      </SoftBox>
      
      <Modal
      onHide={handleClose}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Profile Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Description</h5>
        <input value={data.description} className="m-3" name="description" onChange={(e)=> Onchangeupdate(e)} style={{width:"100%", background:"transparent", border:"none", outline:"none"}}/>
         <h5>Name</h5>
        <input value={data.name}  name="name" onChange={(e)=>Onchangeupdate(e)} className="m-3" style={{width:"100%", background:"transparent", border:"none", outline:"none"}}/>
         <h5>Mobile</h5>
        <input value={data.phone} name="phone" onChange={(e)=>Onchangeupdate(e)} className="m-3" style={{width:"100%", background:"transparent", border:"none", outline:"none"}}/>
        <h5>Email</h5>
        <input value={data.email} name="email" onChange={(e)=>Onchangeupdate(e)} className="m-3" style={{width:"100%", background:"transparent", border:"none", outline:"none"}}/>
        <h5>Location</h5>
        <input value={data.country} name="country" onChange={(e)=>Onchangeupdate(e)} className="m-3" style={{width:"100%", background:"transparent", border:"none", outline:"none"}}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate}>Save</Button>
        
      </Modal.Footer>
     
    </Modal>
      
    </Card>
    
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
