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

// Data
import authorsTableData from "./data/authorsTableData";
import Button from "@mui/material/Button";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows } = authorsTableData();
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState([]);
  const [data, setData] = useState({
    name: "",
    role: "",
    description: "",
  });
  const [error1, setError1] = useState("");

  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [info, setInfo] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCreate = async (e) => {
    console.log(data.name);
    console.log(data.description);
    const validErr = [];

    if (!data.name) {
      setError1("This filed is required !");
      validErr.push(error1);
    } else {
      setError1(null);
    }

    if (data.role.length <= 9) {
      setError3("Select a role ");
      validErr.push(error3);
    } else {
      setError3(null);
    }
    if (!data.description) {
      setError4("Write the discription");
      validErr.push(error4);
    } else {
      setError4(null);
    }
    if (validErr.length === 0) {
      const formdata = new FormData();
      formdata.append("hotelId", id);
      formdata.append("image", image);
      formdata.append("name", data.name);
      formdata.append("role", data.role);
      formdata.append("description", data.description);

      try {
        await axios.post("http://localhost:8800/admin/postbranchadmin", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill all fields correctly");
    }
  };
  // const { columns: prCols, rows: prRows } = projectsTableData;

  //  useEffect(async()=>{
  //   try{
  //    const response =  await axios.get(`http://localhost:8800/admin/getbyidhoteldata/${id}`);
  //    setInfo(response.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  //  },[id])
console.log(info, "infooooooooo")
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8800/admin/getbyidhoteldata/${id}`);
      setInfo(response.data); // Assuming 'data' is the property containing the array
      console.log("response dataaaaaaaaaaaaaaaaa", response.data);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
        {info && (
          <Card>
           

           
            <SoftBox  display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Link to="/hotel">
                <Button variant="contained" disableElevation style={{ backgroundColor: "black" }}>
                  {" "}
                  <MdOutlineArrowBackIos style={{ color: "white" }} />
                </Button>
              </Link>

              <SoftTypography variant="h6">{info.branch} Branch Admin Table</SoftTypography>

              <Button variant="contained" onClick={handleShow} disableElevation>
                Add Admin
              </Button>
            </SoftBox>
         
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
              )}
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>Add Branch Admin</Modal.Title>
        </Modal.Header>
        
        <input name="image" style={{ margin: "2%" }} type="file" onChange={handleImage} />

        <input
          value={data.name}
          name="name"
          style={{ margin: "2%" }}
          placeholder="Name "
          onChange={handleData}
        />
        <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error1}</p>

        <select value={data.role} name="role" style={{ margin: "2%" }} onChange={handleData}>
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
        <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error3}</p>
        <textarea
          name="description"
          value={data.description}
          style={{ margin: "2%" }}
          placeholder="description"
          onChange={handleData}
        />
        <p style={{ color: "red", fontSize: "12px", marginLeft: "3%" }}>{error4}</p>

        <Modal.Footer>
          <Button variant="contained" onClick={handleCreate}>
            Save Branch Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
