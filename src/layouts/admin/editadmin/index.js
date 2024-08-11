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

import { useState, useEffect, useCallback } from "react";
import Avatar from "react-avatar-edit";

// react-router-dom components
import { Link, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved0 from "assets/images/curved-images/curved0.jpg";


import axios from "axios";
import { FormatIndentDecreaseRounded } from "@mui/icons-material";

function SignUp() {
  // const [agreement, setAgremment] = useState(true);

  // const handleSetAgremment = () => setAgremment(!agreement);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [role, setRole] = useState('');
  // const [country, setCountry] = useState('');
  // const [password, setPassword] = useState('');
  // const [cpassword, setCpassword] = useState('');

  // const [src, setsrc] = useState(null);
  // const [priview, setpriview] = useState(null);

  // const onClose =()=>{
  //   setpriview(null)
  // }
  // const onCrop = view =>{
  //   setpriview(view);
  // }

  

// const handleSubmit = async()=>{


 
//   const data = {
//     name:name,
//     email:email,
//     phone:phone,
//     role:role,
//     country:country,
//     password:password,
//     cpassword:cpassword
//   };
//   try{
//     await axios.post('http://localhost:8800/admin/postadmin',data)
   
//     window.location.href="/authentication/sign-in";
//   }catch(err){
//     console.log(err);
//   }

// }

const {id} = useParams()
console.log(id);
const [data, setData] = useState({
  name:'',
  email:'',
  phone:'',
  role:'',
  country:'',

});
const [image, setImage]= useState(null);
const fetch = useCallback(async () => {
  try {
    const token = localStorage.getItem("tokens");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(`http://localhost:8800/admin/getadminedit/${id}`, {
      
    });
    const data = response.data;
    console.log("Data received from the server:", data);
    setData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      country: data.country,
      
    });
  } catch (err) {
    console.error(err);
  }
}, [id]);



useEffect(()=>{
  fetch();
},[fetch])

  const handleUpdate = async()=>{
    
    const formdata = new FormData;
    formdata.append("name", data.name);
    formdata.append("email",data.email);
    formdata.append("phone", data.phone);
    formdata.append("role", data.role);
    formdata.append("country", data.country);
    formdata.append("image", image);


    
    try{
      await axios.put(`http://localhost:8800/admin/putadminedit/${id}`,formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
            }
            )
            .then((response)=>{
              console.log(response.data.token);
              if( response.status === 200){
                
                // const admin = response.data.admin;
                
                // localStorage.setItem("admins", JSON.stringify(admin))
                window.location.href = "/dashboard";
              }
            })

      window.location.href='/admin'
    }catch(err){
      console.log(err)
    }
  }

  const onChangeUpdate = (e)=>{
    const {name, value} = e.target;
    setData((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  

  
  return (
    <BasicLayout
      title="Welcome back!"
      // description="Use these awesome forms to login or create new account in your project for free."
      image={curved0}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Profile
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          {/* <Socials /> */}
        </SoftBox>
        {/* <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
          {/* <SoftBox mb={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <img src={priview} name="image" />
            </SoftBox>

            <SoftBox mb={2}style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Avatar
                
                width={270}
                height={200}
                 onCrop={onCrop}
                 onClose={onClose}
                src={src}
              />
              
            </SoftBox> */}
            <SoftBox mb={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <input type="file" name="image" onChange={handleImage} accept="image/*"></input>
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput  placeholder="Name" name='name' value={data.name} onChange={(e)=>onChangeUpdate(e) } />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" name='email' value={data.email} onChange={(e)=>onChangeUpdate(e) } />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="tel" placeholder="Phone number" name='phone' value={data.phone} onChange={(e)=>onChangeUpdate(e) }/>
            </SoftBox>
            <SoftBox mb={2} >
              <select name="role" value={data.role} style={{width:'100%', borderRadius:'10px', height:'30px'}} onChange={(e)=>onChangeUpdate(e) } >
                <option>Choose... </option>
                <option>MD</option>
                <option>Manager</option>
                <option>Admin</option>

                </select>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="text" placeholder="Country" name='country' value={data.country} onChange={(e)=>onChangeUpdate(e) } />
            </SoftBox>
            {/* <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" value={data.password} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Confirm password" value={data.cpassword} />
            </SoftBox> */}
            {/* <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox> */}
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={handleUpdate} variant="gradient" color="dark" fullWidth>
                Update
              </SoftButton>
              
            </SoftBox>
            {/* <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox> */}
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
