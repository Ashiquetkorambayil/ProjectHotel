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
import Button from "@mui/material/Button";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "../amenities/data/ameinitiesTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import {   Modal} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Tables() {
  const { columns, rows } = authorsTableData();
  

  const [show, setShow] = useState(false);
    const [amenities, setAmenities] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async()=>{
    const data = {
        amenities:amenities
    }
    try{
        await axios.post('http://localhost:8800/admin/postamenities',data)
        window.location.href="/amenities"
    }catch(err){
        console.log(err);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              
              <SoftTypography variant="h6">Ameinites Table</SoftTypography>
              
              <Button onClick={handleShow}  style={{backgroundColor:"#0BBB2E"}} variant="contained" color="success">
              ADD AMENITIES
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

          <Modal show={show} centered onHide={handleClose}>
            <Modal.Header>Add Amenites</Modal.Header>
            <input value={amenities} onChange={(e)=> setAmenities(e.target.value)} className="m-4" placeholder="Enter..." />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
          </Modal>
        </SoftBox>
        {/* <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Amenities table</SoftTypography>
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
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card> */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
