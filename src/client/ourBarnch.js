import React, { useEffect, useState } from 'react'
import { Button, Modal, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import axios from 'axios'
function ourTeam() {
    const [getHotel, setGetHotel] = useState([])
    const [getHotelById, setGetHotelById] = useState('')
    const [show, setShow] = useState(false);
    const [getHotelByIdAmenities, setGetHotelByIdAmenities] = useState([])
    const [getAmenities, setGetAmenities] = useState([])

   
    const handleClose = ()=>{setShow(false)}
    useEffect(()=>{
        const fetch = async() =>{
                const response = await axios.get('http://localhost:8800/admin/gethoteldata')
                setGetHotel(response.data)
                console.log(response.data)
        }
        fetch()
    },[])

    const handleOpen = async(id)=>{
      setShow(true)
      try{
        const response = await axios.get(`http://localhost:8800/admin/gethotelbyid/${id}`)
        const data = response.data
        setGetHotelById(data)
        console.log(data,"data of hotel")
        setGetHotelByIdAmenities(data.input1values)
        console.log(data.input1values,"input values")
      }catch(err){
        console.log(err)
      }

      try{
        const response = await axios.get('http://localhost:8800/admin/getamenities')
        const data = response.data
        setGetAmenities(data)

      }catch(err){
        console.log(err)
      }
    
    }
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
          <h1 className="display-3 text-white mb-3 animated slideInDown">Our Branches</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
              <li className="breadcrumb-item"><Link to='/ourbranch'>Pages</Link></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Branch</li>
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
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our Branches</h5>
          <h1 className="mb-5">Select the destination</h1>
        </div>
        <section className='room-section'>
  <div className="row room-row">
  {getHotel.map((items, index)=>(
    

    <div key={index}  className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      
         <div className="card" style={{ height:'400px'}}>
         <div className="cover item-b"  style={{backgroundImage: `url(http://localhost:8800/public/images/${items.image})`}}>
           <h3>{items.branch}</h3>
           <p className="price">{items.address}</p>
           <div className="card-back">
           <Link className='card-button' to={`/idbranch/${items._id}`}>Reserve a room in {items.branch}</Link>
           </div>
           <div className="card-back">
           
           <Link className="card-button" onClick={()=> handleOpen(items._id)}> View {items.branch}</Link>
           </div>
         </div>
       </div>
    </div>
      ))}
  </div>
</section>
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
  {getHotelById && (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>{getHotelById.branch}</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    
        <img src={`http://localhost:8800/public/images/${getHotelById.image}`} style={{width:'50%'}} />
     
   
    </Modal.Body>
    <Modal.Body>
      <p>Address:- {getHotelById.address}</p>
      <p>Phone:- {getHotelById.phone}</p>
      <p>Website:- {getHotelById.website}</p>
      <p>Email:- {getHotelById.email}</p>
      <p>Star:- {getHotelById.rating}</p>
     
     <ol>
       {getHotelByIdAmenities.map((items, index)=>(
          <li key={index} >
          {getAmenities.find((item) => item._id === items)?.amenities}
          </li>
        ))} 
      
     </ol>
    
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}> 
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )}
  
  
</div>

  )
}

export default ourTeam
