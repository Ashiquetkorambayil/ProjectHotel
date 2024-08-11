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
    Dialog,
    Divider,
    Fade,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Slide,
    TextareaAutosize,
    Toolbar,
    Typography,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import Card from "@mui/material/Card";
  import Backdrop from "@mui/material/Backdrop";
  
  // Soft UI Dashboard React components
  import SoftBox from "components/SoftBox";
  import SoftTypography from "components/SoftTypography";
  
  // Soft UI Dashboard React examples
  import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "examples/Navbars/DashboardNavbar";
  // import Footer from "examples/Footer";
  import Table from "examples/Tables/Table";
  
  // Data
  import authorsTableData from "layouts/tables/data/authorsTableData";
  import projectsTableData from "layouts/tables/data/projectsTableData";
  import React, { useEffect, useState } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import { SettingsAccessibilityTwoTone, SettingsInputSvideo } from "@mui/icons-material";
  import { MdDelete, MdEditSquare, MdOutlineArrowBackIos } from "react-icons/md";
  import { LuView } from "react-icons/lu";
  import Avatar from "@mui/material/Avatar";
  import { Spinner, Tooltip } from "react-bootstrap";
  import { MdOutlineEventAvailable } from "react-icons/md";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCircle } from '@fortawesome/free-solid-svg-icons';

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
    const {id} = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [roomNumber, setRoomNumber]= useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [roomType, setRoomType] = useState([])
    const [getRoomSlots, setGetRoomSlots] = useState([]);
    const [getRoomSlotsById, setGetRoomSlotsById] = useState({
      roomNumber:'',
      type:'',
      price:'',
      offerPrice:''
    })
    const [getRoomsForUpdate, setGetRoomsForUpdate] =useState([])
    const [on, setOn] = useState(false)
    const [uId, setUid] = useState('')

    
    const handleOff = ()=> setOn(false)
    const handleClose = ()=> setOpen(false)
    
    const goback =()=> navigate('/hotel')

    const handleOpen = async()=> {
        setOpen(true)
      try{
        const response = await axios.get('http://localhost:8800/admin/getroom')
        const data = response.data
        setRoomType(data)
      }catch(err){
        console.log(err)
      }
    }
    
    const handlePost = async()=>{
        const data = {
            roomNumber: roomNumber,
            type: type,
            price: price,
            offerPrice: offerPrice,
            hotelId: id
        }

        await axios.post('http://localhost:8800/admin/postroomslot',data)
        window.location.reload()

    }

    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(`http://localhost:8800/admin/getroomslots/${id}`)
            const data = response.data
            setGetRoomSlots(data)
            // console.log(response.data,"reposnse data of room slots")
        }
        fetch()
    },[])

    const handleOn = async(id)=> {
      setOn(true)
      setUid(id)
    try{
      const response = await axios.get(`http://localhost:8800/admin/getroomslotbyid/${id}`)
      const data = response.data
      setGetRoomSlotsById({
        roomNumber:data.roomNumber,
        type:data.type,
        price:data.price,
        offerPrice:data.price
      })
    

    }catch(err){
      console.log(err)
    }
    try{
      const response = await axios.get('http://localhost:8800/admin/getroom')
      const data = response.data
      setGetRoomsForUpdate(data)
    }catch(err){
      console.log(err)
    }
    }
    
    const handleUpdate  = (e)=>{
      const {name, value} = e.target;
      setGetRoomSlotsById((prevstate)=>({...prevstate, [name]:value}))
    }
    
    const roomSlotUpdate =async()=>{
      const update = {
        roomNumber:getRoomSlotsById.roomNumber,
        type:getRoomSlotsById.type,
        price:getRoomSlotsById.price,
        offerPrice:getRoomSlotsById.offerPrice
      }
      try{
        await axios.put(`http://localhost:8800/admin/updateroomslots/${uId}`,update)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }

    const deleteRoomSlots = async(id)=>{
    
      try{
       if(window.confirm('Are you sure to delete the room slot')){
         await axios.delete(`http://localhost:8800/admin/deleteroomslots/${id}`)
        window.location.reload()
       }
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
                <Button variant="contained" disableElevation style={{ backgroundColor: "black" }} onClick={goback}>
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} onClick={goback}/>
                </Button>
                </SoftTypography>
               
                <SoftTypography>Rooms</SoftTypography>
                <SoftTypography color="info" variant="h6">
                  {/* <Link to='/type'><Button style={{color:'white'}}>Type</Button></Link>  */}
                  
                    <Button onClick={handleOpen}>Add Room Slot</Button>
                  
                </SoftTypography>
              </SoftBox>
              <SoftBox style={{ display: "grid", placeItems: "center" }}>
              {getRoomSlots.map((items,index)=>(
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
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "1.5px",
                  }}
                >
                 {items.roomNumber}
                </div>
                <div
                  style={{
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "1.5px",
                  }}
                >
                 {items.type}
                </div>
                <div
                  style={{
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "1.5px",
                  }}
                >
                    <p style={{textDecoration:'line-through'}}>₹{items.price}</p>
                 
                </div>
                <div
                  style={{
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "1.5px",
                  }}
                >
                 <p>₹{items.offerPrice}</p>
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
                    
                    <FontAwesomeIcon className="iconofroom" icon={faCircle} style={{color: "#ff0000",}} />
                    <FontAwesomeIcon className="iconofroom" icon={faCircle} style={{color: "#37ff00",}} />
                    <FontAwesomeIcon className="iconofroom" icon={faCircle} style={{color: "#ffd43b",}} />
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
                    
                <Link to={`/availability/${items._id}`}><MdOutlineEventAvailable
                    cursor="pointer"
                    className="mx-2"
                   
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
                   onClick={()=>deleteRoomSlots(items._id)}
                  />
                </div>
              </div>
              ))}
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
      {/* Add room slots  */}

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
              Room
            </Typography>
            <input
              name="roomnumber"
              type="number"
              className="mb-2"
              placeholder="Room Number"
              style={{ width: "100%" }}
              onChange={(e)=>setRoomNumber(e.target.value)}
            />
            
            <select
              className="mb-2"
              name="specification"
              style={{ width: "100%" }}
            onChange={(e)=>setType(e.target.value)}         
            >
              <option>Select Type</option>
           {roomType.map((items,index)=>(
            <option key={index}>
                 {items.type}
            </option>
           ))}
                
            </select>
             <input
              name="Price"
              type="number"
              className="mb-2"
              placeholder="Price"
              style={{ width: "100%" }}
              onChange={(e)=> setPrice(e.target.value)}
            />
             <input
              name="offerprice"
              type="number"
              className="mb-2"
              placeholder="Offer Price"
              style={{ width: "100%" }}
              onChange={(e)=> setOfferPrice(e.target.value)}
            />
            <Button onClick={handlePost}>Save</Button>
          </Box>
        </Fade>
      </Modal>
       
       {/* Edit  */}

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
              Room
            </Typography>
            <input
              name="roomNumber"
              type="number"
              className="mb-2"
              placeholder="Room Number"
              style={{ width: "100%" }}
              value={getRoomSlotsById.roomNumber}
              onChange={(e)=>handleUpdate(e)}
            />
            
            <select
              className="mb-2"
              name="type"
              style={{ width: "100%" }}
              value={getRoomSlotsById.type}
            onChange={(e)=>handleUpdate(e)}         
            >
              <option>Select Type</option>
           {getRoomsForUpdate.map((items,index)=>(
            <option key={index}>
                 {items.type}
            </option>
           ))} 
                
            </select>
             <input
              name="price"
              type="number"
              className="mb-2"
              placeholder="Price"
              style={{ width: "100%" }}
             value={getRoomSlotsById.price}
              onChange={(e)=>handleUpdate(e)}
            />
             <input
              name="offerPrice"
              type="number"
              className="mb-2"
              placeholder="Offer Price"
              style={{ width: "100%" }}
              value={getRoomSlotsById.offerPrice}
              onChange={(e)=>handleUpdate(e)}
            />
            <Button onClick={roomSlotUpdate} >Update</Button>
          </Box>
        </Fade>
      </Modal>

      </DashboardLayout>
    );
  }
  
  export default Tables;
  