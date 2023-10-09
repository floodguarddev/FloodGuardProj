import React, { useState , forwardRef, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';
import {Grid, Typography } from '@mui/material';


const  StringFilter  = forwardRef((props, ref) =>  {
  const [string, setString] = useState('');

  const handleDataChange = (event) => {
    setString(event.target.value);
  };

  const applyFilter = () => {
    return  {[props.field]: string.length>0?string:undefined}
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
                variant="outlined"
                value={string}
                placeholder='Contains given String'
                onChange={handleDataChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
            
    </Grid>
  );
});

export default StringFilter;



