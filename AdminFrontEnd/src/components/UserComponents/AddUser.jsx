import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import { addUser } from "@/services/users.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';

export function AddUser() {
  const [userContext, setUserContext] = useUser();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const[password,setPassword]=React.useState("");
  const[confirmPassword, setConfirmPassword]=React.useState("");
  const [userPhoto, setUserPhoto] = React.useState(undefined);
  const { enqueueSnackbar } =  useSnackbar();
  const fileSelectedHandler = (event) => {
    setUserPhoto(event.target.files[0]);
  }

  const addUserFunc = async (event) => {

    try{
      if(password.length > 0 && password != confirmPassword){
        throw new Error("Password and Confirm Passsword doesn't match");
      }

      let token = userContext.token;
    
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('userPhoto', userPhoto);
      formData.append('password', password);

      let response = await addUser(token, formData);

      enqueueSnackbar("User Has been Created Successfully", { variant: "success" ,anchorOrigin: {
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
          Add User
        </Typography>
        
        

        <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

              <Grid item xs={12} textAlign = "center">
                

                <Box mt={1}>
                    <img 
                    src={userPhoto?URL.createObjectURL(userPhoto):'/images/admin/defaultProfile.jpg' }
                    alt="profile" 
                    className="borRadius100"
                    width="150px"
                    height="150px"
                    />
              </Box>
              <TextField
                    required
                    fullWidth
                    name="file"
                    type="file"
                    id="file"
                    onChange={fileSelectedHandler}
                    autoComplete="file"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle 
                    sx={{ color: 'action.active', my: 0.5 }} 
                    className="mr-1 whiteColor"
                  />
                  <TextField 
                    id="name" 
                    label="Name" 
                    variant="standard" 
                    fullWidth
                    className="with-icons-input"
                    value={name}
                    onChange={(event)=>{
                      setName(event.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <MailOutlineIcon 
                    sx={{ color: 'action.active', my: 0.5 }} 
                    className="mr-1 whiteColor"
                  />
                  <TextField 
                    id="email" 
                    label="Email Address" 
                    variant="standard" 
                    fullWidth
                    className="with-icons-input"
                    value={email}
                    onChange={(event)=>{
                      setEmail(event.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LockIcon 
                    sx={{ color: 'action.active', my: 0.5 }} 
                    className="mr-1 whiteColor"
                  />
                  <TextField 
                    id="password" 
                    label="Password" 
                    variant="standard" 
                    fullWidth
                    className="with-icons-input"
                    type="password"
                    value={password}
                    onChange={(event)=>{
                      setPassword(event.target.value)
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LockIcon 
                    sx={{ color: 'action.active', my: 0.5 }} 
                    className="mr-1 whiteColor"
                  />
                  <TextField 
                    id="confirmPassword" 
                    label="Confirm Password" 
                    variant="standard" 
                    type="password"
                    fullWidth
                    className="with-icons-input"
                    value={confirmPassword}
                    onChange={(event)=>{
                      setConfirmPassword(event.target.value)
                    }}
                  />
                </Box>
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
              addUserFunc();
            }}
          >
            Create New User
          </Button>

        </Box>
      </Card>
    </>
  );
}
