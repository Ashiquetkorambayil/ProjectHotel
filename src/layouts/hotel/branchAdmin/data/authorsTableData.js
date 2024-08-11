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
import { useEffect, useState } from "react";
import axios from "axios";
import { func } from "prop-types";
import { Link, useParams } from "react-router-dom";

import { LuView } from "react-icons/lu";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function Data() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        console.log("hello");
        const response = await axios.get(`http://localhost:8800/admin/getbranchadmin/${id}`);
        setItem(response.data);
        console.log("response data", response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete =async(id)=>{
    try{
      await axios.delete(`http://localhost:8800/admin/deletebranchadmin/${id}`)
      location.reload()
    }catch(err){
      console.log(err)
    }
  }

  const Author = ({ image, name, email }) => (
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

  
  return {
    columns: [
      { name: "admin", align: "left" },

      { name: "view", align: "center" },
      { name: "edit", align: "center" },
      { name: "delete", align: "center" },
    ],

    rows: item.map((items) => ({
      admin: (
        <Author image={`http://localhost:8800/public/images/${items.image}`} name={items.name} email={items.role} />
        
      ),

      view: (
        <SoftTypography>
          <Link to={`/viewadmin/${items._id}`}> <LuView cursor="pointer" className="mx-2"  /></Link>
        </SoftTypography>
      ),
      edit: (
      
        
    
        <Link to={`/editbrachadmin/${items._id}`}>  <MdEditSquare cursor="pointer" style={{ color: "blue" }} className="mx-2" /></Link>

    
      ),
      delete: (
        <SoftTypography>
            <MdDelete cursor="pointer" style={{color:"red"}} className="mx-2" onClick={() => handleDelete(items._id)} />
        </SoftTypography>
      ),
    })),
  };
}

export default Data;
