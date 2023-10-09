import React from "react";
import { Box, Typography } from "@mui/material";
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

const PersonalInformation = ({user}) => {
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
            Personal Information
          </Typography>
        </Box>
        
        <Box>
          <InfoBox title = "Name" info = {user.name} />
          <InfoBox title = "Email" info = {user.email} />
          <InfoBox title = "Donations" info = {user.donations} />
          <InfoBox title = "Verified" info = {user.verified?"Yes":"No"} />
        </Box>
      </Card>
    </>
  );
};

export default PersonalInformation;
