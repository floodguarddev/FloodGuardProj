import React, { useEffect, useState } from 'react'
import { Box, Typography } from "@mui/material";
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
import { editAdmin } from '@/services/admins.services';
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';

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


const EditAdmin = ({admin, setAdmin, handleClose, open}) => {
  const [adminContext, setAdminContext] = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminPhoto, setAdminPhoto] = useState(undefined);
  const { enqueueSnackbar } =  useSnackbar();
  const fileSelectedHandler = (event) => {
    setAdminPhoto(event.target.files[0]);
  }

  useEffect(()=>{
    if(admin){
        setName(admin.name);
        setEmail(admin.email);
    }
  }, [admin])

  const updateAdminFunc = async (event) => {

    try{
      let token = adminContext.token;
    
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('adminPhoto', adminPhoto);

      let response = await editAdmin(token, admin._id, formData);
      let editedAdmin = await response.data.data;
      setAdmin(editedAdmin);
      enqueueSnackbar("Admin Has been Updated Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
      handleClose();
    }
    catch(error)
    {
        enqueueSnackbar(error.response.data.message || error.message, { variant: "error", anchorOrigin: {
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
              Update Admin
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
                Name
              </Typography>

              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                value={name}
                onChange={(event)=>{
                  setName(event.target.value)
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
                Email Address
              </Typography>

              <TextField
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event)=>{
                  setEmail(event.target.value)
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
                Upload Image
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                onChange={fileSelectedHandler}
                autoComplete="file"
              />

              <Box mt={1}>
                <img 
                  src={adminPhoto?URL.createObjectURL(adminPhoto):(admin && admin.adminPhotoLink)?admin.adminPhotoLink:'/images/admin/defaultProfile.jpg' }
                  alt="profile" 
                  className="borRadius100"
                  width="50px"
                  height="50px"
                />
              </Box>
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
                      updateAdminFunc();
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Update Admin
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
  )
}

export default EditAdmin;