import React, { useEffect, useState } from 'react'
import { Box, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close'; 
import { editUser } from '@/services/users.services';
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import { editPrecautions } from '@/services/flood_precautions.services';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const EditFloodPrecautions  = ({floodPrecautions, setFloodPrecautions, handleClose, open}) => {
  const [userContext, setUserContext] = useUser();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [precautionsList,setPrecautionsList] = React.useState([""]);

  const { enqueueSnackbar } =  useSnackbar();

  useEffect(()=>{
    if(floodPrecautions){
        setTitle(floodPrecautions.title);
        setDescription(floodPrecautions.description);
        setPrecautionsList(floodPrecautions.precautions);
    }
  }, [floodPrecautions])

  const updatePrecautionFunction = async (event) => {

    try{
      let token = userContext.token;
    
      let formData = {
        title,
        description,
        precautions: precautionsList
      }

      let response = await editPrecautions(token, floodPrecautions._id, formData);
      
      console.log(response);
      let editdPrecaution = await response.data.data.flood_precautions;
      setFloodPrecautions(editdPrecaution);
      enqueueSnackbar("Precaution Has been Updated Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
      handleClose();
    }
    catch(error)
    {
        console.log(error);
        enqueueSnackbar(error.response? error.response.data.message : error.message, { variant: "error", anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }  });
    }
    
  }

  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Update Flood Precautions
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
              className="modal-close"
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate >
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
        <Grid container alignItems="center" spacing={2}>
                
            
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
                             <PlaylistAddCircleOutlinedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} textAlign="end">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                    onClick={handleClose}
                    className='mr-15px'
                  >
                    <ClearIcon
                      sx={{
                        position: "relative",
                        top: "-1px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                    onClick = {()=>{
                        updatePrecautionFunction();
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Update Flood Precaution
                  </Button>
                </Grid>
            </Grid>

            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
  )
}

export default EditFloodPrecautions;