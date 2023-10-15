import React, { useEffect, useState } from 'react'
import { useUser } from "@/context/UserContext"
import { Avatar, CardActions, CardContent, CardMedia, CircularProgress, } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// import { Navigation } from "swiper";
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { Link, useNavigate } from "react-router-dom";
import { jsonToSearchQuery } from '../../utils/query';
import { approveNgoParticipationRequest, rejectNgoParticipationRequest, getNgoParticipationRequestsList } from '../../services/ngo_participation.services';
//import styles from "./ViewNgoParticipationRequestList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';

export const ViewNgoParticipationRequestsList = ({query, ngoParticipationRequestsRefresh, setNgoParticipationRequestsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [ngoParticipationRequestList,setNgoParticipationRequestList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!ngoParticipationRequestsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getNgoParticipationRequestsList(userContext.token, searchQuery).then(
            (response)=>{
                console.log(response.data);
                return response.data.data.ngoParticipationRequests;
            }
        ).then((ngoParticipationRequests)=>{
            console.log(ngoParticipationRequests);
            setNgoParticipationRequestList(ngoParticipationRequests);
            setNgoParticipationRequestsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [ngoParticipationRequestsRefresh])

  const viewNgoParticipationRequest = (ngoParticipationRequestId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedNgoParticipationRequest: ngoParticipationRequestId}});
        console.log(ngoParticipationRequestId)
        navigate(`/ngoParticipationRequest/${ngoParticipationRequestId}`);
    }
    catch(error){
        alert(error)
    }
  }

  

  const rejectNgoParticipationRequestFunc = (ngoParticipationRequestId)=>{
    rejectNgoParticipationRequest(userContext.token, ngoParticipationRequestId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setNgoParticipationRequestsRefresh(true);
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


  const approveNgoParticipationRequestFunc = (ngoParticipationRequestId)=>{
    approveNgoParticipationRequest(userContext.token, ngoParticipationRequestId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setNgoParticipationRequestsRefresh(true);
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

  const NgoParticipationRequestCard = ({ngoParticipationRequest})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={ngoParticipationRequest._id}>
          <Card sx={{ mb: '15px' }}>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  ngoParticipationRequest.postImagesLinks.map((image)=>(
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
                          {ngoParticipationRequest.postTitle.length>70?ngoParticipationRequest.postTitle.slice(0,70)+"...":ngoParticipationRequest.postTitle}
                      </Typography>
                    </Box>
                  </Box> 

                </Box>
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
                      <Avatar alt={ngoParticipationRequest.ngoName} src={ngoParticipationRequest.ngoImageLink} />
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
                      {ngoParticipationRequest.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(ngoParticipationRequest.requestedDate)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "20px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {ngoParticipationRequest.postDescription.length>120?ngoParticipationRequest.postDescription.slice(0,120)+"...":ngoParticipationRequest.postDescription}
                    </Typography>
                  </Box>
                </Box>

            </CardContent>

            <Grid textAlign={"end"} m={2}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "10px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                    }}
                    onClick={()=>{
                        approveNgoParticipationRequestFunc(ngoParticipationRequest._id)
                    }}
                  >
                    < i class="ri-check-line"/> Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "10px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                      ml:"10px"
                    }}
                    onClick={()=>{
                      rejectNgoParticipationRequestFunc(ngoParticipationRequest._id)
                    }}
                  >
                    < i class="ri-close-line"/>Reject
                  </Button>
            </Grid>
          </Card>

      </Grid>
    )
}

  return (
    <>
        {
            ngoParticipationRequestList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {ngoParticipationRequestList.map((ngoParticipationRequest) => (
          <NgoParticipationRequestCard ngoParticipationRequest={ngoParticipationRequest}/>
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
