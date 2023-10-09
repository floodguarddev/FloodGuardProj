import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import { getSpecificUser } from '@/services/users.services';
import BadRequest from '@/pages/general/BadRequest';
import { UserProfile } from '@/components/UserComponents/UserProfile';
export default function  ViewUserProfile(){
  const [user, setUser] = useState(null);
  const [userContext, setUserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificUser(userContext.token, params.id).then(
        (response)=>response.data.data.user
    ).then(
        (user)=>{
            setUser(user);
        }
    ).catch(
        (error)=>{
            setError(true);
            enqueueSnackbar(error.response.data.message || error.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        }
    )
  },[])

  return (
    (error)?
    <BadRequest message="Given User Id is not Valid, Please Try to Select a Valid Id from Users List" buttonLabel="Go to Users List" buttonLink="/users/list"/>:
    (user)?
    <div><UserProfile user = {user} /></div>:
    <Loader/>
  )
}