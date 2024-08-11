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
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, Modal, Slide, Typography } from "@mui/material";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Backdrop from "@mui/material/Backdrop";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Button } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { FaPlus } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdDelete, MdEditSquare, MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { resetWarningCache } from "prop-types";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#363062",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Tables() {
const navigate = useNavigate()
const {id} = useParams()
const [open, setOpen] = useState(false)
const [on, setOn] = useState(false)
const [uid, setUid] = useState('')
const [dOpen, setDOpen] = useState(false)
const [getDataForView, setGetDataForView] = useState('')
const [postData , setPostData] = useState({
    dish:'',
    description:'',
    fullPrice:'',
    halfPrice:'',
    quarterPrice:''
})
const [getByIdData, setGetByIdData] = useState({
  dish:'',
  description:'',
  fullPrice:'',
  halfPrice:'',
  quarterPrice:''
})
const [updImage, setUpdImage] = useState('')
const [postImage, setPostImage] = useState('')
const [ getData , setGetData] = useState([])
const goback = ()=> navigate('/cuisine')
const handleOpen = ()=> setOpen(true)
const handleClose = ()=> setOpen(false)

const handleDOff = ()=> setDOpen(false)
const handleOff = ()=>setOn(false)
const handlePostData = (e)=>{
    const {name , value} = e.target;
    setPostData((prevstate)=>({...prevstate, [name]:value}))
    
}

const handleUpdData = (e)=>{
  const{name,value} = e.target
  setGetByIdData((prevstate)=>({...prevstate,[name]:value}))
  console.log(getByIdData,'dd')
}

