import React from 'react';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";

export default function BadRequest({message, buttonLabel, buttonLink}) {
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <img src='/images/400.png' alt='error' width={"40%"} />

        <Typography 
          as="h1" 
          sx={{
            fontWeight: '500',
            fontSize: '22px',
            mt: '20px',
            mb: '10px',
          }}
        >
          {message}
        </Typography>
        
        <Link to={buttonLink} className="text-decoration-none">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 30px",
              color: "#fff !important",
            }}
          >
            {buttonLabel}
          </Button>
        </Link>
      </Box>
    </>
  );
}
