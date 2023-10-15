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
import {deleteNgoParticipation, getNgoParticipationsList } from '../../services/ngo_participation.services';
//import styles from "./ViewNgoParticipationList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export const ViewNgoParticipationsList = ({setTotalRecords, query, handleEditOpen, ngoParticipationsRefresh, setNgoParticipationsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [ngoParticipationList,setNgoParticipationList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!ngoParticipationsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getNgoParticipationsList(userContext.token, searchQuery).then(
            (response)=>{
                return response.data.data;
            }
        ).then((data)=>{
            setTotalRecords(data.total);
            setNgoParticipationList(data.ngoParticipationPosts);
            setNgoParticipationsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [ngoParticipationsRefresh])

  const viewNgoParticipation = (ngoParticipationId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedNgoParticipation: ngoParticipationId}});
        console.log(ngoParticipationId)
        navigate(`/ngo_participations/${ngoParticipationId}`);
    }
    catch(error){
        alert(error)
    }
  }

  const deleteNgoParticipationFunc = (ngoParticipationId)=>{
    deleteNgoParticipation(userContext.token, ngoParticipationId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setNgoParticipationsRefresh(true);
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
  
  const NgoParticipationCard = ({ngoParticipation})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={ngoParticipation._id}>
          <Card sx={{ mb: '15px' }}>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  ngoParticipation.postImagesLinks.map((image)=>(
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
                          {ngoParticipation.postTitle.length>70?ngoParticipation.postTitle.slice(0,70)+"...":ngoParticipation.postTitle}
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
                      <Avatar alt={ngoParticipation.ngoName} src={ngoParticipation.ngoImageLink} />
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
                      {ngoParticipation.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(ngoParticipation.postedDate)}
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
                          deleteNgoParticipationFunc(ngoParticipation._id)
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
                            handleEditOpen(ngoParticipation);
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
                    mb: "20px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {ngoParticipation.postDescription.length>120?ngoParticipation.postDescription.slice(0,120)+"...":ngoParticipation.postDescription}
                    </Typography>
                  </Box>
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
                        viewNgoParticipation(ngoParticipation._id)
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
            ngoParticipationList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {ngoParticipationList.map((ngoParticipation) => (
          <NgoParticipationCard ngoParticipation={ngoParticipation}/>
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
