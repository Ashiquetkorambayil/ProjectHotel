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
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, Modal, Slide, Typography,  } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Backdrop from "@mui/material/Backdrop";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FaPlus } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdDelete, MdEditSquare } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Data
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
 const [ open, setOpen] = useState(false)
 const [postData, setPostData] = useState({
  cuisine:'',
  description:''
 })
 const [getData, setGetData] = useState([])
 const [on, setOn]= useState(false)
 const [postImage, setPostImage] = useState('')
 const [uid, setUid] = useState('')
 const [dopen, setDOpen] = useState(false)
 const [getDataForUpdate , setGetDataForUpdate] = useState({
  cuisine:'',
  description:''
 })
 const [getDataForView, SetGetDataForView] = useState('')
 
 const [updateImage, setUpadateImage] = useState('')
 const handleOpen =()=>setOpen(true)
 const handleClose = ()=> setOpen(false)
 const handleOff = ()=> setOn(false)

 const handleDClose = ()=> setDOpen(false)
 const handlePost = (e)=>{
  const {name, value} = e.target
  setPostData((prevstate)=>({...prevstate,[name]:value}))
 }

 const handleUpdateChange = (e)=>{
        const {name, value} = e.target
        setGetDataForUpdate((prevstate)=>({...prevstate, [name]:value}))
        
 }

 const createCuisine = async()=>{
  const formdata = new FormData()
  formdata.append('cuisine', postData.cuisine);
  formdata.append('description', postData.description);
  formdata.append('image', postImage)
  try{
    // console.log(data,"thedata of frontend")
    await axios.post('http://localhost:8800/admin/postcusine', formdata)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
 }

 useEffect(()=>{
  const fetch = async()=>{
    
      const response = await axios.get('http://localhost:8800/admin/getcuisine')
      const data = response.data

      setGetData(data)
     
      
   
  }

  fetch()
 },[])

 const handleDelete = async(id)=>{
  try{
    await axios.delete(`http://localhost:8800/admin/deletecuisine/${id}`)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}

const handleOn = async(id)=> {
  setOn(true)
  setUid(id)
  try{
const response = await axios.get(`http://localhost:8800/admin/getcusinebyid/${id}`)
const data = response.data
setGetDataForUpdate({
  cuisine:data.cuisine,
  description:data.description
})
  }catch(err){
    console.log(err)
  }

}

const handleUpdate = async()=>{
  const formdata = new FormData()
  formdata.append('image', updateImage )
  formdata.append('cuisine', getDataForUpdate.cuisine)
  formdata.append('description', getDataForUpdate.description)
  try{
    
    await axios.put(`http://localhost:8800/admin/updatecuisine/${uid}`,formdata, {
      headers: {"Content-Type": "multipart/form-data",},})
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}
const handleDOpen = async(id)=> {
  setDOpen(true)
  try{
    const response = await axios.get(`http://localhost:8800/admin/getcusinebyid/${id}`)
    const data = response.data
    SetGetDataForView(data)
    console.log(data,"kkkkk")
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
              <SoftTypography variant="h6"></SoftTypography>
              <SoftTypography><h5 style={{color:'#F5F5F5', fontWeight:'100'}}>Cusine Table</h5></SoftTypography>
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
                      src={`http://localhost:8800/${items.image}`}
                      
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
                    {items.cuisine}
                  </div>
                   <div
                    style={{
                      borderRadius: "16px",
                      width: "20%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  ><Link to={`/dishes/${items._id}`}>
                    <FaPlus
                  cursor="pointer"
                  className="mx-2"
                  style={{color:'#F5F5F5'}}
                
                /></Link>
                    
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
                
              {/* ))} */}
            </SoftBox>
          </Card>
        </SoftBox>
       </SoftBox>
      {/* creation */}
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
              Add Cuisine
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
              name="cuisine"
              onChange={handlePost}
              // value={specification}
              // onChange={(e)=>setSpecification(e.target.value)}
              placeholder="Cuisine"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              name="description"
              onChange={handlePost}
              // value={description}
              // onChange={(e)=>setDescription(e.target.value)}
              placeholder="Description"
            />

            <Button onClick={createCuisine}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      {/* Updation */}

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
              Update the Cuisine
            </Typography>
            <input
              name="image"
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={(e)=>setUpadateImage(e.target.files[0])}
            
            />
          
            <input
              className="my-2"
              style={{ width: "100%" }}
              name="cuisine"
             value={getDataForUpdate.cuisine}
              onChange={handleUpdateChange}
              placeholder="Cuisine"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              name="description"
             value={getDataForUpdate.description}
             onChange={handleUpdateChange}
              placeholder="Description"
            />

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Fade>
      </Modal>

{/* view */}
{getDataForView && (
  <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{getDataForView.cuisine}</DialogTitle>
        <DialogContent>
        <DialogContentText>
        <img style={{width:'50%'}} src={`http://localhost:8800/${getDataForView.image}`}/>
         </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
           {getDataForView.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDClose}>Close</Button>
        
        </DialogActions>
      </Dialog>

)}

    </DashboardLayout>
  );
}

export default Tables;
