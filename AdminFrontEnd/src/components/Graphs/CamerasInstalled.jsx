import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from 'react-apexcharts'

const CamerasInstalled = () => {
  const series = [
    {
      name: "Cameras Installed",
      data: [20, 19, 28, 33, 22, 80],
    }
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    stroke: {
      width: 2,
    },
    colors: ["#2DB6F5", "#E289F2"],
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: ["Islamabad", "Lahore", "Faislabad", "Multan", "Karachi", "Others"],
    },
  };

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
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
            Cameras Installed City Wise
          </Typography>

          <Typography
            as="p"
            sx={{
              fontSize: 14,
            }}
          >
            Total Cameras Installed: 202
          </Typography>
        </Box>

        <Chart options={options} series={series} type="radar" height={520} />
      </Card>
    </>
  );
};

export default CamerasInstalled;
