import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import BadRequest from '@/pages/general/BadRequest';
import { SpecificFloodPrecaution } from '@/components/FloodPrecautionComponents/SpecificFloodPrecaution';
import { getSpecificPrecautions } from '@/services/flood_precautions.services';
export default function  ViewSpecificFloodPrecaution(){
  const [floodPrecautions, setFloodPrecautions] = useState(null);
  const [userContext, setUserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificPrecautions(userContext.token, params.id).then(
        (response)=>response.data.data.flood_precaution
    ).then(
        (flood_precaution)=>{
            console.log(flood_precaution)
            setFloodPrecautions(flood_precaution);
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
    <div><SpecificFloodPrecaution precaution = {floodPrecautions} /></div>:
    <Loader/>
  )
}