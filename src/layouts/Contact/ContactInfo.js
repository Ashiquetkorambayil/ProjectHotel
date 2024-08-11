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
  import { Link } from "react-router-dom";
  import axios from "axios";
  import { SettingsAccessibilityTwoTone, SettingsInputSvideo } from "@mui/icons-material";
  import { MdDelete, MdEditSquare } from "react-icons/md";
  import { LuView } from "react-icons/lu";
  import Avatar from "@mui/material/Avatar";
  import { Spinner } from "react-bootstrap";
  
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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  function Tables() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [getSpecification, setGetSpecification] = useState([]);
    const [getType, setGetType] = useState([]);
    const [specification, setSpecification] = useState([]);
  
    const [specificationData, setSpecificationData]= useState([])
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const [updImage, setUpdImage] = useState([]);
    const [room, setRoom] = useState([]);
    const [getRoom, setGetRoom] = useState("");
    const [getRoomById, setGetRoomById] = useState({
      type:'',
      specification:''
    })
    const [getSpecificationOnId, setGetSpecificationOnId] = useState([])
    const [getSpeceficationById, setGetSpecificationById] = useState([])
   const [uid, setUid] = useState()
    const closeDialog = () => setDialogOpen(false);
    const handleOff = () => setOn(false);
  
    const handleInput1Change = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue) {
        if (!specification.includes(selectedValue)) {
          setSpecification([...specification, selectedValue]);
        }
      }
    };
  
    const deleteItem = (amenityId) => {
      const updatedValues = specification.filter((value) => value !== amenityId);
      setSpecification(updatedValues);
    };
  
    const handleOpen = async () => {
      setOpen(true);
      try {
        const response = await axios.get("http://localhost:8800/admin/getspecification");
        const data = response.data;
        setGetSpecification(data);
        console.log(data, "9999");
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get("http://localhost:8800/admin/gettype");
        const data = response.data;
  
        setGetType(data);
      } catch (err) {
        console.log(err);
      }
    };
    const handleClose = () => setOpen(false);
  
    const handleImage = (e) => {
      const setUpImage = Array.from(e.target.files);
      setImage(setUpImage);
    };
  
    const handleUpdImage = (e)=>{
      const steImgage = Array.from(e.target.files)
      setUpdImage(steImgage)
    }
  
    const handlePost = async () => {
      const formdata = new FormData();
      for (let i = 0; i < image.length; i++) {
        formdata.append("image", image[i]);
      }
      formdata.append("type", type);
      formdata.append("specification", specification);
      formdata.append("description", description);
  
      try {
        await axios.post("http://localhost:8800/admin/postroom", formdata);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      const fetch = async () => {
        try {
          const response = await axios.get("http://localhost:8800/admin/getroom");
          const data = response.data;
          setRoom(data);
          // console.log(data, "oooooooooooooooooooooooooooo");
        } catch (err) {
          console.log(err);
        }
      };
      fetch();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        if (window.confirm("are you sure to delete the room")) {
          await axios.delete(`http://localhost:8800/admin/deleteroom/${id}`);
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const openDialog = async (id) => {
     
      setDialogOpen(true);
  
      try {
        const response = await axios.get(`http://localhost:8800/admin/getroombyid/${id}`);
        const data = response.data;
        setGetRoom(data);
      //   console.log(data,"data from backend")
      } catch (err) {
        console.log(err);
      }
  
      try{
          const response = await axios.get("http://localhost:8800/admin/getspecification");
          const data = response.data
          setSpecificationData(data)
      }catch(err){
          console.log(err)
      }
    };
  
    
  //   console.log("getRoom.specification:", getRoom.specification);
  // console.log("getRoom:", getRoom);
  // console.log("getSpecification:", specificationData);
  
  function getAmenitiesNames(amenityIds) {
      if (!amenityIds || amenityIds.length === 0) {
        return []; // Return an empty array if amenityIds is undefined or empty
      }
  
      return amenityIds.map((amenityId) => {
        const amenity = specificationData.find((amenityItem) => amenityItem._id === amenityId);
        return amenity ? amenity.specification : "";
      });
    }
  
    const handleOn = async(id) => {
      setUid(id)
      setOn(true)
      try {
          const response = await axios.get(`http://localhost:8800/admin/getroombyid/${id}`);
          const data = response.data;
          setGetRoomById({
              type:data.type,
              description:data.description
          });
          console.log(data,"data from backend")
          setGetSpecificationOnId(data.specification)
        } catch (err) {
          console.log(err);
        }
        try{
          const response = await axios.get("http://localhost:8800/admin/getspecification");
          const data = response.data
          setGetSpecificationById(data)
          // console.log(data,"data for get by id")
          
      }catch(err){
          console.log(err)
      }
  }
  
  const deleteOneItem = (amenityId) => {
      const updatedValues = getSpecificationOnId.filter((value) => value !== amenityId);
      setGetSpecificationOnId(updatedValues);
    };
  
    const handleInputChange = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue) {
        if (!getSpecificationOnId.includes(selectedValue)) {
          setGetSpecificationOnId([...getSpecificationOnId, selectedValue]);
        }
      }
    };
  
    const handleChangeOnUpdate = (e)=>{
      const {name, value} = e.target;
      setGetRoomById((prevstate)=>({...prevstate,[name]:value}))
  
    }
  
    const handleUpdate = async()=>{
      console.log(uid,'lkjhgfdsasdfghjkljhgfdsdfghj')
      const formdata = new FormData();
      for(let i=0 ; i<updImage.length; i++){
          formdata.append('image', updImage[i])
      }
      formdata.append('type',getRoomById.type)
      formdata.append('description', getRoomById.description)
      formdata.append('specification', getSpecificationOnId)
     
      try{
          await axios.put(`http://localhost:8800/admin/updateroom/${uid}`,formdata)
          window.location.reload()
          console.log(formdata,"dddfasdfasdf")
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
                <SoftTypography color="info" variant="h6">
                  {/* <Link to='/type'><Button style={{color:'white'}}>Type</Button></Link>  */}
                  {/* <Link to="/specefication">
                    {" "}
                    <Button>Add Specification</Button>
                  </Link> */}
                </SoftTypography>
                <SoftTypography>Contacts</SoftTypography>
                <SoftTypography>
                  <Button onClick={handleOpen}>Add Contact</Button>
                </SoftTypography>
              </SoftBox>
              <SoftBox style={{ display: "grid", placeItems: "center" }}>
                {/* {room.map((items, index) => ( */}
                  <div
                    // key={index}
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
                    {/* <div
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
                        // src={`http://localhost:8800/images/${items.image[0]}`}
                      />
                    </div> */}
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
                      {/* {items.type} */}
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
                        // onClick={() => openDialog(items._id)}
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
                        className="mx-2"
                        // onClick={() => handleOn(items._id)}
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
                        // onClick={() => handleDelete(items._id)}
                      />
                    </div>
                  </div>
                {/* ))} */}
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
                Contact Info
              </Typography>
              {/* <input
                name="image"
                className="mb-2"
                style={{ width: "100%" }}
                type="file"
                multiple
                // onChange={handleImage}
              /> */}
              <input
                name="booking"
                type="email"
                className="mb-2"
                placeholder="Booking Mail..."
                style={{ width: "100%" }}
                // onChange={(e) => setType(e.target.value)}
              />
              <input
                name="general"
                type="email"
                className="mb-2"
                placeholder="General Mail..."
                style={{ width: "100%" }}
                // onChange={(e) => setType(e.target.value)}
              />
              <input
                name="technical"
                type="email"
                className="mb-2"
                placeholder="Technical Mail..."
                style={{ width: "100%" }}
                // onChange={(e) => setType(e.target.value)}
              />
              <input
                name="address"
                className="mb-2"
                placeholder="Office address"
                style={{ width: "100%" }}
                // onChange={(e) => setType(e.target.value)}
              />
              <input
                name="phone"
                className="mb-2"
                type="number"
                placeholder="Phone number"
                style={{ width: "100%" }}
                // onChange={(e) => setType(e.target.value)}
              />
              {/* <textarea
                className="mb-2"
                type="text"
                style={{ width: "100%" }}
                placeholder="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              /> */}
              {/* <option>Select Type..</option>
                 {getType.map((items, index)=>(
                  <option key={index} value={items._id}>{items.type}</option>
                 ))} 
              </select> */}
  
              {/* <select
                className="mb-2"
                name="specification"
                style={{ width: "100%" }}
                onChange={handleInput1Change}
              >
                <option>Select Specefications...</option>
                {getSpecification.map((items, index) => (
                  <option key={index} value={items._id}>
                    {items.specification}
                  </option>
                ))}
              </select> */}
              {/* <div
                className="results-container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              > */}
                {/* {specification.map((value, index) => (
                  <div
                    key={index}
                    className="result-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      margin: "3px",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        border: "1px solid #000",
                        borderRadius: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "15px",
                        fontWeight: "bold",
                        height: "20px",
                      }}
                    >
                      {
                        getSpecification.find((specification) => specification._id === value)
                          ?.specification
                      }
                      {/* {value.text} */}
                      {/* <button
                        style={{
                          position: "relative",
                          left: "5px",
                          border: "none",
                          margin: "1px",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => deleteItem(value)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))} */} 
              {/* </div> */}
  
              <Button onClick={handlePost}>Save</Button>
            </Box>
          </Fade>
        </Modal>
  
        {/* full screen */}
        {getRoom && (
          <Dialog fullScreen open={dialogOpen} onClose={closeDialog} TransitionComponent={Transition}>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem>{getRoom.type}</ListItem>
              <Divider />
              <div style={{ width: "100%", display: "flex" }}>
                {getRoom.image.map((imageName, index) => (
                  <ListItem
                    key={index}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      style={{ width: "200px", aspectRatio: "3/2" }}
                      src={`http://localhost:8800/images/${imageName}`}
                    />
                  </ListItem>
                ))}
              </div>
  
              <Divider />
              <ListItem>{getRoom.description}</ListItem>
              <Divider />
              <table style={{ borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th style={{ border: "3px solid black", textAlign: "left", padding: "8x" }}>
                            Specification
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAmenitiesNames(getRoom.specification).map((amenityName, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "2px solid #dddddd",
                                textAlign: "left",
                                padding: "8x",
                              }}
                            >
                              {"\u2B27"}
                              {amenityName}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
             
            </List>
          </Dialog>
        )}
  
        {/* update.................. */}
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
                name="image"
                className="mb-2"
                style={{ width: "100%" }}
                type="file"
                multiple
                  onChange={handleUpdImage}
              />
              <input
                name="type"
                className="mb-2"
                placeholder="Type"
                style={{ width: "100%" }}
                value={getRoomById.type}
                  onChange={handleChangeOnUpdate}
              />
              <textarea
                className="mb-2"
                type="text"
                style={{ width: "100%" }}
                placeholder="Description"
                name="description"
                value={getRoomById.description}
                  onChange={handleChangeOnUpdate}
              />
              {/* <option>Select Type..</option>
                 {getType.map((items, index)=>(
                  <option key={index} value={items._id}>{items.type}</option>
                 ))} 
              </select> */}
  
              <select
                className="mb-2"
                name="specification"
                style={{ width: "100%" }}
                  onChange={handleInputChange}
                
              >
                <option>Select Specefications...</option>
                {Array.isArray(getSpeceficationById) &&
                      getSpeceficationById.map((items) => (
                        <option key={items._id} value={items._id}>
                          {items.specification}
                        </option>
                      ))}
              </select>
              <div
                className="results-container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {getSpecificationOnId.map((value, index) => (
                <div
                    key={index}
                  className="result-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                    margin: "3px",
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      border: "1px solid #000",
                      borderRadius: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "15px",
                      fontWeight: "bold",
                      height: "20px",
                    }}
                  >
                    {
                        getSpeceficationById.find((specification) => specification._id === value)
                          ?.specification
                      }
                    {/* {value.text} */}
                    <button
                      style={{
                        position: "relative",
                        left: "5px",
                        border: "none",
                        margin: "1px",
                        backgroundColor: "transparent",
                      }}
                        onClick={() => deleteOneItem(value)}
                    >
                      ×
                    </button>
                  </div>
                </div>
                 ))} 
              </div>
  
              <Button onClick={handleUpdate}>Update</Button>
            </Box>
          </Fade>
        </Modal>
      </DashboardLayout>
    );
  }
  
  export default Tables;
  