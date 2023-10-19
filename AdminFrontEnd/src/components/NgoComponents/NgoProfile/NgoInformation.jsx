import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";

const InfoBox = ({title, info})=>(
    <Box
                sx={{
                display: 'flex',
                borderBottom: '1px solid #F7FAFF',
                p: '10px 0',
                }}
                key={title}
                className="for-dark-bottom-border"
            >
                <Typography 
                as='h4' 
                fontWeight='500' 
                fontSize='14px' 
                width='100px'
                >
                {title}
                </Typography>

                <Typography>{info}</Typography>
    </Box>
) 

const NgoInformation = ({ngo}) => {
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
        <Box
          sx={{
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            NGO Information
          </Typography>
        </Box>
        
        <Box>
          <InfoBox title = "NGO Name" info = {ngo.ngoName} />
          <InfoBox title = "NGO ID" info = {ngo.ngoId} />
          <InfoBox title = "Credit Card" info = {ngo.creditCardNumber} />
          <InfoBox title = "Contact No" info = {ngo.ngoContactNumber} />
          <InfoBox title = "Address" info = {ngo.address} />
          <Typography mt = {2} mb={2}>
            Documents
          </Typography>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2
          }}>
            <Button  variant="contained" color="primary" href={ngo.registrationCertificateLink} target="_blank">View Registration Link</Button>
            <Button  variant="contained" color="primary" href={ngo.taxExemptionLink} target="_blank">Tax Exemption</Button>
            <Button  variant="contained" color="primary" href={ngo.annualReportLink} target="_blank">Annual Report</Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default NgoInformation;
