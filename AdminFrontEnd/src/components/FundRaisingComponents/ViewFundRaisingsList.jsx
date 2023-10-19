import React, { useEffect, useState } from 'react'
import { useUser } from "@/context/UserContext"
import { Avatar, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Tooltip, } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// import { Navigation } from "swiper";
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { Link, useNavigate } from "react-router-dom";
import { jsonToSearchQuery } from '../../utils/query';
import {deleteFundRaising, getFundRaisingsList } from '../../services/fund_raising.services';
//import styles from "./ViewFundRaisingList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#2196F3" : "#F7FAFF",
  },
}));

export const ViewFundRaisingsList = ({setTotalRecords, query, handleEditOpen, fundRaisingsRefresh, setFundRaisingsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [fundRaisingList,setFundRaisingList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!fundRaisingsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getFundRaisingsList(userContext.token, searchQuery).then(
            (response)=>{
                console.log("Response", response);
                return response.data.data;
            }
        ).then((data)=>{
            console.log(data.fundRaisingPosts);
            setTotalRecords(data.total)
            setFundRaisingList(data.fundRaisingPosts);
            setFundRaisingsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [fundRaisingsRefresh])

  const viewFundRaising = (fundRaisingId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedFundRaising: fundRaisingId}});
        console.log(fundRaisingId)
        navigate(`/fund_raisings/${fundRaisingId}`);
    }
    catch(error){
        alert(error)
    }
  }

  const deleteFundRaisingFunc = (fundRaisingId)=>{
    deleteFundRaising(userContext.token, fundRaisingId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setFundRaisingsRefresh(true);
        enqueueSnackbar(message, { variant: "success", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    }).catch((error)=>{
        enqueueSnackbar(error.response? error.response.data.message : error.message , { variant: "error", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    })
  }
  
  const FundRaisingCard = ({fundRaising})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={fundRaising._id}>
          <Card sx={{ mb: '15px' }}>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  fundRaising.postImagesLinks.map((image)=>(
                    <SwiperSlide>
                      <CardMedia image = {image} sx={{height: "240px"}}/>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              
              <CardContent>
              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box >
                      <Typography
                          as="h3"
                          sx={{
                          fontSize: 20,
                          fontWeight: 500,
                          mb: "5px",
                          }}
                      >
                          {fundRaising.postTitle.length>70?fundRaising.postTitle.slice(0,70)+"...":fundRaising.postTitle}
                      </Typography>
                    </Box>
                  </Box> 

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: "20px",
                    justifyContent: "space-between",
                  }}
                >
                 <Box
                 sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: "20px",
                    gap: "10px"
                  }}
                 >
                 <Link
                    style={{ textDecoration: 'none' }}>
                      <Avatar alt={fundRaising.ngoName} src={fundRaising.ngoImageLink} />
                    </Link>
                    
                  <Box>
                    <Link
                    style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 650
                      }}
                    >
                      {fundRaising.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(fundRaising.postedDate)}
                    </Typography>
                  </Box>
                 </Box>
                  
                  <Box
                    sx={{
                      display: "inline-block",
                    }}
                  >
                    <Tooltip title="Remove" placement="top">
                      <IconButton
                        aria-label="remove"
                        size="small"
                        color="danger"
                        className="danger"
                        sx={{ 
                          background: '#fff',
                          ml: '5px'
                        }}
                        onClick={()=>{
                          deleteFundRaisingFunc(fundRaising._id)
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit" placement="top">
                      <IconButton
                        aria-label="rename"
                        size="small"
                        color="primary"
                        className="primary"
                        sx={{ 
                          background: '#fff',
                          ml: '5px'
                        }}
                        onClick={()=>{
                            handleEditOpen(fundRaising);
                        }}
                      >
                        <DriveFileRenameOutlineIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb:"10px"
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {fundRaising.postDescription.length>120?fundRaising.postDescription.slice(0,120)+"...":fundRaising.postDescription}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: "10px",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{ fontWeight: 700, fontSize: 14, color: "#2196F3" }}
                    >
                      {`Donations: ${fundRaising.recievedAmount}/${fundRaising.requestedAmount}`}
                    </Typography>
                    <Typography component="div">{Math.floor(100*fundRaising.recievedAmount/fundRaising.requestedAmount)}%</Typography>
                  </Box>
                  <BorderLinearProgress variant="determinate" value={Math.min(100, Math.floor(100*fundRaising.recievedAmount/fundRaising.requestedAmount))} />
                </Box>
            </CardContent>

            <Grid textAlign={"end"} m={2}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "10px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                    }}
                    onClick={()=>{
                        viewFundRaising(fundRaising._id)
                    }}
                  >
                    View Details
                  </Button>
            </Grid>
          </Card>

      </Grid>
    )
}

  return (
    <>
        {
            fundRaisingList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {fundRaisingList.map((fundRaising) => (
          <FundRaisingCard fundRaising={fundRaising}/>
        ))}
      </Grid>:
            <div
            style={{ borderBottom: "1px solid #F7FAFF", textAlign: "center" }}
            >
            <CircularProgress />
            </div>
        }
    </>
  )
}
