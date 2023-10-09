import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import { useSnackbar } from 'notistack';
import { useUser } from "@/context/UserContext"
import { changePassword } from '../../../services/auth.services';

export default function ChangePassword() {
  const [userContext, setUserContext] = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const changePasswordFunc = async (event) => {
    if(newPassword != confirmPassword){
      enqueueSnackbar("Confirm Password doesn't match", { variant: "error", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });
      return
    }

    try{
      let response = await changePassword(userContext.token, {newPassword, oldPassword});

      enqueueSnackbar(response.data.message, { variant: "success", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });
    }
    catch(error)
    {
        enqueueSnackbar(error.response.data.message, { variant: "error", anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }  });
    }
    

  };

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
            Security
          </Typography>

          <Typography fontSize="13px">
            Update your password here.
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Old Password
              </Typography>
              <TextField
                autoComplete="old-password*"
                name="oldPassword*"
                fullWidth
                id="oldPassword" 
                type="password"
                value={oldPassword}
                onChange={(event)=>{setOldPassword(event.target.value)}}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                New Password
              </Typography>
              <TextField
                autoComplete="new-password*"
                name="newPassword*"
                fullWidth
                id="newPassword" 
                type="password"
                value={newPassword}
                onChange={(event)=>{setNewPassword(event.target.value)}}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                autoComplete="confirm-password*"
                name="confirmPassword*"
                fullWidth
                id="confirmPassword" 
                type="password"
                value={confirmPassword}
                onChange={(event)=>{setConfirmPassword(event.target.value)}}
                autoFocus
              />
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
            onClick={changePasswordFunc}
          >
            Change Password
          </Button>
        </Box>
      </Box> 
    </> 
  );
}