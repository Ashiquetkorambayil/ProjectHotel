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
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// Data

import { useEffect, useState } from "react";

import axios from "axios";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useParams } from "react-router-dom";
import SoftInput from "components/SoftInput";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Tables() {

//   const { columns, rows } = authorsTableData;

  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[uid, setUid]=useState("")
  const handleOff = () => setOn(false);
  const [operations, setOperations] = useState('');
  const [updateOperation , setUpdateOperation] = useState('');
  const [getOperataions , setGetOperations] = useState([]);
  const [search, setSearch] = useState('')
// console.log('hiiiiii')
  const handledata = async()=>{
    // console.log('helo')
    const upload ={
        operations:operations
    }
    try{
        await axios.post('http://localhost:8800/admin/postoperations', upload);
        window.location.href='/operations'
    }catch(err){
        console.log(err)
    }
  }
  
  useEffect(()=>{
  
    const fetch = async()=>{
        
        try{
            console.log('999999999999', search)
           const response =  await axios.get(`http://localhost:8800/admin/getoperations/?search=${search}`)
            setGetOperations(response.data)
            
        }catch(err){
            console.log(err)
        }
    }
    fetch()
    

  },[search])

    

  const handleDelete = async(id)=>{
    try{
        if (window.confirm("Are you sure to delete this operation?")) {
 
        await axios.delete(`http://localhost:8800/admin/deleteoperations/${id}`)
        window.location.reload();
    }
    }catch(err){
        console.log(err)
    }
  }

  const handleOn = async(id) => {
    setOn(true);
    setUid(id);
    try{
       
    const response = await axios.get(`http://localhost:8800/admin/getoperationsbyid/${id}`)
    console.log(response,"responseeeeeee")
    setUpdateOperation(response.data.operations);
    
    }catch(err){
        console.log(err)
    }
    }

    const handleUpdate = async()=>{
        const update = {
            updateOperation:updateOperation
        }
        // console.log(uid,"11111111111111111111111")
        try{
        await axios.put(`http://localhost:8800/admin/updateoperations/${uid}`, update)
        .then((response)=>{
            console.log(response)
        })
        window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{backgroundColor:"black"}}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6" color="info" >Operation Table</SoftTypography>
             <SoftTypography><SoftInput placeholder="Search..." onChange={(e)=> setSearch(e.target.value)} /></SoftTypography> 
              <Button onClick={handleOpen}>Add Operations</Button>
            </SoftBox>
            
          <SoftBox style={{display:"grid", placeItems:'center'}}>
     {getOperataions.map((items , index)=>(

   
             <div key={index} style={{width:'95%', height:"60px", backgroundColor:'white',marginBottom:'5px', borderRadius:'16px',display:'flex', alignItems:'center', justifyContent:'center'}}>
             <div style={{borderRadius:'16px',width:'60%', height:'100%', color:'black', display:'grid', placeItems:'center'}}>{items.operations}</div>          
             <div style={{borderRadius:'16px',width:'20%', height:'100%', display:'grid', placeItems:'center'}}><MdEditSquare onClick={()=>handleOn(items._id)} cursor='pointer' className="mx-2" /></div>          
             <div style={{borderRadius:'16px',width:'20%', height:'100%', display:'grid', placeItems:'center'}}><MdDelete onClick={()=>handleDelete(items._id)} cursor="pointer" className="mx-2" /></div>          
           </div>
          ))}
             
               
            </SoftBox>
           
          </Card>
        </SoftBox>
        
      </SoftBox>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
              OPERATION
            </Typography>
           <input value={operations} onChange={(e)=>setOperations(e.target.value)}  />
           <Button onClick={handledata}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={on}
        onClose={handleOff}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={on}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOff}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
              OPERATION
            </Typography>
           <input value={updateOperation}  onChange={(e)=> setUpdateOperation(e.target.value)}/>
           <Button onClick={handleUpdate}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
