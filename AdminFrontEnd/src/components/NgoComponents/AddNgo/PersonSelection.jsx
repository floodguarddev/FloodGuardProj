import React from 'react'
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { UserSearchBox } from '../../SearchComponents/UserSearchBar';

export const PersonSelection = ({user, setUser, cnicNumber, setCnicNumber, mobileNumber, setMobileNumber, associatedPersonStatus, setAssociatedPersonStatus}) => {
  return (
    <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={12} md = {6}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Select User
                    </Typography>

                    <UserSearchBox setUserId={setUser}/>
                </Grid>
                <Grid item xs={12} md = {6}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        CNIC Number
                    </Typography>

                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={cnicNumber}
                        onChange={(event)=>{
                        setCnicNumber(event.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12} md = {6}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Mobile Number
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={mobileNumber}
                        onChange={(event)=>{
                        setMobileNumber(event.target.value)
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md = {6}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Associated Person Status
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={associatedPersonStatus}
                        onChange={(event)=>{
                        setAssociatedPersonStatus(event.target.value)
                        }}
                    />
                </Grid>

            </Grid>
          </Box>
    </Box>
  )
}
