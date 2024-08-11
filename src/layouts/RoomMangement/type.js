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
import { Box, Button, Fade, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useEffect, useState } from "react";

import axios from "axios";
import { MdDelete, MdEditSquare, MdOutlineArrowBackIos } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { isRouteErrorResponse, useNavigate, useParams } from "react-router-dom";
import data from "layouts/dashboard/components/Projects/data";

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
  // const {id} = useParams()
  const navigete = useNavigate();
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const [uid, setUid] = useState('')
  const handleOff = () => setOn(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [getData, setGetData] = useState([]);
  const [getByIdType, setGetByIdType] = useState('');
  const [getByIdDescription, setGetByIdDescription] = useState('')
  const [updType, setUpdType] = useState('')
  const [updDescription , setUpdDescription] = useState('')
  // const [getImage, setGetImage] = useState([]);
  const goback = () => navigete("/room");
  
  const handleImage = (e) => {
    const setImageFiles = Array.from(e.target.files);
    setImage(setImageFiles);
  };

  const handleTypeData = async () => {
    // const formdata = new FormData();
    // formdata.append("type", type);
    // formdata.append("description", description);
    // for (let i = 0; i < image.length; i++) {
    //   formdata.append("image", image[i]);
    // }

    const postdata ={
      type:type,
      description:description
    }
    try {
      await axios.post("http://localhost:8800/admin/posttype", postdata);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8800/admin/gettype");
        const data = response.data;

        // console.log(data, "ppppppppppppppp");
        setGetData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  // console.log(getData.description,"oooooooooooooooooo")
  // console.log(getImage,"pppppppppppppppppppppp")

  const handledlete = async (id) => {
    try {
      if (window.confirm("Are you sure to delete the Room type")) {
        await axios.delete(`http://localhost:8800/admin/deletetype/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOn = async (id) => {
    setOn(true);
    setUid(id)
    
    try {
      const response = await axios.get(`http://localhost:8800/admin/gettypebyid/${id}`);
      const data = response.data;
      console.log(response.data, "responsedata");
      setGetByIdType(data.type);
      setGetByIdDescription(data.description)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async()=>{
    const update = {
      type:getByIdType,
      description:getByIdDescription
    }
    try{
      await axios.put(`http://localhost:8800/admin/updatetype/${uid}`,update)
      .then((response)=>{
        console.log(response,"pppppppppppppppppppppppppppppppppp")
      })
      window.location.reload()
    }catch(err){
      console.log(err,"an error occured")
    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ backgroundColor: "black" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography>
                {" "}
                <Button
                  variant="contained"
                  disableElevation
                  style={{ backgroundColor: "black" }}
                  onClick={goback}
                >
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} onClick={goback} />
                </Button>
              </SoftTypography>
              <SoftTypography color="info">Type of rooms</SoftTypography>
              <SoftTypography>
                <Button onClick={handleOpen}>Add Type</Button>
              </SoftTypography>
            </SoftBox>
            <SoftBox style={{ display: "grid", placeItems: "center" }}>
              {getData.map((items, index) => (
                <div
                  key={index}
                  style={{
                    width: "95%",
                    height: "60px",
                    backgroundColor: "white",
                    marginBottom: "5px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "16px",
                      width: "60%",
                      height: "100%",
                      color: "black",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {items.type}
                  </div>
                  {/* <div><img style={{width:'10%'}} src={`http://localhost:8800/images/${items.image[0]}`}/></div> */}
                  {/* <div
                     style={{
                       borderRadius: "16px",
                       width: "20%",
                       height: "100%",
                       display: "grid",
                       placeItems: "center",
                     }}
                   >
                     <LuView cursor="pointer" className="mx-2" />
                   </div> */}
                  <div
                    style={{
                      borderRadius: "16px",
                      width: "20%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <MdEditSquare
                      cursor="pointer"
                      className="mx-2"
                      onClick={() => handleOn(items._id)}
                    />
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      width: "20%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <MdDelete
                      cursor="pointer"
                      className="mx-2"
                      onClick={() => handledlete(items._id)}
                    />
                  </div>
                </div>
              ))}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}

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
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleClose} />
              </IconButton>
              Type
            </Typography>
            {/* <input
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={handleImage}
              multiple
            /> */}
            <input
              className="my-2"
              style={{ width: "100%" }}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type of room"
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <Button onClick={handleTypeData}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      {/* update */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={on}
        onClose={handleOff}
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
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleOff} />
              </IconButton>
              Type
            </Typography>
            {/* <input
              className="my-2"
              style={{ width: "100%" }}
              type="file"
              onChange={handleImage}
              multiple
            /> */}
            <input
              className="my-2"
              style={{ width: "100%" }}
              value={getByIdType}
              placeholder="Type of room"
              onChange={(e)=> setGetByIdType(e.target.value)}
            />
            <textarea
              className="my-2"
              style={{ width: "100%" }}
              value={getByIdDescription}
              placeholder="Description"
              onChange={(e)=> setGetByIdDescription(e.target.value)}
            />

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
