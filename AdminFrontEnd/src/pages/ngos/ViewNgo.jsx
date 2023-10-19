import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import { getSpecificNgo } from '@/services/ngos.services';
import BadRequest from '@/pages/general/BadRequest';
import { NgoProfile } from '@/components/NgoComponents/NgoProfile/index';
export default function  ViewNgo(){
  const [ngo, setNgo] = useState(null);
  const [userContext, setuserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificNgo(userContext.token, params.id).then(
        (response)=>response.data.data.ngo
    ).then(
        (ngo)=>{
            console.log(ngo);
            setNgo(ngo);
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
    <BadRequest message="Given Ngo Id is not Valid, Please Try to Select a Valid Id from Ngos List" buttonLabel="Go to Ngos List" buttonLink="/ngos/list"/>:
    (ngo)?
    <div><NgoProfile ngo = {ngo} /></div>:
    <Loader/>
  )
}