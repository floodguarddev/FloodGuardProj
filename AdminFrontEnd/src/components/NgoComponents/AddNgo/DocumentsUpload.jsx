import React from 'react'
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

export const DocumentsUpload = ({setRegistrationCertificate, setAnnualReport, setTaxExemption, setFrontSideCNICImage, setBackSideCNICImage}) => {
    const registrationCertificateHandler = (event)=>{
        setRegistrationCertificate(event.target.files[0])
    }
    const annualReportHandler = (event)=>{
        setAnnualReport(event.target.files[0])
    }
    const taxExemptionHandler = (event)=>{
        setTaxExemption(event.target.files[0])
    }
    const frontSideCNICHandler = (event)=>{
        setFrontSideCNICImage(event.target.files[0])
    }
    const backSideCNICHandler = (event)=>{
        setBackSideCNICImage(event.target.files[0])
    }
    return (
    <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

            <Grid item xs={12} md={4}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Registration Certificate
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                inputProps={{accept:"application/pdf"}}
                onChange={registrationCertificateHandler}
                autoComplete="file"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Annual Report
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                onChange={annualReportHandler}
                inputProps={{accept:"application/pdf"}}
                autoComplete="file"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Tax Exemption
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                onChange={taxExemptionHandler}
                inputProps={{accept:"application/pdf"}}
                autoComplete="file"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Front Side CNIC
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                onChange={frontSideCNICHandler}
                inputProps={{accept:"image/*"}}
                autoComplete="file"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Back Side CNIC
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                inputProps={{accept:"image/*"}}
                onChange={backSideCNICHandler}
                autoComplete="file"
              />
            </Grid>    
            </Grid>
          </Box>
    </Box>
  )
}
