
import React from 'react'
import '../assets/css/style.css'
import '../assets/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import {  Nav, NavDropdown } from 'react-bootstrap'
import Navbar from './navbar'
import Footer from './footer'
function testimonial() {
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
       <Navbar/>
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Testimonial</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item text-white active" aria-current="page">Testimonial</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}
      {/* Testimonial Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
            <h1 className="mb-5">Our Clients Say!!!</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3" />
              <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-1.jpg" style={{width: 50, height: 50}} />
                <div className="ps-3">
                  <h5 className="mb-1">Client Name</h5>
                  <small>Profession</small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3" />
              <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" style={{width: 50, height: 50}} />
                <div className="ps-3">
                  <h5 className="mb-1">Client Name</h5>
                  <small>Profession</small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3" />
              <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-3.jpg" style={{width: 50, height: 50}} />
                <div className="ps-3">
                  <h5 className="mb-1">Client Name</h5>
                  <small>Profession</small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3" />
              <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-4.jpg" style={{width: 50, height: 50}} />
                <div className="ps-3">
                  <h5 className="mb-1">Client Name</h5>
                  <small>Profession</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
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

export default testimonial
