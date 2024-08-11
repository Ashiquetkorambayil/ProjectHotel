import React, { useEffect, useState } from "react";
import { ButtonGroup, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import { Button, Input, Select } from "@mui/material";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function navbar() {
  // const navigate = useNavigate()
  const [getBranch, setGetBranch] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8800/admin/gethoteldata");
      setGetBranch(response.data);
    };
    fetch();
  }, []);

  const handlebranch = (id) => {
    window.location.href = `/idbranch/${id}`;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
      <Link to="/home" className="nav-item nav-link active">
        <h1 className="text-white m-0">MALABAR</h1>
      </Link>
      {/* <img src="img/logo.png" alt="Logo"> */}
      {/* <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Choose Branch"
              menuVariant="dark"

            >
              {getBranch.map((items, index)=>(

          <NavDropdown.Item key={index} >{items.branch}</NavDropdown.Item> 
              ))}
        
            </NavDropdown>
          </Nav> */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 pe-4">
          <Link to="/home" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            {" "}
            About
          </Link>
          <Link to="/service" className="nav-item nav-link active">
            Service
          </Link>
          <Link to="/menu" className="nav-item nav-link">
            Menu
          </Link>
          <Link to="/rooms" className="nav-item nav-link">
            Rooms
          </Link>
          <Nav>
            <NavDropdown id="nav-dropdown-dark-example" title="Pages" menuVariant="dark">
              <NavDropdown.Item>
                {" "}
                <Link to="/booking">Booking</Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ourbranch">Our Branch</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/testimonial">Testimonial</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Link to="/contact" className="nav-item nav-link">
            Contact
          </Link>
         
          <DropdownButton className="ml-5 bg-transparent"  id="dropdown-basic-button" title="Book A Room" style={{padding:'0', display:'flex', alignItems:'center', justifyContent:'center'}}>
          {getBranch.map((items, index) => (
            <Dropdown.Item key={index}>
              <Button  onClick={() => handlebranch(items._id)}>{items.branch}</Button>
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Link to='/login' className="nav-item nav-link">
           <Button variant="outlined">Log In</Button>
          </Link>
     
        </div>
      </div>
    </nav>
  );
}

export default navbar;
