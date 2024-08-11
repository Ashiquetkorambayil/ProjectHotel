import React, { useEffect, useState } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
function ourTeam() {
  const {id} = useParams()

  const [getBranchStaff, setGetBranchStaff] = useState([])
  const [getRole, setGetRole] = useState([])

  useEffect(()=>{
    const fetch = async()=>{
      try {
        const response = await axios.get(`http://localhost:8800/admin/getbranchstaff/${id}`);
        setGetBranchStaff(response.data);
      } catch (err) {
        console.log(err);
      }
      try{
        const response = await axios.get('http://localhost:8800/admin/getrole')
        const data = response.data
        setGetRole(data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  },[])
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
    <Navbar/>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Our Team</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Pages</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Team</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    {/* Navbar & Hero End */}
    {/* Team Start */}
    <div className="container-xxl pt-5 pb-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
          <h1 className="mb-5">Our Master Chefs</h1>
        </div>
        <div className="row g-4" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          {getBranchStaff.map((items, index)=>(
             <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
             <div className="team-item text-center rounded overflow-hidden">
               <div className="rounded-circle overflow-hidden m-4">
                 <img className="img-fluid" src={`http://localhost:8800/${items.image}`} alt />
                 
               </div>
               <h5 className="mb-0">{items.name}</h5>
               <small>{getRole.find((item)=> item._id === items.role)?.role}</small>
               <div className="d-flex justify-content-center mt-3 flexicon">
                 <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                 <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                 <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
               </div>
             </div>
           </div>
          ))}
         
        </div>
      </div>
    </div>
    {/* Team End */}
    {/* Footer Start */}
    <Footer/>
    {/* Footer End */}
    {/* Back to Top */}
    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
  </div>
  {/* JavaScript Libraries */}
  {/* Template Javascript */}
</div>

  )
}

export default ourTeam
