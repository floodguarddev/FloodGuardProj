import React, { useState , forwardRef, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';

const  NumberFilter  = forwardRef((props, ref) =>  {
  const [selectedOption, setSelectedOption] = useState('_eq');
  const [selectedNumber, setSelectedNumber] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const applyFilter = () => {
    return {[props.field+selectedOption]: selectedNumber.length>0?selectedNumber:undefined}
  };

  useImperativeHandle(ref, () => ({
    applyFilter,
  }));

  return (
    <Grid item lg={props.lg?props.lg:4} md={props.md?props.md:6} xs={props.xs?props.xs:12}>
            <Typography
                component="label"
                sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "2px",
                display: "block",
                }}
            >
                {props.title}
            </Typography>
                
            <div style={{display: "flex"}}>
            <TextField
                style={{flex:1}}
                id={props.title}
                type="number"
                variant="outlined"
                value={selectedNumber}
                onChange={handleDateChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <FormControl>
                <Select
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ width: '120px' }}
                >
                <MenuItem value="_gt">Greater Than</MenuItem>
                <MenuItem value="_eq">Equal To</MenuItem>
                <MenuItem value="_lt">Less Than</MenuItem>
                <MenuItem value="_lte">Less Than or Equal To</MenuItem>
                <MenuItem value="_gte">Greater Than or Equal To</MenuItem>
                </Select>
            </FormControl>
            </div>
            
    </Grid>
  );
});

export default NumberFilter;



