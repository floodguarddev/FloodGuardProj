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
import { approveFundRaisingRequest, rejectFundRaisingRequest, getFundRaisingRequestsList } from '../../services/fund_raising.services';
//import styles from "./ViewFundRaisingRequestList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';

export const ViewFundRaisingRequestsList = ({setTotalRecords, query, fundRaisingRequestsRefresh, setFundRaisingRequestsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [fundRaisingRequestList,setFundRaisingRequestList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!fundRaisingRequestsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getFundRaisingRequestsList(userContext.token, searchQuery).then(
            (response)=>{
                console.log(response.data);
                return response.data.data;
            }
        ).then((data)=>{
            console.log(data.fundRaisingRequests);
            setTotalRecords(data.total);
            setFundRaisingRequestList(data.fundRaisingRequests);
            setFundRaisingRequestsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [fundRaisingRequestsRefresh])

  const viewFundRaisingRequest = (fundRaisingRequestId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedFundRaisingRequest: fundRaisingRequestId}});
        console.log(fundRaisingRequestId)
        navigate(`/fundRaisingRequest/${fundRaisingRequestId}`);
    }
    catch(error){
        alert(error)
    }
  }

  

  const rejectFundRaisingRequestFunc = (fundRaisingRequestId)=>{
    rejectFundRaisingRequest(userContext.token, fundRaisingRequestId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setFundRaisingRequestsRefresh(true);
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


  const approveFundRaisingRequestFunc = (fundRaisingRequestId)=>{
    approveFundRaisingRequest(userContext.token, fundRaisingRequestId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setFundRaisingRequestsRefresh(true);
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

  const FundRaisingRequestCard = ({fundRaisingRequest})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={fundRaisingRequest._id}>
          <Card sx={{ mb: '15px' }}>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  fundRaisingRequest.postImagesLinks.map((image)=>(
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
                          {fundRaisingRequest.postTitle.length>70?fundRaisingRequest.postTitle.slice(0,70)+"...":fundRaisingRequest.postTitle}
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
                      <Avatar alt={fundRaisingRequest.ngoName} src={fundRaisingRequest.ngoImageLink} />
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
                      {fundRaisingRequest.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(fundRaisingRequest.requestDate)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {"Requested Amount: PKR "}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {fundRaisingRequest.requestedAmount}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {fundRaisingRequest.postDescription.length>120?fundRaisingRequest.postDescription.slice(0,120)+"...":fundRaisingRequest.postDescription}
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
                        approveFundRaisingRequestFunc(fundRaisingRequest._id)
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
                      rejectFundRaisingRequestFunc(fundRaisingRequest._id)
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
            fundRaisingRequestList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {fundRaisingRequestList.map((fundRaisingRequest) => (
          <FundRaisingRequestCard fundRaisingRequest={fundRaisingRequest}/>
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
