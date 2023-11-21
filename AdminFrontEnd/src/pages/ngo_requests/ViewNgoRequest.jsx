import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import { getSpecificNgoRequest } from '@/services/ngos.services';
import BadRequest from '@/pages/general/BadRequest';
import { NgoRequest } from '@/components/NgoComponents/NgoRequest/index';
export default function  ViewNgoRequest(){
  const [ngoRequest, setNgoRequest] = useState(null);
  const [userContext, setuserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificNgoRequest(userContext.token, params.id).then(
        (response)=>response.data.data.ngoRequest
    ).then(
        (ngoRequest)=>{
            console.log(ngoRequest);
            setNgoRequest(ngoRequest);
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
    <BadRequest message="Given NgoRequest Id is not Valid, Please Try to Select a Valid Id from NgoRequests List" buttonLabel="Go to NgoRequests List" buttonLink="/ngoRequests/list"/>:
    (ngoRequest)?
    <div><NgoRequest ngoRequest = {ngoRequest} /></div>:
    <Loader/>
  )
}