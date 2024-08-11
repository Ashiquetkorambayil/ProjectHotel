/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// Images

import { useEffect, useState } from "react";

import axios from "axios";

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { Button } from "react-bootstrap";
import data from "layouts/dashboard/components/Projects/data";
import { Link } from "react-router-dom";
import { Hotel } from "@mui/icons-material";

function Data() {
  const [item, setItem] = useState([]);

  // const [open , setOpen] = useState(false);
  // const [selectedAmenities, setSelectedAmenities] = useState(null);
  // const [amenities, setAmenities] = useState('');
  // console.log("444444444",selectedAmenities);
  // const handleShow = (id)=>{
  //     const selectedAmenities = item.find((items)=> items._id === id);
  //     console.log(selectedAmenities);
  //     setSelectedAmenities(selectedAmenities);
  //     setAmenities(selectedAmenities.amenities);
  //     handleOpen();
  // };

  // const handleOpen = (id)=>{
  //     setOpen(true);
  // }

  // const handleClose = ()=>{
  //     setOpen(false);
  // }
  // const [show, setShow] = useState(false);
  // const [ids,setId]=useState("")
  // const handleClose = () => setShow(false);
  // const handleShow = (id) => {
  //     setShow(true);
  //     setId(id)
  // }

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:8800/admin/getamenities")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //   const [data, setData]=useState({
  //     amenities:''
  //   })
  //   const fetch = useCallback(async()=>{
  //     try{
  //         const response = await axios.get(`http://localhost:8800/admin/getamenitiesbyid/${ids}`)

  //         const data = response.data;
  //         console.log("data", response.data)
  //         setData({
  //             amenities:data.amenities
  //         })
  //     }catch(err){
    
  //         console.log(err)
  //     }

  //   },[ids])
  //   useEffect(()=>{
  //     fetch();
  //   },[fetch])

  //   const {id} = useParams()
  //   const handleUpdate = async()=>{

  //       const formdata = new FormData;
  //       formdata.append("amenities",data.amenities);
  //       try{
  //           await axios.put(`http://localhost:8800/admin/putamenities/${selectedAmenities._id}`,amenities)
  //           window.location.href="/amenities"
  //           .then((response)=>{
  //               console.log(response.data)
  //           })
  //       }catch(err){
  //           console.log(err)
  //       }

  //   }

  // const onChangeUpdate = (e)=>{
  //     const {name, value} = e.target;
  //     setData((prevState)=>({
  //       ...prevState,
  //       [name]:value,
  //     }));
  //   }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/admin/deleteamenitiesbyid/${id}`);
      window.location.href = "/amenities";
    } catch (err) {
      console.log(err);
    }
  };

  const Amenities = ({ amenities }) => (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {amenities}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );

  return {
    columns: [
      { name: "amenities", align: "left" },
      { name: "edit", align: "center" },
      { name: "delete", align: "center" },
    ],

    rows: item.map((items) => ({
      amenities: <Amenities amenities={items.amenities} />,

      delete: (
        <SoftTypography>
          <Button
           style={{ color:'red'}}
            onClick={(e) => handleDelete(items._id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </SoftTypography>
      ),
      edit: (
        <div>
          <SoftTypography>
            <Link to={`/editamenities/${items._id}`}>
              <Button style={{color:"#45DAB3", backgroundColor:'#B3E4BD'}} variant="contained" color="success">
                Edit
              </Button>
            </Link>
          </SoftTypography>

          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Edit your amenities"}</DialogTitle>
            <DialogContent>
              <input name="amenities" value={amenities} style={{ width: "100%" }} onChange={(e)=> setAmenities(e.target.value)}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} >Disagree</Button>
              <Button  autoFocus onClick={handleUpdate}>
                Agree
              </Button>
            </DialogActions>
          </Dialog> */}
        </div>
      ),
    })),
  };
}

export default Data;
