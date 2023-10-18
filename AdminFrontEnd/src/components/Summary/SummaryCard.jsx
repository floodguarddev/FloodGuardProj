import React, { useEffect } from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


export const SummaryCard = ({amount,subTitle,image,icon,color,growthText}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} key={amount}>
        <Card
            sx={{
            boxShadow: "none",
            borderRadius: "10px",
            p: "25px 20px",
            mb: "15px",
            }}
        >
            <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "15px",
            }}
            >
            <Box>
                <Typography
                variant="h1"
                sx={{ fontSize: 25, fontWeight: 700, mb: "5px" }}
                >
                {amount}
                </Typography>
                <Typography variant="p" fontSize={14}>
                {subTitle}
                </Typography>
            </Box>

            <Box
                sx={{
                width: "62px",
                height: "62px",
                lineHeight: "85px",
                background: "rgba(85, 112, 241, 0.12)",
                borderRadius: "8px",
                textAlign: "center",
                }}
            >
                <img src={image} alt="Graph" />
            </Box>
            </Box>

            <Box>
            <Typography
                sx={{
                fontSize: "13px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                }}
            >
                <span className={`mr-5px ${color}`}>
                {icon}
                </span>
                {growthText}
            </Typography>
            </Box>
        </Card>
    </Grid>
  )
}
