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
import { Form, Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import data from "layouts/dashboard/components/Projects/data";
import { ConstructionOutlined } from "@mui/icons-material";

function SignUp() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [rating, setRating] = useState("");
  const [item, setItem] = useState("");
  // const [input1values, setInput1values] = useState([]);
     const [input1values, setInput1values] = useState([]);

  console.log(input1values);
  const [image, setImage] = useState([])
  const [data, setData] = useState({
    branch: "",
    address: "",
    phone: "",
    website: "",
    email: "",
  });
  console.log(data, "data");

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  const starLabelStyle = {
    cursor: "pointer",
    fontSize: "24px",
    margin: "0 10px",
    color: "#ccc",
    transition: "color 0.3s",
  };

  const starLabelHoverStyle = {
    color: "gold",
  };

  // const deleteItem = (amenityId) => {
  //   console.log(amenityId);
  //   const updatedValues = input1values.filter((value) => value !== amenityId);
  //   setInput1values(updatedValues);
  // };
  const deleteItem = (amenityId) => {
    const updatedValues = input1values.filter((value) => value !== amenityId);
    setInput1values(updatedValues);
  };
  

  // const handleInput1Change = (e) => {
  //   const selectedValue = e.target.value;
  //   if (selectedValue) {
  //     if (!input1values.includes(selectedValue)) {
  //       setInput1values([...input1values, selectedValue]);
  //     }
  //   }
  // };

  const handleInput1Change = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      if (!input1values.includes(selectedValue)) {
        setInput1values([...input1values, selectedValue]);
      }
    }
  };
  

  useEffect(() => {
    axios
      .get("http://localhost:8800/admin/getamenities")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/admin/gethotelbyid/${id}`);

        const data = response.data;

        setData({
          
          branch: data.branch,
          address: data.address,
          phone: data.phone,
          website: data.website,
          email: data.email,
        });
        setRating(data.rating);
        setInput1values(data.input1values);
        console.log("mmmmmmmmmmm", data.input1values);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    console.log(data, "response data");
  }, []);

  const handleUpdate = async () => {
    console.log('hiiiiiiiiiiiiii')
    console.log(input1values)

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("branch", data.branch);
    formdata.append("address", data.address);
    formdata.append("phone", data.phone);
    formdata.append("website", data.website);
    formdata.append("email", data.email);
    formdata.append("rating", rating);
    // formdata.append("input1value", input1values);
       formdata.append("input1value", input1values);

    console.log("FormData:", formdata);
    try {
      await axios.put(`http://localhost:8800/admin/edithotel/${id}`, formdata)
      .then((response) => {
        console.log(response.data);
        navigate('/hotel')
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeUpdate = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImage = (e)=>{
    const file = e.target.files[0]
    setImage(file);
  };
  return (
    <BasicLayout image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              {/* <SoftInput name='amenities' value={amenities.sample} onChange={(e)=> setAmenities({...amenities,sample:e.target.value}) }/> */}
              <SoftInput
                onChange={handleImage}
                style={{ width: "100%", margin: "10px" }}
                type="file"
                name="image"
              />

              <SoftInput
                name="branch"
                style={{ width: "100%", margin: "10px" }}
                type="text"
                placeholder="Branch"
                value={data.branch}
                onChange={(e) => onChangeUpdate(e)}
              />
              <SoftInput
                name="address"
                style={{ width: "100%", margin: "10px" }}
                type="text"
                placeholder="Address"
                value={data.address}
                onChange={(e) => onChangeUpdate(e)}
              />
              <SoftInput
                name="phone"
                style={{ width: "100%", margin: "10px" }}
                type="tel"
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => onChangeUpdate(e)}
              />
              <SoftInput
                name="website"
                style={{ width: "100%", margin: "10px" }}
                type="text"
                placeholder="Website"
                value={data.website}
                onChange={(e) => onChangeUpdate(e)}
              />
              <SoftInput
                name="email"
                style={{ width: "100%", margin: "10px" }}
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => onChangeUpdate(e)}
              />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <label
                    key={starValue}
                    style={{
                      ...starLabelStyle,
                      ...(rating >= starValue ? starLabelHoverStyle : null),
                    }}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      checked={rating === starValue}
                      onChange={handleRatingChange}
                      style={{
                        display: "none", // Hide the input visually
                      }}
                    />
                    <span style={{ display: "inline-block" }}>★</span>
                  </label>
                ))}
              </div>

              <div>
                <label>Amenities</label>
                <select
                  style={{ borderRadius: "20px" }}
                  id="input1"
                  value=""
                  onChange={handleInput1Change}
                >
                  <option value="">Select...</option>
                  {Array.isArray(item) &&
                    item.map((items) => (
                      <option key={items._id} value={items._id}>
                        {items.amenities}
                      </option>
                    ))}
                </select>
              </div>

              <div
                className="results-container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {input1values.map((value, index) => (
                  <div
                    key={index}
                    className="result-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      margin: "3px",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        border: "1px solid #000",
                        borderRadius: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "15px",
                        fontWeight: "bold",
                        height: "20px",
                      }}
                    >
                      {item.find((amenity) => amenity._id === value)?.amenities}
                      <button
                        type="button" // Set type to button to prevent form submission
                        style={{
                          position: "relative",
                          left: "5px",
                          border: "none",
                          margin: "1px",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => deleteItem(value)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SoftBox>

            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={handleUpdate}  variant="gradient" color="dark"  fullWidth>
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
