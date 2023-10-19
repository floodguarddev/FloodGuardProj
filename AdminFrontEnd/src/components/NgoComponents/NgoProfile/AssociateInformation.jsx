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

const AssociateInformation = ({ngo}) => {
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
            Associated User
          </Typography>
        </Box>
        
        <Box>
          <InfoBox title = "Name" info = {ngo.userId.name} />
          <InfoBox title = "Email" info = {ngo.userId.email} />
          <InfoBox title = "Status In Ngo" info = {ngo.assosiatedPersonStatus} />
          <InfoBox title = "CNIC" info = {ngo.cnicNumber} />
          <InfoBox title = "Mobile Number" info = {ngo.mobileNumber} />
        </Box>
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
          <Button  variant="contained" color="primary" href={ngo.frontSideCNICLink} target="_blank">View Front Side CNIC</Button>
          <Button  variant="contained" color="primary" href={ngo.backSideCNICLink} target="_blank">View Back Side CNIC</Button>
        </Box>
      </Card>
    </>
  );
};

export default AssociateInformation;