const postDishes = async()=>{
    console.log(postData,"data is posting")
    const formdata = new FormData()
    formdata.append('dishId',id)
    formdata.append('dish',postData.dish)
    formdata.append('description', postData.description)
    formdata.append('image',postImage)
    formdata.append('fullPrice', postData.fullPrice)
    formdata.append('halfPrice', postData.halfPrice)
    formdata.append('quarterPrice', postData.quarterPrice)
    try{
       
        await axios.post('http://localhost:8800/admin/postdishes', formdata)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}
useEffect(()=>{
   
        const fetch = async()=>{
            const response = await axios.get(`http://localhost:8800/admin/getdish/${id}`)
            const data = response.data
            setGetData(data)
          
        }
    fetch()
},[])

const handleDelete = async(id)=>{
  try{
    await axios.delete(`http://localhost:8800/admin/deletedishes/${id}`)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}

const handleOn = async(id)=> {
  setOn(true)
  setUid(id)
   try{
      const response = await axios.get(`http://localhost:8800/admin/getdishesbyid/${id}`)
      const data = response.data
      setGetByIdData({
        dish:data.dish,
        description:data.description,
        fullPrice:data.fullPrice,
        halfPrice:data.halfPrice,
        quarterPrice:data.quarterPrice
      })
      console.log(data,"data for get by id")
   }catch(err){
    console.log(err)
   }
}

const handleUpdate = async()=>{
  const formdata = new FormData()
  formdata.append('dish',getByIdData.dish);
  formdata.append('description',getByIdData.description);
  formdata.append('image',updImage)
  formdata.append('fullPrice',getByIdData.fullPrice)
  formdata.append('halfPrice',getByIdData.halfPrice)
  formdata.append('quarterPrice',getByIdData.quarterPrice)
  
  try{
    console.log(formdata,"formdata")
    await axios.put(`http://localhost:8800/admin/updatedishes/${uid}`, formdata)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}

const handleDOpen = async(id)=> {
  setDOpen(true)
  try{
    const response = await axios.get(`http://localhost:8800/admin/getdishforview/${id}`)
    const data = response.data
    setGetDataForView(data)
  }catch(err){
    console.log(err)
  }
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{backgroundColor:'#363062'}}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">
                {" "}
                <Button
                  variant="contained"
                  disableElevation
                  style={{ backgroundColor: "#363062" }}
                  onClick={goback}
                >
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} onClick={goback} />
                </Button></SoftTypography>
            <SoftTypography><h5 style={{color:'#F5F5F5', fontWeight:'100'}}>Add your type of cuisine</h5></SoftTypography>
              <SoftTypography><FaPlus style={{color:'#F5F5F5'}} cursor='pointer' onClick={handleOpen}/></SoftTypography>
            </SoftBox>
            <SoftBox style={{ display: "grid", placeItems: "center" }}>
                {getData.map((items, index)=>(
                    <div
                  key={index}
                    style={{
                      width: "95%",
                      height: "60px",
                      backgroundColor: "#4D4C7D",
                      marginBottom: "5px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "15%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginLeft: "1.5px",
                      }}
                    >
                      <Avatar
                        style={{ width: "100%", height: "95%", borderRadius: "13px" }}
                        src={`http://localhost:8800/images/${items.image}`}
                        
                      />
                    </div>
                    <div
                      style={{
                        borderRadius: "16px",
                        width: "60%",
                        height: "100%",
                        color: "black",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                {items.dish}
                    </div>
                    
                    <div
                      style={{
                        borderRadius: "16px",
                        width: "20%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <LuView
                        cursor="pointer"
                        className="mx-2"
                        style={{color:'#F5F5F5'}}
                        onClick={() => handleDOpen(items._id)}
                      />
                    </div>
                    <div
                      style={{
                        borderRadius: "16px",
                        width: "20%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <MdEditSquare
                        cursor="pointer"
                        style={{color:'#F5F5F5'}}
                        className="mx-2"
                        onClick={() => handleOn(items._id)}
                      />
                    </div>
  
                    <div
                      style={{
                        borderRadius: "16px",
                        width: "20%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <MdDelete
                        cursor="pointer"
                        className="mx-2"
                        style={{color:'#F5F5F5'}}
                        onClick={() => handleDelete(items._id)}
                      />
                    </div>
                  </div>

                ))}
            
            </SoftBox>
          </Card>
        </SoftBox>
      
      </SoftBox>

      {/* creating */}

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
            <Typography style={{color:'#F5F5F5'}} id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" style={{color:'#F5F5F5'}} aria-label="close">
                <CloseIcon onClick={handleClose} />
              </IconButton>
              Add the Dish
            </Typography>
            <input
              name="image"
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={(e)=>setPostImage(e.target.files[0])}
            
            />
          
            <input
              className="my-2"
              style={{ width: "100%" }}
              name="dish"
           
              onChange={handlePostData}
              placeholder="Dish"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              name="description"
         
              onChange={handlePostData}
              placeholder="Description"
            />
            <p>Full portion:-</p>
            <input type="number" name="fullPrice" onChange={handlePostData} />
            <p>Half portion:-</p>
            <input type="number" name="halfPrice" onChange={handlePostData} />
            <p>Quarter portion:-</p>
            <input type="number" name="quarterPrice" onChange={handlePostData} />


            <Button onClick={postDishes}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      {/* update */}

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
            <Typography style={{color:'#F5F5F5'}} id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" style={{color:'#F5F5F5'}} aria-label="close">
                <CloseIcon onClick={handleOff} />
              </IconButton>
              Edit the Dish
            </Typography>
            <input
              name="image"
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={(e)=>setUpdImage(e.target.files[0])}
            
            />
          
            <input
              className="my-2"
              style={{ width: "100%" }}
              name="dish"
              value={getByIdData.dish}
              onChange={handleUpdData}
              placeholder="Dish"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              name="description"
              value={getByIdData.description}
             onChange={handleUpdData}
              placeholder="Description"
            />
             <p>Full portion:-</p>
            <input type="number" value={getByIdData.fullPrice} name="fullPrice" onChange={handleUpdData} />
            <p>Half portion:-</p>
            <input type="number" value={getByIdData.halfPrice} name="halfPrice" onChange={handleUpdData} />
            <p>Quarter portion:-</p>
            <input type="number" value={getByIdData.quarterPrice} name="quarterPrice" onChange={handleUpdData} />

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Fade>
      </Modal>

      {/* for view */}
{getDataForView && (
  <Dialog
  open={dOpen}
  TransitionComponent={Transition}
  keepMounted
  onClose={handleDOff}
  aria-describedby="alert-dialog-slide-description"
>
  <DialogTitle>{getDataForView.dish}</DialogTitle>
  <DialogContent>
  <DialogContentText>
  <img style={{width:'50%'}} src={`http://localhost:8800/images/${getDataForView.image}`}/>
   </DialogContentText>
    <DialogContentText id="alert-dialog-slide-description">
{getDataForView.description}<br/>
 Full Price :-{getDataForView.fullPrice}<br/>
Half Price:-{getDataForView.halfPrice}<br/>
Quarter Price:-{getDataForView.quarterPrice}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDOff}>Close</Button>
  
  </DialogActions>
</Dialog>
)}
      

     
    </DashboardLayout>
  );
}

export default Tables;
