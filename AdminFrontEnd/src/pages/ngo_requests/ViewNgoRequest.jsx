import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import { getSpecificAdmin } from '@/services/admins.services';
import BadRequest from '@/pages/general/BadRequest';
import { AdminProfile } from '@/components/AdminComponents/AdminProfile';
export default function  ViewNgoRequest(){
  const [admin, setAdmin] = useState(null);
  const [adminContext, setAdminContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificAdmin(adminContext.token, params.id).then(
        (response)=>response.data.data.user
    ).then(
        (admin)=>{
            console.log(admin);
            setAdmin(admin);
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
    <BadRequest message="Given Admin Id is not Valid, Please Try to Select a Valid Id from Admins List" buttonLabel="Go to Admins List" buttonLink="/admins/list"/>:
    (admin)?
    <div><AdminProfile admin = {admin} /></div>:
    <Loader/>
  )
}