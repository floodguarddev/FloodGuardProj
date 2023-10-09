import React, {useState} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import { useSnackbar } from 'notistack';
import { sendResetPasswordEmail } from "@/services/auth.services";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const sendResetPasswordEmailFunc = async (event)=>{
    try{
      let response = await sendResetPasswordEmail({email});
      
      enqueueSnackbar(response.data.message, { variant: "success", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });

      navigate('/confirm_mail');
    }
    catch(error){
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error", anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }  });
    }
  }

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
                Forgot Password?{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Enter your email and we′ll send you instructions to reset your
                password
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
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event)=>{
                          setEmail(event.target.value)
                        }}
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
                    mt: 1,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important"
                  }}
                  onClick={sendResetPasswordEmailFunc}
                >
                  Send Reset Link
                </Button>
              </Box>

              <Box as="div" textAlign="center" mt="20px">
                <Link
                  to="/sign_in/"
                  className="primaryColor text-decoration-none"
                >
                  <i className="ri-arrow-left-s-line"></i> Back to Sign in
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
