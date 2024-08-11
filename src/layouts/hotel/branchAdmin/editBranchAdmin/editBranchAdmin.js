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

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftInput from "components/SoftInput";
import { Button } from "react-bootstrap";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  //   const { columns, rows } = authorsTableData;
  //   const { columns: prCols, rows: prRows } = projectsTableData;
  const navigate = useNavigate();
  const {id} = useParams();
  const [image, setImage]=useState([])
  const [data, setData] = useState({
    name:'',
    role:'',
    description:''
  });
  const goback = () => {
    navigate(-1);
  };

  useEffect(()=>{
    console.log(data,'data')
    const fetch = async()=>{
        try{
            const response = await axios.get(`http://localhost:8800/admin/getbranchadminbyid/${id}`)
            const data = response.data
            setData({
               name:data.name,
               role:data.role,
               description:data.description 
            })
            console.log(setData,"setData")
        }catch(err){
            console.log(err)
        }
    }
    fetch()
  },[id])
 
  const updateBranchAdmin = async()=>{

    console.log(data, 'data in fromdata')
    const formdata = new FormData;
    formdata.append("name",data.name);
    formdata.append("role",data.role);
    formdata.append("description",data.description);
    formdata.append("image",image);

  
    console.log(data.name,'name')
    try{
        await axios.put(`http://localhost:8800/admin/updatebranchadmin/${id}`,formdata,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
                });
                navigate(-1);
    }catch(err){
        console.log(err)
    }
  };

  const onChangeUpdate=(e)=>{
    const {name, value} = e.target;
    setData((prevState)=>({ ...prevState, [name]:value }));
  }

  const handleImage = (e)=>{
    const file = e.target.files[0]
    setImage(file)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ display: "flex", alignItems: "center" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Button onClick={goback} variant="contained" style={{ backgroundColor: "black" }}>
                {" "}
                <MdOutlineArrowBackIos style={{ color: "white" }} />
              </Button>
              <SoftTypography variant="h6">Authors table</SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftInput className='my-2' type="file" onChange={handleImage} />
              <SoftInput name="name" value={data.name} className='my-2' placeholder="Enter your name" onChange={(e)=> onChangeUpdate(e)} />
              <select name="role" value={data.role} className='my-2' style={{width:'100%'}} onChange={(e)=> onChangeUpdate(e)}>
                <option>Select...</option>
                <option>General Manager (GM)</option>
                <option>Front Office Manager</option>
                <option>Human Resources Manager</option>
                <option>Finance Manager</option>
                <option>Sales and Marketing Manager</option>
                <option>Executive Chef</option>
                <option>Housekeeping Manager</option>
                <option>IT Manager</option>
                <option>Security Manager</option>
                <option>Concierge Manager</option>
              </select>
              <textarea name="description" value={data.description} className='my-2' style={{width:'100%'}} placeholder="Enter description" onChange={(e)=> onChangeUpdate(e)} />
              <Button className='my-2' onClick={updateBranchAdmin}>Update</Button>

            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
