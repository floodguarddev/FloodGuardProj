import React from "react";
import Card from "@mui/material/Card";
import { Fab, IconButton, Tooltip, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addPrecautions } from "@/services/flood_precautions.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DistrictCities from './DistrictCities';
import { addFlood } from "../../services/floods.services";
export function AddFlood() {
  const [userContext, setUserContext] = useUser();

  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [districts, setDistricts] = React.useState([]);

  const { enqueueSnackbar } =  useSnackbar();

  const addFloodPrecationsFunc = async (event) => {

    try{

      let token = userContext.token;
    
      let FormData = {
        description,
        date,
        districts
      }

      await addFlood(token, FormData);

      enqueueSnackbar("Flood Has been Added Successfully", { variant: "success" ,anchorOrigin: {
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
          Add Flood
        </Typography>
        
        

        <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

                <Grid item style={{flex: 1}}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Description
                    </Typography>

                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        autoComplete="family-name"
                        value={description}
                        onChange={(event)=>{
                        setDescription(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item >
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Date
                    </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
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
                        Selected Cities
                    </Typography>
                  <DistrictCities cities = {districts} setCities={setDistricts}/>
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
              addFloodPrecationsFunc();
            }}
          >
            Add Flood
          </Button>

        </Box>
      </Card>
    </>
  );
}
