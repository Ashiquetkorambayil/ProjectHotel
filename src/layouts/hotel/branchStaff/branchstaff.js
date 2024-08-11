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
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Data

import { MdDelete, MdEditSquare, MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuView } from "react-icons/lu";
import axios from "axios";

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
    const navigate = useNavigate()
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
    const [uid, setUid] = useState('')
  const handleOff = () => setOn(false);
  const [getOperation, setGetOperation] = useState([]);
  const [getRole, setGetRole] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [operataions, setOperataions] = useState("");
  const [role, setRole] = useState("");
  const [updImage, setUpdImage] = useState([]);
  const [getBranchStaff, setGetBranchStaff] = useState([]);
  const [getByIdBranchStaff, setGetByIdBranchStaff] = useState({
    name: "",
    phone: "",
    email: "",
    operataions: "",
    role: "",
  });
  const [getByIdOperations, setGetByIdOperations] = useState([]);
  const [getByIdRoles, setGetByIdRoles] = useState([]);
  //  const [getByIdOperation, setGetByIdOperation] = useState('')
  //  const [getByIdRole, setGetByIdRole] = useState('')
  const filteredRoles = getRole.filter((role) => role.updoperations === operataions);
  const filterRoles = getRole.filter((role) => role.updoperations === getByIdBranchStaff.operataions);
  const { id } = useParams();
  const goback = ()=> navigate('/hotel')
  const handleOn = async () => {
    setOn(true);
    try {
      const response = await axios.get("http://localhost:8800/admin/getoperations");

      setGetOperation(response.data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await axios.get("http://localhost:8800/admin/getrole");
      console.log(response.data);
      setGetRole(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async () => {
    const formdata = new FormData();
    formdata.append("hotelId", id);
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("operations", operataions);
    formdata.append("role", role);

    try {
      await axios.post("http://localhost:8800/admin/postbranchstaff", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.reload();
    } catch (err) {
      console.log(err, "error while posting data");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/admin/getbranchstaff/${id}`);
        setGetBranchStaff(response.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get("http://localhost:8800/admin/getoperations");

        setGetOperation(response.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await axios.get("http://localhost:8800/admin/getrole");
        console.log(response.data);
        setGetRole(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("are you sure you to delete the staff")) {
      try {
        await axios.delete(`http://localhost:8800/admin/deletebranchstaff/${id}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOpen = async (id) => {
    setOpen(true);
    setUid (id)
    try {
      const response = await axios.get(`http://localhost:8800/admin/getbranchstaffbyid/${id}`);
      const data = response.data;
      
      setGetByIdBranchStaff({
        name: data.name,
        email: data.email,
        phone: data.phone,
        operataions: data.operations,
        role: data.role,
      });
      console.log("API response:", response.data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await axios.get("http://localhost:8800/admin/getoperations");
      console.log(response.data, "response dataaaaaaaaaaaaa");
      setGetByIdOperations(response.data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await axios.get("http://localhost:8800/admin/getrole");
      console.log(response.data);
      setGetByIdRoles(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e)=>{
    const file = (e.target.files[0])
    setUpdImage(file)
  }

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setGetByIdBranchStaff((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const updateBranchStaff = async()=>{
    
    const formdata = new FormData();
    formdata.append('image',updImage);
    formdata.append('name', getByIdBranchStaff.name);
    formdata.append('phone', getByIdBranchStaff.phone);
    formdata.append('email', getByIdBranchStaff.email);
    formdata.append('operations', getByIdBranchStaff.operataions);
    formdata.append('role', getByIdBranchStaff.role)
    try{
        await axios.put(`http://localhost:8800/admin/updatebranchstaff/${uid}`,formdata,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
                })
                window.location.reload()
    }catch(err){
        console.log(err)
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ backgroundColor: "black" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <Button variant="contained" disableElevation style={{ backgroundColor: "black" }} onClick={goback}>
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} onClick={goback}/>
                </Button>
              <SoftTypography variant="h6" color="info">
                Branch Staff
              </SoftTypography>

              <Button color="info" onClick={handleOn}>
                Add Staff
              </Button>
            </SoftBox>
            <SoftBox style={{ display: "grid", placeItems: "center" }}>
              {getBranchStaff.map((items, index) => (
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
                      width: "10%",
                      height: "100%",
                      color: "black",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Avatar src={`http://localhost:8800/${items.image}`} />
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      width: "30%",
                      height: "40%",
                      color: "black",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {items.name}
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      width: "30%",
                      height: "40%",
                      color: "black",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "medium",
                    }}
                  >
                    {" "}
                    {getRole.find((item) => item._id === items.role)?.role}
                  </div>
                  <div
                    color="mute"
                    style={{
                      borderRadius: "16px",
                      width: "30%",
                      height: "40%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "small",
                    }}
                  >
                    {getOperation.find((item) => item._id === items.operations)?.operations}
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
                    <Link to={`/viewbranchstaff/${items._id}`}>
                      {" "}
                      <LuView cursor="pointer" className="mx-2" />
                    </Link>
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
                    <MdEditSquare
                      cursor="pointer"
                      className="mx-2"
                      onClick={() => handleOpen(items._id)}
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
                      onClick={() => handleDelete(items._id)}
                    />
                  </div>
                </div>
              ))}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

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
        style={{ borderRadius: "16px" }}
      >
        <Fade in={on}>
          <Box sx={style} style={{ borderRadius: "16px" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleOff} />
              </IconButton>
              Add Staff
            </Typography>
            <input
              style={{ width: "100%", marginBottom: "5px" }}
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              type="number"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              name="operations"
              style={{ width: "100%", borderRadius: "12px" }}
              onChange={(e) => setOperataions(e.target.value)}
            >
              <option>Select Operation....</option>

              {getOperation.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.operations}
                </option>
              ))}
            </select>
            <select
              name="role"
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", borderRadius: "12px" }}
            >
              <option>Select Role....</option>
              {filteredRoles.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.role}
                </option>
              ))}
            </select>

            <Button onClick={handlePost}>Save</Button>
          </Box>
        </Fade>
      </Modal>

      {/* update modal */}

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
        style={{ borderRadius: "16px" }}
      >
        <Fade in={open}>
          <Box sx={style} style={{ borderRadius: "16px" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon onClick={handleClose} />
              </IconButton>
              Add Staff
            </Typography>
            <input
              style={{ width: "100%", marginBottom: "5px" }}
              type="file"
              name="image"
              onChange={handleImage}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              placeholder="Name"
              name="name"
              value={getByIdBranchStaff.name}
              onChange={(e) => handleUpdate(e)}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              type="number"
              placeholder="Phone"
              value={getByIdBranchStaff.phone}
              name="phone"
              onChange={(e) => handleUpdate(e)}
            />
            <input
              style={{ width: "100%", marginBottom: "5px", borderRadius: "12px" }}
              type="email"
              placeholder="Email"
              value={getByIdBranchStaff.email}
              name="email"
              onChange={(e) => handleUpdate(e)}
            />

            <select
              onChange={(e) => handleUpdate(e)}
              name="operataions"
              style={{ width: "100%", borderRadius: "12px" }}
              value={getByIdBranchStaff.operataions}
            >
              <option>Select Operation....</option>

              {getByIdOperations.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.operations}
                </option>
              ))}
            </select>
            <select
              name="role"
              onChange={(e) => handleUpdate(e)}
              value={getByIdBranchStaff.role}
              style={{ width: "100%", borderRadius: "12px" }}
            >
              <option>Select Role....</option>
              {filterRoles.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.role}
                </option>
              ))}
            </select>

            <Button onClick={updateBranchStaff}>Update</Button>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
