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
import { Button, Card, Modal, NavItem } from "react-bootstrap";

// @mui material components
// import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { LuView } from "react-icons/lu";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import Avatar from '@mui/material/Avatar';
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMeetingRoom } from "react-icons/md";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Table from "examples/Tables/Table";

// Data
import authorsTableData from "./data/HotelTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from "@mui/material";
import SoftInput from "components/SoftInput";
import { FcManager } from "react-icons/fc";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Tables() {
  // const admin = JSON.parse(localStorage.getItem("admins"));
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [item, setItem] = useState([]);

  const [rating, setRating] = useState(1);

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  console.log("00000000000", rating);

  const starLabelStyle = {
    cursor: "pointer",
    fontSize: "24px",
    margin: "0 10px",
    color: "#ccc",
    transition: "color 0.3s",
  };

  const starLabelHoverStyle = {
    color: "gold",
  };

  const [input1Value, setInput1Value] = useState([]);
  // const [input2Values, setInput2Values] = useState([]);

  const deleteItem = (amenityId) => {
    const updatedValues = input1Value.filter((value) => value !== amenityId);
    setInput1Value(updatedValues);
  };
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    branch: "",
    address: "",
    phone: "",
    website: "",
    email: "",
  });
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");

  const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const websiteFormat = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const handleSubmit = async () => {
    console.log("hiiiiiiiiii");
    const validationError = [];

    if (!data.branch) {
      setError1("Branch is reqired");
      validationError.push(error1);
    } else {
      setError1(null);
    }

    if (!data.address) {
      setError2("Address is reqired");
      validationError.push(error2);
    } else {
      setError2(null);
    }

    if (!data.phone) {
      setError3("Phone is reqired");
      validationError.push(error3);
    } else if (!data.phone.match(phoneNum)) {
      setError3("Enter a valid phone number");
      validationError.push(error3);
    } else {
      setError3(null);
    }

    if (!data.email) {
      setError4("Email is required");
      validationError.push(error4);
    } else if (!data.email.match(mailformat)) {
      setError4("Enter a valid email");
      validationError.push(error4);
    } else {
      setError4(null);
    }

    if (!data.website) {
      setError5("Website is required");
      validationError.push(error5);
    } else if (!data.website.match(websiteFormat)) {
      setError5("Enter a valid Website");
      validationError.push(error5);
    } else {
      setError5(null);
    }

    if (validationError.length === 0) {
      const formdata = new FormData();
      formdata.append("branch", data.branch);
      formdata.append("address", data.address);
      formdata.append("phone", data.phone);
      formdata.append("website", data.website);
      formdata.append("email", data.email);
      formdata.append("rating", rating);
      formdata.append("input1value", input1Value);
      formdata.append("image", file);
      try {
        await axios.post("http://localhost:8800/admin/posthoteldata", formdata);
        window.location.href = "/hotel";

        alert("Hotel data saved successfully");
      } catch (err) {
        console.log(err);
        alert("some error happend");
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  // const handleSubmit = async () => {

  // };

  const [info, setInfo] = useState([]);
  // console.log("888888888888",info)
  const fetch = useCallback(async () => {
    try {
      const token = localStorage.getItem("tokens");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8800/admin/gethoteldata");
      console.log("2525252", response.data);
      const data = response.data;
      setInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    fetch();
  }, []);

  const Onchangeupdate = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInput1Change = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      if (!input1Value.includes(selectedValue)) {
        setInput1Value([...input1Value, selectedValue]);
      }
    }
  };

  function getAmenitiesNames(amenityIds) {
    if (!amenityIds || amenityIds.length === 0) {
      return []; // Return an empty array if amenityIds is undefined or empty
    }

    return amenityIds.map((amenityId) => {
      const amenity = item.find((amenityItem) => amenityItem._id === amenityId);
      return amenity ? amenity.amenities : "";
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:8800/admin/getamenities")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/admin/deletehoteldata/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handlehide = () => {
  //   setOpen(false);
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlehide = () => {
    setOpen(false);
  };

  const [selectedHotel, setSelectedHotel] = React.useState(null);

  const handleClickOn = (hotel) => {
    setSelectedHotel(hotel);
    setOpen(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{backgroundColor:'black',borderRadius:'16px'}}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Hotel Info Table</SoftTypography>
              <button className="btn btn-primary" onClick={handleShow}>
                Add hotel
              </button>
            </SoftBox>
            <SoftBox
             
            >
              {/* <Table  columns={columns} rows={rows} /> */}

              <SoftBox
                style={{
                  width: "100%",
                  float: "left",
                }}
              >
                {info.map((items, index) => (
                  // <Card
                  //   key={index}
                  //   className="d-flex flex-row "
                  //   style={{ width: "50%", height: "auto", float: "left" }}
                  // >
                  //   <div style={{ width: "30%" }}>
                  //     <Card.Img
                  //       style={{ aspectRatio: "3/2", objectFit: "contain" }}
                  //       variant="top"
                  //       src={`http://localhost:8800/${items.image}`}
                  //     />
                  //   </div>

                  //   <Card.Body style={{ width: "100%" }}>
                  //     <Card.Text>Branch:- {items.branch}</Card.Text>
                  //     {/* <Card.Text>Address:-{items.address}</Card.Text>
                  //     <Card.Text>Phone:-{items.phone}</Card.Text>
                  //     <Card.Text>Website:-{items.website}</Card.Text>
                  //     <Card.Text>Email:-{items.email}</Card.Text>
                  //     <Card.Text>Rating:-{items.rating}</Card.Text>
                  //     <Card.Text style={{ display: "flex", paddingRight: "2px" }}>
                  //       Amenities:-
                  //       {getAmenitiesNames(items.input1values).map((amenityName, index) => (
                  //         <div style={{marginRight:'20px'}} key={index}>{amenityName}</div>
                  //       ))}
                  //     </Card.Text> */}
                  //     <SoftBox>
                  //       <LuView
                  //         cursor="pointer"
                  //         className="mx-2"
                  //         onClick={() => handleClickOn(items)}
                  //       />

                  //       <Link to={`/edithotel/${items._id}`}>
                  //         {/* <button>edithotel</button> */}
                  //         <MdEditSquare className="mx-2" />
                  //       </Link>

                  //       <MdDelete
                  //         cursor="pointer"
                  //         className="mx-2"
                  //         onClick={() => handleDelete(items._id)}
                  //       />
                  //     </SoftBox>
                  //     <SoftBox>
                  //       <Tooltip title="Branch Admin">
                  //         <Link to={`/branchadmin/${items._id}`}>
                  //           {" "}
                  //           <FcManager cursor="pointer" />
                  //         </Link>
                  //       </Tooltip>
                  //       <SoftBox>
                        

                           
                  //       </SoftBox>
                  //     </SoftBox>
                  //   </Card.Body>
                  // </Card>
                  <div style={{width:'93.5%', height:'100px',backgroundColor:'white', marginBottom:'5px', borderRadius:'16px',display:'flex',float:"left", marginLeft:'37px'}} key={index}>
                    <div style={{width:'15%', height:'100%', display:'flex', alignItems:'center', justifyContent:'flex-start', marginLeft:'3.5px'}}>
                    <Avatar
                         style={{width:'100%', height:'95%', borderRadius:'13px'}}
                        
                         src={`http://localhost:8800/public/images/${items.image}`}
                      />
                    </div>
                    <div style={{width:'85%', height:'100%'}}>
                      
                      <div style={{width:'100%', height:'33.3%',display:'flex', alignItems:'center', justifyContent:'center'}}>{items.branch} Branch</div>
                      <div style={{width:'100%', height:'33.3%',display:'flex', alignItems:'center', justifyContent:'center'}}>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}><Tooltip title="Branch Admin"><Link to={`/branchadmin/${items._id}`}> <FcManager cursor="pointer" /></Link ></Tooltip></div>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}><Tooltip title="Branch Staff" arrow><Link to={`/branchstaff/${items._id}`}> <BsPeopleFill/></Link></Tooltip></div>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}><Tooltip title='Rooms'><Link to={`/slots/${items._id}`}>  <MdOutlineMeetingRoom /></Link></Tooltip>  </div>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}><Tooltip title='View'><Link><LuView cursor="pointer" className="mx-2" onClick={() => handleClickOn(items)} /></Link></Tooltip></div>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}> <Tooltip title='Edit'><Link to={`/edithotel/${items._id}`}><MdEditSquare className="mx-2" /></Link></Tooltip></div>
                         <div style={{width:'33.3%', height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}> <Tooltip title='Delete'><Link><MdDelete   cursor="pointer"   className="mx-2"   onClick={() => handleDelete(items._id)} /></Link></Tooltip></div>
                     </div>
                     
                    </div>
                  </div>
                ))}
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
        {/* <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects table</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card> */}
      </SoftBox>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Hotel Amenities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SoftInput
            style={{ width: "100%", margin: "10px" }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <SoftInput
            name="branch"
            value={data.branch}
            style={{ width: "100%", margin: "10px" }}
            type="text"
            placeholder="Branch"
            onChange={(e) => Onchangeupdate(e)}
          />
          <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error1}</p>
          <SoftInput
            name="address"
            value={data.address}
            style={{ width: "100%", margin: "10px" }}
            type="text"
            placeholder="Address"
            onChange={(e) => Onchangeupdate(e)}
          />
          <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error2}</p>
          <SoftInput
            name="phone"
            value={data.phone}
            style={{ width: "100%", margin: "10px" }}
            type="tel"
            placeholder="Phone"
            onChange={(e) => Onchangeupdate(e)}
          />
          <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error3}</p>
          <SoftInput
            name="website"
            value={data.website}
            style={{ width: "100%", margin: "10px" }}
            type="text"
            placeholder="Website"
            onChange={(e) => Onchangeupdate(e)}
          />
          <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error5}</p>
          <SoftInput
            name="email"
            value={data.email}
            style={{ width: "100%", margin: "10px" }}
            type="email"
            placeholder="Email"
            onChange={(e) => Onchangeupdate(e)}
          />
          <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error4}</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <label
                key={starValue}
                style={{
                  ...starLabelStyle,
                  ...(rating >= starValue ? starLabelHoverStyle : null),
                }}
              >
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  checked={rating === starValue}
                  onChange={handleRatingChange}
                  style={{
                    display: "none", // Hide the input visually
                  }}
                />
                <span style={{ display: "inline-block" }}>★</span>
              </label>
            ))}
          </div>

          <div>
            <label>Amenities</label>
            <select
              style={{ borderRadius: "20px" }}
              id="input1"
              value=""
              onChange={handleInput1Change}
            >
              <option value="">Select...</option>
              {item.map((items) => (
                <option key={items._id} value={items._id}>
                  {items.amenities}
                </option>
              ))}
            </select>
          </div>

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
            {input1Value.map((value, index) => (
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
                  {item.find((amenity) => amenity._id === value)?.amenities}
                  {/* {value.text} */}
                  <button
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
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
     
      {selectedHotel && (
        <React.Fragment>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handlehide}
            aria-describedby="alert-dialog-slide-description"
            style={{ width: "100%" }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                <img
                  style={{ width: "100%", height: "356px", float: "left", objectFit: "contain" }}
                  src={`http://localhost:8800/public/images/${selectedHotel.image}`}
                />

                <div style={{ width: "auto", float: "left" }}>
                  Branch :- {selectedHotel.branch}
                  <br />
                  Address :- {selectedHotel.address}
                  <br />
                  Phone :- {selectedHotel.phone}
                  <br />
                  Website :- {selectedHotel.website}
                  <br />
                  Email :- {selectedHotel.email}
                  <br />
                  Rating :- {selectedHotel.rating}
                  <br />
                  <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "3px solid black", textAlign: "left", padding: "8x" }}>
                          Amenities
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAmenitiesNames(selectedHotel.input1values).map((amenityName, index) => (
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
                  <br />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlehide}>Close</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}

      {/* view card............................................. */}
      {/* <Card sx={{ maxWidth: 345 }}
      onClose={handlehide}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
      
      />
      <CardContent>
       
        <Typography variant="body2" color="text.secondary">
           Address :- 
            <br />  
           Phone :-
            <br />
           Website :-
            <br />
           Email :-
            <br />
           Rating :-
            <br />
           Amenities :-
            <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Close</Button>
      
      </CardActions>
    </Card> */}
    </DashboardLayout>
  );
}

export default Tables;
