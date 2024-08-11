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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";


// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";

function SignUp() {
 const navigate = useNavigate()
  const {id} = useParams()
const [amenities, setAmenities] = useState({
  sample:''
})
// useEffect(()=>{
//   const fetchdata = async()=>{
//     try{
//       const response = await  axios.put(`http://localhost:8800/admin/updateamenities/${id}`)
//       const data = response.data
//       console.log("Data fetched successfully",data)
//       setAmenities({
//         sample :data.sample
//       })
//   }catch(err){
//      console.log(err)
//   }
//   }
 
//   fetchdata()
// },[id])

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/admin/getamenitiesbyid/${id}`);
      const data = response.data;
      console.log("Data fetched successfully", data);

      // Update the state with the fetched data
      setAmenities({
        sample:data.amenities
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [id]);

const handleUpdate = async()=>{
  const updatadata = {
    amenities:amenities.sample
  }
  
  try{
    await axios.put(`http://localhost:8800/admin/putamenitesedit/${id}`,updatadata)
    .then((response)=>{
      console.log(response.data);
      // if( response.status === 200){
        
      //   // const admin = response.data.admin;
        
      //   // localStorage.setItem("admins", JSON.stringify(admin))
      //   window.location.href = "/dashboard";
      // }
    })
   navigate('/amenities')
  }catch(err){
    console.log(err)
  }
}

// const onChangeUpdate = (e)=>{
//   const {name, value} = e.target;
//   setAmenities((prevState)=>({
//     ...prevState,
//     [name]:value,
//   }));
// }
  
const onChangeUpdate = (e) => {
  const {name, value } = e.target;
  setAmenities((prevState)=>({
    ...prevState,
    [name] : value
  }));
};

  return (
    <BasicLayout
     
      image={curved6}
    >
      <Card>
       
      
       
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              {/* <SoftInput name="amenities" value={amenities.sample}> */}
                <SoftInput name='amenities' value={amenities.sample} onChange={(e)=> setAmenities({...amenities,sample:e.target.value}) }/>
            </SoftBox>
            
            <SoftBox display="flex" alignItems="center">
             
             
             
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={handleUpdate}   variant="gradient" color="dark" fullWidth>
                Update
              </SoftButton>
            </SoftBox>
           
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
