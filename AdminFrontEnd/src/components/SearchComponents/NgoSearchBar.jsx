import { Autocomplete, Avatar, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getAxiosInstance from '../../services/axiosProvider'
import { useUser } from '@/context/UserContext';

export const NgoSearchBar = ({initialValue = "", setNgoId}) => {
  const [userContext, setUserContext] = useUser();
  const [ngosList, setNgosList] = useState([]);
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
            getNgos('').then((ngos)=>{
                setNgosList(ngos);
            })
        }, 700);

        // Update the timeoutId state
        setTimeoutId(newTimeoutId);
  };

  useEffect(()=>{
    getNgos('').then((ngos)=>{
        setNgosList(ngos);
    })
  },[])

  const getNgos = async (ngoKey)=>{
    let token = userContext.token;
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngos?limit=5&offset=0&q=${ngoKey}`);
    return response.data.data.ngos;
  }

  return (
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ngosList}
        sx={{ 
            width: '100%',
        }}
        onChange={(event, option)=>{
            if(option)
                setNgoId(option._id)
            else
                setNgoId(null)
            }
        }
        getOptionLabel={(option)=>option.ngoName}
        renderInput={(params) => <TextField {...params} defaultValue={initialValue} onChange={handleInputChange}/>}
        renderOption={(props, option) =>{
        console.log(props)
        return (<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } } } key={option._id} {...props}>
            <Avatar
            width="20"
            src={option.ngoImageLink}
            alt={option.ngoName}
            sx={{
                mr:2
            }}
            />
            {option.ngoName}
        </Box>)}}
    />
  )
}
