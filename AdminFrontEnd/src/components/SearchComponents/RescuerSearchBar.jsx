import { Autocomplete, Avatar, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getAxiosInstance from '../../services/axiosProvider'
import { useUser } from '@/context/UserContext';

export const RescuerSearchBar = ({initialValue = "", setRescuerId}) => {
  const [userContext, setUserContext] = useUser();
  const [rescuersList, setRescuersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const handleInputChange = (e) => {
        const newText = e.target.value;
        setSearchText(newText);

        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout to trigger search after 700ms of inactivity
        const newTimeoutId = setTimeout(() => {
            getRescuers('').then((rescuers)=>{
                setRescuersList(rescuers);
            })
        }, 700);

        // Update the timeoutId state
        setTimeoutId(newTimeoutId);
  };

  useEffect(()=>{
    getRescuers('').then((rescuers)=>{
        setRescuersList(rescuers);
    })
  },[])

  const getRescuers = async (rescuerKey)=>{
    let token = userContext.token;
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/rescuers?limit=5&offset=0&q=${rescuerKey}`);
    return response.data.data.rescuers;
  }

  return (
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={rescuersList}
        sx={{ 
            width: '100%',
        }}
        onChange={(event, option)=>{
            if(option)
                setRescuerId(option._id)
            else
                setRescuerId(null)
            }
        }
        getOptionLabel={(option)=>option.fullName}
        renderInput={(params) => <TextField {...params} defaultValue={initialValue} onChange={handleInputChange}/>}
        renderOption={(props, option) =>{
        console.log(props)
        return (<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } } } key={option._id} {...props}>
            <Avatar
            width="20"
            src={option.rescuerImageLink}
            alt={option.fullName}
            sx={{
                mr:2
            }}
            />
            {option.fullName}
        </Box>)}}
    />
  )
}
