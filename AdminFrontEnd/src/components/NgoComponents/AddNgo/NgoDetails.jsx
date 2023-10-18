import React from 'react'
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

export const NgoDetails = ({ngoName, setNgoName, ngoContactNumber, setNgoContactNumber,creditCardNumber, setCreditCardNumber, address, setAddress, ngoId, setNgoId}) => {
  return (
    <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

                <Grid item xs={12} md = {4}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        NGO Name
                    </Typography>

                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={ngoName}
                        onChange={(event)=>{
                        setNgoName(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12} md = {4}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        NGO ID
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={ngoId}
                        onChange={(event)=>{
                            setNgoId(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12} md = {4}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        NGO Contact Number
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={ngoContactNumber}
                        onChange={(event)=>{
                            setNgoContactNumber(event.target.value)
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
                        Credit Card Number
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={creditCardNumber}
                        onChange={(event)=>{
                            setCreditCardNumber(event.target.value)
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
                        Address
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={address}
                        onChange={(event)=>{
                            setAddress(event.target.value)
                        }}
                    />
                </Grid>
                
            </Grid>
          </Box>
    </Box>
  )
}
