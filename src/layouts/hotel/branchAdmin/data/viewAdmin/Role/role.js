/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Button from "@mui/material/Button";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Backdrop from "@mui/material/Backdrop";
import Table from "examples/Tables/Table";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import SoftInput from "components/SoftInput";

// Data

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const [open, setOpen] = useState(false);
  const [on , setOn] = useState(false);
  const [id, setId] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleOff = ()=> setOn(false)
  const [role, setRole] = useState("");
  const [operations, setOpertaions] = useState([]);
  const [updoperations, setupdoperations] = useState([]);
  const [getRole, setGetRole] = useState([]);
  const [updRole , setUpdRole] = useState('')
  const[putOperations, setPutOperataions] = useState('')
  const [search , setSearch]= useState('')
  
  // const [opsearch , setOpSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/admin/getoperations`);
        setOpertaions(response.data)
  
      } catch (err) {
        console.log(err);
      }
      
    };
    fetch();
  }, []);

  // const handleInput1Change = (e) => {
  //     const selectedValue = e.target.value;
  //     if (selectedValue) {
  //       if (!updoperations.includes(selectedValue)) {
  //         setupdoperations([...updoperations, selectedValue]);
  //       }
  //     }
  //   };

  const handleCreate = async () => {
    const create = {
      updoperations: updoperations,
      role: role,
    };
    console.log(updoperations);
    try {
      await axios.post("http://localhost:8800/admin/postrole", create);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:8800/admin/getrole/?search=${search}`);
      setGetRole(response.data);
    };
    fetch();
  }, [search]);

  const handleDelete = async(id)=>{
    try{
        if(window.confirm("Are you sure to delete this role")){
        await axios.delete(`http://localhost:8800/admin/deleterole/${id}`)
        window.location.reload()
        }
    }catch(err){

    }
  }

  const handleOn = async(id)=>{ 
    setOn(true)
   setId(id)
   
    try{
        const response = await axios.get(`http://localhost:8800/admin/getrolebyid/${id}`)
        const data = response.data.roleData
        
        // setUpdRole({
        //     role:data.role,
        //     operation:data.updoperations,
            
        // })

       setUpdRole(data.role);
       setPutOperataions(data.updoperations);
       console.log(data.role,"6666666666")
    }catch(err){
        console.log(err)
    }
}

const handleUpdate = async()=>{
    const updaterole = {
        role:updRole,
        operation:putOperations
        
    }
    
    try{
        await axios.put(`http://localhost:8800/admin/updaterole/${id}`, updaterole)
        .then((response)=>{
           console.log(response)
         })
         window.location.reload();
    }catch(err){
        console.log(err)

    }
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card className="my-2" style={{ backgroundColor: "black", display:'flex', justifyContent:'center', alignItems:'center' }}>
            <SoftBox style={{display:'flex', width:'95%', justifyContent:'space-between', alignItems:'center'}} p={3}>
              <SoftTypography variant="h6" color="info">
                Role Table
              </SoftTypography>
              <SoftTypography><SoftInput onChange={(e)=> setSearch(e.target.value)}  placeholder="Search..." style={{borderRadius:"16px"}}/></SoftTypography>
              {/* <SoftTypography><input placeholder="Operations" onChange={(e)=> setOpSearch(e.target.value)} style={{width:'100%'}}/>
               
            
                </SoftTypography> */}
              <Button onClick={handleOpen}>Add Role</Button>
             
            </SoftBox>
            <div style={{width:'95%', height:'20px', display:'flex'}}>
            <div style={{width:'30%', height:'100%', color:'white', display:'grid', placeItems:'center', fontSize:'small'}}>Role</div>
                <div style={{width:'30%', height:'100%', color:'white', display:'grid', placeItems:'center', fontSize:'small'}}>Operation</div>
                <div style={{width:'20%', height:'100%', color:'white',display:'grid', placeItems:'center', fontSize:'small'}}>Edit</div>  
                <div style={{width:'20%', height:'100%', color:'white',display:'grid', placeItems:'center', fontSize:'small'}} >Delete</div>          
            </div>
            <SoftBox style={{ display: "grid", placeItems: "center" , width:'95%'}}>
          

           

              {getRole.map((items, index)=>(

            <div   key={index}  style={{width:'100%', height:"60px", backgroundColor:'white',marginBottom:'5px', borderRadius:'16px',display:'flex', alignItems:'center', justifyContent:'center'}}>    
             <div style={{borderRadius:'16px',width:'30%', height:'100%', color:'black', display:'grid', placeItems:'center'}}>{items.role}</div>
                <div style={{borderRadius:'16px',width:'30%', height:'100%', color:'black', display:'grid', placeItems:'center', fontSize:'15px'}}>{operations.find((item )=> item._id === items.updoperations)?.operations}</div>
                <div style={{borderRadius:'16px',width:'20%', height:'100%', display:'grid', placeItems:'center'}}><MdEditSquare cursor='pointer' className="mx-2"  onClick={() => handleOn(items._id)}/></div>  
                <div style={{borderRadius:'16px',width:'20%', height:'100%', display:'grid', placeItems:'center'}}><MdDelete cursor="pointer" className="mx-2" onClick={()=> handleDelete(items._id)} /></div>          
        
             </div>
             ))}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              OPERATION
            </Typography>
            <input value={role} onChange={(e) => setRole(e.target.value)} />

            <select
              value={updoperations}
              onChange={(e) => setupdoperations(e.target.value)}
              style={{ width: "100%" }}
            >
              <option>Select Operation</option>
              {operations.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.operations}
                </option>
              ))}
            </select>

            <Button onClick={handleCreate}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      {/* update modal */}
                
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={on}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={on}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" color="inherit" onClick={handleOff} aria-label="close">
                <CloseIcon />
              </IconButton>
              OPERATION
            </Typography>
           
           <input value={updRole} onChange={(e)=> setUpdRole(e.target.value)} />

            <select
            
            value={putOperations}
              style={{ width: "100%" }}
              onChange={(e)=> setPutOperataions(e.target.value)}
            >
              <option>Select Operation</option>
              
                {operations.map((items, index)=>(
                    <option key={index} value={items._id}>
                        {items.operations}
                    </option>
                ))}


           
            </select>

            <Button onClick={handleUpdate} >Update</Button>
          </Box>
        </Fade>
      </Modal>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
