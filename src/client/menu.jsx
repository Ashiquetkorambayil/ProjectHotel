import React, { useDebugValue, useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import Col from "react-bootstrap/Col";
import hero from '../assets/img/hero.png'
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Carousel from "nuka-carousel";
import Data from "layouts/amenities/data/ameinitiesTableData";
function menu() {
  // const [getDish , setGetDish] = useState([])
  const [uid, setUid] = useState('')
  const [currentTab, setCurrentTab] = useState("");
  const [getCusine, setGetCusine] = useState([]);
  const [getDish, setGetDish] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8800/admin/getcuisine");
      const data = response.data;
      setGetCusine(data);
      console.log(response.data, "response data for cuisine");
    };

    fetch();
  }, []);

  const getDishes = async (id) => {
 
    const response = await axios.get(`http://localhost:8800/admin/getdish/${id}`);
    const data = response.data;
    setGetDish(data);

    console.log(data,"data of disher");
  };

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
          <Navbar />
          <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
              <p className="text-white animated slideInLeft mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              <a href className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Book A Table</a>
            </div>
            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <img className="img-fluid rotating-img" src={hero} alt />
            </div>
          </div>
        </div>
          </div>
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
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
          {getCusine.map((items, index)=>(
            <ul  key={index} className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5 home-header">
               
                    <li className="nav-item ">
                    <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href={items._id} onClick={()=>getDishes(items._id)}>
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
             ))}
             

            <div className="tab-content">
               

               
                     <div  className="tab-pane fade show p-0 active">
                     {getDish.map((items, index)=>(
                     <div key={index}  id={items.dishId} className="row g-4 ">
                       <div className="col-lg-12" style={{border:'solid 3px', borderRadius:'16px', marginBottom:'10px' , borderColor:'#fd7e14'}}>
                         <div className="d-flex align-items-center">
                           <img className="flex-shrink-0 img-fluid rounded" src={`http://localhost:8800/public/images/${items.image}`} alt style={{width: 80}} />
                           <div className="w-100 d-flex flex-column text-start ps-4">
                             <h5 className="d-flex justify-content-between border-bottom pb-2">
                               <span>{items.dish}</span>
                               <span className="text-primary">₹{items.fullPrice}</span>
                             </h5>
                             <small className="fst-italic">{items.description}</small>
                           </div>
                         </div>
                       </div> 
                     </div>
))}
                   </div>
     
     
                
             
            </div>
          </div>
        </div>
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
