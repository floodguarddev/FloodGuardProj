import React, { useEffect, useState } from 'react'
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Grid } from '@mui/material';
import {useUser} from '@/context/UserContext'
import { getDonationsSummary, getNgosSummary, getUsersSummary } from '../../services/reports.services';
import { SummaryCard } from './SummaryCard';
export default function index () {
  const [features, setFeatures] = useState([]);
  const [userContext, setUserContext] = useUser();

  function formatNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    }
    else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    } else {
      return number.toString();
    }
  }

  useEffect(()=>{
    Promise.all([
        getNgosSummary(userContext.token),
        getUsersSummary(userContext.token),
        getDonationsSummary(userContext.token)
    ]).then((responses)=>{
        return responses.map((response)=>{
            let data = response.data.data;
            data.amount = Math.abs(data.total);
            data.amount = formatNumber(data.amount)
            if(data.lastYearCompare>0){
                data.icon = <TrendingUpIcon/>
                data.growthText = `${data.lastYearCompare}% up from past year`
                data.color="successColor"
            }
            else{
                data.icon = <TrendingDownIcon/>
                data.growthText = `${data.lastYearCompare}% down from past year`
                data.color="dangerColor"
            }
            return data
        })
    }).then((datas)=>{
        datas[0].image = "/images/users-icon.png"
        datas[0].subTitle = "Number of NGOs"


        datas[1].image = "/images/users-icon.png"
        datas[1].subTitle = "Number of Users"

        datas[2].image = "/images/graph-icon.png"
        datas[2].subTitle = "Donations"

        setFeatures(datas);
    })
  },[])

  return (
    <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
    >
        {
            features.map((feature)=><SummaryCard {...feature}/>)
        }
    </Grid>
  )
}
