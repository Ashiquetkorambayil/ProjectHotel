import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import axios from 'axios'
import { Button } from '@mui/material'
import Footer from './footer'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
function rooms() {
  const [getRooms, setGetRooms] = useState([])
  const [getRoomById, setGetRoomById] = useState('')
  const [show, setShow] = useState(false);
  const [getSpecification, setGetSpecification] =  useState([])
  const [getSpecificationOnId, setGetSpecificatioOnId] = useState([])
  

  const handleClose = () => setShow(false);
 

  useEffect(()=>{
    const fetch=async()=>{
      const response = await axios.get('http://localhost:8800/admin/getroom')
      setGetRooms(response.data)
    }
    fetch()
  },[])
  const handleShow = async(id) => {
    setShow(true)
    try{
      const response = await axios.get(`http://localhost:8800/admin/getroombyid/${id}`)
      const data = response.data
      setGetRoomById(data)
      setGetSpecificatioOnId(data.specification)
      console.log(data.specification,"lllllllllllllllllll")
    }catch(err){
      console.log(err)
    }
  
    try{
      const response = await axios.get('http://localhost:8800/admin/getspecification')
      const data = response.data
      setGetSpecification(data)
      console.log(data,"kkkkkkkkkkkkkkkkkkkk")
    }catch(err){
      console.log(err)
    }
 
  
  }
  return (
    <div>
         <Navbar />
          <div className="container-xxl py-5 bg-dark hero-room mb-5" >
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">Rooms</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li className="breadcrumb-item text-white active" aria-current="page">
                    Rooms
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Rooms</h5>
            <h1 className="mb-5">Type Of Rooms</h1>
          </div>
         <section className='room-section'>
  <div className="row room-row">
  {getRooms.map((items, index)=>(
    <div  key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      
         <div className="card" style={{ height:'400px'}}>
         <div className="cover item-b" style={{backgroundImage: `url(http://localhost:8800/public/images/${items.image[0]})`}}>
           <h3 style={{width:'70%'}}>{items.type}</h3>
           <p className="price">{items.description}</p>
          <div className="card-back" >
           <Link className="card-button"  to={`/ourbranch`}> Select the branch to reserve</Link>
           
           </div>
           <div className="card-back">
           
           <Link className="card-button"  onClick={()=>handleShow(items._id)}> View room specification</Link>
           </div>
         </div>
       </div>
   
     
    </div>
    ))}
  </div>
</section>


        </div>
      </div>
       {/* Footer Start */}
    <Footer/>
    {/* Footer End */}
    {/* Modal start  */}
    {getRoomById && (
       <Modal
       show={show}
       onHide={handleClose}
       backdrop="static"
       keyboard={false}
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title>{getRoomById.type}</Modal.Title>
       </Modal.Header>
       <Modal.Body style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        {getRoomById.image.map((items, index)=>(
           <img key={index} style={{width:'50%'}} src={`http://localhost:8800/public/images/${items}`}/>
        ))}
      
       </Modal.Body>
       <Modal.Body>
        {getRoomById.description}
        <ol>
          {getSpecificationOnId.map((items, index)=>(
             <li key={index}>
             {getSpecification.find((item) => item._id === items)?.specification}
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
    {/* Modal end  */}
    </div>
   
  )
}

export default rooms