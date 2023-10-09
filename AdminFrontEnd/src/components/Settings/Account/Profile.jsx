import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from "@/context/UserContext"
import {updateAdminProfile} from "@/services/auth.services";
import { useSnackbar } from 'notistack';
export default function Profile() {
  
  const [userContext, setUserContext] = useContext(UserContext)
  const [name, setName] = useState(userContext.name);
  const [email, setEmail] = useState(userContext.email);
  const [adminPhoto, setAdminPhoto] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const fileSelectedHandler = (event) => {
    setAdminPhoto(event.target.files[0]);

  }

  const updateProfileFunction = async (event) => {

    try{
      let token = userContext.token;
    
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('adminPhoto', adminPhoto);

      let response = await updateAdminProfile(token, formData);
      console.log(response);
      let data = await response.data.data;

      setUserContext(oldValues => {
        return { ...oldValues,
          adminPhotoLink: data.admin.adminPhotoLink||'/images/admin/defaultProfile.jpg',
          name: data.admin.name,
          email: data.admin.email
        }
      })
      
      enqueueSnackbar("Your Profile Has been Updated Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
    }
    catch(error)
    {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error", anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }  });
    }
    
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: '1px solid #eee',
            paddingBottom: '10px'
          }}
          className="for-dark-bottom-border"
        >
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Profile
          </Typography>

          <Typography fontSize="13px">
            Update your photo and personal details here.
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                  src={adminPhoto?URL.createObjectURL(adminPhoto):userContext.adminPhotoLink }
                  alt="profile" 
                  className="borRadius100"
                  width="50px"
                  height="50px"
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              padding: "12px 30px",
              color: "#fff !important"
            }}
            onClick={(event)=>{
              updateProfileFunction();
            }}
          >
            Update
          </Button>
        </Box>
      </Box> 
    </> 
  );
}