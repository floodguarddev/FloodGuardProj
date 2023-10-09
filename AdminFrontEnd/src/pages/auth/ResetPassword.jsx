import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useSearchParams} from "react-router-dom"
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/components/Authentication/Authentication.module.css";
import { resetPassword } from "@/services/auth.services";
import { useSnackbar } from 'notistack';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const resetPasswordFunc = async (event) => {
    let token = searchParams.get("token");
    
    if(password != confirmPassword){
      enqueueSnackbar("Confirm Password doesn't match", { variant: "error", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });
      return
    }

    try{
      let response = await resetPassword(token, {password});

      enqueueSnackbar(response.data.message, { variant: "success", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });

      navigate('/sign_in')
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
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Reset Password{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Box component="form" noValidate>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
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
                        Enter New Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event)=>{
                          setPassword(event.target.value)
                        }}
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
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
                        Re Enter New Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event)=>{
                          setConfirmPassword(event.target.value)
                        }}
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
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
                  onClick={resetPasswordFunc}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ResetPassword;
