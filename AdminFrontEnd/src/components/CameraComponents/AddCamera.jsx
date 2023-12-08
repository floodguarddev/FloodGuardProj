import React from "react";
import Card from "@mui/material/Card";
import { Fab, IconButton, Tooltip, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import { addPrecautions } from "@/services/camera_precautions.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DistrictCities from '../FloodComponents/DistrictCities';
import { RescuerSearchBar } from "../SearchComponents/RescuerSearchBar";
import { addCamera } from "../../services/cameras.services";
export function AddCamera() {
  const [userContext, setUserContext] = useUser();

  const [uniqueId, setUniqueId] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");
  const [rescuerId, setRescuerId] = React.useState(null);
  const { enqueueSnackbar } =  useSnackbar();

  const addCameraPrecationsFunc = async (event) => {

    try{

      let token = userContext.token;
    
      let FormData = {
        uniqueId,
        lat,
        lon,
        rescuerId
      }

      await addCamera(token, FormData);

      enqueueSnackbar("Camera Precations Has been Created Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
      
      
    }
    catch(error)
    {
        enqueueSnackbar(error.response? error.response.data.message : error.message, { variant: "error", anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }  });
    }
    
  }
  

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Add Camera
        </Typography>
        
        

        <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

                <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Unique Id
                    </Typography>

                    <TextField
                        fullWidth
                        id="uniqueId"
                        name="uniqueId"
                        autoComplete="family-name"
                        value={uniqueId}
                        onChange={(event)=>{
                        setUniqueId(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Latitude
                    </Typography>

                    <TextField
                        fullWidth
                        id="lat"
                        name="lat"
                        autoComplete="family-name"
                        value={lat}
                        onChange={(event)=>{
                        setLat(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Longitude
                    </Typography>

                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={lon}
                        onChange={(event)=>{
                        setLon(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Rescuer
                    </Typography>

                    
                  <RescuerSearchBar setRescuerId={setRescuerId}/>
                </Grid>
            </Grid>
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 10px",
              color: "#fff !important",
            }}
            onClick={()=>{
              addCameraPrecationsFunc();
            }}
          >
            Add Camera
          </Button>

        </Box>
      </Card>
    </>
  );
}
