import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import BadRequest from '@/pages/general/BadRequest';
import { SpecificNews } from '@/components/NewsComponents/SpecificNews';
import { getSpecificNgoParticipation } from '../../services/ngo_partcipation.services';
import { SpecificNgoParticipation } from '@/components/NgoParticipationComponents/SpecificNgoParticipation';

export default function  ViewSpecificNgoPartcipation(){
  const [ngoParticipation, setNgoParticipation] = useState(null);
  const [userContext, setUserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificNgoParticipation(userContext.token, params.id).then(
        (response)=>response.data.data.ngoParticipationPost
    ).then(
        (ngoParticipationPost)=>{
            console.log(ngoParticipationPost)
            setNgoParticipation(ngoParticipationPost);
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
    <BadRequest message="Given Flood Precautions Id is not Valid, Please Try to Select a Valid Id from News List" buttonLabel="Go to News List" buttonLink="/flood_precautions/list"/>:
    (ngoParticipation)?
    <div><SpecificNgoParticipation ngoParticipation = {ngoParticipation} /></div>:
    <Loader/>
  )
}