import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from 'react-apexcharts'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { getUsersReport } from "../../services/reports.services";
import { useUser } from '@/context/UserContext';

const UsersStatus = () => {
  const [userContext, setUserContext] = useUser();
  // Select Form
  const [select, setSelect] = React.useState(1);

  const [usersCount, setUsersCount] = React.useState(null)

  const [countAxis, setCountAxis] = React.useState([]);
  const [verifiedAxis, setVerifiedAxis] = React.useState([]);
  const [donatedAxis, setDonatedAxis] = React.useState([]);
  const [xAxis, setXAxis] = React.useState([]);

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  
  useEffect(()=>{
    if(usersCount){
      if(select == 0){
        setXAxis(usersCount.last7days.count.x)
        setCountAxis(usersCount.last7days.count.y)
        setDonatedAxis(usersCount.last7days.donated.y)
        setVerifiedAxis(usersCount.last7days.verified.y)
      }
      else if(select == 1){
        setXAxis(usersCount.monthly.count.x)
        setCountAxis(usersCount.monthly.count.y)
        setDonatedAxis(usersCount.yearly.donated.y)
        setVerifiedAxis(usersCount.yearly.verified.y)
      }
      else if(select == 2){
        setXAxis(usersCount.yearly.count.x)
        setCountAxis(usersCount.yearly.count.y)
        setDonatedAxis(usersCount.yearly.donated.y)
        setVerifiedAxis(usersCount.yearly.verified.y)
      }
    }
  }, [select])

  useEffect(()=>{
    getUsersReport(userContext.token).then(
      (response)=>response.data.data
    ).then(
      (data)=>{
        setUsersCount(data.usersCount);
        setXAxis(data.usersCount.monthly.count.x)
        setCountAxis(data.usersCount.monthly.count.y)
        setDonatedAxis(data.usersCount.monthly.donated.y)
        setVerifiedAxis(data.usersCount.monthly.verified.y)
      }
    )
  }, [])

  // Chart
  const series = [
    {
      name: "Users Count",
      data: countAxis,
    },
    {
      name: "Verified Users",
      data: verifiedAxis,
    },
    {
      name: "Donors",
      data: donatedAxis,
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
        borderRadius: "4",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    colors: ["#757FEF", "#2DB6F5", "#EE368C"],
    xaxis: {
      categories: xAxis,
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        colors: "#f6f6f7",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Users";
        },
      },
    },
    legend: {
      offsetY: 12,
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      show: true,
      borderColor: "#f6f6f7",
    },
  };


  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
            Users Overview
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" sx={{ fontSize: '14px' }}>Select</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={select}
                label="Select"
                onChange={handleChange} 
                sx={{ fontSize: '14px' }}
                className="select"
              > 
                <MenuItem value={0} sx={{ fontSize: '14px' }}>Last 7 Days</MenuItem>
                <MenuItem value={1} sx={{ fontSize: '14px' }}>Last 12 Months</MenuItem>
                <MenuItem value={2} sx={{ fontSize: '14px' }}>Last 10 Years</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Chart options={options} series={series} type="bar" height={328} />
      </Card>
    </>
  );
};

export default UsersStatus;
