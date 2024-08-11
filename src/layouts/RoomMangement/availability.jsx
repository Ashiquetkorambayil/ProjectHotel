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
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Radio,
  RadioGroup,
  Slide,
  TextareaAutosize,
  Toolbar,
  Typography,
} from "@mui/material";

import Card from "@mui/material/Card";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// Data
// import EventCalendar from 'react-event-calendar'
import React, { useEffect, useRef, useState } from "react";


import { Calendar } from "react-date-range";
import format from "date-fns/format";
import axios from "axios";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Tables() {
  // const [status, setStatus] = useState('')
  // const [calendar, setCalendar] = useState([])
  // const [open, setOpen] = useState(false)
  // const refOne = useRef(null)
  const events = [
    {
      start: '2015-07-20',
      end: '2015-07-02',
      eventClasses: 'optionalEvent', // <-- Missing comma here
      title: 'test event',
      description: 'This is a test description of an event',
    },
    {
      start: '2015-07-19',
      end: '2015-07-25',
      title: 'test event',
      description: 'This is a test description of an event',
      data: 'you can add whatever random data you may want to use later', // <-- Fixed "what ever" typo
    },
  ];

 
  
  // const postStatus = async()=>{
  //   const data = {
  //     status:status,
  //     calendar: calendar
  //   }
  //   try{
  //     await axios.post('http://localhost:8800/admin/poststatus', data)
  //     window.location.reload()
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  // const handleSelect=(date)=>{
  //   // console.log(date)
  //   // console.log(format(date,'dd/MM/yyyy'))
  //   setCalendar(format(date,'dd/MM/yyyy'))
  // }
  // useEffect(() => {
  //   document.addEventListener('click',hideOnClickOutSide, true)
  // }, [])
  
  // const hideOnClickOutSide = (e)=>{
  //   if(refOne.current && !refOne.current.contains(e.target)){
  //     setOpen(false)
  //   }
  // }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card className="m-2" style={{ backgroundColor: "black" }}>
            <SoftBox style={{ height: "100vh" }}>
             
              <form action="" style={{display:'flex', alignItems:'start', flexDirection:'column', margin:'10px', backgroundColor:'cornflowerblue', padding:'20px', width:'40%'}}>
              {/* <DatePicker value={} onChange={handleChange} multiple plugins={<DatePanel/>} /> */}
              {/* <input 
              value={calendar} 
              readOnly
              className="inputBox"
              onClick={()=> setOpen(true)}
              />
              <div ref={refOne}>
              {open && <Calendar
              date={new Date()}
              onChange={handleSelect}
              className="calendarElement"
              /> }
              </div> */}
               
              <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="available"
        name="radio-buttons-group"
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
      >
        <FormControlLabel value="available" control={<Radio />} label="Available" />
        <FormControlLabel value="notAvailable" control={<Radio />} label="Not available" />
        <FormControlLabel value="booked" control={<Radio />} label="Booked" />
      </RadioGroup>
    </FormControl>

     

      <Button >Submit</Button>
      </form>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tables;
