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
import { Box, Button, Fade, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";



import axios from "axios";
import { MdDelete, MdEditSquare, MdOutlineArrowBackIos } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


function Tables() {
    const [description, setDescription] = useState("");
const [specification, setSpecification] = useState('');
const [getSpecification, setGetSpecification] = useState([])
const [data, setData] = useState({
    specification:'',
    description:''
})
  // const {id} = useParams()
  const navigete = useNavigate();
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const [uid, setUid] = useState('')
  

  const handleOff = () => setOn(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const goback = () => navigete("/room");
 

const handlePost = async()=>{
    const data = {
        specification:specification,
        description:description
    }
    try{
        await axios.post('http://localhost:8800/admin/postspecification',data)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}
 
 useEffect(()=>{
    const fetch = async()=>{
        const response = await axios.get('http://localhost:8800/admin/getspecification')
        const data = response.data
        setGetSpecification(data)
        
    }
    fetch()
 },[])

  const handleDelete = async(id)=>{
    try{
        await axios.delete(`http://localhost:8800/admin/deletespecification/${id}`)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  }

  const handleOn = async(id)=>{
    setOn(true)
    setUid(id)
    try{
        const response = await axios.get(`http://localhost:8800/admin/getspecificationbyid/${id}`)
        const data = response.data
        console.log(data)
        // window.location.reload()
        setData({
            specification:data.specification,
            description:data.description
        })
    }catch(err){
        console.log(err)
    }

  }

  const handleOnChange = (e)=>{
    const {name , value} = e.target
    setData((prevstate)=>({...prevstate, [name]:value}))
  }

  const handleUpdate = async()=>{
    const update = {
        specification:data.specification,
        description:data.description
    }
    try{
        await axios.put(`http://localhost:8800/admin/updatespecification/${uid}`,update)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  }
 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ backgroundColor: "black" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography>
                {" "}
                <Button
                  variant="contained"
                  disableElevation
                  style={{ backgroundColor: "black" }}
                  onClick={goback}
                >
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} onClick={goback} />
                </Button>
              </SoftTypography>
              <SoftTypography color="info">Room Specification</SoftTypography>
              <SoftTypography>
              <FaPlus style={{color:'white'}} cursor='pointe' onClick={handleOpen}/>
               
              </SoftTypography>
            </SoftBox>
            <SoftBox style={{ display: "grid", placeItems: "center" }}>
              {getSpecification.map((items, index)=>(

           
                <div
                  key={index}
                  style={{
                    width: "95%",
                    height: "60px",
                    backgroundColor: "white",
                    marginBottom: "5px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
                    {items.specification}
                  </div>
                  {/* <div><img style={{width:'10%'}} src={`http://localhost:8800/images/${items.image[0]}`}/></div> */}
                  {/* <div
                     style={{
                       borderRadius: "16px",
                       width: "20%",
                       height: "100%",
                       display: "grid",
                       placeItems: "center",
                     }}
                   >
                     <LuView cursor="pointer" className="mx-2" />
                   </div> */}
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
                      className="mx-2"
                      onClick={()=>handleOn(items._id)}
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
                      onClick={()=>handleDelete(items._id)}
                    />
                  </div>
                </div>
                 ))}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}

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
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleClose} />
              </IconButton>
              Specification
            </Typography>
            {/* <input
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={handleImage}
              multiple
            /> */}
            <input
              className="my-2"
              style={{ width: "100%" }}
              value={specification}
              onChange={(e)=>setSpecification(e.target.value)}
              placeholder="Specification"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Description"
            />

            <Button onClick={handlePost}>Save</Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleOff} />
              </IconButton>
              Specification
            </Typography>
           
            <input
              className="my-2"
              style={{ width: "100%" }}
              value={data.specification}
              placeholder="Type of room"
              name="specification"
              onChange={handleOnChange}
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              value={data.description}
              placeholder="Description"
              name="description"
              onChange={handleOnChange}
            />

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
