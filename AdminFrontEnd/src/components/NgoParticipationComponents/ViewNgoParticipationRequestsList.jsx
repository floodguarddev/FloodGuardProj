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
import { approveNgoParticipationRequest, rejectNgoParticipationRequest, getNgoParticipationRequestsList } from '../../services/ngo_partcipation.services';
//import styles from "./ViewNgoPartcipationRequestList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';

export const ViewNgoParticipationRequestsList = ({query, ngoParticipationRequestsRefresh, setNgoParticipationRequestsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [ngoPartcipationRequestList,setNgoPartcipationRequestList]=useState(null);
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
        ).then((ngoPartcipationRequests)=>{
            console.log(ngoPartcipationRequests);
            setNgoPartcipationRequestList(ngoPartcipationRequests);
            setNgoParticipationRequestsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [ngoParticipationRequestsRefresh])

  const viewNgoPartcipationRequest = (ngoPartcipationRequestId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedNgoPartcipationRequest: ngoPartcipationRequestId}});
        console.log(ngoPartcipationRequestId)
        navigate(`/ngoPartcipationRequest/${ngoPartcipationRequestId}`);
    }
    catch(error){
        alert(error)
    }
  }

  

  const rejectNgoPartcipationRequestFunc = (ngoPartcipationRequestId)=>{
    rejectNgoParticipationRequest(userContext.token, ngoPartcipationRequestId).then(
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


  const approveNgoPartcipationRequestFunc = (ngoPartcipationRequestId)=>{
    approveNgoParticipationRequest(userContext.token, ngoPartcipationRequestId).then(
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

  const NgoPartcipationRequestCard = ({ngoPartcipationRequest})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={ngoPartcipationRequest._id}>
          <Card sx={{ mb: '15px' }}>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  ngoPartcipationRequest.postImagesLinks.map((image)=>(
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
                          {ngoPartcipationRequest.postTitle.length>70?ngoPartcipationRequest.postTitle.slice(0,70)+"...":ngoPartcipationRequest.postTitle}
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
                      <Avatar alt={ngoPartcipationRequest.ngoName} src={ngoPartcipationRequest.ngoImageLink} />
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
                      {ngoPartcipationRequest.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(ngoPartcipationRequest.requestedDate)}
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
                      {ngoPartcipationRequest.postDescription.length>120?ngoPartcipationRequest.postDescription.slice(0,120)+"...":ngoPartcipationRequest.postDescription}
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
                        approveNgoPartcipationRequestFunc(ngoPartcipationRequest._id)
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
                      rejectNgoPartcipationRequestFunc(ngoPartcipationRequest._id)
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
            ngoPartcipationRequestList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {ngoPartcipationRequestList.map((ngoPartcipationRequest) => (
          <NgoPartcipationRequestCard ngoPartcipationRequest={ngoPartcipationRequest}/>
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
