import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loader from '@/pages/general/Loader';
import { useSnackbar } from 'notistack';
import { useUser } from '@/context/UserContext';
import BadRequest from '@/pages/general/BadRequest';
import { SpecificNews } from '@/components/NewsComponents/SpecificNews';
import { getSpecificFundRaising } from '../../services/fund_raising.services';
import { SpecificFundRaising } from '@/components/FundRaisingComponents/SpecificFundRaising';

export default function  ViewSpecificFundRaising(){
  const [fundRaising, setFundRaising] = useState(null);
  const [userContext, setUserContext] = useUser();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(()=>{
    getSpecificFundRaising(userContext.token, params.id).then(
        (response)=>response.data.data.fundRaisingPost
    ).then(
        (fundRaisingPost)=>{
            console.log(fundRaisingPost)
            setFundRaising(fundRaisingPost);
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
    (fundRaising)?
    <div><SpecificFundRaising fundRaising = {fundRaising} /></div>:
    <Loader/>
  )
}