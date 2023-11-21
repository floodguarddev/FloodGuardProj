import React, {useContext, useState} from "react";
import { Outlet, Link, useNavigate  } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/components/Authentication/Authentication.module.css";
import { UserContext } from "@/context/UserContext"
import { adminSignIn } from "../../services/auth.services";
import { SnackbarProvider, useSnackbar } from 'notistack';
const SignInForm = () => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const signinFunction = async (event) => {
    try{
      let response = await adminSignIn(
        {email:email, 
        password: password
      });
      if(response.status == 200){
        
        let data = await response.data.data;
        console.log(data);
        setUserContext(oldValues => {
          return { ...oldValues, 
            id: data.admin._id,
            token: data.token, 
            adminPhotoLink: data.admin.adminPhotoLink||'/images/admin/defaultProfile.jpg',
            name: data.admin.name,
            email: data.admin.email
          }
        })
        navigate('/');
      }
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
                Sign In{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Box component="form" >
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
                        value = {email}
                        onChange={(event)=>{
                          setEmail(event.target.value);
                        }}
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
                        Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value = {password}
                        onChange={(event)=>{
                          setPassword(event.target.value);
                        }}
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember me."
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="end">
                    <Link
                      to="/forgot_password"
                      className="primaryColor text-decoration-none"
                    >
                      Forgot your password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  onClick={signinFunction}
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
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SignInForm;
