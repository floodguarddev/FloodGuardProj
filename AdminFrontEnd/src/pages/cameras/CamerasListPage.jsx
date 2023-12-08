import * as React from "react";
import { Box, CardContent, Grid, Hidden, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { ViewCameraList } from "../../components/CameraComponents/ViewCameraList";
import EditCamera from "@/components/CameraComponents/EditCamera";
import { SearchAndFilter } from '../../components/CameraComponents/SearchAndFilter';
import CamerasMap from "../../components/CameraComponents/CamerasMap";
import io from 'socket.io-client'
import {useUser} from "../../context/UserContext"
import { getCamerasList } from "../../services/cameras.services";
// End Create new camera Modal

function MembersLists(props) {
  
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

MembersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const socket = io('http://localhost:3000/')
export default function CamerasListPage() {
  const [userContext, setUserContext] = useUser();
  const [image, setImage] = React.useState(null);
  const [cameras, setCameras] = React.useState( []);
  const [status, setStatus] = React.useState("");
  const [selectedCamera, setSelectedCamera] = React.useState(null) 
  //Camera List Refresher
  const [camerasRefresh, setCamerasRefresh] = React.useState(true);
  //Query//
  const[query, setQuery] = React.useState({limit: 10, offset:0});
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRecords, setTotalRecords] = React.useState(100);

  React.useEffect(()=>{
    getCamerasList(userContext.token).then((response)=>response.data.data.cameras).then(
      (cameras)=>{
        setCameras(cameras)
      }
    )
    socket.on('camera_status', (cameraId, cameraStatus)=>{
      
    })
    socket.on('status', (detection)=>{
      let detect = JSON.parse(detection);
      detect.forEach((ent)=>{
        if(ent == 'person')
        {
          
         setStatus("PERSON")
         return
        }
      })
      setStatus("NO PERSON DETECTED-----------------------")
    })
    socket.on('newImage', (image)=>{
      
      setImage(image);
    })
  }, [])
  React.useEffect(()=>{
    if(selectedCamera){
      socket.emit('join', selectedCamera.uniqueId)
    }
  }, [selectedCamera])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQuery((oldValues)=>{
      oldValues.offset = newPage * rowsPerPage
      return oldValues
    })
    setCamerasRefresh(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setQuery((oldValues)=>{
      oldValues.offset = 0;
      oldValues.limit = parseInt(event.target.value, 10);
      return oldValues;
    })
    setCamerasRefresh(true);
  };

  // Edit Camera Model
  const [editCamera, setEditCamera] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = (camera) => {
    setEditCamera(camera)
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setCamerasRefresh(true);
  };
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Cameras List</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Cameras List</li>
        </ul>
      </div>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Cameras List
          </Typography>
          <Link to = "/cameras/add">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
                color: "#fff !important",
              }}
            >
              <AddIcon
                sx={{ position: "relative", top: "-1px" }}
                className='mr-5px'
              />{" "}
              Add Camera
            </Button>
          </Link>
          
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          <Grid item xs = {12} md = {8}>
            <CamerasMap cameras = {cameras} setSelectedCamera={setSelectedCamera}/>
          </Grid>
          <Grid item xs = {12} md ={4}>
            <Hidden mdUp>
              <Card >
                  here
              </Card>
            </Hidden>
            <Hidden mdDown>
              <Card
                style={{
                  height: '400px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                }}
              >
                <CardContent sx={{padding: 0}}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: '500',
                      textAlign: 'center',
                      backgroundColor: '#2196F3', // Blue background
                      color: '#FFFFFF', // White text
                      padding: '15px',
                      borderRadius: '8px 8px 0 0', // Rounded corners at the top
                      marginBottom: '10px',
                    }}
                  >
                    Camera Details
                  </Typography>
                  <div style={{overflowY: 'auto', height:'320px', padding: 0, marginBottom: '20px' }}>
                    {/* Additional styling for city information */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                          src={image?`data:image/jpeg;base64,${image}`:"https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"}
                          alt=""
                          style={{
                            width: 250,
                            height: 250,
                            objectFit: 'cover', // This property will crop the image while maintaining aspect ratio
                          }}
                        />
                    </div>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Status:</strong> {status?status:""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Camera Unique ID:</strong> {selectedCamera?selectedCamera.uniqueId:""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Address:</strong> {selectedCamera?selectedCamera.address.join(', '):""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Installed Date:</strong> {selectedCamera?new Date(selectedCamera.installedDate).toLocaleString():""}
                    </Typography>
                  </div>
                  
                  {/* Add more content or customize styles based on your needs */}
                </CardContent>
              </Card>
            </Hidden>
          </Grid>
          
          <Grid item xs = {12}>
            <SearchAndFilter setCamerasRefresh={setCamerasRefresh} offset={page*rowsPerPage} limit = {rowsPerPage} query = {query} setQuery = {setQuery}/>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
              }}
            >
              <Table 
                sx={{ minWidth: 850 }} 
                aria-label="custom pagination table"
                className="dark-table"
              >
                {/* View Cameras */}
                <ViewCameraList setTotalRecords={setTotalRecords} camerasRefresh={camerasRefresh} setCamerasRefresh={setCamerasRefresh} handleEditOpen={handleEditOpen} query={query} rowsPerPage={rowsPerPage} totalRows={10} />

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                      colSpan={8}
                      count={totalRecords}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={MembersLists}
                      style={{ borderBottom: "none" }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
      
      {
        /*Update Camera*/
      }
      
      <EditCamera
        handleClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
        camera={editCamera}
        setCamera={setEditCamera}
      />
    </>
  );
}
