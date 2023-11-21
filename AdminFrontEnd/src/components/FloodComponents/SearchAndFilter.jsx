import React, {useState,  useRef } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FilterIconFilled from '@mui/icons-material/FilterList';
import FilterIconOutlined from '@mui/icons-material/FilterListOutlined';
import DateFilter from '../Filter/DateFilter';
import NumberFilter from '../Filter/NumberFilter';
import { Box, Card, Grid, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import StringFilter from '../Filter/StringFilter';


const cardStyle = { // Black outline
    position: 'relative',
    paddingTop: '25px',
    paddingBottom: '25px'
  };
  
  const labelStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold'
  };
  const buttonStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  };
export const SearchAndFilter = ({query, setQuery, offset, limit, setFloodsRefresh}) => {
    //References//''
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const [searchText, setSearchText] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    

    const applyFilter = ()=>{
      let newQuery = {};
      newQuery = {...newQuery,...nameRef.current.applyFilter()};
      newQuery = {...newQuery,...emailRef.current.applyFilter()};
      newQuery = {...newQuery, offset: offset};
      newQuery = {...newQuery, limit: limit};
      setQuery(newQuery);
      setFloodsRefresh(true);
    }

    const handleClearSearch = () => {
        setSearchText('');
        setFloodsRefresh(true);
    };
    

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);
    
        // Clear any existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
    
        // Set a new timeout to trigger search after 500ms of inactivity
        const newTimeoutId = setTimeout(() => {
          setShowFilters(false);
          console.log(offset);
          setQuery({"q": searchText, offset: offset, limit: limit});
          setFloodsRefresh(true);
        }, 700);
    
        // Update the timeoutId state
        setTimeoutId(newTimeoutId);
    };
  return (
    <div>
        <div style={{"display": "flex"}}>
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                fullWidth
                InputProps={{
                startAdornment: (
                    <SearchIcon style={{ color: 'gray' }} />
                ),
                endAdornment: (
                    searchText && (
                    <ClearIcon
                        style={{ cursor: 'pointer' }}
                        onClick={handleClearSearch}
                    />
                    )
                ),
                }}
                value={searchText}
                onChange={(e) => handleInputChange(e)}
            />
            <Button variant="outlined" onClick={toggleFilters} style={{
            backgroundColor: showFilters ? 'lightblue' : 'inherit',
            }}>
                {showFilters ? <FilterIconFilled /> : <FilterIconOutlined />}
            </Button>
        </div>
      
      <Collapse in={showFilters}>
            <div style={cardStyle}>
            <Typography style={labelStyle}>
                Filters List
            </Typography>
            <CardContent>
            <Box component="form" noValidate sx={{ mt: 2,  mb: 2}}>
                <Grid container spacing={2}>
                    <StringFilter lg={6} ref={nameRef} title = {"Name"} field={"name"}/>
                    <StringFilter lg={6} ref={emailRef} title = {"Email"} field={"email"}/>
                </Grid>
            </Box>
            </CardContent>
            <Button variant="contained" color="primary" style={buttonStyle} onClick={()=>{applyFilter()}}>
                Apply Filters
            </Button>
            </div>
      </Collapse>
    </div>
  )
}
