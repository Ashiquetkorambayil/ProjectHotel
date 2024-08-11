import React, { useEffect, useState } from "react";
// import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import Video from '../assets/video/pexels-yash-rao-8464868 (Original).mp4'
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

// import Typography from "@mui/material/Typography";
import { IoIosGlobe, IoMdCall } from "react-icons/io";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

function ourTeam() {
  const { id } = useParams();
  const [getHotelById, setGetHotelById] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:8800/admin/getbyidhoteldata/${id}`);
      const data = response.data;
      setGetHotelById(data);
    };
    fetch();
  }, []);

//   form data for reservation start 
const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    roomType: '',
    numGuests: '',
    amenity: '',
    address: '',
    city: '',
    zip: '',
    state: '',
    country: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You can add your logic to send data to a server, perform validation, etc.
  };
//   form data for reservation end 

  // rating start
  //   const [value, setValue] = useState(5);
  // rating end

  return (
    <div>
      {/* Template Stylesheet */}

      <div className="container-xxl bg-white p-0">
        {/* Spinner Start */}
        {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
        {/* Spinner End */}
        {/* Navbar & Hero Start */}
        <div className="container-xxl position-relative p-0">
          <Navbar />
          <div className="container-xxl py-5 bg-dark hero-header mb-5">
            <div className="container text-center  pt-5 pb-4">
              {getHotelById && (
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div  style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <Card sx={{ maxWidth: "50%" }}>
                        <CardActionArea>
                          <img
                            style={{ width: "100%" }}
                            src={`http://localhost:8800/public/images/${getHotelById.image}`}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {getHotelById.branch}
                            </Typography>
                            <span>
                                {getHotelById.address}
                            </span>
                            <Box
                              sx={{
                                "& > legend": { mt: 5 },
                              }}
                            >
                              <Rating name="read-only" value={getHotelById.rating} readOnly />
                            </Box>
                           <Link to={`/ourteam/${getHotelById._id}`}> <Button>Meet Our Team</Button></Link>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  </div>
                  <div style={{color:'white'}} className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div >
                      <h2>Get in touch</h2>

                      <hr className="idbranchhr" />
                      <h4 className="idbranchh3">Phone</h4>
                      <div className="idbranchp">
                        {" "}
                        <IoMdCall className="idbranchicon mx-3" /> <p>{getHotelById.phone}</p>
                      </div>

                      <hr className="idbranchhr" />
                      <h4 className="idbranchh3">website</h4>
                      <div className="idbranchp">
                        {" "}
                        <IoIosGlobe className="idbranchicon mx-3" /> <p>{getHotelById.website}</p>
                      </div>

                      <hr className="idbranchhr" />
                      <h4 className="idbranchh3">email</h4>
                      <div className="idbranchp">
                        {" "}
                        <MdOutlineMarkEmailRead className="idbranchicon mx-3" />{" "}
                        <p>{getHotelById.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Navbar & Hero End */}
        {/* Team Start */}
        <div className="container-xxl pt-5 pb-3">
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} className="container">
            <div className="idbranch1">
            {/* <video width="750px" height="500px" loop muted controls >
             <source src="../assets/video/video (1440p).mp4" />
            </video>  */}
            <video src={Video} style={{borderRadius:'25px'}} loop autoPlay muted height={"100%"} width={"100%"}/>
            </div>
            <div className="idbranch2">
            {/* <div> */}
            {/* <h5 className="section-title ff-secondary text-center text-primary fw-normal">Reserve</h5>
      <h2>Hotel Room Reservation</h2> */}
      {/* <form onSubmit={handleSubmit}>
        
        <input placeholder="Full Name" className="form-label" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

      
        <input placeholder="Email" className="form-half" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        
        <input placeholder="Phone Number" className="form-half" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label  className="form-half" htmlFor="checkin">Check-in Date:</label>
        <label  className="form-half" htmlFor="checkout">Check-out Date:</label>
        <input className="form-half" type="date" id="checkin" name="checkin" value={formData.checkin} onChange={handleChange} required />

      
        <input className="form-half" type="date" id="checkout" name="checkout" value={formData.checkout} onChange={handleChange} required />

        <label  className="form-label" htmlFor="roomType">Room Type:</label>
        <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange} required>
          <option value="">Select Room Type</option>
          <option value="single">Single Room</option>
          <option value="double">Double Room</option>
          <option value="suite">Suite</option>
        </select>

        <label  className="form-label" htmlFor="numGuests">Number of Guests:</label>
        <input type="number" id="numGuests" name="numGuests" value={formData.numGuests} onChange={handleChange} required />

        <label  className="form-label" htmlFor="amenity">Amenity:</label>
        <input type="text" id="amenity" name="amenity" value={formData.amenity} onChange={handleChange} />

        <label  className="form-label" htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

        <label  className="form-label" htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />

        <label  className="form-label" htmlFor="zip">ZIP Code:</label>
        <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} />

        <label  className="form-label" htmlFor="state">State:</label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />

        <label  className="form-label" htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />

        <label  className="form-label" htmlFor="specialRequests">Special Requests:</label>
        <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange}></textarea>

        <button type="submit">Submit Reservation</button>
      </form> */}
    {/* </div> */}
            </div>
          </div>
        </div>
        {/* Team End */}
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up" />
        </a>
      </div>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </div>
  );
}

export default ourTeam;
