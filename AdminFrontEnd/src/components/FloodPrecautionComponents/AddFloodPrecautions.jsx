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
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import AddIcon from '@mui/icons-material/Add';

export function AddFloodPrecautions() {
  const [userContext, setUserContext] = useUser();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [precautionsList,setPrecautionsList] = React.useState([""]);

  const { enqueueSnackbar } =  useSnackbar();

  const addFloodPrecationsFunc = async (event) => {

    try{

      let token = userContext.token;
    
      let FormData = {
        title,
        description,
        precautions: precautionsList
      }

      await addPrecautions(token, FormData);

      enqueueSnackbar("Flood Precations Has been Created Successfully", { variant: "success" ,anchorOrigin: {
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
          Add Flood Precations
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
                        Title
                    </Typography>

                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={title}
                        onChange={(event)=>{
                        setTitle(event.target.value)
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
                        Description
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={description}
                        onChange={(event)=>{
                        setDescription(event.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12} textAlign={"center"}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Precautions
                    </Typography>
                    {
                        precautionsList.map((precaution, index)=>{
                            return(
                                <div style={{display:"flex", justifyItems:"center", alignItems:"center"}}>
                                    <TextField
                                    multiline
                                    fullWidth
                                    sx={{mt: 2}}
                                    id="title"
                                    name="title"
                                    autoComplete="family-name"
                                    value={precautionsList[index]}
                                    onChange={(event)=>{
                                    let precautions = [...precautionsList]
                                    precautions[index] = event.target.value;
                                    setPrecautionsList(precautions)
                                    }}
                                    />
                                    <Tooltip title="Remove" placement="top">
                                        <IconButton
                                        aria-label="remove"
                                        size="large"
                                        color="danger"
                                        className="danger"
                                        sx={{ 
                                            mt: 2,
                                            background: '#fff',
                                            ml: '10px'
                                        }}
                                        onClick={()=>{
                                            console.log(index)
                                            let precautions = [...precautionsList]
                                            if(precautions.length <= 1){
                                                enqueueSnackbar("There must be one precaution atleast", { variant: "error", anchorOrigin: {
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }  });
                                            }
                                            else{
                                                precautions.splice(index, index?index:index+1);
                                                setPrecautionsList(precautions)
                                            }
                                        }}
                                        >
                                           <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                
                                
                            )
                        })
                    }
                    <Tooltip title="Add Precautions" placement="top">
                        
                        <IconButton
                        aria-label="info"
                        size="large"
                        color="info"
                        className="info"
                        sx={{
                            fontSize:'40px',
                            background: '#fff',
                        }}
                        onClick={()=>{
                            let precautions = [...precautionsList]
                            precautions.push("");
                            setPrecautionsList(precautions)
                        }}
                        >
                             <Fab color="primary" aria-label="add">
                                <AddIcon sx={{ color: "#fff !important" }} />
                            </Fab>
                        </IconButton>
                    </Tooltip>
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
            Create New Flood Precautions
          </Button>

        </Box>
      </Card>
    </>
  );
}
