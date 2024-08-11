import React, { useDebugValue, useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {  Card, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { Button, CardActionArea, CardActions, CardContent, CardMedia, Input, Typography } from "@mui/material";
function menu() {
  // const [getDish , setGetDish] = useState([])
//   const [uid, setUid] = useState('')
//   const [currentTab, setCurrentTab] = useState("");
//   const [getCusine, setGetCusine] = useState([]);
//   const [getDish, setGetDish] = useState([]);
//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get("http://localhost:8800/admin/getcuisine");
//       const data = response.data;
//       setGetCusine(data);
//       console.log(response.data, "response data for cuisine");
//     };

//     fetch();
//   }, []);

//   const getDishes = async (id) => {
 
//     const response = await axios.get(`http://localhost:8800/admin/getdish/${id}`);
//     const data = response.data;
//     setGetDish(data);

//     console.log(data,"data of disher");
//   };

  return (
    <div>
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
          <Navbar className='bg-transparent' />
         
        </div>
        {/* Navbar & Hero End */}
        {/* Menu Start */}

        {/* <div className="container">
          <div className="tabs">
            {getCusine.map((items, index) => (
              <button
                key={index}
                id={items._id}
                disabled={currentTab === `${items.dishId}`}
                onClick={() => getDishes(items._id)}
              >
                {items.cuisine}
              </button>
            ))}
            <div className="content">
              {getDish && (
                <div>
                    {currentTab === `${getDish._id}` &&
                     <div>
                     <p>{getDish.dish}</p>
                   </div>
                    }
                 
                </div>
              )}
            </div>
          </div>
        </div> */}
        <div className="container-xxl py-5" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        
        <Card style={{width:'30%',  textAlign:'center', display:'flex',alignItems:'center',flexDirection:'column'}} >
      <CardActionArea>
       
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome
          </Typography>
          <Input className="my-3" placeholder="Username"/>
          <Input  className="my-3" type="tel" placeholder="Phone Number"/>
          <Input  className="my-3" type="email" placeholder="Email"/>
          <Input  className="my-3" type="password" placeholder="Password"/>
          <Input  className="my-3" type="password" placeholder="Confirm Password"/>
        </CardContent>
      </CardActionArea>
      <CardActions>
         <Button style={{color:'black'}} variant="outlined">
        Sign  up
        </Button>
      </CardActions>
      
    </Card>
      </div>

        {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {getCusine.map((items, index)=>(
                <Nav.Item key={index} >
                <Nav.Link eventKey={getCusine._id} style={{backgroundColor:'transparent'}} onClick={()=> getDishes(items._id)}>
                <ul  className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
               
               <li className="nav-item">
               <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1" >
                <div style={{width:'75px', height:"50px"}}>
                <img style={{width:'100%', objectFit:'contain', aspectRatio:'2/3', position:'relative', bottom :'25px', borderRadius:"20px"}} src={`http://localhost:8800/${items.image}`}/>
                </div>
                 <div className="ps-3">
                   <small className="text-body">{items.cuisine}</small>
                   <h6 className="mt-n1 mb-0">Cuisine</h6>
                 </div>
               </a>
             </li> 
       </ul>
                </Nav.Link>
              </Nav.Item>
            ))}
            
           
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {getDish && (
                 <Tab.Pane eventKey={getDish.dishId}>{getDish.dish}</Tab.Pane>
            )}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
 */}

        {/* Menu End */}
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

export default menu;
