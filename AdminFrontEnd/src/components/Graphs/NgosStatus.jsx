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
import { getNgosReport } from "../../services/reports.services";
import { useUser } from '@/context/UserContext';

const NgosStatus = () => {
  const [userContext, setUserContext] = useUser();
  // Select Form
  const [select, setSelect] = React.useState(1);

  const [ngosCount, setNgosCount] = React.useState(null)

  const [yAxis, setYAxis] = React.useState([]);
  const [xAxis, setXAxis] = React.useState([]);

  const handleChange = (event) => {
    console.log('here');
    setSelect(event.target.value);
  };
  
  useEffect(()=>{
    if(ngosCount){
      if(select == 0){
        setXAxis(ngosCount.last7days.count.x)
        setYAxis(ngosCount.last7days.count.y)
      }
      else if(select == 1){
        setXAxis(ngosCount.monthly.count.x)
        setYAxis(ngosCount.monthly.count.y)
      }
      else if(select == 2){
        setXAxis(ngosCount.yearly.count.x)
        setYAxis(ngosCount.yearly.count.y)
      }
    }
  }, [select])

  useEffect(()=>{
    getNgosReport(userContext.token).then(
      (response)=>response.data.data
    ).then(
      (data)=>{
        setNgosCount(data.ngosCount);
        setXAxis(data.ngosCount.monthly.count.x)
        setYAxis(data.ngosCount.monthly.count.y)
      }
    )
  }, [])

  // Chart
  const series = [
    {
      name: "Ngos Joined",
      data: yAxis,
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#757FEF"],
    xaxis: {
      categories: xAxis,
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#f6f6f7",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
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
            Ngos Status
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

        <Chart options={options} series={series} type="area" height={285} />
      </Card>
    </>
  );
};

export default NgosStatus;
