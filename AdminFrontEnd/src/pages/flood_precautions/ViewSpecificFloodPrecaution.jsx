import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import { getSpecificFloodPrecautions } from '@/services/floodPrecautions.services';
import BadRequest from '@/pages/general/BadRequest';
import { FloodPrecautionsProfile } from '@/components/FloodPrecautionsComponents/FloodPrecautionsProfile';
export default function  ViewSpecificFloodPrecaution(){
  const [floodPrecautions, setFloodPrecautions] = useState(null);
  const [userContext, setUserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificFloodPrecautions(userContext.token, params.id).then(
        (response)=>response.data.data.floodPrecautions
    ).then(
        (floodPrecautions)=>{
            setFloodPrecautions(floodPrecautions);
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
    <BadRequest message="Given Flood Precautions Id is not Valid, Please Try to Select a Valid Id from FloodPrecautions List" buttonLabel="Go to FloodPrecautions List" buttonLink="/flood_precautions/list"/>:
    (floodPrecautions)?
    <div><FloodPrecautionsProfile floodPrecautions = {floodPrecautions} /></div>:
    <Loader/>
  )
}