import { Autocomplete, Avatar, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getAxiosInstance from '../../services/axiosProvider'
import { useUser } from '@/context/UserContext';

export const UserSearchBox = ({initialValue = "", setUserId}) => {
  const [userContext, setUserContext] = useUser();
  const [usersList, setUsersList] = useState([]);
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
            getUsers('').then((users)=>{
                setUsersList(users);
            })
        }, 500);

        // Update the timeoutId state
        setTimeoutId(newTimeoutId);
  };

  useEffect(()=>{
    getUsers('').then((users)=>{
        setUsersList(users);
    })
  },[])

  const getUsers = async (userKey)=>{
    let token = userContext.token;
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/users?limit=5&offset=0&q=${userKey}`);
    return response.data.data.users;
  }

  return (
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={usersList}
        sx={{ 
            width: '100%',
        }}
        onChange={(event, option)=>{
            if(option)
                setUserId(option._id)
            else
                setUserId(null)
            }
        }
        getOptionLabel={(option)=>option.name}
        renderInput={(params) => <TextField {...params} defaultValue={initialValue} onChange={handleInputChange}/>}
        renderOption={(props, option) =>{
        console.log(props)
        return (<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } } } key={option._id} {...props}>
            <Avatar
            width="20"
            src={option.userPhotoLink}
            alt={option.name}
            sx={{
                mr:2
            }}
            />
            {option.name}
        </Box>)}}
    />
  )
}
