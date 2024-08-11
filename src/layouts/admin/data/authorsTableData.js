/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";


// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import default1 from "assets/images/default1.jpg"
import { useEffect, useState } from "react";


import axios from "axios";
import { Link } from "react-router-dom";

function Data(){
  const [item, setItem]= useState([]);
  useEffect(()=>{
    const token = localStorage.getItem("tokens");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get('http://localhost:8800/admin/getadmin')
    .then((response)=>{
      setItem(response.data)
    })
    .catch((error)=>{
      console.error(error)
    });
  },[]);

  const handleDelete = async(id)=>{
    console.log(id)
    try{
      await axios.delete(`http://localhost:8800/admin/deleteadmin/${id}`)
      window.location.href="/admin"
      // alert("your data is delete successfully")
    }catch(err){
      console.log(err)
    }
  }


  const Author = ({ image, name, email })=> (
    
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox mr={2}>
          <SoftAvatar src={image} alt={name} size="sm" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
  
  );

  const  Function = ({ role })=> (
    
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {role}
        </SoftTypography>
        {/* <SoftTypography variant="caption" color="secondary">
          {org}
        </SoftTypography> */}
      </SoftBox>
  
  );
 return(
  {
    columns: [
      { name: "admin", align: "left" },
      { name: "role", align: "left" },
      // { name: "status", align: "center" },
      { name: "edit", align: "center" },
      { name: "delete", align: "center" },
    ],
  
    
    rows: item.map((items)=>(
      {
        admin: <Author image={`http://localhost:8800/${items.image}`} name={items.name} email={items.email} />,
        role: <Function role={items.role} />,
        // status: (
        //   <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
        // ),
        delete: (
          <SoftTypography >
           <button onClick={(e)=> handleDelete(items._id)} className="btn btn-danger">Delete</button>
          </SoftTypography>
        ),
        edit: (
          <SoftTypography>
           <Link to = {`/editadmin/${items._id}`}><button className="btn btn-primary">Edit profile</button></Link>
          </SoftTypography>
        ),
      }
    ))
  }
 );
}





export default Data;
